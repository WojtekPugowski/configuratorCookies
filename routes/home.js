const express = require('express');
const {COOKIES_BASES, COOKIES_ADDONS} = require("../data/cookies-data");
const {handlebarsHelpers} = require("../utils/handlebars-helpers");
const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const homeRouter = express.Router();

homeRouter
    .get('/', ((req, res) => {
      const {cookieBase} = req.cookies;

      const addons = getAddonsFromReq(req);

      const sum = (cookieBase ? handlebarsHelpers.findPrice(Object.entries(COOKIES_BASES), cookieBase) : 0)
          + addons.reduce((prev, curr) => {
            return prev + handlebarsHelpers.findPrice(Object.entries(COOKIES_ADDONS), curr)
          }, 0)

      res.render('home/index', {
        cookie: {
          base: cookieBase,
          addons,
        },
        bases: Object.entries(COOKIES_BASES),
        addons: Object.entries(COOKIES_ADDONS),
        sum,
      })

    }));

module.exports = {
  homeRouter,
}
