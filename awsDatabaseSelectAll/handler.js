'use strict';

const {DataTypes} = require("sequelize");
const { Sequelize } = require('sequelize');
const {performance} = require('perf_hooks');
const express = require('express');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DBDATABASE,
    process.env.DBUSER,
    process.env.DBPASS,
    {
        host: process.env.DBHOST,
        dialect: 'postgres',
        port: process.env.DBPORT
    }
);

// if the database does not have a model table do a DataModel.sync()
const DataModel = sequelize.define("model", {
    name: DataTypes.TEXT,
    birthday: DataTypes.INTEGER,
});


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
let first = true;
const app = express();
app.get('/', async (req, res) => {
    let statusCode = 200;
    if(first){
        first = false;
        statusCode = 202;
        console.log("new instance for " + req.query.counter)
    }else{
        console.log("no new instance :)")
    }
    const before = performance.now();
    const entries = await DataModel.findAll();
    const after = performance.now();	

    console.log("Found that many entries:"+entries.length);
    console.log("Took "+(after-before) + " ms")
    res.status(statusCode)
    res.send('Hello, world!')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

