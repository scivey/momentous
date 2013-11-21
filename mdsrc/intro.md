
__Momentous__ is a functionally-oriented utility library for manipulating [Moment.js][momentjsuri]-format date and time objects. It is especially suited to list processing, but can also manipulate individual Moment instances.

[momentjsuri]:http://www.momentjs.com

The methods in __Momentous__ have partial application built-in, and have left- and right-handed variants wherever it makes sense.

That means this works:

```javascript
var moment = require("moment");
var momentous = require("momentous");

var todayAt8AM = moment().hours(8).startOf("hour");
var timeFrom8AM = momentous.add(todayAt8AM);

var threeHrs5Mins17SecsLater = timeFrom8AM({hours: 3,
											minutes: 5,
											seconds: 17});

momentous.log(threeHrs5Mins17SecsLater)
// 2013-11-20 T11:05:17
```


And this also works:

```javascript
var now = moment();
var add1Month17Days = momentous.addBy({months: 1, days: 17});

var july5 = moment("2013-07-05");
var sometimeLater = add1Month17Days(july5);

momentous.log("YYYY-MM-DD", sometimeLater);
// 2013-08-22
```

All methods produce clones of existing Moments, and never mutate the originals.

```javascript
var now = moment();
var later = momentous.add(now, {hours: 5});

momentous.log(later);
// 2013-11-20 T19:39:53

momentous.log(now);
// 2013-11-20 T14:39:53

```

__Momentous__ includes powerful methods for generating sequences of dates:

```javascript

var dates = momentous.range("2013-10-10", 
							"2013-10-26",
							{days: 3});

momentous.log("MMM-DD", dates);
//	[Oct-10, Oct-13, Oct-16, 
//	Oct-19, Oct-22, Oct-25]

```

... which can be used to generate moment instances representing any kind of time interval:

```javascript
var now = moment()
var inTwoMins = momentous.add(now, 
						{minutes: 2});

var every17Secs = momentous.range(now,
							inTwoMins,
							{ seconds:17 });

momentous.log(every17Secs)
// [ 20-Nov 20:34:10, 20-Nov 20:34:27,
//	20-Nov 20:34:44, 20-Nov 20:35:01, 
//	20-Nov 20:35:18, 20-Nov 20:35:35, 
//	20-Nov 20:35:52, 20-Nov 20:36:09 ]
```

__Momentous__ can also generate random dates within an interval:

```javascript

var randomDate = momentous.randBetween("2000-09-01", "2010-05-01")
momentous.log("YYYY MMM DD", randomDate);
// [ 2003 Aug 10 ]

var moreRandoms = momentous.nRandBetween(5, "2000-09-01", "2010-05-01")
momentous.log("YYYY MMM DD", moreRandoms);
//	[ 2004 Oct 30, 2003 May 09, 2009 Mar 03, 
//	2007 Sep 17, 2006 Jun 21 ]

```

Or within a given range of a seed date:

```javascript

var randomDate = momentous.randAround("2013-05-14", {days: 10})

momentous.log("YYYY MMM DD", randomDate);
// [ 2013 May 06 ]

var moreRandoms = momentous.nRandAround(4, "2013-05-14", {months: 2})
// [ 2013 Jun 25, 2013 Jul 06,
//	2013 Apr 14, 2013 Apr 11 ]


```

The range functions have built-in partial application and left- and right-handed versions, too:

```javascript
var makeDayRange = momentous.rangeBy({days: 1});

var today = now();
var inFourDays = momentous.add(today, {days: 4});

var nextFewDays = makeDayRange(today, inFourDays);
momentous.log("YYYY-MMM-DD", nextFewDays);

// [ 2013-Nov-20, 2013-Nov-21,
//	2013-Nov-22, 2013-Nov-23]
```

... and so do the random functions:

```javascript
var randWithin10Days = momentous.randWithin({days: 10});
var today = moment();
momentous.log("YYYY-MMM-DD", today);
// [ 2013-Nov-20 ]

var randMoment = randWithin10Days(today);
momentous.log("YYYY-MMM-DD", randMoment);
// [ 2013-Nov-16 ]
```

... as do many of the utility functions:

```javascript
var dateLogger = momentous.log("e, DD MMMM YYYY");
dateLogger(moment());
// "[ 20 November 2013 ]"

```

__Momentous__'s behavior is verified by over [over 200 unit tests][testHref] pre-commit, and its API is [fully documented][docsHref].

[Read the overview ==>][overviewHref]

[testHref]:./spec.html
[docsHref]:./api.html
[overviewHref]:./overview.html