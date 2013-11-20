moment = require "moment"
_ = require "underscore"
path = require "path"

{reverse2, partial2, flatSplat, inDir} = require path.join(__dirname, "lib/util.js")

inLib = inDir path.join(__dirname, "lib")

randBetween = (startMoment, endMoment, resolution) ->
	resolution ?= "ms"
	diff = startMoment.diff(endMoment, resolution)
	console.log diff
	randRatio = Math.random()
	console.log randRatio
	randDiff = randRatio * diff
	console.log randDiff
	result = endMoment.clone().add(resolution, randDiff)
	result

momentous = {}

getters = require inLib("getters.js")
_.extend momentous, getters

predicates = require inLib("predicates.js")
_.extend momentous, predicates

selectors = require inLib("selectors.js")
_.extend momentous, selectors

addersubber = require inLib("addersubber.js")
_.extend momentous, addersubber

starters = require inLib("starters.js")
_.extend momentous, starters

enders = require inLib("enders.js")
_.extend momentous, enders

sorters = require inLib("sorters.js")
momentous.sort = sorters.ascending
_.extend momentous.sort, sorters

misc = require inLib("misc.js")




# Moment.js shorthands:
# years	y
# months	M
# weeks	w
# days	d
# hours	h
# minutes	m
# seconds	s
# milliseconds	ms





otro = moment("2010-06-08")
now = moment()

btdubs = randBetween(otro, now)

console.log btdubs.format()

console.log btdubs.format()

add2yrs = momentous.addBy.years(2)
addyrsToBtw = momentous.add.years(btdubs)

plusthat = addyrsToBtw(10)

yearGapped = do ->
	_current = moment(now)
	_dates = []
	_count = 10
	while _count--
		_dates.push _current
		_current = momentous.add.years(_current, 1)
	_dates

oneRand = do ->
	now = moment()
	fiveYears = momentous.add.years(now, 5)
	_diff = misc.absDiff(now, fiveYears)
	->
		_rnd = Math.random()
		diffAmt = _diff * _rnd
		sign = Math.random()
		if sign < 0.5
			_diffAmt = _diffAmt * -1
		momentous.add(now, diffAmt)

randDates = (dateCount) ->
	dateCount ?= 12
	_outs = []
	while dateCount--
		_outs.push oneRand()
	_outs


toStrings = (dateList...) ->
	if _.isArray(dateList[0])
		dateList = dateList[0]

	_strung = _.map dateList, (oneDate) -> oneDate.format()
	_strung

printem = (dateList) ->
	console.log toStrings(dateList)

mixed = _.shuffle yearGapped

printem mixed

st = momentous.sort mixed
st2 = momentous.sort.desc mixed
printem st
printem st2

otros = randDates()

printem otros
st3 = momentous.sort.asc(otros)
printem st3
st4 = momentous.sort.desc(otros)
printem st4

st5 = _.map st3, momentous.addBy.years(20)

printem st5
printem _.filter(st5, momentous.isBetween("2035-10-05", "2037-10-05"))



