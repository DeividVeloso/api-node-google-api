'use strict';
const { google } = require('googleapis');

const key = require('../Analytcs-7473208a7cc0.json');
const VIEW_ID = 'ga:9999999';

exports.get = (req, res, next) => {
 
  let response;
  let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    let analytics = google.analytics('v3');
    response = await queryData(analytics, jwtClient)
    res.status(200).send(response);
  });
};


const queryData = (analytics, jwtClient) => new Promise((resolve, reject) => {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': VIEW_ID,
    'metrics': 'ga:eventValue',
    'dimensions': 'ga:pagePath',
    'start-date': '30daysAgo',
    'end-date': 'yesterday',
    'sort': '-ga:pagePath',
    'max-results': 10,
    'filters': 'ga:pagePath=~/ch_[-a-z0-9]+[.]html$',
  }, function (err, response) {
    if (err) {
      resolve(err.message)
    }
    resolve(response.data);
  });
}) 
