_ = require "underscore"
moment = require "moment"
path = require "path"
assert = require "better-assert"

inDir = (dir) ->
	unless dir?
		dir = __dirname
	(fName) ->
		path.join(dir, fName)

inSpec = inDir()
inLib = inDir("../lib")

preds = require inLib("predicates.js")

describe "momentous::predicates", ->

	now = moment()
	earlier = {}
	later = {}
	beforeEach ->
		now = moment()
		earlier = now.clone().subtract("years", 5)
		later = now.clone().add("years", 5)


	describe "isBefore", ->

		it "returns true when its first argument's date is before the second's", ->
			assert( preds.isBefore(now, later) )


		it "returns false when its first argument's date is after the second's", ->
			assert( preds.isBefore(now, earlier) is false )

		it "partially applies a single argument", ->
			isNowBefore = preds.isBefore(now)
			assert( isNowBefore(later) is true )
			assert( isNowBefore(earlier) is false)

	describe "isBeforeMoment", ->
		it "returns true when its second argument's date is before the first's", ->
			assert( preds.isBeforeMoment(later, now) )


		it "returns false when its second argument's date is after the first's", ->
			assert( preds.isBeforeMoment(earlier, now) is false )

		it "partially applies a single argument", ->
			isBeforeLater = preds.isBeforeMoment(later)
			isBeforeEarlier = preds.isBeforeMoment(earlier)
			assert( isBeforeLater(now) is true )
			assert( isBeforeEarlier(now) is false)


	describe "isAfter", ->

		it "returns true when its first argument's date is after the second's", ->
			assert( preds.isAfter(now, earlier) is true )


		it "returns false when its first argument's date is before the second's", ->
			assert( preds.isAfter(now, later) is false )

		it "partially applies a single argument", ->
			isNowLater = preds.isAfter(now)
			assert( isNowLater(earlier) is true )
			assert( isNowLater(later) is false)


	describe "isAfterMoment", ->
		it "returns true when its second argument's date is after the first's", ->
			assert( preds.isAfterMoment(earlier, now) is true )


		it "returns false when its second argument's date is before the first's", ->
			assert( preds.isAfterMoment(later, now) is false )

		it "partially applies a single argument", ->
			isAfterLater = preds.isAfterMoment(later)
			isAfterEarlier = preds.isAfterMoment(earlier)
			assert( isAfterLater(now) is false )
			assert( isAfterEarlier(now) is true)


	describe "isBetween", ->

		it "returns true when its first argument's date is after the second's and before the third's.", ->
			assert( preds.isBetween(now, earlier, later) is true )

		it "returns false when its first argument's date is before the second's or after the third's.", ->
			assert( preds.isBetween(earlier, now, later) is false )
			assert( preds.isBetween(later, earlier, now) is false )

		it "partially applies a single argument", ->
			isNowBetween = preds.isBetween(now)
			assert( isNowBetween(earlier, later) is true )
			isEarlierBetween = preds.isBetween(earlier)
			assert( isEarlierBetween(now, later) is false)

		it "partially applies two arguments", ->
			isNowBefore = preds.isBetween(now,earlier)
			assert( isNowBefore(later) is true )
			isLaterBefore = preds.isBetween(later, earlier)
			assert( isLaterBefore(now) is false)

	describe "isBetweenMoments", ->

		it "returns true when its third argument's date is after the firsts's and before the seconds's.", ->
			assert( preds.isBetweenMoments(earlier, later, now) is true )

		it "returns false when its third argument's date is before the first's or after the second's.", ->
			assert( preds.isBetweenMoments(now, later, earlier) is false )
			assert( preds.isBetweenMoments(earlier, now, later) is false )

		it "partially applies a single argument", ->
			isAfterEarlier = preds.isBetweenMoments(earlier)
			isAfterNow = preds.isBetweenMoments(now)

			assert( isAfterEarlier(later, now) is true )
			assert( isAfterNow(later, earlier) is false)

		it "partially applies two arguments", ->
			isBetweenEarlierAndLater = preds.isBetweenMoments(earlier, later)
			isBetweenEarlierAndNow = preds.isBetweenMoments(earlier, now)
			isBetweenNowAndLater = preds.isBetweenMoments(now, later)

			assert( isBetweenEarlierAndLater(now) is true)
			assert( isBetweenEarlierAndNow(later) is false)
			assert( isBetweenNowAndLater(earlier) is false)


