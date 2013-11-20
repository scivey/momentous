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

  _mstart = require(inLib("starters.js"));

  meq = function(moment1, moment2) {
    if (moment1.format() === moment2.format()) {
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
    describe("startOfYear", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest year", function() {
        var modified, momentWay;
        modified = _mstart.startOfYear(now);
        momentWay = now.clone().startOf("year");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfYear(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("startOfMonth", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest month", function() {
        var modified, momentWay;
        modified = _mstart.startOfMonth(now);
        momentWay = now.clone().startOf("month");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfMonth(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("startOfWeek", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest week", function() {
        var modified, momentWay;
        modified = _mstart.startOfWeek(now);
        momentWay = now.clone().startOf("week");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfWeek(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("startOfDay", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest day", function() {
        var modified, momentWay;
        modified = _mstart.startOfDay(now);
        momentWay = now.clone().startOf("day");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfDay(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("startOfHour", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest hour", function() {
        var modified, momentWay;
        modified = _mstart.startOfHour(now);
        momentWay = now.clone().startOf("hour");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfHour(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    describe("startOfMinute", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest minute", function() {
        var modified, momentWay;
        modified = _mstart.startOfMinute(now);
        momentWay = now.clone().startOf("minute");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfMinute(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
    return describe("startOfSecond", function() {
      it("returns a clone of the passed moment, rounded down to the start of the nearest second", function() {
        var modified, momentWay;
        modified = _mstart.startOfSecond(now);
        momentWay = now.clone().startOf("second");
        return assert(meq(modified, momentWay));
      });
      return it("does not modify the original moment", function() {
        var cloned, modified;
        cloned = now.clone();
        modified = _mstart.startOfSecond(now);
        assert(meq(modified, now) === false);
        return assert(meq(now, cloned));
      });
    });
  });

}).call(this);
