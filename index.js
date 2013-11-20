// Generated by CoffeeScript 1.6.3
(function() {
  var addersubber, enders, flatSplat, getters, inDir, inLib, misc, moment, momentous, oneRand, partial2, path, predicates, printem, randBetween, randDates, reverse2, selectors, sorters, starters, toStrings, _, _ref,
    __slice = [].slice;

  moment = require("moment");

  _ = require("underscore");

  path = require("path");

  _ref = require(path.join(__dirname, "lib/util.js")), reverse2 = _ref.reverse2, partial2 = _ref.partial2, flatSplat = _ref.flatSplat, inDir = _ref.inDir;

  inLib = inDir(path.join(__dirname, "lib"));

  randBetween = function(startMoment, endMoment, resolution) {
    var diff, randDiff, randRatio, result;
    if (resolution == null) {
      resolution = "ms";
    }
    diff = startMoment.diff(endMoment, resolution);
    console.log(diff);
    randRatio = Math.random();
    console.log(randRatio);
    randDiff = randRatio * diff;
    console.log(randDiff);
    result = endMoment.clone().add(resolution, randDiff);
    return result;
  };

  momentous = {};

  getters = require(inLib("getters.js"));

  _.extend(momentous, getters);

  predicates = require(inLib("predicates.js"));

  _.extend(momentous, predicates);

  selectors = require(inLib("selectors.js"));

  _.extend(momentous, selectors);

  addersubber = require(inLib("addersubber.js"));

  _.extend(momentous, addersubber);

  starters = require(inLib("starters.js"));

  _.extend(momentous, starters);

  enders = require(inLib("enders.js"));

  _.extend(momentous, enders);

  sorters = require(inLib("sorters.js"));

  momentous.sort = sorters.ascending;

  _.extend(momentous.sort, sorters);

  misc = require(inLib("misc.js"));

  oneRand = (function() {
    var fiveYears, now, _diff;
    now = moment();
    fiveYears = momentous.add.years(now, 5);
    _diff = misc.absDiff(now, fiveYears);
    return function() {
      var diffAmt, sign, _diffAmt, _rnd;
      _rnd = Math.random();
      diffAmt = _diff * _rnd;
      sign = Math.random();
      if (sign < 0.5) {
        _diffAmt = _diffAmt * -1;
      }
      return momentous.add(now, diffAmt);
    };
  })();

  randDates = function(dateCount) {
    var _outs;
    if (dateCount == null) {
      dateCount = 12;
    }
    _outs = [];
    while (dateCount--) {
      _outs.push(oneRand());
    }
    return _outs;
  };

  toStrings = function() {
    var dateList, _strung;
    dateList = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (_.isArray(dateList[0])) {
      dateList = dateList[0];
    }
    _strung = _.map(dateList, function(oneDate) {
      return oneDate.format();
    });
    return _strung;
  };

  printem = function(dateList) {
    return console.log(toStrings(dateList));
  };

  module.exports = momentous;

}).call(this);
