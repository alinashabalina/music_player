require('dotenv').config()

const express = require('express');
const http = require('http');
const {stringify} = require("node:querystring");

const app = express();
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
    return await fetch("https://accounts.spotify.com/api/token", {
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
        .then((response) => response.json())
        .then((data) => {
            return data.access_token
        })
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

app.get('/login', function (req, res) {
    const hru = 'https://accounts.spotify.com/authorize?' +
        stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        });
    console.log(hru)
    res.redirect(hru)
});

async function getUserToken() {
    return await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
            grant_type: process.env.USER_GRANT,
            code: userCode,
            redirect_uri: redirect_uri
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
}