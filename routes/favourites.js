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
    const name = req.body['itemName'];
    const userID = req.session.user_id;
    const sql = `INSERT INTO favourites(user_id, item_id) VALUES ($1, $2) RETURNING *;`
    db.query(sql, [userID, name])
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


const name = req.body.name;
  const categories = req.body.categories;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const userID = req.session.user_id;
  const sql = `INSERT INTO items (seller_id, price, name, description, category_id, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
  db.query(sql, [userID, price, name, description, categories, image])
    .then(data => {
      res.redirect("/")
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
