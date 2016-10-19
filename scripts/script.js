/*
Inspired by :) http://jsfiddle.net/dLCwC/1/
*/

//Some global variables to make the world a better place :)
var currentpage = 1;
var pages = 2;
var width;
var height;

$(document).ready(function(){

  //Some local variables
  var animatespeed = 400;
  var topspeed = 50;

  var nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
  var prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
    
  var animatingup = false;
  var animatingdown = false;
  
  if (document.location.hash) { 
    currentpage = parseInt(document.location.hash.replace('#', '')); 
  }

  //function to resize the div to the current page dimentions
  resizeDiv();

  //When resizing the screen, the div should also resize
  window.onresize = function(event) {
    resizeDiv();          //Resize the div
    scrolltocurrent();    //Make sure you stay in the current section/div(page) on the page
  }

  //Check if the user use the scrollwheel
  $(window).scroll(function(event) {
    
    if (animatingup==true) { /*console.log("animating up...");*/ return; }
    if (animatingdown==true) { /*console.log("animating down...");*/ return; }
    
    nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
    prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
    
    //Is the user scrolling down?
    if (animatingup == false) {
      if ($(window).scrollTop() + $(window).height() >= $('#page'+(nextpage)).offset().top + topspeed) {
        if (nextpage > currentpage) {
          var p2 = $('#page' + (nextpage) );
          var pageheight = p2.position().top;
          animatingdown = true;
          $('html, body').animate({
              scrollTop: pageheight
            },
            animatespeed,
            function(){
              currentpage = nextpage;
              animatingdown = false;
              document.location.hash = currentpage;
            });

          return;
        }
      }
    }
    
    //Is the user scrolling up?
    if (animatingdown == false) {
      if ($(window).scrollTop() <= $('#page' + (currentpage)).offset().top - topspeed) {
        if (prevpage < currentpage) {
          var p2 = $('#page' + (currentpage));
          var pageheight = p2.position().top - $(window).height();
          animatingup = true;
          $('html, body').animate({
              scrollTop: pageheight
            },
            animatespeed,
            function(){
              currentpage = prevpage;
              animatingup = false;
              document.location.hash = currentpage;
            });
          return;
        }
      }
    }
  });
});

//Make sure to keep you on the current page when resizing
function scrolltocurrent() {
    var p2 = $('#page' + (currentpage));
    var pageheight = p2.position().top;
    $('html, body').animate({
        scrollTop: pageheight
      },
      200);
}

//Resize the div when resizing the page
function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    $('.page').css({'min-height': vph + 'px'});
}


$(document).ready(function(){

  //When mouse over change the cursor to an hand, and resize -10px
  $('#bar-left').mouseover(function(){
    width = $(this).css('width');             //the current width will be saved

    $(this).css('cursor', 'pointer');         //Change the mouse cursor
    $(this).css('width', returnWidth(width)); //Based on the width a value is returned

  });
  $('#bar-left').mouseout(function(){
    $(this).css('width', width);              //Saved width is put back when mouse out
  });
  $('#bar-left').click(function() {                   //When clicked on the div the page to the left will be opened
    location.href = returnLeft(getCurentFileName());  //Return the page to the left. Note this is a static list! When changing the order, this script must also be changed 
  });

  //When mouse over change the cursor to an hand, and resize -10px
  $('#bar-right').mouseover(function(){
    width = $(this).css('width');             //the current width will be saved

    $(this).css('cursor', 'pointer');         //Change the mouse cursor
    $(this).css('width', returnSize(width));  //Based on the width a value is returned

  });
  $('#bar-right').mouseout(function(){
    $(this).css('width', width);              //Saved width is put back when mouse out
  });
  $('#bar-right').click(function() {                  //When clicked on the div the page to the right will be opened
    location.href = returnRight(getCurentFileName()); //Return the page to the right. Note this is a static list! When changing the order, this script must also be changed 
  });

  //When mouse over change the cursor to an hand, and resize -10px
  $('#bar-down').mouseover(function(){
    height = $(this).css('height');           //the current height will be saved

    $(this).css('cursor', 'pointer');         //Change the mouse cursor
    $(this).css('height', returnSize(width)); //Based on the height a value is returned

  });
  $('#bar-down').mouseout(function(){
    $(this).css('height', width);              //Saved height is put back when mouse out
  });
  $('#bar-down').click(function() {            //When clicked on the error the sroll mechanism is triggered. This is a selection of the function above
    var nextpage = 2;
    var p2 = $('#page'+(nextpage));
    var pageheight = p2.position().top;

    $('html, body').animate({
      scrollTop: pageheight },
      400,
      function() {
        currentpage = nextpage;
        animatingdown = false;
        document.location.hash = currentpage;
      });
  });
});

//Function that takes 1 argument, test is and returns a value
function returnSize (width) {
  switch (width) {
    case '50px': 
      return '40px';
      break;
    case '40px': 
      return '30px';
      break;
    case '30px': 
      return '20px';
      break;
  }
}

//Get the current file name. This is needed for the functions returnLeft and returnRight
function getCurentFileName(){
  var pagePathName= window.location.pathname;
  return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}

//Function to return the page when clicking on the left-screen-arror. The function takes 1 argument, test is and returns a value
//In case the order of the menu is changed, this must also change!
function returnLeft (pageName) {
  switch (pageName) {
    case 'about.html': 
      return 'index.html';
      break;
    case 'events.html': 
      return 'about.html';
      break;
    case 'work.html': 
      return 'events.html';
      break;
    case 'index.html': 
      return 'work.html';
      break;
  }
}

//Function to return the page when clicking on the right-screen-arror. The function takes 1 argument, test is and returns a value
//In case the order of the menu is changed, this must also change!
function returnRight (pageName) {
  switch (pageName) {
    case 'about.html': 
      return 'events.html';
      break;
    case 'events.html': 
      return 'work.html';
      break;
    case 'work.html': 
      return 'index.html';
      break;
    case 'index.html': 
      return 'about.html';
      break;
  }
}