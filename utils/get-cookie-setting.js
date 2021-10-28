const {COOKIES_BASES, COOKIES_ADDONS} = require("../data/cookies-data");
const {handlebarsHelpers} = require("./handlebars-helpers");
const {getAddonsFromReq} = require("./get-addons-from-req");

function getCookieSettings(req) {
  const {cookieBase: base} = req.cookies;

  const addons = getAddonsFromReq(req);

  const allBases = Object.entries(COOKIES_BASES);
  const allAddons = Object.entries(COOKIES_ADDONS);

  const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
      + addons.reduce((prev, curr) => (
          prev + handlebarsHelpers.findPrice(allAddons, curr)
      ), 0);

  return {
    //Selected stuff
    addons,
    base,
    //Calculations
    sum,
    //All possibilities
    allBases,
    allAddons,
  }
}

module.exports = {
  getCookieSettings,
}