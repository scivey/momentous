// Generated by CoffeeScript 1.6.3
(function() {
  var assert, inDir, inLib, inSpec, meq, moment, path, _, _mstart;

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

  _mstart = require(inLib("enders.js"));

  meq = function(moment1, moment2) {
    if (moment1.valueOf() === moment2.valueOf()) {
      return true;
    }
    return false;
  };

  describe("momentous", function() {
    var now, tomorrow, yesterday;
    now = moment();
    if (now.seconds() === 0) {
      now.add("seconds", 10);
    }
    yesterday = {};
    tomorrow = {};
    beforeEach(function() {
      now = moment();
      yesterday = now.clone().subtract("days", 1);
      return tomorrow = now.clone().add("days", 1);
    });
    describe("endOfYear", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest year", function() {
        var modified, momentWay;
        modified = _mstart.endOfYear(now);
        momentWay = now.clone().endOf("year");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfYear(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("endOfMonth", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest month", function() {
        var modified, momentWay;
        modified = _mstart.endOfMonth(now);
        momentWay = now.clone().endOf("month");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfMonth(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("endOfWeek", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest week", function() {
        var modified, momentWay;
        modified = _mstart.endOfWeek(now);
        momentWay = now.clone().endOf("week");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfWeek(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("endOfDay", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest day", function() {
        var modified, momentWay;
        modified = _mstart.endOfDay(now);
        momentWay = now.clone().endOf("day");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfDay(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("endOfHour", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest hour", function() {
        var modified, momentWay;
        modified = _mstart.endOfHour(now);
        momentWay = now.clone().endOf("hour");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfHour(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("endOfMinute", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest minute", function() {
        var modified, momentWay;
        modified = _mstart.endOfMinute(now);
        momentWay = now.clone().endOf("minute");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfMinute(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    return describe("endOfSecond", function() {
      it("returns a clone of the passed moment, rounded up to the end of the nearest second", function() {
        var modified, momentWay;
        modified = _mstart.endOfSecond(now);
        momentWay = now.clone().endOf("second");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.endOfSecond(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
  });

}).call(this);
