require('dotenv').config()

const express = require('express');
const http = require('http');
const {stringify} = require("node:querystring");
const cors = require('cors');
const {request} = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const clientId = process.env.API_ID;
const clientSecret = process.env.API_SECRET;
const state = createString(16);
const scope = process.env.SCOPE;
const redirect_uri = process.env.REDIRECT;
const userCode = ''
server.listen(process.env.PORT, () => {
    console.log('server running');
});

async function getAppToken() {
    const app_token_response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: process.env.API_GRANT,
            client_id: process.env.API_ID,
            client_secret: process.env.API_SECRET
        }),
        headers: {
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
        method: "POST",
        body: new URLSearchParams({
            grant_type: process.env.USER_GRANT,
            code: code,
            redirect_uri: redirect_uri
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        }
    })

    return await response.json()
}

app.get('/login', function (req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
        stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

});

app.post('/token', async function (req, res) {
    const code = req.body.code
    const token = await getUserToken(code)
    const options = {
        maxAge: 1000 * 60 * 36,
        httpOnly: true,
        signed: false
    }
    res.status(200)
    res.cookie('tokenCookie', token.access_token, options)
    res.send({"success": true})
});


