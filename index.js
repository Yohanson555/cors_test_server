const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const uuidv1 = require('uuid/v1');
const cookieParser = require("cookie-parser")
const database = [];
const images = {};

//app.use(cors());
app.use(express.static('public_html'));
//app.options('*', cors());
app.use(cookieParser());

app.get('/img', (req, res) => {
    if (req.cookies && req.cookies.auth && req.cookies.auth === 'itsmeipromise') {
        if (req.query && req.query.id) {
            let uid = req.query.id;
            if (images[uid]) {
                base64Img = images[uid]

                const type = base64Img.match(/^data:(image\/\w+);base64,/)[1];
                const img = Buffer.from(base64Img.replace(/^data:image\/\w+;base64,/, ""), 'base64');

                res.writeHead(200, {
                    'Content-Type': type,
                    'Content-Length': img.length
                });

                res.end(img);
                return;
            }
        }
    } else {
        res.status = 404;
    }

    res.send(null);
});

app.get('/list', (req, res) => {
    res.status = 200;
    res.setHeader("Access-Control-Allow-Origin", req.header("Origin"));
    res.send(database);
});

app.post('/post', (req, res) => {
    var queryResponse = '';
    var result = 'success';
    var error = [];
    var item = null;


    req.on('data', function (chunk) {
        queryResponse += chunk;
    });

    req.on('end', function () {
        try {
            let json = JSON.parse(queryResponse);

            if (json.auth === 'itsmeipromise') {
                if (json.title && json.text && json.image) {
                    let imgUid = uuidv1();

                    item = {
                        title: json.title,
                        text: json.text,
                        image: imgUid
                    };

                    database.push(item);
                    images[imgUid] = json.image;
                } else {
                    result = 'failed';
                    error = [];

                    if (!json.title) error.push('Title not specified');

                    if (!json.text) error.push('Anons not specified');

                    if (!json.image) error.push('Image not specified');
                }
            } else {
                result = 'failed';
                error.push('Authantication failed');
            }
        } catch (e) {
            result = 'failed';
            error.push('Exception occured: ' + e);
        }

        res.setHeader("Access-Control-Allow-Origin", req.header("Origin"));
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "x-requested-with, content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);

        res.send({
            result,
            error,
            item
        });
    });
});


app.options('/post', (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", req.header("Origin"));
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with, content-type");
    res.setHeader("Access-Control-Allow-Credentials", true); //Access-Control-Allow-Credentials: true

    res.send();
});

var port = 5000;

if (process.env.PORT) port = process.env.PORT;

http.listen(port, () => {
    console.log('server start at localhost:' + port);
});