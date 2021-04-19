/* Loading */
$(window).load(function () {
  $(".spinner").delay(500).fadeOut();
  $("#mask").delay(500).fadeOut("slow");
  $("body").addClass("loaded");
});

/*----------------------------------------------
  P L A Y E R   I N T R O
  ------------------------------------------------*/
$(function () {
  function loadAudio() {
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
      trackEnded: function () {
        var next = $("ol.playlist li.playing").next();
        if (!next.length) next = $("ol.playlist li").first();
        next.addClass("playing").siblings().removeClass("playing");
        audio.load($("a", next).attr("data-src"));
        audio.play();
      },
    });

    // Load in the first track
    var audio = a[0];
    first = $("ol.playlist a").attr("data-src");
    $("ol.playlist li").first().addClass("playing");
    audio.load(first);

    // Load in a track on click
    $("ol.playlist li").click(function (e) {
      e.preventDefault();
      $(this).addClass("playing").siblings().removeClass("playing");
      audio.load($("a", this).attr("data-src"));
      audio.play();
    });

    $(".nextprev .next").click(function (e) {
      e.preventDefault();
      var next = $("ol.playlist li.playing").next();
      if (!next.length) next = $("ol.playlist li").first();
      next.click();
    });
    $(".nextprev .prev").click(function (e) {
      var prev = $("ol.playlist li.playing").prev();
      if (!prev.length) prev = $("ol.playlist li").last();
      prev.click();
    });

    $(".btnloop").click(function (e) {
      if ($("audio").attr("loop")) {
        $("audio").removeAttr("loop");
        $(this).removeClass("active");
      } else {
        $("audio").attr("loop", 0);
        $(this).addClass("active");
      }
    });

    // /// Keyboard shortcuts
    // $(document).keydown(function(e) {
    //   var unicode = e.charCode ? e.charCode : e.keyCode;
    //      // right arrow
    //   if (unicode == 39) {
    //     var next = $('li.playing').next();
    //     if (!next.length) next = $('ol li').first();
    //     next.click();
    //     // back arrow
    //   } else if (unicode == 37) {
    //     var prev = $('li.playing').prev();
    //     if (!prev.length) prev = $('ol li').last();
    //     prev.click();
    //     // spacebar
    //   } else if (unicode == 32) {
    //     audio.playPause();
    //   }
    // })
  }

  if ($(".player").length > 0) {
    loadAudio();
  }
});

if ($("#DateCountdown").length > 0) {
  $(window).resize(function () {
    $("#DateCountdown").TimeCircles().rebuild();
  });
  $("#DateCountdown").TimeCircles({
    animation: "smooth",
    bg_width: 0.5,
    fg_width: 0.023333333333333334,
    circle_bg_color: "#000000",
    time: {
      Days: {
        text: "Days",
        color: "#fff",
        show: true,
      },
      Hours: {
        text: "Hours",
        color: "#fff",
        show: true,
      },
      Minutes: {
        text: "Minutes",
        color: "#fff",
        show: true,
      },
      Seconds: {
        text: "Seconds",
        color: "#fff",
        show: true,
      },
    },
  });
}

