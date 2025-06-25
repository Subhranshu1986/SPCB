$(document).ready(function () {

  if ($(".PBD_ConventionsSwiper .swiper-slide").length) {
    // PBD_ConventionsSwiper Active class add
    $('.PBD_ConventionsSwiper .swiper-slide').hover(
      function () {
        $(this).addClass('Active');  // Add active class on hover
      },
      function () {
        $(this).removeClass('Active'); // Remove active class on mouse leave
      }
    );
  }

  // External Link
  var currentDomain = window.location.hostname;
  var excludedDomains = ['www.facebook.com', 'twitter.com', 'www.youtube.com', 'www.instagram.com'];
  $('a').each(function () {
    var link = $(this);
    var href = link.attr('href');

    if (href && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
      var linkDomain = (new URL(href)).hostname;

      // Check if the linkDomain is in the excluded domains
      if (linkDomain !== currentDomain && !excludedDomains.includes(linkDomain)) {
        link.addClass('ExternalLink');
      }
    }
  });

  // To open Internal link Dialogbox for target_blank
  setTimeout(function () {

    $("a")
      .not('a[data-fancybox="GlimpsePBD"], a[data-fancybox="PhotoGallery"], a[data-fancybox="blogGallery"]')
      .filter(function () {
        return this.hostname && this.hostname !== location.hostname;
      })
      .click(function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        smoke.confirm(
          "You are about to proceed to an external website. Click YES to proceed.",
          function (e) {
            if (e) {
              window.open(url, "_blank");
            } else {
              return false;
            }
          },
          {
            ok: "Yes",
            cancel: "No",
            classname: "custom-class",
            reverseButtons: true,
          }
        );
      });
  }, 100);

  // To open Internal link Dialogbox for target_blank
  $(
    "ul.rightLinks li a.taggetBlankLink, .ministerHome .whatsNew a.taggetBlankLink"
  ).click(function (e) {
    e.preventDefault();
    if ($(this).attr("target", "_blank")) {
      var url = $(this).attr("href");
      smoke.confirm(
        "PBD Old Website Link will be opened in new tab of browser. Click OK to proceed.",
        function (e) {
          if (e) {
            window.open(url, "_blank");
          } else {
            return false;
          }
        }
      );
    }
  });

  var LagHindi = $('html[lang="hi"]').length;
  // Sticky Header
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 400) {
      $("body").addClass("StickyHeader");
    } else {
      $("body").removeClass("StickyHeader");
    }
  });

  // Get the height of the header

  if ($("header").length) {
    function GetHeaderHeight() {
      var headerHeight = $('header').outerHeight();
      $('body').css('padding-top', headerHeight + 'px');
      var headerMenuHeight = $(window).height() - headerHeight;
      if ($(window).width() < 1200) {
        $('.HeaderMenu').css('max-height', headerMenuHeight + 'px');
      } else {
        $('.HeaderMenu').css('max-height', 'none');
      }
    }

    GetHeaderHeight();
    setInterval(GetHeaderHeight, 100);
    window.addEventListener('resize', GetHeaderHeight);
  }

  // NonResposniveTabs Tabs
  if ($(".NonResposniveTabs").length) {
    $(".NonResposniveTabsLI").first().addClass("active");
    $(".NonResposniveTabsContent").first().addClass("active");
    var $TabsNonResponsivetabs = $(".NonResposniveTabsLI"),
      TabsNonResponsiveclickDisabled = false;
    function TabsNonResponsivetabsDelay() {
      $TabsNonResponsivetabs.click(function () {
        if (TabsNonResponsiveclickDisabled) {
          return;
        }
        if (!$(this).hasClass("active")) {
          var TabsNonResponsivetabNum = $(this).index();
          var TabsNonResponsiventhChild = TabsNonResponsivetabNum + 1;
          $(".NonResposniveTabsLI.active").removeClass("active");
          $(this).addClass("active");
          $(".NonResposniveTabsContent.active").fadeOut(200, function () {
            $(this).removeClass("active");
            $(
              ".NonResposniveTabsContent:nth-child(" +
              TabsNonResponsiventhChild +
              ")"
            )
              .addClass("active")
              .fadeIn(100);
          });
        }
        TabsNonResponsiveclickDisabled = true;
        setTimeout(function () {
          TabsNonResponsiveclickDisabled = false;
        }, 200);
      });
    }
    setTimeout(function () {
      TabsNonResponsivetabsDelay();
    }, 3000);
  }

  // Countdown
  function updateCountdown() {
    const endDate = new Date('2025-01-08T10:00:00'); // Set your target date here
    const now = new Date();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      $('#Days').text('00');
      $('#Hours').text('00');
      $('#Minutes').text('00');
      $('#Seconds').text('00');
      return; // Countdown is finished
    }

    const Days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const Hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const Minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const Seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    $('#Days').text(String(Days).padStart(2, '0'));
    $('#Hours').text(String(Hours).padStart(2, '0'));
    $('#Minutes').text(String(Minutes).padStart(2, '0'));
    $('#Seconds').text(String(Seconds).padStart(2, '0'));
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Search
  if ($('.SearchIcon').length) {
    $(".SearchIcon").click(function () {
      $(".SearchBox").slideToggle();
    });
  }

  // SVG image to code
  if ($('.custom-svg-icon').length) {
    $(function () {
      jQuery('.custom-svg-icon').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
          var $svg = jQuery(data).find('svg');
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }
          $svg = $svg.removeAttr('xmlns:a');

          if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }
          $img.replaceWith($svg);
        }, 'xml');
      });
    });
  }

  // Get the current page URL
  var url = window.location.pathname;
  var pageName = url.substring(url.lastIndexOf('/') + 1);
  pageName = pageName.split('.')[0];
  $('body').addClass(pageName);

  // Scroll To
  if ($('div#AccessibilityControl ul li a[href="#content"]').length) {
    $('div#AccessibilityControl ul li a[href="#content"]').click(function (e) {
      e.preventDefault();
      var target = $($(this).attr('href'));
      if (target.length) {
        var scrollTo = target.offset().top;
        $('body, html').animate({ scrollTop: scrollTo + 'px' }, 500);
      }
    });
  }

  // Marquee start
  if ($('.Marquee .MarqueeBox ul').length) {
    $(".Marquee .MarqueeBox ul").hover(
      function () {
        $(".Marquee .MarqueeBox ul").toggleClass("MarqueePause");
      },
      function () {
        $(".Marquee .MarqueeBox ul").toggleClass("MarqueePause");
      }
    );
  }

  // Marquee pause play
  if ($('.MarqueeBtn').length) {
    $('.MarqueeBtn').attr('title', 'pause');
    $(".MarqueeBtn").click(function () {
      $(this).toggleClass("Play");
      if ($(this).hasClass('Play')) {
        $(this).attr('title', 'Play');
      } else {
        $(this).attr('title', 'pause');
      }
      $("body").toggleClass("MarqueePausePlay");
      $(".Marquee .MarqueeBox ul").toggleClass("MarqueePause");
    });
  }
  // PauseAnimationAcc
  $(".PauseAnimationAcc").click(function () {
    $(this).toggleClass("Play");
    $("body").toggleClass("MarqueePausePlay");
    $(".Marquee .MarqueeBox ul").toggleClass("MarqueePause");
  });

  // AccessibilityClick 
  $(".AccessibilityClick").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("AccessibilityOpen");
  });
  $('.AccessibilityPopUP').hover(function () {
    $('body').addClass("AccessibilityOpen");
  }, function () {
    $('body').removeClass("AccessibilityOpen");
  });
  $(".CursorAnimationAcc").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("CursorAnimationON");
  });
  $(".SearchIconResponsive span").click(function () {
    $(".SearchBox").slideToggle();
  });


  // HeaderMenu parent
  if ($('.HeaderMenu li a').length) {
    $(".HeaderMenu li a").each(function () {
      if ($(this).next().length) {
        $(this).parent().addClass("parent");
      }
    });
    dropdown('nav', 'hover', 1);
  }

  // HeaderMenu hover
  if ($('.HeaderMenu li').length) {
    $(".HeaderMenu li").hover(
      function () {
        $(this).addClass("hover");
      },
      function () {
        $(this).removeClass("hover");
      }
    );
    $(".HeaderMenu li").focus(function () {
    $(this).addClass("hover");  // Add the class when focused
  }).blur(function () {
    $(this).removeClass("hover");  // Remove the class when focus is lost
  });
  }
