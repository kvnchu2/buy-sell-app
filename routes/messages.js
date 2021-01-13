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

  router.post("/conversations/id", (req, res) => {

    const sql = "INSERT INTO messages (conversation_id, from_buyer, content) VALUES ($1, $2, $3)"

    const params = [req.params.id, true, req.body.message]

    db.query(sql, params)
    .then(data => {

      const sql2 = "SELECT * FROM messages WHERE conversation_id = $1";
      const params2 = [req.params.id]
      db.query(sql2, params2)
      .then(data => {
        const templateVars = { messages: data.rows }
        console.log("msgs", templateVars.messages)
        res.render("messages", templateVars);
      })
    })


  })

  return router;
};
