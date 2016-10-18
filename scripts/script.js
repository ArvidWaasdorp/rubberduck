/*
Inspired by :) http://jsfiddle.net/dLCwC/1/
*/


$(document).ready(function(){

  var pages = 2;
  var currentpage = 1;
  var animatespeed = 400;
  var topspeed = 50;

  var nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
  var prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
    
  var animatingup = false;
  var animatingdown = false;
  
  if (document.location.hash) { 
    currentpage = parseInt(document.location.hash.replace('#', '')); 
  }
    
  resizeDiv();


  window.onresize = function(event) {
    resizeDiv();
    scrolltocurrent();
  }

  $(window).scroll(function(event) {
    
    if (animatingup==true) { /*console.log("animating up...");*/ return; }
    if (animatingdown==true) { /*console.log("animating down...");*/ return; }
    
    nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
    prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
        
    if (animatingup == false) {
      if ($(window).scrollTop()+$(window).height()>=$("#page"+(nextpage)).offset().top+topspeed) {
        if (nextpage > currentpage) {
          var p2 = $( "#page"+(nextpage) );
          var pageheight = p2.position().top;
          animatingdown = true;
          $('html, body').animate({ scrollTop: pageheight }, animatespeed, function() { currentpage = nextpage; animatingdown = false; document.location.hash = currentpage;});
            return;
        }
      }
    }
    
    if (animatingdown == false) {
      if ($(window).scrollTop()<=$("#page"+(currentpage)).offset().top-topspeed) {
        if (prevpage < currentpage) {
          var p2 = $( "#page"+(currentpage) );
          var pageheight = p2.position().top-$(window).height();
          animatingup = true;
          $('html, body').animate({ scrollTop: pageheight }, animatespeed, function() { currentpage = prevpage; animatingup = false; document.location.hash = currentpage;});
            return;
        }
      }
    }
  });
});

function scrolltocurrent() {
    var p2 = $( "#page"+(currentpage) );
    var pageheight = p2.position().top;
    $('html, body').animate({ scrollTop: pageheight }, 200);
}

function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    $('.page').css({'min-height': vph + 'px'});
}
