/*
Inspired by :) http://jsfiddle.net/dLCwC/1/
*/

//Some global variables to make the world a better place :)
var currentpage = 1;  //The current page when the side is loaded. Default is 1
var pages = 2;        //The amount of divs (id: page1, page2, ...)
var width;
var height;

$(document).ready(function(){

  //Some local variables
  var animatespeed = 400;   //time of the animation
  var topspeed = 50;        //scroll down with this speed

  var nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
  var prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
    
  var animatingup = false;    //Reset the scroll-up variable. Only done at initial page load
  var animatingdown = false;  //Reset the scroll-up variable. Only done at initial page load
  
  if (document.location.hash) { 
    currentpage = parseInt(document.location.hash.replace('#', '')); 
  }

  //function to resize the div to the current page dimentions
  resizeDiv();

  //When resizing the screen, the div should also resize
  window.onresize = function(event) {
    resizeDiv();          //Resize the div

    /*
    Disable the function scrolltocurrent(). In some cases the page was not scrolling anymore.
    The script tries first to find the top of the div again, before you can control it again
    It was not given the correct result. For now the current mechanism works fine
    */
    //scrolltocurrent();    //Make sure you stay in the current section/div(page) on the page
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
          var p2 = $('#page' + (nextpage) );        //Each div has a unique ID. jQuery searches the that div and puts it in a variable
          var pageheight = p2.position().top;       //Set the point where the page must scroll to.  It is the top position of the div where you will scroll to  
          animatingdown = true;                     
          $('html, body').animate({                 //Animate to scroll down
              scrollTop: pageheight                 //Scroll down to a certain place on the page. The top of the screen will be changed and you scroll along with it
            },
            animatespeed,                           //Animate in x miliseconds, it uses a variable declared when the page is loaded
            function(){
              currentpage = nextpage;               //Make the nextpage the current page (you are in the current page now)
              animatingdown = false;                //Stop the scrolling when the height is reached
              document.location.hash = currentpage; //Set the hash to the new page (#1 or #2)
            });

          return;
        }
      }
    }
    
    //Is the user scrolling up?
    //Function works similar as the scrolldown function, but only the other way around :) 
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
    vpw = $(window).width();      //the width of the div is the same as the width of the browser window
    vph = $(window).height();     //the height of the div is the same as the height of the browser window
    $('.page').css({'min-height': vph + 'px'}); //Set the minimum height the same as the heigth of the browser window. The height of the div can offcourse be longer than the height of the browser window 
}


$(document).ready(function(){
  //For readability purposes
  //Make the logo and navigation for the second div #354E59
  $('#page1').mouseover(function(){
    $('.logo-link').css('color', '#fcfd80');
    $('.nav-button').css('color', '#fcfd80');
  });

  //For readability purposes
  //Make the logo and navigation for the second div #354E59
  $('#page2').mouseover(function(){
    $('.logo-link').css('color', '#354E59');
    $('.nav-button').css('color', '#354E59');
  });

  //When mouse over change the cursor to an hand, and resize -10px
  $('#bar-left').mouseover(function(){
    width = $(this).css('width');             //the current width will be saved

    $(this).css('cursor', 'pointer');         //Change the mouse cursor
    $(this).css('width', returnSize(width)); //Based on the width a value is returned

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

    $('html, body').animate({                 //Animate the div
      scrollTop: pageheight },                //Scroll up to the height of the div. In this case page1 > page 2
      400,                                    //Speed of the animation
      function() {                            //Trigger a new function to set some variables
        currentpage = nextpage;               //The currentpage is equal to the nextpage (the new page so to say) 
        animatingdown = false;                //Set the animationdown to false. Otherwise it will keep scrolling :)
        document.location.hash = currentpage; //Set the location hash to #current page. Examp: lehttp://nycda.zone/waasdorp725/RubberDuck/#2
      });
  });

});

//Function that takes 1 argument, test is and returns a value
//In this case it gets the height or width, and returns the new value. This will make the arrow to resize on mouseover
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
    case 'index.html': 
      return 'about.html';
      break;
    case 'work.html': 
      return 'index.html';
      break;
    case 'events.html': 
      return 'work.html';
      break;
    case 'about.html': 
      return 'events.html';
      break;
  }
}

//Function to return the page when clicking on the right-screen-arror. The function takes 1 argument, test is and returns a value
//In case the order of the menu is changed, this must also change!
function returnRight (pageName) {
  switch (pageName) {
    case 'index.html': 
      return 'work.html';
      break;
    case 'work.html': 
      return 'events.html';
      break;
    case 'events.html': 
      return 'about.html';
      break;
    case 'about.html': 
      return 'index.html';
      break;
  }
}