// Back to Top function
  if( $("#backtotop").length){
    $(window).scroll(function(){
      if ($(window).scrollTop()>120){
        $('#backtotop').fadeIn('250').css('display','block');}
        else {
          $('#backtotop').fadeOut('250');}
        });
    $('#backtotop').click(function(){
      $('html, body').animate({scrollTop:0}, '200');
      return false;
    });
  };
  // responsive menu js
  const mediaQueryMenu = window.matchMedia("(max-width: 1024px)");
  let codeExecuted = false;
  function executeResponsiveCode() {
    if (!codeExecuted) {
      $(".Accessibility").after('<div class="child-trigger parent-trigger"><span class="fa-solid fa-bars-staggered"></span><span class="fa-solid fa-xmark"></span></div>');
      $("header .parent-trigger").click(function () {
        $(".HeaderMenu ").slideToggle();
        $("body, html").toggleClass("MenuOpen");
      });
      $(".HeaderMenu  ul li:has(ul)").addClass("submenu");
      $(".submenu > a").after('<div class="child-trigger"><span></span></div>');
      setTimeout(function () {
        $(".submenu a").each(function (index) {
          var AHeight = $(this).innerHeight();
          $(this).next("div").css("height", AHeight);
        });
        $(".child-trigger").click(function () {
          $(".submenu a").each(function (index) {
            var AHeight = $(this).innerHeight();
            $(this).next("div").css("height", AHeight);
          });
        });
      }, 200);
      $(".child-trigger").click(function () {
        $(this)
          .parent()
          .siblings("li")
          .find(".child-trigger")
          .removeClass("child-open");
        $(this).parent().siblings("li").find("ul").slideUp(250);
        $(this).toggleClass("child-open");
        $(this).next("ul").slideToggle(250);
        return false;
      });
      codeExecuted = true;
    }
  }
  const mediaQuery = window.matchMedia('(max-width: 1199px)');
  if (mediaQuery.matches) {
    executeResponsiveCode();
  }
  mediaQuery.addListener(function (event) {
    if (event.matches) {
      executeResponsiveCode();
    }
  });


  // swiper Slider Start
  // HomeBanner
  if ($(".BannerHomeSwiper").length) {
    var HomeBanner = new Swiper(".BannerHomeSwiper", {
      loop: true,
      speed: 1500,
      spaceBetween: 0,
      slidesPerView: 1,
      keyboard: true,
      observeParents: true,
      observer: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".HomeBannerPagination",
        clickable: true,
      },
    });
  }

  // HighlightsSwiper
  if ($(".HighlightsSwiper").length) {
    var HighlightsSwiper = new Swiper(".HighlightsSwiper", {
      loop: false,
      speed: 500,
      spaceBetween: 30,
      slidesPerView: 3,
      keyboard: true,
      observeParents: true,
      observer: true,
      navigation: {
        nextEl: '.HighlightsSwiperNext',
        prevEl: '.HighlightsSwiperPrev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1399: {
          slidesPerView: 3,
        },
      },
    });
  }

  // PBD_ConventionsSwiper
  if ($(".PBD_ConventionsSwiper").length) {
    var PBD_ConventionsSwiper = new Swiper(".PBD_ConventionsSwiper", {
      loop: false,
      speed: 500,
      spaceBetween: 10,
      slidesPerView: 3,
      keyboard: true,
      observeParents: true,
      observer: true,
      navigation: {
        nextEl: '.PBD_ConventionsSwiperNext',
        prevEl: '.PBD_ConventionsSwiperPrev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        575: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        991: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
        1399: {
          slidesPerView: 3,
        },
      },
    });
  }

  // From Patch JS

  if($(".RegistrationMain").length){
    $(".RegistrationMain form#frmfront button.bv-hidden-submit").append('<span class="font-0">.</span>');
  }
