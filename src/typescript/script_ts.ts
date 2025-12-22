export class Door {
  is_selected;
  is_car;
  is_candidate;
  div;
  constructor(a_is_car: boolean) {
    this.is_selected = false;
    this.is_car = a_is_car
    this.is_candidate = false;
    this.div = document.createElement('div');
    this.div.innerHTML = `<img src="../../assets/${(this.is_car)?"car4_red":"animal_yagi"}.png"></img>`;
  }

  get_dom() {
    return this.div;
  }

  reset(a_is_car: boolean) {
    this.is_car = a_is_car;
    this.is_selected = false;
    this.is_candidate = false;
    this.div.classList.remove('open', 'selected');
    this.div.innerHTML = `<img src="../../assets/${(this.is_car)?"car4_red":"animal_yagi"}.png"></img>`;
  }

  select = () => {
    this.is_selected = true;
    this.div.classList.add('selected');
    console.log(`I am ${this.is_car?"car":"yagi"}`);
  };

  toggle_select = () => {
    if(this.is_selected) {
      this.div.classList.remove('selected');
      this.is_selected = false;
    } else {
      this.div.classList.add('selected');
      this.is_selected = true;
    }
  };

  open = () => {
    this.div.classList.add('open')
  };

}
