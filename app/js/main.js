const initSlider = () => {
  $('.slider-init').each(function () {
    const $this = $(this);

    const swiper = new Swiper(this, {
      slidesPerView: 1,
      preventClicks: true,
      spaceBetween: 20,
      autoplay: {
        delay: 5000
      },
      preventClicksPropagation: true,
      paginationClickable: true,
      pagination: {
        el: $this.find('.swiper-pagination'),
        clickable: true,
        dynamicBullets: true
      }
    });
  });
}

const destroySlider = () => {
  $('.slider-init').each(function(){
    this.swiper.destroy();
  });
}

const $body = $('body');
$body.on('changeVersion', function (e, version) {
  if (version === 'desktop') removeMenuOverlay()
});

if (ui.returnDeviceTypeByWidth() === 'mobile') initSlider();

$body.on('changeVersion', function (e, version) {
  if (version === 'desktop') {
    removeMenuOverlay();
    destroySlider();
  } else {
    initSlider();
  }
});


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


const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mm');
const overlayMobileMenu = document.querySelector('.header');
const elHtml = document.querySelector('html');
const durationAnimate = 300;

const showOverlay = (selector) => {
  const divOverlay = document.createElement('div');
  divOverlay.classList.add('body-overlay');
  selector.appendChild(divOverlay);
  selector.classList.add('-mm-open');
};

const removeOverlay = (selector) => {
  selector.querySelector('.body-overlay').remove();
  selector.classList.remove('-mm-open');
};

const removeMenuOverlay = () => {
  const $header = $('header');
  $('html').css({overflow: 'auto'});
  $('.mm').removeClass('-is-visible');
  $('.hamburger').removeClass('is-active');
  $header.find('.body-overlay').remove();
  $header.removeClass('-mm-open');
}

const humburgerActive = () => {
  hamburger.classList.add('is-active');
  mobileMenu.classList.add('-is-visible');
  elHtml.style.overflow = 'hidden';
  showOverlay(overlayMobileMenu);
};

const humburgerInactive = () => {
  hamburger.classList.remove('is-active');
  mobileMenu.classList.remove('-is-visible');
  elHtml.style.overflow = 'auto';
  setTimeout( function () {
    removeOverlay(overlayMobileMenu);
  }, durationAnimate);
};

const humburgerClick = () => {
  if(hamburger.classList.contains('disabled')) {
    return;
  } else {
    hamburger.classList.add('disabled');
    hamburger.classList.contains('is-active') ? humburgerInactive() : humburgerActive();

    let timeout = null;
    clearTimeout(timeout);
    timeout = setTimeout( () => hamburger.classList.remove('disabled'), durationAnimate);
  }
};

if (typeof(hamburger) != 'undefined' && hamburger != null) hamburger.addEventListener('click', humburgerClick);


const scrollToElement = () => {
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

  $body.on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();
    const el = $(this).attr('href');

    if ($(this).parent('.mm_nav').length) humburgerInactive();
    if ($(el).length > 0) {
      const $elOffsetTop = $(el).offset().top;
      const scrollToEl= $elOffsetTop >= 200 ? $elOffsetTop - headerSmall : $elOffsetTop - headerDefault;
      $('html,body').animate({
        scrollTop: scrollToEl
      },'slow');
    }
  });
}

scrollToElement();