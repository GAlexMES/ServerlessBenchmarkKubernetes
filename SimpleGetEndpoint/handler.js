'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
let first = true;
// App
const app = express();
app.get('/', (req, res) => {
   let statusCode = 200;
   if(first){
       first = false;
       statusCode = 202;
       console.log("new instance for "+req.query.counter)
   }else{
       console.log("no new instance :)")
   }

   res.status(statusCode)
   res.send('Hello, World!')
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
