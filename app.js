require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/login', (req, res) => {
    res.render('login');

});
app.post('/login', (req, res) => {
    if (!req.body.phone || !req.body.password) {
        res.send('username or password is empty');
    } else {
        const { phone, password } = req.body;
        superagent
            .post('http://127.0.0.1:3000/user/login')
            .send({ phone: phone, password: password })
            .set('accept', 'json')
            .end((err, resp) => {
                let data = JSON.parse(resp.text);
                // res.send(data);
                res.render("index", { data: data });
                // Calling the end function will send the request
            });
    }

});
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.listen(process.env.PORT, () => {
    console.log('heared on ' + process.env.PORT);
});