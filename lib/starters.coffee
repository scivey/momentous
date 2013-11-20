path = require "path"
{reverse2, partial2, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"

starters = do ->
	_starters = [
		"Year"
		"Month"
		"Week"
		"Day"
		"Hour"
		"Minute"
		"Second"
	]
	_outs = {}
	_.each _starters, (oneStarter) ->
		_fnKey = "startOf" + oneStarter
		_lcased = oneStarter.toLowerCase()
		_outs[_fnKey] = (targetMoment) ->
			targetMoment.clone().startOf(_lcased)

	_stringStartOf = (startString, targetMoment) ->
		targetMoment.clone().startOf(startString)

	_outs.startOf = partial2(_stringStartOf)
	_outs.startOfMoment = partial2( reverse2(_stringStartOf) )

	_outs


module.exports = starters
