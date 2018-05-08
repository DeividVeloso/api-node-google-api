'use strict';
const { google } = require('googleapis');

const key = require('../APIAnalytcs-99999.json');
const VIEW_ID = 'ga:99999';

exports.post = (req, res, next) => {
  let response;
  let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Resquest",req)
    const search = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      metrics: req.body.metrics,
      dimensions: req.body.dimensions,
      filters: req.body.filters,
      sort: req.body.sort,
      maxResults: req.body.maxResults
    }
    let analytics = google.analytics('v3');
    response = await queryData(analytics, jwtClient, search)
    res.status(200).send(response);
  });
};

const queryData = (analytics, jwtClient, search) => new Promise((resolve, reject) => {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': VIEW_ID,
    'start-date': search.startDate,
    'end-date': search.endDate,
    'metrics': search.metrics,
    'dimensions': search.dimensions,
    'filters': search.filters,
    'sort': search.sort,
    'max-results': search.maxResults,
    
  }, function (err, response) {
    if (err) {
      resolve(err.message)
    }
    resolve(response.data);
  });
}) 
