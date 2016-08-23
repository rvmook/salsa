(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = removeInitialStyles;

function removeInitialStyles(){

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}
},{}],2:[function(require,module,exports){
var sharedInit = require('./core/sharedInit');

if(window.isReady) {
	init();

} else {
	window.init = init;
}

function init() {

	sharedInit();
}
},{"./core/sharedInit":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvY29yZS9zaGFyZWRJbml0LmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL2Rlc2t0b3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlSW5pdGlhbFN0eWxlcztcblxuZnVuY3Rpb24gcmVtb3ZlSW5pdGlhbFN0eWxlcygpe1xuXG5cdHZhciBvYnNvbGV0ZVN0eWxlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWluaXRpYWxTdHlsZXMnKTtcblxuXHRpZihvYnNvbGV0ZVN0eWxlc0VsKSB7XG5cblx0XHRvYnNvbGV0ZVN0eWxlc0VsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2Jzb2xldGVTdHlsZXNFbCk7XG5cdH1cbn0iLCJ2YXIgc2hhcmVkSW5pdCA9IHJlcXVpcmUoJy4vY29yZS9zaGFyZWRJbml0Jyk7XG5cbmlmKHdpbmRvdy5pc1JlYWR5KSB7XG5cdGluaXQoKTtcblxufSBlbHNlIHtcblx0d2luZG93LmluaXQgPSBpbml0O1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuXG5cdHNoYXJlZEluaXQoKTtcbn0iXX0=
