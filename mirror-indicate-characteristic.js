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
    ]
  });

    this._value = new Buffer(0);
    this._updateValueCallback = null;

};

util.inherits(MirrorIndicateCharacteristic, Characteristic);

MirrorIndicateCharacteristic.prototype.onReadRequest = function(offset, callback) {
    if (os.platform() === 'darwin') {
	callback(this.RESULT_SUCCESS, this._value);
    } else {
	callback(this.RESULT_SUCCESS, this._value);
  }
};

MirrorIndicateCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

    this._value = data;

    if (os.platform() == 'darwin') {
	console.log('request write: ' + this._value.toString('hex'));
    }

  if (this._updateValueCallback) {
    console.log(':MirrorIndicateCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
  }

    callback(this.RESULT_SUCCESS);
}

MirrorIndicateCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('MirrorIndicateCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

MirrorIndicateCharacteristic.prototype.onUnsubscribe = function() {
  console.log('MirrorIndicateCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = MirrorIndicateCharacteristic;
