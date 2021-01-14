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
    $(evt.target).data('id', "fas-fa-heart");
    $.post("/favourites", { item_Id: $(evt.target).data("item") })
      .done((data) => {
        console.log('done: ', data);
      })
    } else {
      // evt.stopPropagation();
      evt.preventDefault();
      $(evt.target).removeClass("fas fa-heart").addClass("far fa-heart")
      $(evt.target).data('id', "far-fa-heart")

      $.post("/favourites/delete", { itemId: $(evt.target).data("item")})
        .done(() => {
          console.log("deleted");
        })
    }
  })
});
