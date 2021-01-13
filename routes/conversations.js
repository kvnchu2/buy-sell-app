const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/conversations", (req, res) => {

    const sql = "SELECT * FROM conversations WHERE from_user = $1";
    const params = [req.session.user_id]
    db.query(sql, params)
    .then(data => {
      const templateVars = { convos: data.rows }
      console.log("convos", templateVars.convos)
      res.render("conversations", templateVars);
    })

  });
  return router;
};
