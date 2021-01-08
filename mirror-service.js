var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var MirrorIndicateCharacteristic = require('./mirror-indicate-characteristic');

function MirrorService() {
    MirrorService.super_.call(this, {
	uuid: '4042000-772f-4fcf-8e98-df2374405b62',
	characteristics: [
	    new MirrorIndicateCharacteristic()
	]
    });
}

util.inherits(MirrorService, BlenoPrimaryService);

module.exports = MirrorService;
