const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
let port = 3000;
// console.log('node env && port: ', process.env.NODE_ENV, process.env.REACT_APP_BASEURL)
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  // logger.info(`App listening on port ${port}`);
  console.log(`App listening on port ${port}`);
});
