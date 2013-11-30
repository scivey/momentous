// Generated by CoffeeScript 1.6.3
(function() {
  var assert, catMoments, cloneMomentList, flatSplat, inDir, inLib, inSpec, intRange, makeMomentBetween, makeNMomentsBetween, moment, path, sel, _,
    __slice = [].slice;

  _ = require("underscore");

  moment = require("moment");

  path = require("path");

  assert = require("better-assert");

  inDir = function(dir) {
    if (dir == null) {
      dir = __dirname;
    }
    return function(fName) {
      return path.join(dir, fName);
    };
  };

  inSpec = inDir();

  inLib = inDir("../lib");

  sel = require(inLib("selectors.js"));

  intRange = function(start, end) {
    var num, offset, range;
    range = (end - start) + 1;
    offset = Math.random() * range;
    offset = Math.floor(offset);
    num = start + offset;
    return num;
  };

  makeMomentBetween = function(first, second) {
    var diffAmt, working, _diff;
    working = second.clone();
    _diff = working.diff(first);
    _diff = Math.abs(_diff);
    diffAmt = Math.random() * _diff;
    if (diffAmt < 0.05) {
      diffAmt += 0.05;
    }
    if (diffAmt > 0.95) {
      diffAmt -= 0.05;
    }
    working.subtract(diffAmt);
    return working;
  };

  makeNMomentsBetween = function(n, first, second) {
    var _count, _moments;
    _moments = [];
    _count = n;
    while (n--) {
      _moments.push(makeMomentBetween(first, second));
    }
    return _moments;
  };

  flatSplat = function(list) {
    if (_.size(list) === 1 && _.isArray(list[0])) {
      return list[0];
    }
    return list;
  };

  cloneMomentList = function(momentList) {
    var outs;
    if (moment.isMoment(momentList)) {
      return momentList.clone();
    }
    momentList = flatSplat(momentList);
    outs = _.map(momentList, function(oneMoment) {
      return oneMoment.clone();
    });
    return outs;
  };

  catMoments = function() {
    var momentLists, _momentLists;
    momentLists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _momentLists = _.flatten(flatSplat(momentLists));
    return _momentLists;
  };

  describe("momentous::selectors", function() {
    var all, allButNow, earlies, earlyRef, inTwelveHrs, lateRef, lates, midEarlies, midLates, now, shuffled, tomorrow, twelveHrsAgo, yesterday;
    now = moment();
    yesterday = {};
    all = {};
    tomorrow = {};
    inTwelveHrs = {};
    twelveHrsAgo = {};
    earlyRef = {};
    lateRef = {};
    earlies = [];
    lates = [];
    allButNow = [];
    shuffled = [];
    midEarlies = [];
    midLates = [];
    beforeEach(function() {
      var _earlyCount, _lateCount;
      now = moment();
      yesterday = now.clone().subtract("days", 1);
      tomorrow = now.clone().add("days", 1);
      inTwelveHrs = now.clone().add("hours", 12);
      twelveHrsAgo = now.clone().subtract("hours", 12);
      earlyRef = now.clone().subtract("years", 5);
      lateRef = now.clone().add("years", 5);
      _earlyCount = intRange(20, 30);
      _lateCount = intRange(20, 30);
      earlies = makeNMomentsBetween(_earlyCount, earlyRef, yesterday);
      midEarlies = _.clone(earlies);
      earlies.push(yesterday.clone());
      earlies.push(twelveHrsAgo.clone());
      earlies.push(earlyRef.clone());
      earlies = _.shuffle(earlies);
      lates = makeNMomentsBetween(_lateCount, tomorrow, lateRef);
      midLates = _.clone(lates);
      lates.push(tomorrow.clone());
      lates.push(inTwelveHrs.clone());
      lates.push(lateRef.clone());
      lates = _.shuffle(lates);
      allButNow = catMoments(earlies, lates);
      all = _.clone(allButNow);
      all.push(now.clone());
      return shuffled = _.shuffle(all);
    });
    describe("allBefore", function() {
      it("selects all dates before its first parameter's date value", function() {
        var selBefores;
        selBefores = sel.allBefore(now, shuffled);
        return assert(_.size(selBefores) === _.size(earlies));
      });
      it("returns an empty array if no elements in the target array are before the date", function() {
        var befores;
        befores = sel.allBefore(earlyRef, shuffled);
        assert(befores instanceof Array);
        return assert(_.size(befores) === 0);
      });
      return it("partially applies a single argument", function() {
        var beforeNow, befores;
        beforeNow = sel.allBefore(now);
        befores = beforeNow(shuffled);
        return assert(_.size(befores) === _.size(earlies));
      });
    });
    describe("allAfter", function() {
      it("selects all dates after its first parameter's date value", function() {
        var selAfters;
        selAfters = sel.allAfter(now, shuffled);
        return assert(_.size(selAfters) === _.size(lates));
      });
      it("returns an empty array if no elements in the target array are after the date", function() {
        var afters;
        afters = sel.allAfter(lateRef, shuffled);
        assert(afters instanceof Array);
        return assert(_.size(afters) === 0);
      });
      return it("partially applies a single argument", function() {
        var afterNow, afters;
        afterNow = sel.allAfter(now);
        afters = afterNow(shuffled);
        return assert(_.size(afters) === _.size(lates));
      });
    });
    describe("earliest", function() {
      it("returns the earliest date in an array of dates", function() {
        var _early;
        _early = sel.earliest(all);
        return assert(_early.format() === earlyRef.format());
      });
      return it("returns the earliest date from a splat of dates extending from the second parameter on", function() {
        var earliest, _rand;
        _rand = _.sample(all, 4);
        earliest = sel.earliest(_rand[0], _rand[1], earlyRef, _rand[2], _rand[3]);
        return assert(earliest.format() === earlyRef.format());
      });
    });
    describe("latest", function() {
      it("returns the latest date in an array of dates", function() {
        var _late;
        _late = sel.latest(all);
        return assert(_late.format() === lateRef.format());
      });
      return it("returns the latest date from a splat of dates extending from the second parameter on", function() {
        var latest, _rand;
        _rand = _.sample(all, 4);
        latest = sel.latest(_rand[0], _rand[1], lateRef, _rand[2], _rand[3]);
        return assert(latest.format() === lateRef.format());
      });
    });
    describe("closestTo", function() {
      it("selects the closest date to its first argument from a list of dates", function() {
        var closeAfter, closeBefore;
        closeBefore = sel.closestTo(now, earlies);
        assert(closeBefore.format() === twelveHrsAgo.format());
        closeAfter = sel.closestTo(now, lates);
        return assert(closeAfter.format() === inTwelveHrs.format());
      });
      it("selects from a variable number of dates given after the first parameter", function() {
        var closest, _rand;
        _rand = _.sample(earlies, 3);
        closest = sel.closestTo(now, _rand[0], _rand[1], twelveHrsAgo, _rand[2]);
        return assert(closest.format() === twelveHrsAgo.format());
      });
      it("selects from an array of dates given after the first parameter", function() {
        var closest, _rand;
        _rand = _.sample(earlies, 10);
        _rand.push(twelveHrsAgo);
        closest = sel.closestTo(now, _rand);
        return assert(closest.format() === twelveHrsAgo.format());
      });
      return it("partially applies a single parameter", function() {
        var closest, closestToNow, _rand;
        _rand = _.sample(earlies, 10);
        _rand.push(twelveHrsAgo);
        closestToNow = sel.closestTo(now);
        closest = closestToNow(_rand);
        return assert(closest.format() === twelveHrsAgo.format());
      });
    });
    describe("farthestFrom", function() {
      it("selects the farthest date from its first argument out of a list of dates", function() {
        var farAfter, farBefore;
        farBefore = sel.farthestFrom(now, earlies);
        assert(farBefore.format() === earlyRef.format());
        farAfter = sel.farthestFrom(now, lates);
        return assert(farAfter.format() === lateRef.format());
      });
      it("selects from a variable number of dates given after the first parameter", function() {
        var farthest, _rand;
        _rand = _.sample(earlies, 3);
        farthest = sel.farthestFrom(now, _rand[0], _rand[1], earlyRef, _rand[2]);
        return assert(farthest.format() === earlyRef.format());
      });
      it("selects from an array of dates given after the first parameter", function() {
        var farthest, _rand;
        _rand = _.sample(lates, 10);
        _rand.push(lateRef);
        farthest = sel.farthestFrom(now, _rand);
        return assert(farthest.format() === lateRef.format());
      });
      return it("partially applies a single parameter", function() {
        var farthest, farthestFromNow, _rand;
        _rand = _.sample(lates, 10);
        _rand.push(lateRef);
        farthestFromNow = sel.farthestFrom(now);
        farthest = farthestFromNow(_rand);
        return assert(farthest.format() === lateRef.format());
      });
    });
    describe("closestBefore", function() {
      it("returns the closest date _before_ the first parameter's date value when there is a closer date falling after that value.", function() {
        var befores, close, closestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        befores = sel.allBefore(now, _rand);
        closestCalculated = sel.latest(befores);
        toTest = _.clone(befores);
        toTest.push(inTwelveHrs);
        close = sel.closestBefore(now, toTest);
        return assert(close.format() === closestCalculated.format());
      });
      return it("partially applies a single parameter", function() {
        var befores, close, closestBeforeNow, closestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        befores = sel.allBefore(now, _rand);
        closestCalculated = sel.latest(befores);
        toTest = _.clone(befores);
        toTest.push(inTwelveHrs);
        closestBeforeNow = sel.closestBefore(now);
        close = closestBeforeNow(toTest);
        return assert(close.format() === closestCalculated.format());
      });
    });
    describe("closestAfter", function() {
      it("returns the closest date _after_ the first parameter's date value when there is a closer date falling before that value.", function() {
        var afters, close, closestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        afters = sel.allAfter(now, _rand);
        closestCalculated = sel.earliest(afters);
        toTest = _.clone(afters);
        toTest.push(twelveHrsAgo);
        close = sel.closestAfter(now, toTest);
        return assert(close.format() === closestCalculated.format());
      });
      return it("partially applies a single parameter", function() {
        var afters, close, closestAfterNow, closestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        afters = sel.allAfter(now, _rand);
        closestCalculated = sel.earliest(afters);
        toTest = _.clone(afters);
        toTest.push(twelveHrsAgo);
        closestAfterNow = sel.closestAfter(now);
        close = closestAfterNow(toTest);
        return assert(close.format() === closestCalculated.format());
      });
    });
    describe("farthestBefore", function() {
      it("returns the farthest date _before_ the first parameter's date value when there is a farther date falling after that value.", function() {
        var befores, far, farthestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        befores = sel.allBefore(now, _rand);
        farthestCalculated = sel.earliest(befores);
        toTest = _.clone(befores);
        toTest.push(lateRef);
        far = sel.farthestBefore(now, toTest);
        return assert(far.format() === farthestCalculated.format());
      });
      return it("partially applies a single parameter", function() {
        var befores, far, farthestBeforeNow, farthestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        befores = sel.allBefore(now, _rand);
        farthestCalculated = sel.earliest(befores);
        toTest = _.clone(befores);
        toTest.push(lateRef);
        farthestBeforeNow = sel.farthestBefore(now);
        far = farthestBeforeNow(toTest);
        return assert(far.format() === farthestCalculated.format());
      });
    });
    return describe("farthestAfter", function() {
      it("returns the farthest date _after_ the first parameter's date value when there is a farther date falling before that value.", function() {
        var afters, far, farthestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        afters = sel.allAfter(now, _rand);
        farthestCalculated = sel.latest(afters);
        toTest = _.clone(afters);
        toTest.push(earlyRef);
        far = sel.farthestAfter(now, toTest);
        return assert(far.format() === farthestCalculated.format());
      });
      return it("partially applies a single parameter", function() {
        var afters, far, farthestAfterNow, farthestCalculated, toTest, _rand;
        _rand = _.sample(all, 20);
        afters = sel.allAfter(now, _rand);
        farthestCalculated = sel.latest(afters);
        toTest = _.clone(afters);
        toTest.push(earlyRef);
        farthestAfterNow = sel.farthestAfter(now);
        far = farthestAfterNow(toTest);
        return assert(far.format() === farthestCalculated.format());
      });
    });
  });

}).call(this);