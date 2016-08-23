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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvY29yZS9zaGFyZWRJbml0LmpzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL21vYmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSByZW1vdmVJbml0aWFsU3R5bGVzO1xuXG5mdW5jdGlvbiByZW1vdmVJbml0aWFsU3R5bGVzKCl7XG5cblx0dmFyIG9ic29sZXRlU3R5bGVzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaW5pdGlhbFN0eWxlcycpO1xuXG5cdGlmKG9ic29sZXRlU3R5bGVzRWwpIHtcblxuXHRcdG9ic29sZXRlU3R5bGVzRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvYnNvbGV0ZVN0eWxlc0VsKTtcblx0fVxufSIsInZhciBzaGFyZWRJbml0ID0gcmVxdWlyZSgnLi9jb3JlL3NoYXJlZEluaXQnKTtcblxuaWYod2luZG93LmlzUmVhZHkpIHtcblx0aW5pdCgpO1xuXG59IGVsc2Uge1xuXHR3aW5kb3cuaW5pdCA9IGluaXQ7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG5cblx0c2hhcmVkSW5pdCgpO1xufSJdfQ==
