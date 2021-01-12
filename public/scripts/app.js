$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $('.fa-heart').click(() => {
    $.post("/favourites", {itemName: itemName})
      .done(() => {
        console.log('done');
      })
  })
});

