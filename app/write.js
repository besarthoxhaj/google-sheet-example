'use strict';

var https = require('https');

module.exports = (config,cb) => {

  var opts = {
    hostname: 'sheets.googleapis.com',
    port: 443,
    path: '/v4/spreadsheets/' + config.sheetId + ':batchUpdate',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  };

  var body = {
    'requests': [{
      'appendCells': {
        'sheetId': 0,
        'rows': [
          {
            'values': [
              {
                'userEnteredValue': {
                  'numberValue': 10,
                }
              },
              {
                'userEnteredValue': {
                  'stringValue': 'Bes',
                }
              }
            ],
          }
        ],
        'fields': '*',
      }
    }],
    'includeSpreadsheetInResponse': true,
    'responseIncludeGridData': false,
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

  req.write(JSON.stringify(body));
  req.end();
};
