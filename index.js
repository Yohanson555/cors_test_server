const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const uuidv1 = require('uuid/v1');

const database = {};

//app.use(cors());
app.use(express.static('public_html'));
//app.options('*', cors());

app.post('/put', (req, res) => {
    console.log('put request');
    console.log(req);

    setTimeout(() => {
        const uid = uuidv1();

        data = {
            uid
        };

        res.setHeader("Access-Control-Allow-Origin", req.header("Origin"));
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        res.setHeader("Access-Control-Allow-Credentials", true);

        res.send(data);
    }, 2000);

});

app.options('/put', (req, res) => {
    console.log(req);

    res.setHeader("Access-Control-Allow-Origin", req.header("Origin"));
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    res.setHeader("Access-Control-Allow-Credentials", true); //Access-Control-Allow-Credentials: true

    res.send();
});

var port = 5000;

if (process.env.PORT) port = process.env.PORT;

http.listen(port, () => {
    console.log('server start at localhost:' + port);
});