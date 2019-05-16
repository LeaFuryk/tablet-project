const express = require('express')
const app = express()
const path = require('path');
const request = require('request')
const Guid = require ('guid');
const sha256 = require ('sha256');
const jwt = require ('jsonwebtoken');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/interview',(req,res) => {

  const payload = {}

  request({
    method: 'POST',
    url: 'https://interviews.skype.com/api/interviews',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + generateToken(JSON.stringify(payload))
    },
    body: JSON.stringify(payload)
  }).then((res) => {
    console.log (res.json());
  });

});

app.listen(3000, () => console.error("Server listening on port 3000"));


function generateToken(content) {
  jwt.sign({
    jti: Guid.raw(),
    iss: '1e1c0a12-d47d-d990-02a7-2f31d4463b88',
    sub: sha256(content),
    exp: Math.floor(Date.now() / 1000) + 10
  }, '85f05d8e-d4e6-4258-5f1d-ba6a1378bd08')
}