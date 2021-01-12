const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    console.log("SEARCH BODY", req.query)
    const sql = "SELECT * FROM items WHERE category_id = $1 AND name LIKE $2";
    const params = [req.query.categories, req.query.itemName]
    db.query(sql, params)
    .then(data => {
      const templateVars = { items: data.rows }
      console.log("search results", templateVars)
      res.render("search", templateVars);
    })

  });
  return router;
};
