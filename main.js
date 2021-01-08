/*
NOTE: This example no longer works on OSX starting in 10.10 (Yosemite). Apple has apparently blacklisted the battery uuid.
*/

var bleno = require('bleno');

var MirrorService = require('./mirror-service');

var primaryService = new MirrorService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('newn ogawa', [primaryService.uuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([primaryService], function(error){
      console.log('setServices: '  + (error ? 'error ' + error : 'success'));
    });
  }
});
