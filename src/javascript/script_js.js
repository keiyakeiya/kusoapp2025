import * as cs_module from '../../build/coffeescript/script_cs.js';
import { Door } from '../../build/typescript/script_ts.js';
import { randomDoor, notOpenIndex } from '../../build/purescript/Main/index.js';


const g_doors_num = 100;

// init
let doors = initialize(g_doors_num);

while(true) {
  // Reset
  reset(doors, g_doors_num);

  // wait choosing
  const first_selected = await waitFirstChoose(doors);

  // Open Doors
  await openDoors(doors, first_selected, g_doors_num);

  // Check change
  await wait_change_decision(doors);

  // Show result
  show_result();

  // Next?
  await wait_next_game();
}

function initialize(a_doors_num) {
  html_setup();
  let doors = [];
  for(let i=0; i<a_doors_num; i++) {
    doors.push(new Door(i===0));
  }

  cs_module.draw_doors(doors);

  return doors;
}

function reset(a_doors, a_doors_num) {
  const is_car = randomDoor(a_doors_num)();
  for(let i=0; i<a_doors_num; i++) {
    a_doors[i].reset(i===is_car);
  }
}

function waitFirstChoose(a_doors) {
  cs_module.update_message( 'ドアを選んでください。', true);
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

function openDoors(a_doors, a_first_selected, a_doors_num) {
  return new Promise(resolve => {
    if(a_first_selected.is_car) {
      const not_open = notOpenIndex(a_doors_num)();
      let cnt = 0;
      for(let i=0; i<a_doors_num; i++) {
        if(!a_doors[i].is_selected) {
          if(cnt !== not_open) {
            a_doors[i].open();
          } else {
            a_doors[i].is_candidate = true;
          }
          cnt++;
        } else {
          a_doors[i].is_candidate = true;
        }
      }
    } else {
      // open without selected and car
      for(const d of a_doors) {
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

function wait_change_decision(a_doors) {
  cs_module.update_message( '別のドアに変更してもいいですよ。変更しますか？<br> <button id="yes_btn">はい</button> <button id="no_btn">いいえ</button>', true);
  const btns = document.querySelectorAll("#message button");
  return new Promise(resolve => {
    const handler = (e) => {
      cleanup();
      const instance = Array.from(btns).find(inst => inst == e.currentTarget);
      if(instance.id === 'yes_btn') {
        for(const d of a_doors) {
          if(d.is_candidate) {
            d.toggle_select();
          }
        }
      }
      resolve();
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

function show_result() {
  let is_correct = false;
  for(const d of doors) {
    if(d.is_selected && d.is_car) {
      is_correct = true;
    }
    if(d.is_candidate) {
      d.open();
    }
  }
  cs_module.update_message((is_correct)?'おめでとうございます！<br>':'残念。。。<br>', true);
}

function wait_next_game() {
  cs_module.update_message('<button>もう一回</button>', false);
  const next_game_btn = document.querySelector('#message button');

  return new Promise(resolve => {
    const handler = (e) => {
      next_game_btn.removeEventListener('click', handler);
      resolve();
    };

    next_game_btn.addEventListener('click', handler);
  });
}
