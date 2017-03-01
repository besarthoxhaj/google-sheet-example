'use strict';

var app = require('./app/index.js');

var SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];
var SHEET_ID = '17W8T96noZFhDnnsiQGuyJz-PSRyVYGnbpI8daMA4h2I';

app.auth({
  scope:SCOPE
}, (err, tokens) => {

  app.read({
    sheetId: SHEET_ID,
    token: tokens.access_token
  }, (err, readSheet) => {

    app.write({
      sheetId: SHEET_ID,
      token: tokens.access_token
    }, (err, writeSheet) => {
      console.log('err',err);
      console.log(require('util').inspect(writeSheet, { depth: null }));
    });
  });
});
