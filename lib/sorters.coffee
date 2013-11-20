path = require "path"
{reverse2, partial2, flatSplat, inDir} = require path.join(__dirname, "util.js")
_ = require "underscore"

inHere = inDir(__dirname)

partial1 = (fn, x) ->
	if x?
		fn(x)
	else
		(x) ->
			fn(x)

negate = (fn, input) ->
	output = fn(input)
	if _.isNumber(output)
		return (output * -1)
	! output

negate = partial2 negate

momentVal = (aMoment) -> aMoment.valueOf()
negMomentVal = (aMoment) -> ( -1 * aMoment.valueOf() )

_g = require inHere("getters.js")

sorters = do ->
	_sort = (sortByFn, momentList...) ->
		momentList = flatSplat(momentList)
		_sorted = _.sortBy momentList, sortByFn
		_sorted

	ascending = partial2 _sort, momentVal
	descending = partial2 _sort, negMomentVal

	#yearAsc = partial2 _sort, _g.getYear
	#yearDesc = partial2 _sort, negate(_g.getYear)


	out =
		ascending: ascending
		asc: ascending
		descending: descending
		desc: descending


module.exports = sorters

