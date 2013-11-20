path = require "path"
{reverse2, partial2, partial3, flatSplat} = require path.join(__dirname, "util.js")
_ = require "underscore"
moment = require "moment"

checkMoment = (possibleMoment) ->
	if moment.isMoment(possibleMoment)
		return possibleMoment
	return moment(possibleMoment)


xyz_from_yzx = (fn) -> 
	(y, z, x) ->
		fn(x, y, z)



preds = do ->
	_isBetween = (possiblyBetween, beforeMoment, afterMoment) ->
		beforeMoment = checkMoment(beforeMoment)
		afterMoment = checkMoment(afterMoment)
		if beforeMoment.isBefore(possiblyBetween) or beforeMoment.isSame(possiblyBetween)
			if possiblyBetween.isBefore(afterMoment)
				return true
		return false

	isBetween = partial3(_isBetween)
	isBetweenMoments = partial3(xyz_from_yzx(_isBetween))

	_isAfter = (compare, compareAgainst) ->
		compare = checkMoment(compare)
		if compare.isAfter(compareAgainst) then return true
		return false

	isAfter = partial2 _isAfter
	isAfterMoment = partial2(reverse2(_isAfter))
	isAfterDate = isAfterMoment

	_isBefore = (compare, compareAgainst) ->
		compare = checkMoment(compare)
		if compare.isBefore(compareAgainst) then return true
		return false

	isBefore = partial2 _isBefore
	isBeforeMoment = partial2(reverse2(isBefore))
	isBeforeData = isBeforeMoment


	out =
		isBetween: isBetween
		isBetweenMoments: isBetweenMoments
		isAfter: isAfter
		isAfterMoment: isAfterMoment
		isAfterDate: isAfterMoment
		isBefore: isBefore
		isBeforeMoment: isBeforeMoment
		isBeforeDate: isBeforeMoment

module.exports = preds
