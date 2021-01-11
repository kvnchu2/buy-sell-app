const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {

    const id = req.params.id;
    const sql = `SELECT * FROM items WHERE id = $1`
    console.log(id)

    db.query(sql, [id])
      .then(data => {
        const templateVars = {item: data.rows[0], user_id: req.session.user_id};
        console.log("user id", templateVars.user_id, "item seller id", templateVars.item.seller_id)
        res.render("item", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/sold/:id", (req, res) => {
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
