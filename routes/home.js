const express = require('express');
const {COOKIES_BASES, COOKIES_ADDONS} = require("../data/cookies-data");
const homeRouter = express.Router();

homeRouter
  .get('/', ((req, res) => {
    res.render('home/index', {
      cookie: {
        base: 'light',
        addons: ['coconut'],
      },
      bases: Object.entries(COOKIES_BASES),
      addons: Object.entries(COOKIES_ADDONS),
    })

  }));

module.exports = {
  homeRouter,
}
