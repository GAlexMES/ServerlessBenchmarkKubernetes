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

  let n = req.query.n || 35;
  console.log("n is: "+n);
  var stringv = 0;

  stringv = fib(n);
   
  res.status(statusCode);
  res.send(stringv);
});

function fib(n){
  if(n < 2) return n;
  
  return fib(n - 1) + fib(n - 2);
}


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
