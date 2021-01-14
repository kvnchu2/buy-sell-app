const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const sqlQuery = "SELECT * FROM favourites JOIN items ON item_id = items.id WHERE favourites.id IN (SELECT favourites.id FROM favourites);";
    db.query(sqlQuery)
    .then(data => {
      const templateVars = { items: data.rows }
      res.render("favourites", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const item_id = req.body.item_Id;
    const userID = req.session.user_id;
    console.log("ItemID: ", item_id)
    console.log("userID: ", userID)
    const sql = `INSERT INTO favourites (user_id, item_id) VALUES ($1, $2) RETURNING *;`
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

  router.post("/delete", (req, res) => {
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
