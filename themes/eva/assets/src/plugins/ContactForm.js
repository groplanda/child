import { Modal } from './Modal';

export class ContactForm {
  constructor(formEl) {
    this.forms = document.querySelectorAll(formEl);
    this.preloader = document.getElementById("preloader");
    this.preloaderActiveClass = "loading_active";
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener("submit", (e) => this.send(e))
    })
  }

  send(e) {
    e.preventDefault();
    this.preloader.classList.add(this.preloaderActiveClass);
    const formEl = e.target;
    const formData = new FormData(formEl);
    this.resetErrors(formData, formEl);

    fetch('/api/sendData', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      this.preloader.classList.remove(this.preloaderActiveClass);

      if (data.status === "error") {
        const errors = this.onValidate(data, formData);
        this.handleErrors(errors, formEl);
        return;
      }

      const response = document.querySelector('[data-js="success-text"]');
      formEl.reset();
      response.textContent = data.message;

      const trigger = this.createTrigger();
      document.body.append(trigger);

      ym(88139097,'reachGoal','zayavka');

      new Modal('[data-js-action="open-modal"]', 'modal');

      trigger.click();
      trigger.remove();
    })
    .catch(e => {
      this.preloader.classList.remove(this.preloaderActiveClass);
      console.log(e.message);
    })
  }

  onValidate(arrayErrors, form) {
    let errors = [];

    Object.keys(arrayErrors).forEach(key => {
      if (form.has(key)) {
        arrayErrors[key].forEach(err => {
          errors.push({ key: key, message: err })
        })
      }
    })

    return errors;
  }

  handleErrors(errors, formEl) {
    errors.forEach(error => {
      this.displayError(formEl, error.key, error.message);
    })
  }

  displayError(formEl, key, error) {
    const errEl = formEl.querySelector(`[data-error-for="${key}"]`);
    if (errEl) {
      errEl.textContent = error;
    }
  }

  resetErrors(formData, formEl) {
    for (let [key, value] of formData) {
      const errEl = formEl.querySelector(`[data-error-for="${key}"]`);
      if (errEl) {
        errEl.textContent = "";
      }
    }
  }

  createTrigger() {
    const trigger = document.createElement('a');

    trigger.setAttribute('data-js-action', 'open-modal');
    trigger.setAttribute('data-name', 'success');
    trigger.classList.add("hidden");

    return trigger;
  }
}
