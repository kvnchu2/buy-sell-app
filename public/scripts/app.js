$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

//

// const messageBtn = $('#message-seller');

// messageBtn.on('click', (req, res) => {
//   res.render('/conversations');
// });
