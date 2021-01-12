const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/conversations/:id", (req, res) => {

    const sql = "SELECT * FROM messages WHERE conversation_id = $1";
    const params = [req.params.id]
    db.query(sql, params)
    .then(data => {
      const templateVars = { messages: data.rows }
      console.log("msgs", templateVars.messages)
      res.render("messages", templateVars);
    })

  });
  return router;
};
