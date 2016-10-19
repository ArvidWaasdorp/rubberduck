var width;

$(document).ready(function(){

  $('#bar-left').mouseover(function(){
    width = $(this).css('width');

    $(this).css('cursor', 'pointer');
    $(this).css('width', returnWidth(width));

  });
  $('#bar-left').mouseout(function(){
    $(this).css('width', width);
  });
  $('#bar-left').click(function() {
    location.href = 'events.html';
  });

  $('#bar-right').mouseover(function(){
    width = $(this).css('width');

    $(this).css('cursor', 'pointer');
    $(this).css('width', returnWidth(width));

  });
  $('#bar-right').mouseout(function(){
    $(this).css('width', width);
  });
  $('#bar-right').click(function() {
    location.href = 'index.html';
  });




//window.open("file2.html");


});

function returnWidth (width) {

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