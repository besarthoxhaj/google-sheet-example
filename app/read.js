'use strict';

var https = require('https');

module.exports = (config,cb) => {

  var opts = {
    hostname: 'sheets.googleapis.com',
    port: 443,
    path: `/v4/spreadsheets/${config.sheetId}/values/Sheet1!A1:D3`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  };

  var req = https.request(opts, (res) => {
    var store = '';
    res.on('data', (chunk) => store = store + chunk);
    res.on('end', () => {
      cb(undefined,JSON.parse(store));
    });
  });
  
  req.on('error', (error) => {
    cb(error, undefined);
  });

  req.end();
};
