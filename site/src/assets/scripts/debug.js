var socketHandler = require('./core/socketHandler');

removeObsoleteStyles();
function removeObsoleteStyles() {

	var obsoleteStylesEl = document.querySelector('.js-initialStyles');

	if(obsoleteStylesEl) {

		obsoleteStylesEl.parentNode.removeChild(obsoleteStylesEl);
	}
}

socketHandler.init()
	.then(socketHandler.connectCanvas)
	.then(function(salsas){
		console.log('salsas', salsas);
	})
	.fail(function(e){
		console.error(e);
	});
