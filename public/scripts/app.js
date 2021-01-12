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
    evt.stopPropagation();
    evt.preventDefault();
    console.log('click')
    $.post("/favourites", {itemId: $(evt.target).data("item")})
      .done(() => {
        console.log('done');
      })
  })
});

