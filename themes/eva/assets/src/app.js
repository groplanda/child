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
          slidesPerView: 1.5,
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

  }

  new Modal('[data-js-action="open-modal"]', 'modal');

  new ContactForm('[data-js-action="send-form"]');

  $('[data-js="phone"]').mask("+7 (999) 999-99-99");

  const carForms = document.querySelectorAll('[data-form="car"]');

  carForms.forEach(form => {
    new Cars(form, '[data-autocomplete]');
  })

  const numbers = document.querySelectorAll('[data-js="number-index"]');

  if (numbers) {
    const title = document.querySelector('[data-js="number-count"]');
    title.textContent = `${numbers.length} фактов`;

    for(let i = 0; i < numbers.length; i++) {
      numbers[i].textContent = i + 1;
    }

  }

})
