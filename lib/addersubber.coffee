path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"



manipulators = do ->
	_outs = {}
	_unpartialedAdders =
		years: (targetMoment, years) ->
			targetMoment.clone().add("y", years)

		days: (targetMoment, days) ->
			targetMoment.clone().add("d", days)

		months: (targetMoment, months) ->
			targetMoment.clone().add("M", months)

		hours: (targetMoment, hours) ->
			targetMoment.clone().add("h", hours)

		minutes: (targetMoment, minutes) ->
			targetMoment.clone().add("m", minutes)

		seconds: (targetMoment, seconds) ->
			targetMoment.clone().add("s", seconds)

		milliseconds: (targetMoment, millisecs) ->
			targetMoment.clone().add('ms', millisecs)

		lit: (targetMoment, objectLiteral) ->
			targetMoment.clone().add(objectLiteral)


	adders = do ->
		_partialed = {}
		_.each _.pairs(_unpartialedAdders), (onePair) ->
			_partialed[onePair[0]] = partial2(onePair[1])
		_partialed


	addByers = do ->
		_reversed = {}
		_.each _.pairs(_unpartialedAdders), (onePair) ->
			_reversed[onePair[0]] = partial2(reverse2(onePair[1]))
		_reversed

	add = adders.lit
	_.extend add, adders
	addBy = addByers.lit
	_.extend addBy, addByers

	_outs.add = add
	_outs.addBy = addBy

	_unpartialedSubtracters =
		years: (targetMoment, years) ->
			targetMoment.clone().subtract("y", years)

		days: (targetMoment, days) ->
			targetMoment.clone().subtract("d", days)

		months: (targetMoment, months) ->
			targetMoment.clone().subtract("M", months)

		hours: (targetMoment, hours) ->
			targetMoment.clone().subtract("h", hours)

		minutes: (targetMoment, minutes) ->
			targetMoment.clone().subtract("m", minutes)

		seconds: (targetMoment, seconds) ->
			targetMoment.clone().subtract("s", seconds)

		milliseconds: (targetMoment, millisecs) ->
			targetMoment.clone().subtract('ms', millisecs)

		lit: (targetMoment, objectLiteral) ->
			targetMoment.clone().subtract(objectLiteral)


	subbers = do ->
		_partialed = {}
		_.each _.pairs(_unpartialedSubtracters), (onePair) ->
			_partialed[onePair[0]] = partial2(onePair[1])
		_partialed


	subByers = do ->
		_reversed = {}
		_.each _.pairs(_unpartialedSubtracters), (onePair) ->
			_reversed[onePair[0]] = partial2(reverse2(onePair[1]))
		_reversed

	sub = subbers.lit
	subBy = subByers.lit

	_.extend sub, subbers
	_.extend subBy, subByers

	_outs.sub = sub
	_outs.subBy = subBy
	_outs



module.exports = manipulators