$(document).ready(function () {
  /*----------------------------------------------
    I N T R O  S L I D E R
    ------------------------------------------------*/
  $("#slides").superslides({
    hashchange: false,
    animation: "fade",
    play: 10000,
    pagination: true,
  });

  function slidertext() {
    $("#owl-main-text").owlCarousel({
      autoPlay: 10000,
      goToFirst: true,
      goToFirstSpeed: 2000,
      navigation: false,
      slideSpeed: 700,
      pagination: false,
      transitionStyle: "fadeUp",
      singleItem: true,
    });
  }

  if ($("#owl-main-text").length > 0) {
    slidertext();
  }

  /*----------------------------------------------
    T W I T T E R
    ------------------------------------------------*/
  // function twitterfeed() {
  //   var config5 = {
  //     "id": '702067549920485376',
  //     "domId": 'twitter-feed',
  //     "maxTweets": 4,
  //     "enableLinks": true,
  //     "showUser": true,
  //     "showTime": true,
  //     "dateFunction": '',
  //     "showRetweet": false,
  //     "customCallback": handleTweets,
  //     "showInteraction": false
  //   };
  //
  //   function handleTweets(tweets){
  //     var x = tweets.length;
  //     var n = 0;
  //     var element = document.getElementById('twitter-feed');
  //     var html = '<ul class="slider-twitter">';
  //     while(n < x) {
  //       html += '<li class="gallery-cell">' + tweets[n] + '</li>';
  //       n++;
  //     }
  //     html += '</ul>';
  //     element.innerHTML = html;
  //
  //     $('.slider-twitter').flickity({
  //       cellAlign: 'left',
  //       contain: true,
  //       wrapAround: true,
  //       prevNextButtons: false
  //     });
  //   }
  //   twitterFetcher.fetch(config5);
  // }
  //
  // if ($('.twitterfeed').length>0 ) {
  //   twitterfeed();
  // };

  /*----------------------------------------------
    S L I D E R  D A T E S
    ------------------------------------------------*/
  var $carouselDates = $(".jcarouselDates").flickity({
    cellAlign: "left",
    wrapAround: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    draggable: false,
  });
  $(".button-group").on("click", ".button", function () {
    var index = $(this).index();
    $carouselDates.flickity("select", index);
    $(this).addClass("active").siblings().removeClass("active");
  });

  /*----------------------------------------------
    L I G H T B O X
    ------------------------------------------------*/
  $(".swipebox").swipebox();

  if ($(".playerVideo").length > 0) {
    //If there are video backgrounds
    $(".playerVideo").mb_YTPlayer();
    jQuery(".playerVideo").on("YTPPause", function () {
      jQuery(".play-video").removeClass("playing");
    });
    jQuery(".playerVideo").on("YTPPlay", function () {
      jQuery(".play-video").addClass("playing");
    });
    jQuery(".play-video").on("click", function (e) {
      if (jQuery(".play-video").hasClass("playing")) {
        jQuery(".playerVideo").pauseYTP();
      } else {
        jQuery("audio").each(function (i, e) {
          this.pause();
        });
        jQuery(".playerVideo").playYTP();
      }
      e.preventDefault();
    });
  }
});

/*----------------------------------------------
  I S O T O P E
  ------------------------------------------------*/
$(window).load(function () {
  //ISOTOPE events
  var $container = $(".upevents").isotope({
    itemSelector: ".upevent",
    masonry: {
      columnWidth: ".upevent",
    },
  });

  //ISOTOPE media
  var $container = $(".thumbnails").isotope({
    itemSelector: ".thumbnail",
    masonry: {
      // columnWidth: '.thumbnail.small',
      gutter: 30,
    },
  });
  // filter items on button click
  $(".filters").on("click", "li", function () {
    var filterValue = $(this).attr("data-filter");
    $container.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $(".filters").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "li", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  // load more
  $("#append").click(function () {
    newItems = $("#more-items").appendTo(".thumbnails");
    $(".thumbnails").isotope("insert", newItems);
    $(this).hide();
    return false;
  });
});

/*----------------------------------------------
  P A R A L L A X
  ------------------------------------------------*/
if (jQuery().parallax) {
  jQuery(".parallax-section").parallax();
}

/*----------------------------------------------
  M E N U   A N C H O R S
  ------------------------------------------------*/
$("a[href*=#]").click(function () {
  if (
    location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
    location.hostname === this.hostname
  ) {
    var $target = $(this.hash);
    $target =
      ($target.length && $target) || $("[name=" + this.hash.slice(1) + "]");
    if ($target.length) {
      var targetOffset = $target.offset().top;
      $("html,body").animate({ scrollTop: targetOffset - 42 }, 1000);

      // collapse nav
      $(".navbar-collapse.in").removeClass("in").addClass("collapse");

      return false;
    }
  }
});

/*----------------------------------------------
  M E N U   F I X E D
  ------------------------------------------------*/
$(function () {
  $(window).bind("scroll", function () {
    if (!$("#jHeader.overflow-video").length) {
      if ($(window).scrollTop() >= 85) {
        $("#jHeader").addClass("overflow");
      } else {
        $("#jHeader").removeClass("overflow");
      }
      if ($(window).scrollTop() >= $(".jIntro").height() / 2) {
        $("#jHeader").addClass("fixed");
      } else {
        $("#jHeader").removeClass("fixed");
      }
    }
  });

  // $('.disc-tracklist').on('click', function() {
  //   alert( "CLICK" );
  // });
});

// more events
$("#more-events").click(function () {
  $(".upcomming-events-list li.more").slideToggle("slow");
  $(this).hide();
  return false;
});
