"use strict";

var slideIndex = 0;

$(function($){
  setInterval(function () {
    var slides = document.getElementsByClassName("slides");
    $(".slideshow img").removeClass("active");
    slideIndex++;
    if(slideIndex > slides.length){slideIndex = 1};
    $(".slideshow img:nth-child(" + slideIndex + ")").addClass("active");
  }, 3500);

});

$('body').scroll({ target: '#region'})
