'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var Wizard = {
  NAME: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAME: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвин'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYE_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  COUNT_WIZARDS: 4
};

var getRandomNumber = function (i) {
  return Math.floor(Math.random() * i);
};

var getListWizards = function (count) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards[i] = {
      name: Wizard.NAME[getRandomNumber(8)] + ' ' + Wizard.SURNAME[getRandomNumber(8)],
      coatColor: Wizard.COAT_COLOR[getRandomNumber(6)],
      eyesColor: Wizard.EYE_COLOR[getRandomNumber(5)]
    };
  }

  return wizards;
};

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createWizard(array[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards(getListWizards(Wizard.COUNT_WIZARDS));
userDialog.querySelector('.setup-similar').classList.remove('hidden');
