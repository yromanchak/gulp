(function (window, ui, $, undefined) {

  const $body = $('body');

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

  // close mobile menu
  const closeMobileMenu = () => {
    $('.mm').removeClass('-is-visible');
    $('.hamburger').removeClass('is-active');
    $('html').css({overflow: 'auto'});
    $('header').removeClass('-mm-open').find('.body-overlay').remove();
  }

  if (ui.returnDeviceTypeByWidth() === 'mobile') initSlider();

  $body.on('changeVersion', function (e, version) {
    if (version === 'desktop') {
      closeMobileMenu();
      destroySlider()
    } else {
      initSlider()
    }
  });

})(window, window.ui, window.jQuery);


const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mm');
const overlayMobileMenu = document.querySelector('.header');
const elHtml = document.querySelector('html');
const durationAnimate = 300;

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

if (typeof(hamburger) != 'undefined' && hamburger != null) hamburger.addEventListener('click', humburgerClick);