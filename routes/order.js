const express = require('express');
const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const {handlebarsHelpers} = require("../utils/handlebars-helpers");
const {COOKIES_BASES, COOKIES_ADDONS} = require("../data/cookies-data");
const orderRouter = express.Router();

orderRouter
  .get('/summary', (req, res) => {
    const {cookieBase} = req.cookies;

    const addons = getAddonsFromReq(req);

    const sum = (cookieBase ? handlebarsHelpers.findPrice(Object.entries(COOKIES_BASES), cookieBase) : 0)
      + addons.reduce((prev, curr) => {
        return prev + handlebarsHelpers.findPrice(Object.entries(COOKIES_ADDONS), curr)
      }, 0);

    res.render('order/summary', {
      cookie: {
        base: cookieBase,
        addons,
      },
      bases: Object.entries(COOKIES_BASES),
      addons: Object.entries(COOKIES_ADDONS),
      sum,
    })
  })

module.exports = {
  orderRouter,
}
