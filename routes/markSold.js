const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("item/sold/:id", (req, res) => {
    const params = req.params;
    const sql = `UPDATE items
    SET is_sold = true
    WHERE id = $1;`
    console.log(params)
    db.query(sql, [params.id])
      .then(data => {
        res.redirect("/")
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
