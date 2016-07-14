const Dot = function (x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color; // TODO: This gets customized later
  this.radius = 50; // TODO: This gets customized later
};

Dot.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = this.color;
  ctx.fill();
};

module.exports = Dot;

// const createDot = function (x, y) {
//   const p = {};
//   p.x = x;
//   p.y = y;
//   p.color = '#ffec6a'; // TODO: This gets customized later
//   p.radius = 50; // TODO: This gets customized later
//   p.draw = function () {
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.fillStyle = p.color;
//     ctx.fill();
//   };
//   return p;
// };
