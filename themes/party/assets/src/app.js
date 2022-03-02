import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery.maskedinput/src/jquery.maskedinput.js'
import 'swiper/css/bundle';
import 'lightbox2/dist/js/lightbox.min.js';
import 'lightbox2/dist/css/lightbox.min.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import Masonry from 'masonry-layout';
import { Modal } from './plugins/Modal';
import { ContactForm } from './plugins/ContactForm';

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

  const listID = document.getElementById("list");

  if (listID) {
    const listSlider = new Swiper('[data-js="list-slider"]', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: false,
      modules: [Navigation, Pagination],
      pagination: {
        el: '.list__pagination',
        bulletClass: 'list__pagination-bullet',
        bulletActiveClass: 'list__pagination-bullet_active'
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }
    });
    const prevBtn = listID.querySelector('[data-js-action="prev-slide"]'),
          nextBtn = listID.querySelector('[data-js-action="next-slide"]');

    nextBtn.addEventListener("click", () => {
      listSlider.slideNext();
    })

    prevBtn.addEventListener("click", () => {
      listSlider.slidePrev();
    })
  }

  const animatedID = document.getElementById("animated");

  if (animatedID) {
    const animatedSlider = new Swiper('[data-js="animated-slider"]', {
      slidesPerView: 4,
      modules: [Navigation, Pagination],
      grid: {
        rows: 4,
      },
      spaceBetween: 0,
      slideClass: 'animated__item',
      slideActiveClass: 'animated__item_active',
      simulateTouch: false,
      breakpoints: {
        320: {
          slidesPerView: 1,
          grid: {
            rows: 1,
          },
          pagination: {
            el: '.animated__pagination',
            bulletClass: 'animated__bullet',
            bulletActiveClass: 'animated__bullet_active'
          }
        },
        576: {
          slidesPerView: 2,
          grid: {
            rows: 2,
          },
        },
        992: {
          slidesPerView: 3,
          grid: {
            rows: 3,
          }
        },
        1200: {
          slidesPerView: 4,
          grid: {
            rows: 4,
          }
        }
      }
    })

    const prevBtn = animatedID.querySelector('[data-js-action="prev-slide"]'),
          nextBtn = animatedID.querySelector('[data-js-action="next-slide"]');

    nextBtn.addEventListener("click", () => {
      animatedSlider.slideNext();
    })

    prevBtn.addEventListener("click", () => {
      animatedSlider.slidePrev();
    })
  }

  const offersID = document.getElementById("offers");

  if (offersID) {
    const offersSlider = new Swiper('[data-js="offers-slider"]', {
      slidesPerView: 4,
      modules: [Navigation, Pagination],
      grid: {
        rows: 4,
      },
      spaceBetween: 0,
      slideClass: 'offers__slide',
      slideActiveClass: 'offers__slide_active',
      simulateTouch: false,
      pagination: {
        el: '.offers__pagination',
        bulletClass: 'offers__bullet',
        bulletActiveClass: 'offers__bullet_active'
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          grid: {
            rows: 1,
          }
        },
        768: {
          slidesPerView: 2,
          grid: {
            rows: 1,
          },
        },
        992: {
          slidesPerView: 3,
          grid: {
            rows: 1,
          },
        },
        1200: {
          slidesPerView: 4,
          grid: {
            rows: 4,
          }
        }
      }
    })

    const prevBtn = offersID.querySelector('[data-js-action="prev-slide"]'),
          nextBtn = offersID.querySelector('[data-js-action="next-slide"]');

    nextBtn.addEventListener("click", () => {
      offersSlider.slideNext();
    })

    prevBtn.addEventListener("click", () => {
      offersSlider.slidePrev();
    })
  }

  const masonryID = document.getElementById('reviews-masonry'),
        reviewsID = document.getElementById('reviews');

  if (reviewsID) {
    new Masonry( masonryID, {
      itemSelector: '.reviews__item',
    });


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

  const aboutContent = document.querySelector('[data-js="about-content"]'),
        showAboutContent = document.querySelector('[data-js-action="show-more"]');

  if (aboutContent && showAboutContent) {
    const fullHeight = aboutContent.scrollHeight,
          activeClass = "about__desription_open",
          activeShowClass = "about__button_open";

    showAboutContent.addEventListener("click", () => {
      aboutContent.classList.toggle(activeClass);
      showAboutContent.classList.toggle(activeShowClass);

      if (aboutContent.classList.contains(activeClass)) {
        aboutContent.style.height = fullHeight + 'px';
        showAboutContent.firstElementChild.textContent = "Скрыть";
      } else {
        aboutContent.scrollIntoView({
          behavior: 'smooth'
        });
        setTimeout(() => {
          aboutContent.style.height = '340px';
          showAboutContent.firstElementChild.textContent = "Подробнее";
        }, 500)
      }
    })
  }

  new Modal('[data-js-action="open-modal"]', 'modal');

  new ContactForm('[data-js-action="send-form"]');

  const productSliders = document.querySelectorAll('[data-js="product-wrap"]');

  if (productSliders) {

    productSliders.forEach(product => {
      const slider = product.querySelector('[data-js="product-slider"]');

      const productSlider = new Swiper(slider, {
        slidesPerView: 4,
        modules: [Navigation, Pagination],
        grid: {
          rows: 4,
        },
        spaceBetween: 0,
        slideClass: 'product__item',
        slideActiveClass: 'product__item_active',
        simulateTouch: false,
        breakpoints: {
          320: {
            slidesPerView: 1,
            grid: {
              rows: 1,
            },
            pagination: {
              el: '.product__pagination',
              bulletClass: 'product__bullet',
              bulletActiveClass: 'product__bullet_active'
            }
          },
          576: {
            slidesPerView: 2,
            grid: {
              rows: 2,
            },
          },
          992: {
            slidesPerView: 3,
            grid: {
              rows: 3,
            }
          },
          1200: {
            slidesPerView: 4,
            grid: {
              rows: 4,
            }
          }
        }
      })

      const prevBtn = slider.querySelector('[data-js-action="prev-slide"]'),
            nextBtn = slider.querySelector('[data-js-action="next-slide"]');

      nextBtn.addEventListener("click", () => {
        productSlider.slideNext();
      })

      prevBtn.addEventListener("click", () => {
        productSlider.slidePrev();
      })

    })
  }

  // faq

  $('[data-question="head"]').on("click", toggleQuestion);

  function toggleQuestion() {
    const activeClass = "faq__list-item_active";
    $('[data-question="head"]').not(this).parent().removeClass(activeClass)
    $('[data-question="head"]').not(this).next('[data-question="body"]').slideUp();

    $(this).parent().toggleClass(activeClass);

    if ($(this).parent().hasClass(activeClass)) {
      $(this).next('[data-question="body"]').slideDown();
    } else {
      $(this).next('[data-question="body"]').slideUp();
    }
  }

  $('[data-js="phone"]').mask("+7 (999) 999-99-99");

})
