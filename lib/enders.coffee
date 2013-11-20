path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"

enders = do ->
	_enders = [
		"Year",
		"Month"
		"Week"
		"Day"
		"Hour"
		"Minute"
		"Second"
	]
	_outs = {}
	_.each _enders, (oneEnder) ->
		_fnKey = "endOf" + oneEnder
		_lcased = oneEnder.toLowerCase()
		_outs[_fnKey] = (targetMoment) ->
			targetMoment.clone().endOf(_lcased)

	_stringEndOf = (endString, targetMoment) ->
		targetMoment.clone().endOf(endString)

	_outs.endOf = partial2(_stringEndOf)
	_outs.endOfMoment = partial2( reverse2(_stringEndOf) )

	_outs

module.exports = enders
