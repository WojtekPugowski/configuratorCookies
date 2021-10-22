const express = require('express');
const {COOKIES_BASES, COOKIES_ADDONS} = require("../data/cookies-data");
const {handlebarsHelpers} = require("../handlebars-helpers");
const homeRouter = express.Router();

homeRouter
    .get('/', ((req, res) => {

      const { cookieBase } = req.cookies;

      const sum = (cookieBase ? handlebarsHelpers.findPrice(Object.entries(COOKIES_BASES), cookieBase) : 0)
          + ['coconut', 'honey'].reduce((prev, curr) => {
            return prev + handlebarsHelpers.findPrice(Object.entries(COOKIES_ADDONS), curr)
          }, 0)

      res.render('home/index', {
        cookie: {
          base: cookieBase,
          addons: ['coconut', 'honey'],
        },
        bases: Object.entries(COOKIES_BASES),
        addons: Object.entries(COOKIES_ADDONS),
        sum,
      })

    }));

module.exports = {
  homeRouter,
}
