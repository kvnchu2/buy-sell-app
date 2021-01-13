const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  const sqlQuery = "SELECT * FROM favourites JOIN items ON item_id = items.id WHERE favourites.id IN (SELECT favourites.id FROM favourites);";

  router.get("/favourites", (req, res) => {
    db.query(sqlQuery)
    .then(data => {
      const templateVars = { items: data.rows }
      res.render("favourites", templateVars);
    })
  });

  router.post("/favourites", (req, res) => {
    console.log('hello');
    const item_id = req.body.itemId;
    const userID = req.session.user_id;
    const sql = `INSERT INTO favourites(user_id, item_id) VALUES ($1, $2) RETURNING *;`
    db.query(sql, [userID, item_id])
    .then(data => {
      res.redirect("/")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/favourites/delete", (req, res) => {
    const item_id = req.body.itemId;
    const userID = req.session.user_id;
    const sql = `DELETE FROM favourites WHERE user_id = $1 AND item_id = $2 RETURNING *;`
    db.query(sql, [userID, item_id])
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
