$(function($){
  $(".free-ticket").click(function(e){
    $(".event_tickets_wrapper .price-text").toggle();
    $(".event_tickets_wrapper .price-text input").val("FREE");
  })

  $(".paid-ticket").click(function(e){

    $(".event_tickets_wrapper .price-text").toggle();
    $(".event_tickets_wrapper .price-text input").val("");

  })
})
