'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 20
};
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  var radius = 40;
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + Cloud.HEIGHT - radius);
  ctx.quadraticCurveTo(x, y + Cloud.HEIGHT, x + radius, y + Cloud.HEIGHT);
  ctx.lineTo(x + Cloud.WIDTH - radius, y + Cloud.HEIGHT);
  ctx.quadraticCurveTo(x + Cloud.WIDTH, y + Cloud.HEIGHT, x + Cloud.WIDTH, y + Cloud.HEIGHT - radius);
  ctx.lineTo(x + Cloud.WIDTH, y + radius);
  ctx.quadraticCurveTo(x + Cloud.WIDTH, y, x + Cloud.WIDTH - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.fill();
};

var drawText = function (ctx, text, x, y, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
  ctx.textBaseLine = 'hanging';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, Cloud.X + GAP, Cloud.Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, Cloud.X, Cloud.Y, '#fff');

  drawText(ctx, 'Ура вы победили', 120, 40, '16px PT Mono', '#000');
  drawText(ctx, 'Список результатов', 120, 60, '16px PT Mono', '#000');

  // Метод Math.max() возвращает наибольшее из чисел. Используем Function.prototype.apply() для нахождения максимального элемента в числовом массиве, apply - способ передать массив данных в качестве параметров функции
  var maxTime = Math.max.apply(Math, times);
  for (var i = 0; i < players.length; i++) {
    var columnHeight = times[i] * HISTOGRAM_HEIGHT / maxTime;
    var currentX = (Cloud.X + GAP + FONT_GAP + (BAR_WIDTH + TEXT_WIDTH) * i);
    var playerTime = Math.round(times[i]);
    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
    ctx.fillRect(currentX, Cloud.HEIGHT - Cloud.Y, BAR_WIDTH, (-1) * columnHeight);

    drawText(ctx, players[i], currentX, Cloud.Y + Cloud.HEIGHT - 20, '16px PT Mono', '#000');
    drawText(ctx, playerTime, currentX, Cloud.HEIGHT - columnHeight - TEXT_WIDTH / 2, '16px PT Mono', '#000');
  }
};
