/**
 * MIT License
 *
 *    Copyright (c) 2019 June07
 *
 *    Permission is hereby granted, free of charge, to any person obtaining a copy
 *    of this software and associated documentation files (the "Software"), to deal
 *    in the Software without restriction, including without limitation the rights
 *    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *    copies of the Software, and to permit persons to whom the Software is
 *    furnished to do so, subject to the following conditions:
 *
 *    The above copyright notice and this permission notice shall be included in all
 *    copies or substantial portions of the Software.
 *
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *    SOFTWARE.
*/

'use strict';

const inspector = require('inspector'),
    debug = require('debug')('fiveo'),
    color = '\u001b[32m', // green,
    reset = '\u001b[0m',
    name = 'fiveo';

let inspectorState, host, port;

(function setHostPortVars() {
    if (process.env.INSPECT && process.env.INSPECT.includes(':')) {
        host = process.env.INSPECT.split(':')[0];
        port = process.env.INSPECT.split(':')[1];
    } else {
        host = 'localhost';
        port = parseInt(process.env.INSPECT) || 9229;
    }
})();

function handle(signal) {
    //debug(`Received ${signal}`);
    (inspector.url() === undefined) ? openInspector() : closeInspector();
}
function openInspector() {
    process.stdout.write(`😃 ${color}${name} activated the inspector:  ${reset}`)
    inspector.open(port, host);
    inspector.console.log(`😃 ${color}${name} activated this inspector. ${reset}`);
    debug(`${color}${name} activated this inspector: ${inspector.url()}.`);
}
function closeInspector() {
    let url = inspector.url();
    inspector.console.log(`😉 ${color}${name} deactivating this inspector. ${reset}`);
    inspector.close();
    debug(`${color}${name} deactivated the inspector: ${reset}${url}.`);
    if (! debug.enabled) console.log(`😉 ${color}${name} deactivated the inspector: ${reset}${url}.`);
}

process.on('SIGUSR2', handle);

