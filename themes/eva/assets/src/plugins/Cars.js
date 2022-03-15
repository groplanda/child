import { debounce } from "debounce";

export class Cars {
  constructor(form, trigger) {
    this.inputs = form.querySelectorAll(trigger);
    this.activeInputClass = "form__input_open";
    this.CAR_FIELD = "user_car";
    this.MODEL_FIELD = "user_model";
    this.cars = [];
    this.filtered = [];
    this.selected = {};
    this.setup();
  }

  setup() {
    this.inputs.forEach(input => input.addEventListener("input", debounce(this.handleInput, 500).bind(this)))
    const dropdowns = document.querySelectorAll('[data-dropdown-for]');

    if (dropdowns) {
      dropdowns.forEach(dropdown => dropdown.addEventListener("click", this.handleDropdown.bind(this)))
    }

    document.addEventListener("click", this.handleDocument.bind(this))
  }

  async handleInput(event) {
    const target = event.target,
          value = target.value,
          type = target.dataset.type,
          name = target.name,
          form = target.closest("form");

    if (type === "car" && value.length > 2) {
      const data = await this.fetchData();

      this.cars = Object.keys(data).map(key => {
        return {name: key, models: data[key]};
      })

      this.filtered = this.cars.filter(car => {
        return car.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      })

      if (this.filtered.length > 0) {
        const dropdown = form.querySelector(`[data-dropdown-for="${name}"]`),
              created = this.createBrands(this.filtered, name);

        target.classList.add(this.activeInputClass);

        if (dropdown.innerHTML !== created) {
          dropdown.innerHTML = created;
        }

        this.resetModelField(form);
      }
      return;
    }

    const { models } = this.selectedCar();

    if (models) {
      const filteredModels = this.filteredModels(models, value);

      if (filteredModels.length > 0) {
        const dropdown = form.querySelector(`[data-dropdown-for="${name}"]`),
        created = this.createModels(filteredModels, name);
        target.classList.add(this.activeInputClass);
        dropdown.innerHTML = created;
      }
    }

  }

  async fetchData() {
    return await fetch('/api/cars')
      .then(res => res.json())
      .then(data => data.list)
      .catch(e => {
        console.log('Throw new Error: ' + e.message);
      })
  }

  createBrands(cars, name) {
    return cars.map(car => `<div class="form__dropdown-item" data-input-name="${name}" data-car-name="${car.name}">${car.name}</div>`).join("");
  }

  createModels(models, name) {
    return models.map(model => `<div class="form__dropdown-item" data-input-name="${name}" data-car-name="${model}">${model}</div>`).join("");
  }

  handleDropdown(event) {
    const target = event.target;

    if (target && target.dataset.carName) {
      const carName = target.dataset.carName,
            inputName = target.dataset.inputName,
            form = target.closest("form");

      const input = form.querySelector(`input[name="${inputName}"]`);

      if (input) {
        input.value = carName
        input.classList.remove(this.activeInputClass);

        if (inputName === this.CAR_FIELD) {
          this.selectedCar(carName);
        }

      }
    }
  }

  selectedCar(key = null) {
    if (key) {
      this.selected = this.filtered.find(car => car.name === key);
      return
    }
    return this.selected;
  }

  filteredModels(models, query) {
    return models.filter(model => model.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  resetModelField(form) {
    const modelInput = form.querySelector(`input[name="${this.MODEL_FIELD}"]`),
          modelDropdown = form.querySelector(`[data-dropdown-for="${this.MODEL_FIELD}"]`);

    modelInput.value = "";
    modelInput.classList.remove(this.activeInputClass);
    modelDropdown.innerHTML = "";
  }

  handleDocument(e) {
    const target = e.target;

    if (target.tagName.toLowerCase() !== "input" && !target.closest("[data-dropdown-for]")) {
      this.inputs.forEach(input => {
        input.classList.remove(this.activeInputClass);
      })
    }
  }
}
