var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var MirrorIndicateCharacteristic = function() {
  MirrorIndicateCharacteristic.super_.call(this, {
    uuid: '4042001-772f-4fcf-8e98-df2374405b62',
      properties: ['read', 'write', 'notify'],
      value: null,
    descriptors: [
      new Descriptor({
        uuid: '4042002-772f-4fcf-8e98-df2374405b62',
        value: 'Mirror indicate[start, stop, play, pause]'
      })
	/*
      new Descriptor({
        uuid: '2904',
        value: new Buffer([0x04, 0x01, 0x27, 0xAD, 0x01, 0x00, 0x00 ]) // maybe 12 0xC unsigned 8 bit
      })
	*/
    ]
  });
};

util.inherits(MirrorIndicateCharacteristic, Characteristic);

MirrorIndicateCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (os.platform() === 'darwin') {
    exec('pmset -g batt', function (error, stdout, stderr) {
      var data = stdout.toString();
      // data - 'Now drawing from \'Battery Power\'\n -InternalBattery-0\t95%; discharging; 4:11 remaining\n'
      var percent = data.split('\t')[1].split(';')[0];
      console.log(percent);
      percent = parseInt(percent, 10);
      callback(this.RESULT_SUCCESS, new Buffer([percent]));
    });
  } else {
    // return hardcoded value
    callback(this.RESULT_SUCCESS, new Buffer([98]));
  }
};

module.exports = MirrorIndicateCharacteristic;
