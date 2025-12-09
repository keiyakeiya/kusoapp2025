import * as cs_module from '../../build/coffeescript/script_cs.js';
// import { hello_coffee } from "../../build/coffeescript/script_cs.js";
import { hello_ts } from '../../build/typescript/script_ts.js';
import { hello_ps } from '../../build/purescript/Main/index.js';

cs_module.hello_coffee('Call by js');
hello_dart('Call by js');
hello_ts('Call by js');
hello_ps('Call by js')();

cs_module.addElement();
