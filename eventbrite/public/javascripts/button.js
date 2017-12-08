$(function($){
  $(".free-ticket").click(function(e){
    $(".event_tickets_wrapper .price-text").toggle();
    $(".event_tickets_wrapper .price-text input").val("FREE");
  })

  $(".paid-ticket").click(function(e){

    $(".event_tickets_wrapper .price-text").toggle();
    $(".event_tickets_wrapper .price-text input").val("");

  })
  $(".need-attend-btn").click(function() {
    if (confirm('Are you sure to register?')) {
      return true;
    }
    return false;
  });
});
