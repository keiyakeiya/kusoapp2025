import * as cs_module from '../../build/coffeescript/script_cs.js';
import { Door } from '../../build/typescript/script_ts.js';
import { hello_ps } from '../../build/purescript/Main/index.js';

cs_module.hello_coffee('Call by js');
hello_dart('Call by js');
hello_ps('Call by js')();

const g_doors_num = 100;

// init
// TODO
let doors = [];
for(let i=0; i<g_doors_num; i++) {
  doors.push(new Door(i===0));
}

for(let d of doors) {
  container = document.querySelector('#container');
  container.insertAdjacentElement('beforeend', d.get_dom());
}


while(true) {
  // Reset
  // TODO
  const is_car = Math.floor(Math.random()*g_doors_num);
  for(let i=0; i<g_doors_num; i++) {
    console.log(is_car);
    doors[i].reset(i===is_car);
  }

  // wait choosing
  document.querySelector('#text').innerHTML = 'Choose Door';

  const first_selected = await waitFirstChoose(doors);

  // Open Doors
  await openDoors(first_selected);

  // Check change
  const decision = await wait_change_decision();
  if(decision === 'yes_btn') {
    for(const d of doors) {
      if(d.is_candidate) {
        d.toggle_select();
      }
    }
  }

  // Show result
  // TODO
  let is_correct = false;
  for(const d of doors) {
    if(d.is_selected && d.is_car) {
      is_correct = true;
    }
  }
  document.querySelector('#text').innerHTML = (is_correct)?'correct':'not correct';

  for(const d of doors) {
    if(d.is_candidate) {
      d.open();
    }
  }

  // Next?
  await wait_next_game();
  console.log('game done');
}

function waitFirstChoose(a_doors) {
  return new Promise(resolve => {
    const handler = (e) => {
      cleanup();
      const instance = a_doors.find(inst => inst.div == e.currentTarget);
      instance.select();
      resolve(instance);
    };

    const cleanup = () => {
      a_doors.forEach(inst => {
        inst.div.removeEventListener('click', handler);
      });
    };

    a_doors.forEach(inst => {
      inst.div.addEventListener('click', handler);
    });
  });
}

function openDoors(first_selected) {
  return new Promise(resolve => {
    if(first_selected.is_car) {
      const not_open = Math.floor(Math.random()*(g_doors_num-1));
      let cnt = 0;
      for(let i=0; i<g_doors_num; i++) {
        if(!doors[i].is_selected) {
          if(cnt !== not_open) {
            doors[i].open();
          } else {
            doors[i].is_candidate = true;
          }
          cnt++;
        } else {
          doors[i].is_candidate = true;
        }
      }
    } else {
      // open without selected and car
      for(const d of doors) {
        if(!d.is_car && !d.is_selected) {
          d.open();
        } else {
          d.is_candidate = true;
        }
      }
    }
    resolve();
  });
}

function wait_change_decision() {
  document.querySelector('#text').innerHTML = 'Change?<button id="yes_btn">yes</button><button id="no_btn">no</button>';
  const btns = document.querySelectorAll("#text button");
  return new Promise(resolve => {
    const handler = (e) => {
      cleanup();
      const instance = Array.from(btns).find(inst => inst == e.currentTarget);
      resolve(instance.id);
    };

    const cleanup = () => {
      for(const b of btns) {
        b.removeEventListener('click', handler);
      }
    };

    for(const b of btns) {
      b.addEventListener('click', handler);
    }
  });
}

function wait_next_game() {
  const next_game_btn = document.createElement('button');
  next_game_btn.innerText = 'Go to Next Game';
  document.querySelector('#text').insertAdjacentElement('beforeend', next_game_btn);

  return new Promise(resolve => {
    const handler = (e) => {
      next_game_btn.removeEventListener('click', handler);
      resolve();
    };

    next_game_btn.addEventListener('click', handler);
  });
}
