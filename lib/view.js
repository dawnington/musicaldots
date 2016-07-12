const Keyboard = require('./keyboard.js');

const View = function (patterns, ctx) {
  this.ctx = ctx;
  this.pattern = pattern;
};

View.KEYS = {
  'a': C3,
  's': E3,
  'd': G3,
  'f': C4,
  'g': E4,
  'h': G4,
  'j': C5,
  'k': E5,
  'l': G5,
};

View.prototype.bindKeyHandlers = function () {
  Object.keys(View.KEYS).forEach((k) => {
    key(k, function () { Keyboard.play(); });
  });
};
