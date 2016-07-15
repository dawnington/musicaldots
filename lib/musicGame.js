const Explosions = require('./dots.js');

const canvas = document.querySelector('.dots');
const ctx = canvas.getContext('2d');

const explosion = new Explosions(canvas, ctx);
