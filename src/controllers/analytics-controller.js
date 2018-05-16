'use strict';
const { google } = require('googleapis');

const key = require('../0000000.json');
const VIEW_ID = 'ga:999999';

exports.postUsedBenefits = (req, res, next) => {
  let response;
  let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    
    const search = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      metrics: "ga:eventValue",
      dimensions: "ga:dimension7,ga:dimension8,ga:dimension5",
      filters: `ga:eventAction==use;ga:dimension2==${req.body.club}`,
      sort: "-ga:eventValue",
      maxResults: 5
    }
    let analytics = google.analytics('v3');
    response = await queryDataBenefit(analytics, jwtClient, search)
    res.status(200).send(response);
  });
};

exports.postSumUsedBenefits = (req, res, next) => {
  let response;
  let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    
    const search = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      metrics: "ga:eventValue",
      filters: `ga:eventAction==use;ga:dimension2==${req.body.club}`,
      sort: "-ga:eventValue",
      maxResults: 5
    }
    let analytics = google.analytics('v3');
    response = await queryData(analytics, jwtClient, search)
    res.status(200).send(response);
  });
};

exports.postDevices = (req, res, next) => {
  let response;
  let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    const search = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      metrics: 'ga:pageviews',
      dimensions: 'ga:deviceCategory',
      filters: `ga:pagePath!@afbx;ga:pagePath!@associacao;ga:pagePath=@${req.body.club}`
    }
    let analytics = google.analytics('v3');
    response = await queryData(analytics, jwtClient, search)
    res.status(200).send(response);
  });
};

exports.postPageViews = (req, res, next) => {
  let response;
  let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'], null);
  jwtClient.authorize(async function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
   
    const search = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      metrics: 'ga:pageviews',
      dimensions: 'ga:month',
      filters: `ga:pagePath!@afbx;ga:pagePath!@associacao;ga:pagePath=@${req.body.club}`
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
    //'sort': search.sort || '',
    'max-results': search.maxResults || 10,
    
  }, function (err, response) {
    if (err) {
      resolve(err.message)
    }
    resolve(response.data);
  });
}) 

const queryDataBenefit = (analytics, jwtClient, search) => new Promise((resolve, reject) => {
  analytics.data.ga.get({
    'auth': jwtClient,
    'ids': VIEW_ID,
    'start-date': search.startDate,
    'end-date': search.endDate,
    'metrics': search.metrics,
    'dimensions': search.dimensions,
    'filters': search.filters,
    'sort': search.sort,
    'max-results': search.maxResults || 10,
    
  }, function (err, response) {
    if (err) {
      resolve(err.message)
    }
    resolve(response.data);
  });
}) 
