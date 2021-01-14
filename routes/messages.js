const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/conversations/:id", (req, res) => {

    const sql = "SELECT * FROM messages WHERE conversation_id = $1";
    const conversation_id = req.params.id;
    const params = [conversation_id]
    db.query(sql, params)
    .then(data => {
      const templateVars = { messages: data.rows, conversation_id: conversation_id }
      console.log("msgs", templateVars.messages)
      res.render("messages", templateVars);
    })

  });

  router.post("/:id", (req, res) => {

    const msg = req.body.message;
    const sender_id = req.session.user_id;

    const sql1 = "SELECT from_user FROM conversations WHERE id = $1";
    const conversation_id = req.params.id;
    const params1 = [conversation_id];

    db.query(sql1, params1)
    .then(data => {

      const buyer_id = data.rows[0].from_user;
      let from_buyer = false
      console.log(sender_id, buyer_id);

      if (parseInt(sender_id, 10) === parseInt(buyer_id, 10)) {
        from_buyer = true;
      }

      const sql2 = "INSERT INTO messages (conversation_id, from_buyer, content) VALUES ($1, $2, $3)"
      const params2 = [conversation_id, from_buyer, msg];

      db.query(sql2, params2)
      .then(data => {
        res.redirect(`conversations/${conversation_id}`)
      })

    })

  })

  return router;
};
