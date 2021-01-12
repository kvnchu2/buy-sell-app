const express = require('express');
const router  = express.Router();

module.exports = (db) => {

router.get("/postad", (req, res) => {
  res.render("postad");
  })
  return router;
};
