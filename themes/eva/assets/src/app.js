import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery.maskedinput/src/jquery.maskedinput.js'
import 'swiper/css/bundle';
import 'lightbox2/dist/js/lightbox.min.js';
import Swiper, { Navigation, Pagination } from 'swiper';
import Masonry from 'masonry-layout';
import { Modal } from './plugins/Modal';
import { ContactForm } from './plugins/ContactForm';
import { Cars } from './plugins/Cars';
import { LoadReviews } from './plugins/LoadReviews';
import ImageCompare from 'image-compare-viewer';

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {

  const mobileToggle = document.querySelector('[data-js-action="toggle-menu"]'),
        mobileMenu = document.querySelector('[data-js="mobile-menu"]');

  mobileToggle.addEventListener("click", function() {
    mobileToggle.classList.toggle("header__menu-toggle_active");
    mobileMenu.classList.toggle("header__mobile_open");
  })

  const anchors = document.querySelectorAll('[data-scroll]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      if (window.innerWidth < 1200) {
        mobileToggle.classList.remove("header__menu-toggle_active");
        mobileMenu.classList.remove("header__mobile_open");
      }
    })
  }

  const masonryID = document.getElementById('reviews-masonry'),
        reviewsID = document.getElementById('reviews');

  if (reviewsID) {
    new Masonry( masonryID, {
      itemSelector: '.reviews__item',
    });

    new LoadReviews('[data-js="load-reviews"]', masonryID);


    const reviewsSlider = new Swiper('[data-js="reviews-slider"]', {
      slidesPerView: 1,
      modules: [Navigation, Pagination],
      spaceBetween: 0,
      slideClass: 'reviews__slide',
      slideActiveClass: 'reviews__slide_active',
      pagination: {
        el: '.reviews__pagination',
        bulletClass: 'reviews__bullet',
        bulletActiveClass: 'reviews__bullet_active'
      }
    })

    const prevBtn = reviewsID.querySelector('[data-js-action="prev-slide"]'),
          nextBtn = reviewsID.querySelector('[data-js-action="next-slide"]');

    nextBtn.addEventListener("click", () => {
      reviewsSlider.slideNext();
    })

    prevBtn.addEventListener("click", () => {
      reviewsSlider.slidePrev();
    })

  }

  const galleryID = document.getElementById('gallery');

  if (galleryID) {

    const gallerySlider = new Swiper('[data-js="gallery-slider"]', {
      slidesPerView: 2.8,
      centeredSlides: true,
      simulateTouch: false,
      allowTouchMove: false,
      onlyExternal:true,
      slideClass: 'gallery__slide',
      slideActiveClass: 'gallery__slide_active',
      slideNextClass: 'gallery__slide_next',
      slidePrevClass: 'gallery__slide_prev',
      loop: true,
      spaceBetween: 30,
      pagination: {},
      navigation: {},
      breakpoints: {
        320: {
          slidesPerView: 1.3,
        },
        576: {
          slidesPerView: 1.8,
        },
        992: {
          slidesPerView: 2.3,
        },
        1200: {
          slidesPerView: 2.8,
        }
      }
    });

    const prevBtn = galleryID.querySelector('[data-js-action="prev-slide"]'),
          nextBtn = galleryID.querySelector('[data-js-action="next-slide"]');

    nextBtn.addEventListener("click", () => {
      gallerySlider.slideNext();
    })

    prevBtn.addEventListener("click", () => {
      gallerySlider.slidePrev();
    })

    const images = galleryID.querySelectorAll('[data-js="image-compare"]');

    images.forEach(image => {
      new ImageCompare(image,{
        fluidMode: true,
        controlShadow: true,
        addCircle: false,
        addCircleBlur: true,
      })
      .mount();
    })

    updateButtonOffset();


    window.addEventListener('resize', updateButtonOffset)

    function updateButtonOffset() {
      setTimeout(() => {

        const images = gallerySlider.wrapperEl.querySelectorAll('.swiper-slide');
        const list = []

        for (let index = 0; index < images.length; index++) {
          const image = images[index];
          list.push(image.offsetHeight)
        }

        const max = Math.max.apply(null, list);

        nextBtn.style.top = max + 'px';
        prevBtn.style.top = max + 'px';

      }, 500);
    }
  }

  const worksID = document.getElementById('works');

  if (worksID) {

    new Swiper('[data-slider="works"]', {
      slidesPerView:5,
      loop: true,
      spaceBetween: 0,
      pagination: {},
      navigation: {
        nextEl: '.works__btn_next',
        prevEl: '.works__btn_prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        2100: {
          slidesPerView: 5,
        }
      }
    });
  }

  new Modal('[data-js-action="open-modal"]', 'modal');

  new ContactForm('[data-js-action="send-form"]');

  $('[data-js="phone"]').mask("+7 (999) 999-99-99");

  const carForms = document.querySelectorAll('[data-form="car"]');

  carForms.forEach(form => {
    new Cars(form, '[data-autocomplete]');
  })

  function nubmerIndex() {
    const numbers = document.querySelectorAll('[data-js="number-index"]');
    if (numbers) {
      const title = document.querySelector('[data-js="number-count"]');
      title.textContent = `${numbers.length} фактов`;
      for(let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = i + 1;
      }
    }
  }
  nubmerIndex();

})
