// Variables: number of dots, radius of dots, duration of animation
// distance should be width of window

// TODO: figure out where parameters go in and how they change the variables

// import { anime from 'animejs';
const anime = require('animejs');

const Explosions = (function () {
  const canvas = document.querySelector('.dots');
  const ctx = canvas.getContext('2d');
  const numDots = 10; // TODO: customize this
  let x = 0;
  let y = 0;
  const animations = [];

  const setCanvasSize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const distance = canvas.width;

  const randomCoords = function () {
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
  };

  // Ripple
  const createCircle = function (x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = '#FFF';
    p.radius = 0;
    p.alpha = 1;
    p.lineWidth = 6;
    p.draw = function () {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lindeWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
    };
    return p;
  };

  const createDot = function (x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = '#ffec6a'; // TODO: This gets customized later
    p.radius = 50; // TODO: This gets customized later
    p.draw = function () {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    };
    return p;
  };

  const createDots = function (x, y) {
    const dots = [];
    for (let i = 0; i < numDots; i++) {
      const p = createDot(x, y);
      dots.push(p);
    }
    return dots;
  };

  const removeAnimation = function (animation) {
    const index = animations.indexOf(animation);
    if (index > -1) { animations.splice(index, 1); }
  };

  const animateDots = function (x, y) {
    setCanvasSize();
    const dots = createDots(x, y);
    const circle = createCircle(x, y);
    const dotsAnimation = anime({
      targets: dots,
      x: function(p) { return p.x, anime.random(-distance, distance); },
      y: function(p) { return p.y, anime.random(-distance, distance); },
      radius: 0,
      duration: function () { return anime.random(1000, 4000); },
      easing: 'easeOutExpo',
      complete: removeAnimation,
    });
    const circleAnimation = anime({
      targets: circle,
      radius: function () { return canvas.width + 200; }, // ripple radius
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: function () { return 80000; }, // TODO: ripple speed
      },
      duration: function () { return anime.random(5000, 8000); }, // TODO: customize this
      easing: 'easeOutExpo',
      complete: removeAnimation,
    });
    animations.push(dotsAnimation);
    animations.push(circleAnimation);
  };

  const mainLoop = anime({
    duration: Infinity,
    update: function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach(function (anim) {
        anim.animatables.forEach(function (animatable) {
          animatable.target.draw();
        });
      });
    },
  });

  document.addEventListener('mousedown', function () {
    randomCoords();
    animateDots(x, y);
  }, false);

  window.addEventListener('resize', setCanvasSize, false);

  return {
    boom: animateDots,
  };
});

module.exports = Explosions;
