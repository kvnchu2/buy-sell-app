const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.get("/conversations", (req, res) => {
    const sql1 = 'SELECT conversations.*, items.name, items.seller_id FROM conversations JOIN items ON items.id = conversations.item_id WHERE from_user = $1';
    const params1 = [req.session.user_id]
    console.log("current user", params1)
    db.query(sql1, params1)
    .then(data => {
      const templateVars = { buy_conversations: data.rows }
      console.log("convos", templateVars.buy_conversations)
      const sql2 = 'SELECT conversations.*, items.name, items.seller_id FROM conversations JOIN items ON items.id = conversations.item_id WHERE seller_id = $1';
      const params2 = [req.session.user_id];
      db.query(sql2, params2)
      .then(data => {
        templateVars.sell_conversations = data.rows;
        res.render("conversations", templateVars);
      })
    })
  });
  router.post("/conversations", (req, res) => {
    const sql1 = "INSERT INTO conversations (from_user, item_id) VALUES ($1, $2) RETURNING id";
    const params1 = [req.session.user_id, req.body.item_id];
    console.log("convo being started by user", params1[0], "convo about itemm", params1[1])
    db.query(sql1, params1)
    .then(data => {
      console.log("conversation id", data.rows[0])
      const conversation_id = data.rows[0].id;
      res.redirect(`/conversations/${conversation_id}`)
    })
  })
  return router;
};
