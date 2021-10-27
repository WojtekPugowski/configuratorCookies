const express = require('express');
const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const {COOKIES_ADDONS, COOKIES_BASES} = require("../data/cookies-data");
const {showErrorPage} = require("../utils/showErrorPage");
const configuratorRouter = express.Router();

configuratorRouter
    .get('/select-base/:baseName', ((req, res) => {
      const {baseName} = req.params;

      if (!COOKIES_BASES[baseName]) {
        return showErrorPage(res, `There is no such base as ${baseName}.`);
      }


      res
          .cookie('cookieBase', baseName)
          .render('configurator/base-selected', {
            baseName,
          });
    }))

    .get('/add-addon/:addonName', ((req, res) => {
      const {addonName} = req.params;

      if (!COOKIES_ADDONS[addonName]) {
        return showErrorPage(res, `There is no such addon as ${addonName}.`);
      }

      const addons = getAddonsFromReq(req);

      if (addons.includes(addonName)) {
        return showErrorPage(res, `There is addon ${addonName} on your cookie. You can't add it twice.`);
      }

      addons.push(addonName);


      res
          .cookie('cookieAddons', JSON.stringify(addons))
          .render('configurator/added', {
            addonName,
          });
    }))

    .get('/delete-addon/:addonName', ((req, res) => {
      const {addonName} = req.params;

      const oldAddons = getAddonsFromReq(req);

      if (!oldAddons.includes(addonName))
        const addons = oldAddons.filter(addon => addon != addonName);

      res
          .cookie('cookieAddons', JSON.stringify(addons))
          .render('configurator/deleted', {
            addonName,
          })
    }))


module.exports = {
  configuratorRouter,
}
