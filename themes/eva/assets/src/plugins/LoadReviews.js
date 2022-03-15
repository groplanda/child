import Masonry from 'masonry-layout';

export class LoadReviews {

  constructor(btnEl, masonry) {
    this.button = document.querySelector(btnEl);
    this.masonry = masonry;
    this.total = 0;
    this.offset = 4;

    this.init();
  }

  init() {
    this.button.addEventListener("click", this.getReviews.bind(this))
  }

  async getReviews() {
    this.total = +this.button.dataset.total;
    this.offset = +this.button.dataset.offset;

    const response = await this.fetchReviews(this.offset);

    this.offset = this.offset + response.length;

    this.masonry.insertAdjacentHTML('beforeend', this.createReviewHtml(response));
    new Masonry( this.masonry, {
      itemSelector: '.reviews__item',
    });

    this.button.setAttribute('data-offset', this.offset);

    if (this.offset >= this.total) {
      this.button.parentElement.classList.add("reviews__loading_hide");
    }
  }

  async fetchReviews(offset, limit = 2) {
    return await fetch('/api/feedback', {
      method: 'POST',
      body: this.createFD({offset, limit})
    })
    .then(res => res.json())
    .then(data => data)
    .catch(e => {
      throw new Error('message: ' + e.message);
    })
  }

  createFD(data) {
    const fd = new FormData();
    Object.keys(data).forEach(key => fd.append(key, data[key]));
    return fd
  }

  createReviewHtml(response) {
    return response.map(this.createHtml).join('');
  }

  createHtml(item) {
    return `<div class="reviews__item" data-index="${item.id}">
    <div class="reviews__item-content">
      <p>${item.rewiew}</p>
      <svg class="reviews__item-polygon">
        <use xlink:href="${process.env.MIX_SPRITE_PATH + '#sprite-polygon' }"></use>
      </svg>
    </div>
    <div class="reviews__item-info">
      <div class="reviews__item-title">${item.subject}</div>
      <div class="reviews__item-name">${item.name}</div>
    </div>
  </div>`
  }

}