if($(".LoginBoxGroup").length){
    $(".LoginBoxGroup form#frmfront button.bv-hidden-submit").append('<span class="font-0">.</span>');
  }
  // DepartmentLogoSwiper
  if ($(".DepartmentLogoSwiper").length) {
    var DepartmentLogoSwiper = new Swiper(".DepartmentLogoSwiper", {
      loop: true,
      speed: 500,
      spaceBetween: 0,
      slidesPerView: 5,
      keyboard: true,
      observeParents: true,
      observer: true,
      navigation: {
        nextEl: '.DepartmentLogoSwiperNext',
        prevEl: '.DepartmentLogoSwiperPrev',
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        575: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1199: {
          slidesPerView: 5,
        },
        1399: {
          slidesPerView: 5,
        },
      },
    });
  }

  if ($(".madhyapradeshTopSlider").length) {
    var madhyapradeshTopSlider = new Swiper(".madhyapradeshTopSlider", {
      loop: false,
      speed: 500,
      spaceBetween: 30,
      slidesPerView: 3,
      keyboard: true,
      observeParents: true,
      observer: true,
      navigation: {
        nextEl: '.madhyapradeshTopSliderNext',
        prevEl: '.madhyapradeshTopSliderPrev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1399: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  /* play and pause for all sliders */
  function toggleSwiper(swiper, action) {
    if (action === 'stop') swiper.autoplay.stop();
    else if (action === 'start') swiper.autoplay.start();
  }
  $('.PlayBtnSlider').each(function () {
    $(this).attr('title', LagHindi ? 'रोकें' : 'Pause');
  });

  $('.PlayBtnSlider').on('click', function () {
    const isPaused = $(this).toggleClass('paused').hasClass('paused');
    const swiperId = $(this).data('swiper');
    const swiperInstances = {

      DepartmentLogoSwiper,
      HomeBanner
    };

    const swiperInstance = swiperInstances[swiperId];
    if (swiperInstance) toggleSwiper(swiperInstance, isPaused ? 'stop' : 'start');
    $(this).attr('title', LagHindi ? (isPaused ? 'चलायें' : 'रोकें') : (isPaused ? 'Play' : 'Pause'));
  });
  $('.PauseAnimationAcc').on('click', function () {
    const isPaused = $(this).toggleClass('paused').hasClass('paused');
    const action = isPaused ? 'stop' : 'start';
    Object.values({
      DepartmentLogoSwiper,
      HomeBanner
    }).forEach(swiperInstance => {
      if (swiperInstance) toggleSwiper(swiperInstance, action);
    });

    $(this).attr('title', LagHindi ? (isPaused ? 'सभी चालू करें' : 'सभी रोकें') : (isPaused ? 'Play All' : 'Pause All'));
  });
  
});
// end of ready

// AOS
AOS.init({
  once: true,
});

// equal height function
equalheight = function (container) {

  var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
  $(container).each(function () {

    $el = $(this);
    $($el).height('auto')
    topPostion = $el.position().top;

    if (currentRowStart != topPostion) {
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPostion;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
}

$(document).ready(function () {
  equalheight('.PBSA_AwardeesBox .Content');
});

$(window).on('load', function () {
  equalheight('.PBSA_AwardeesBox .Content');
});
$(window).resize(function () {
  equalheight('.PBSA_AwardeesBox .Content');
});