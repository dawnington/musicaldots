/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Note = __webpack_require__(1);
	window.Note = Note;


/***/ },
/* 1 */
/***/ function(module, exports) {

	// util/note.js
	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	
	const createOscillator = function (freq) {
	  const osc = ctx.createOscillator();
	  osc.type = "sine";
	  osc.frequency.value = freq;
	  osc.detune.value = 0;
	  osc.start(ctx.currentTime);
	  return osc;
	};
	
	const createGainNode = function () {
	  const gainNode = ctx.createGain();
	  gainNode.gain.value = 0;
	  gainNode.connect(ctx.destination);
	  return gainNode;
	};
	
	const Note = function (freq) {
	  this.oscillatorNode = createOscillator(freq);
	  this.gainNode = createGainNode();
	  this.oscillatorNode.connect(this.gainNode);
	};
	
	Note.prototype.start = function () {
	  this.gainNode.gain.value = 0.3;
	};
	
	Note.prototype.stop = function () {
	  this.gainNode.gain.value = 0;
	};
	
	module.exports = Note;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map