import {jsdom} from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.__SERVER__ = true; //eslint-disable-line

// Don't process (S)CSS files
require.extensions['.css'] = require.extensions['.scss'] = function () {
    return null;
};

// To make test include paths relative to /src
process.env.NODE_PATH = 'src'; // eslint-disable-line
require('module').Module._initPaths(); // eslint-disable-line
