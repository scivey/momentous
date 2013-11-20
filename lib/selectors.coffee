path = require "path"
{reverse2, partial2, flatSplat, inDir, splattedPartial2} = require path.join(__dirname, "util.js")
_ = require "underscore"

inhere = inDir(__dirname)
misc = require inhere("misc.js")


selectors = do ->
	earliest = (momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_earliestSoFar = momentList[0]
		for i in [1..momentList.length-1]
			if momentList[i].isBefore(_earliestSoFar)
				_earliestSoFar = momentList[i]
		return _earliestSoFar


	latest = (momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]	
		_latestSoFar = momentList[0]
		for i in [1..momentList.length-1]
			if momentList[i].isAfter(_latestSoFar)
				_latestSoFar = momentList[i]
		return _latestSoFar

	allBefore = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_before = _.filter momentList, (aMoment) ->
			aMoment.isBefore(compareAgainst)
		_before

	allAfter = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_after = _.filter momentList, (aMoment) ->
			aMoment.isAfter(compareAgainst)
		_after

	closestTo = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_closestSoFar = momentList[0]
		_minDiff = misc.absDiff(compareAgainst, momentList[0])
		for i in [1.. momentList.length-1]
			_diff = misc.absDiff(compareAgainst, momentList[i])
			if _diff < _minDiff
				_closestSoFar = momentList[i]
				_minDiff = _diff
		return _closestSoFar


	farthestFrom = (compareAgainst, momentList...) ->
		if _.isArray(momentList[0])
			momentList = momentList[0]
		_farthestSoFar = momentList[0]
		_maxDiff = misc.absDiff(compareAgainst, momentList[0])
		for i in [1.. momentList.length-1]
			_diff = misc.absDiff(compareAgainst, momentList[i])
			if _diff > _maxDiff
				_farthestSoFar = momentList[i]
				_maxDiff = _diff
		return _farthestSoFar

	closestBefore = (compareAgainst, momentList...) ->
		closestTo(compareAgainst, allBefore(compareAgainst, flatSplat(momentList)))

	closestAfter = (compareAgainst, momentList...) ->
		closestTo(compareAgainst, allAfter(compareAgainst, flatSplat(momentList)))

	farthestBefore = (compareAgainst, momentList...) ->
		farthestFrom(compareAgainst, allBefore(compareAgainst, flatSplat(momentList)))

	farthestAfter = (compareAgainst, momentList...) ->
		farthestFrom(compareAgainst, allAfter(compareAgainst, flatSplat(momentList)))

	_outs = {}

	oneArgs =
		earliest: earliest
		latest: latest

	_.extend _outs, oneArgs

	twoArgs =
		allBefore: allBefore
		allAfter: allAfter
		closestTo: closestTo
		closestBefore: closestBefore
		closestAfter: closestAfter
		farthestFrom: farthestFrom
		farthestBefore: farthestBefore
		farthestAfter: farthestAfter

	_.each _.pairs(twoArgs), (onePair) ->
		fnName = onePair[0]
		fnRef = onePair[1]
		_outs[fnName] = splattedPartial2(fnRef)

	_outs



module.exports = selectors

