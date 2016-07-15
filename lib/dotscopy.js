const anime = require('animejs');
const Circle = require('./circle.js');
const Dot = require('./dot.js');

const Explosion = function (canvas, ctx) {
  this.animations = [];
  this.canvas = canvas;
  this.ctx = ctx;
  this.distance = this.width;
};

Explosion.prototype.setCanvasSize = function () {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
};

Explosion.prototype.createDots = function (x, y, numDots, color) {
  const dots = [];
  for (let i = 0; i < numDots; i++) {
    const p = new Dot(x, y, color);
    dots.push(p);
  }
  return dots;
};

Explosion.prototype.removeAnimation = function (animation) {
  const index = this.animations.indexOf(animation);
  if (index > -1) { this.animations.splice(index, 1); }
};

Explosion.prototype.animateDots = function (options) {
  this.setCanvasSize();
  const x = Math.random() * this.canvas.width;
  const y = Math.random() * this.canvas.height;
  const dots = this.createDots(x, y, 20, '#f6e170');
  const circle = new Circle(x, y);
  const dotsAnimation = anime({
    targets: dots,
    x: function(p) { return x + anime.random(-this.distance, this.distance); },
    y: function(p) { return y + anime.random(-this.distance, this.distance); },
    radius: 0,
    duration: function () { return anime.random(1000, 4000); },
    easing: 'easeOutExpo',
    complete: this.removeAnimation,
  });
  const circleAnimation = anime({
    targets: circle,
    radius: function () { return this.canvas.width + 200; }, // ripple radius
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: function () { return 80000; }, // TODO: ripple speed
    },
    duration: function () { return anime.random(5000, 8000); }, // TODO: customize this
    easing: 'easeOutExpo',
    complete: this.removeAnimation,
  });
  this.animations.push(dotsAnimation);
  this.animations.push(circleAnimation);
};

Explosion.prototype.mainLoop = anime({
  duration: Infinity,
  update: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.animations.forEach(function (anim) {
      anim.animatables.forEach(function (animatable) {
        animatable.target.draw(ctx);
      });
    });
  },
});

module.exports = Explosion;
