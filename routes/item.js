const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/item/:id", (req, res) => {
    const params = req.params;
    const sql = `SELECT * FROM items WHERE id = $1`
    console.log(params)
    db.query(sql, [params.id])
      .then(data => {
        const templateVars = {item: data.rows[0]};
        res.render("item", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
