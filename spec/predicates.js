// Generated by CoffeeScript 1.6.3
(function() {
  var assert, inDir, inLib, inSpec, moment, path, preds, _;

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

  preds = require(inLib("predicates.js"));

  describe("momentous::predicates", function() {
    var earlier, later, now;
    now = moment();
    earlier = {};
    later = {};
    beforeEach(function() {
      now = moment();
      earlier = now.clone().subtract("years", 5);
      return later = now.clone().add("years", 5);
    });
    describe("isBefore", function() {
      it("returns true when its second argument's date is before the first's", function() {
        return assert(preds.isBefore(later, now));
      });
      it("returns false when its second argument's date is after the first's", function() {
        return assert(preds.isBefore(earlier, now) === false);
      });
      return it("partially applies a single argument", function() {
        var isBeforeEarlier, isBeforeLater;
        isBeforeLater = preds.isBefore(later);
        isBeforeEarlier = preds.isBefore(earlier);
        assert(isBeforeLater(now) === true);
        return assert(isBeforeEarlier(now) === false);
      });
    });
    describe("isAfter", function() {
      it("returns true when its second argument's date is after the first's", function() {
        return assert(preds.isAfter(earlier, now) === true);
      });
      it("returns false when its second argument's date is before the first's", function() {
        return assert(preds.isAfter(later, now) === false);
      });
      return it("partially applies a single argument", function() {
        var isAfterEarlier, isAfterLater;
        isAfterLater = preds.isAfter(later);
        isAfterEarlier = preds.isAfter(earlier);
        assert(isAfterLater(now) === false);
        return assert(isAfterEarlier(now) === true);
      });
    });
    describe("isBetween", function() {
      it("returns true when its third argument's date is in the range between its first and second arguments.", function() {
        return assert(preds.isBetween(earlier, later, now) === true);
      });
      it("returns false when its third argument's date is not in the range between its first and second arguments.", function() {
        assert(preds.isBetween(now, later, earlier) === false);
        return assert(preds.isBetween(earlier, now, later) === false);
      });
      it("partially applies a single argument", function() {
        var partEarlier, partLater, partNow;
        partEarlier = preds.isBetween(earlier);
        assert(partEarlier(now, later) === false);
        assert(partEarlier(later, now) === true);
        partLater = preds.isBetween(later);
        assert(partLater(now, earlier) === false);
        assert(partLater(earlier, now) === false);
        partNow = preds.isBetween(now);
        assert(partNow(earlier, later) === false);
        return assert(partNow(later, earlier) === false);
      });
      return it("partially applies two arguments", function() {
        var partEarlyLate, partNowLate;
        partEarlyLate = preds.isBetween(earlier, later);
        assert(partEarlyLate(now) === true);
        partNowLate = preds.isBetween(now, later);
        return assert(partNowLate(earlier) === false);
      });
    });
    return describe("isMomentBetween", function() {
      it("returns true when its first argument's date is in the range between its second and third.", function() {
        return assert(preds.isMomentBetween(now, earlier, later) === true);
      });
      it("returns false when its third argument's date is not in the range between its first and second arguments.", function() {
        assert(preds.isMomentBetween(earlier, now, later) === false);
        return assert(preds.isMomentBetween(later, earlier, now) === false);
      });
      it("partially applies a single argument", function() {
        var partEarly, partLate, partNow;
        partNow = preds.isMomentBetween(now);
        assert(partNow(earlier, later) === true);
        partEarly = preds.isMomentBetween(earlier);
        assert(partEarly(now, later) === false);
        partLate = preds.isMomentBetween(later);
        return assert(partLate(earlier, now) === false);
      });
      return it("partially applies two arguments", function() {
        var partLateEarly, partNowEarly;
        partNowEarly = preds.isMomentBetween(now, earlier);
        assert(partNowEarly(later) === true);
        partLateEarly = preds.isMomentBetween(later, earlier);
        return assert(partLateEarly(now) === false);
      });
    });
  });

}).call(this);
