'use strict';

const {DataTypes} = require("sequelize");
const { Sequelize } = require('sequelize');
const express = require('express');
require('dotenv').config();

console.log("Use database at "+process.env.DBHOST);

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
const app = express();
app.get('/', async (req, res) => {
   await DataModel.destroy({truncate: true});
   await DataModel.sync();
   res.send('Hello, World!')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
