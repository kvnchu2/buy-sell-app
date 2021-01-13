$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;


  $('.fa-heart').click((evt) => {
    if ($(evt.target).data("id") === "far-fa-heart") {
    // evt.stopPropagation();
    evt.preventDefault();
    $(evt.target).removeClass("far fa-heart").addClass("fas fa-heart").css("color", "red");
    $(evt.target).data('id', "fas-fa-heart")
    $.post("/favourites", {itemId: $(evt.target).data("item")})
      .done(() => {
        console.log('done');
      })
    } else {
      // evt.stopPropagation();
      evt.preventDefault();
      $(evt.target).removeClass("fas fa-heart").addClass("far fa-heart")
      $(evt.target).data('id', "far-fa-heart")
      $.post("/favourites/delete", {itemId: $(evt.target).data("item")})
        .done(() => {
          console.log("deleted");
        })
    }
  })


});

<<<<<<< HEAD
//

// const messageBtn = $('#message-seller');

// messageBtn.on('click', (req, res) => {
//   res.render('/conversations');
// });
=======
>>>>>>> b9a44b0e352cacc28cb04312cc4f8037b65ec22e
