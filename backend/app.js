require('dotenv').config()

const express = require('express');
const http = require('http');
const {stringify} = require("node:querystring");
const cors = require('cors');
const corsOptions = {
    origin: process.env.FRONTEND_URL, credentials: true,
};
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
const server = http.createServer(app);
const clientId = process.env.API_ID;
const clientSecret = process.env.API_SECRET;
const state = createString(16);
const scope = process.env.SCOPE;
const redirect_uri = process.env.REDIRECT;
server.listen(process.env.PORT, () => {
});

async function getAppToken() {
    const app_token_response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST", body: new URLSearchParams({
            grant_type: process.env.API_GRANT, client_id: process.env.API_ID, client_secret: process.env.API_SECRET
        }), headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    return await app_token_response.json()
}


function createString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

async function getUserToken(code) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST", body: new URLSearchParams({
            grant_type: process.env.USER_GRANT, code: code, redirect_uri: redirect_uri
        }), headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        }
    })

    return await response.json()
}


async function getUserInfo(token_cookie) {
    const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: {
            "Authorization": "Bearer " + token_cookie
        }
    })

    return await response.json()
}

function sendToken(res, token) {
    const options = {
        maxAge: 1000 * 60 * 36, httpOnly: true
    }
    res.cookie('tokenCookie', token, options)
    res.status(204).send({})
}

app.get('/login', function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' + stringify({
        response_type: 'code', client_id: clientId, scope: scope, redirect_uri: redirect_uri, state: state
    }));

});

app.post('/token', async function (req, res) {
    if (req.cookies.length === 0 || req.cookies.tokenCookie === undefined) {
        const code = req.body.code
        const token = await getUserToken(code)
        sendToken(res, token.access_token)
    } else {
        sendToken(res, req.cookies.tokenCookie)
    }
});


app.post('/me', async function (req, res) {
    const token_cookie = req.cookies.tokenCookie
    const data = await getUserInfo(token_cookie)
    res.status(200).send({'user': data.display_name, 'id': data.id, 'country': data.country})
});