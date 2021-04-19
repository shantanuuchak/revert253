var $actual= null;
var opened=false;

$(".open-disc").click(function() {
  open($(this).data('url'));
  $actual=$(this);
});

if ($('.playlist1').length) {
  var playlist1 = $('#playlist_newalbum');
  var a1 = audiojs.create(playlist1, {
    trackEnded: function() {
      var next = $('ol.playlist1 li.playing').next();
      if (!next.length) next = $('ol.playlist1 li').first();
      next.addClass('playing').siblings().removeClass('playing');
      audio1.load($('a', next).attr('data-src'));
      audio1.play();
    }
  });

  var audio1 = a1[0];
  first = $('ol.playlist1 a').attr('data-src');
  $('ol.playlist1 li').first().addClass('pause');
  audio1.load(first);
}


$('ol.playlist1 li').click(function(e) {
  e.preventDefault();

  if( $(this).attr('class') == 'playing' ) {
    $(this).addClass('pause');
    audio1.playPause();
  } else {
    $(this).removeClass('pause').addClass('playing').siblings().removeClass('playing').removeClass('pause');
    audio1.load($('a', this).attr('data-src'));
    audio1.play();
  }

});




function open(e){
  $.ajax({
    url: e,
    success: function(data) {
      $('.project-content').html(data);
      $(".project-content").hide(0)
      $('.project-window').hide(0)
      close();
      $("html, body").animate({ scrollTop: $('#project-show').offset().top - (200) }, 300, function(){
        $('.project-window').show(0);
        $('.project-window').css('height','0');
        var heightAjax = $('.project-content').height();
        $('.project-window').animate({height:heightAjax}, 500,function(){
          $('.project-window').css('height',heightAjax);
          $(".project-content").fadeIn("slow");
        });
      });
    }
  });
}

function close(){
  $(".close-btn").click(function() {
    $(".project-window").slideUp("slow");
    $(".project-content").fadeOut("slow");
    $("html, body").animate({ scrollTop: $('#discography').offset().top -(50) }, 1000);
    opened=false;
  });
}



$(document).ajaxComplete(function(event, request, settings) {
  if(settings.url.indexOf("disc") === 0) {

    var playlist0 = $('#playlist0');
    var a0 = audiojs.create(playlist0, {
      trackEnded: function() {
        var next = $('ol.playlist0 li.playing').next();
        if (!next.length) next = $('ol.playlist0 li').first();
        next.addClass('playing').siblings().removeClass('playing');
        audio0.load($('a', next).attr('data-src'));
        audio0.play();
      }
      // ,
      // pause: function() {
      //   if (this.playing) this.settings.play().addClass('playing');
      //   else this.settings.pause();
      //   $('ol.playlist0 li.playing').addClass('pause');
      // },
      // play: function() {
      //   var player = this.settings.createPlayer;
      //   container[audiojs].helpers.addClass(this.wrapper, player.playingClass);
      //   $('ol.playlist0 li.pause').removeClass('pause');
      // }
    });

    // Load in the first track
    var audio0 = a0[0];
    first = $('ol.playlist0 a').attr('data-src');
    $('ol.playlist0 li').first().addClass('pause');
    audio0.load(first);

    // Load in a track on click
    $('ol.playlist0 li').click(function(e) {
      e.preventDefault();

      if( $(this).attr('class') == 'playing' ) {
        $(this).addClass('pause');
        audio0.playPause();
      } else {
        $(this).removeClass('pause').addClass('playing').siblings().removeClass('playing').removeClass('pause');
        audio0.load($('a', this).attr('data-src'));
        audio0.play();
      }

    });

    // $('.pause').click(function(e) {
    //     e.preventDefault();
    //     $('ol.playlist0 li').siblings().removeClass('playing');
    //     audio0.playPause();
    // })


  }
});