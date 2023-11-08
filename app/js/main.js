(function (window, $, undefined) {
  if (!window.ui) {
    ui = $({});
    window.ui = ui;
  }
})(window, window.jQuery);

// change version desktop/mobile
(function (window, ui, $, undefined) {

  let currentVersion;
  const $body = $('body');

  ui.returnDeviceTypeByWidth = function () {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width >= 960) {
      $body.triggerHandler('desktopVersion');
      if (currentVersion != 'desktop') {
        currentVersion = 'desktop';
        $body.triggerHandler('changeVersion', 'desktop');
      }
      return currentVersion;
    } else {
      $body.triggerHandler('mobileVersion');
      if (currentVersion != 'mobile') {
        currentVersion = 'mobile';
        $body.triggerHandler('changeVersion', 'mobile');
      }
      return currentVersion;
    }
  };

  $body.attr('data-device', ui.returnDeviceTypeByWidth()).attr('data-dom', 'ready');

  $(window).resize(function () {
    $body.attr('data-device', ui.returnDeviceTypeByWidth());
  });

})(window, window.ui, window.jQuery);


(function (window, ui, $, undefined) {

  // set desktop small header
  const smallHeader = () => {
    const $header = $('.header');
    const scrollPosition = $(window).scrollTop();

    scrollPosition >= 200 ? $header.addClass('-small')
      : $header.removeClass('-small');
  }

  $(window).on('scroll', function() {
    smallHeader();
  });
  smallHeader();


  // focused input
  const fieldFocus = () => {
    $('input, textarea')
      .on('focusin', function () {
        $(this).parents('.field-group').addClass('-focused');
      })
      .on('focusout', function () {
        $(this).parents('.field-group').removeClass('-focused');
      });
  }
  fieldFocus();


  // button scroll-top
  const scrollTopBtn = $('.scroll-top');

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 400) {
      scrollTopBtn.addClass('-show');
    } else {
      scrollTopBtn.removeClass('-show');
    }
  });

  scrollTopBtn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, 500);
  });


  // scroll to element
  ui.scrollToElement = ($el, params) => {
    const options = $.extend({
      additionalSpace: 20,
      animationSpeed: 1000,
      afterScrollEnd: function () {
        return true;
      }
    }, params);

    if (typeof $el === "number") {
      $('html, body').animate({
        scrollTop: $el
      }, options.animationSpeed, options.afterScrollEnd);
      return;
    }

    const $body = $('body');
    const $header = $('header');

    let headerTypes = {
      heightDesktop: 85,
      heightDesktopSmall: 56,
      heightMobile: 56
    }

    let headerSmall = null;
    let headerDefault = $header.height();

    ui.returnDeviceTypeByWidth() === 'desktop' ? headerSmall = headerTypes.heightDesktopSmall : headerSmall = headerTypes.heightMobile;

    $body.on('changeVersion', function (e, version) {
      if (version === 'desktop') {
        headerDefault = headerTypes.heightDesktop;
        headerSmall = headerTypes.heightDesktopSmall;
      } else {
        headerDefault = headerTypes.heightMobile;
        headerSmall = headerTypes.heightMobile;
      }
    });

    const $elOffsetTop = $el.offset().top;
    let scrollToEl= $elOffsetTop >= 200 ? $elOffsetTop - headerSmall : $elOffsetTop - headerDefault;

    scrollToEl -= options.additionalSpace;

    if (scrollToEl <= 0) scrollToEl = 0;

    $('html,body').animate({
      scrollTop: scrollToEl
    }, options.animationSpeed, options.afterScrollEnd);
  }

  $('body').on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();
    const el = $(this).attr('href');

    if ($(this).parent('.mm_nav').length) humburgerInactive();
    if ($(el).length > 0) {
      ui.scrollToElement($(el));
    }
  });
})(window, window.ui, window.jQuery);


// textarea auto-height
document.querySelectorAll('textarea').forEach(el => {
  el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
  el.classList.add('auto');
  el.addEventListener('input', e => {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
  });
});