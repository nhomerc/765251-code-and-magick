'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 20;
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
  ctx.lineTo(x, y + CLOUD_HEIGHT - radius);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x + radius, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - radius, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH, y + CLOUD_HEIGHT - radius);
  ctx.lineTo(x + CLOUD_WIDTH, y + radius);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.BaseLine = 'hanging';
  ctx.fillText('Ура вы победили', 120, 40);
  ctx.fillText('Список результатов: ', 120, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var columnHeight = times[i] * HISTOGRAM_HEIGHT / maxTime;
    var playerTime = Math.round(times[i]);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (BAR_WIDTH + TEXT_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y, BAR_WIDTH, (-1) * columnHeight);
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.1).toFixed(1) + ')';
      ctx.fillRect(CLOUD_X + GAP + FONT_GAP + (BAR_WIDTH + TEXT_WIDTH) * i, CLOUD_HEIGHT - CLOUD_Y, BAR_WIDTH, (-1) * columnHeight);
    }
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + FONT_GAP + (BAR_WIDTH + TEXT_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 20);
    ctx.fillText(playerTime, CLOUD_X + GAP + FONT_GAP + (BAR_WIDTH + TEXT_WIDTH) * i, CLOUD_HEIGHT - columnHeight - TEXT_WIDTH / 2);
  }
};
