const express = require('express');
const router  = express.Router();

module.exports = (db) => {

router.get("/postad", (req, res) => {
  res.render("postad");
})
router.post("/postad", (req, res) => {
  const name = req.body.name;
  const categories = req.body.categories;
  const price = (req.body.price * 100);
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
});
  return router;
};
