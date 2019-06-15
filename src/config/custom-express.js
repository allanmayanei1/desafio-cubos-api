const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validator = require('express-validator')

module.exports = () =>{
    const app = express()
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors())
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next()
    });
    
    app.use(validator())
    app.use('/', require('../routes'))

    return app;
}