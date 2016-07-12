const Note = require('../util/note.js');
const Tones = require('../constants/tones.js');

const Keyboard = function () {};

Keyboard.prototype.play = function (key) {
  const note = new Note(Tones[key]);
  note.start();
};

module.exports = Keyboard;
