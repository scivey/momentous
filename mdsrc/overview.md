__Momentous__'s methods are designed for efficient use with functional list programming libraries like [Underscore][underscoreHref] and [Lo-Dash][lodashHref].  Built-in partial application means that a method call with one parameter can often replace the need for an anonymous function literal in a `_.map` or `_.filter` callback.

[underscoreHref]: http://www.underscorejs.org
[lodashHref]: http://www.lodash.com
So instead of this:

```javascript
// `someDates` is an array of moments.
var datesPlusDay = _.map(someDates, function(oneDate) {
	oneDate.clone().add({days: 1});
});
```

You can write this:

```javascript
var datesPlusDay = _.map(someDates, momentous.addBy({days: 1});
```

This saves more and more typing as an operation's logic becomes more complex.  For instance, if you want to extract the dates from `someDates` which occur after November 10, 2012 and then return clones with one day added, you'd normally need to do this:

```javascript
var nov10 = moment("2012-11-10");
var afterNov10PlusOne = _.chain(someDates)
					.filter( function(oneDate) {
						if (oneDate.isAfter(nov10)) {
							return true;
						}
						return false;
					}).map( function(oneDate) {
						var cloned = oneDate.clone();
						return cloned.add({days: 1});
					}).value();
```

But now you can write this:

```javascript
var nov10 = moment("2012-11-10");
var afterNov10PlusOne = _.chain(someDates)
					.filter( momentous.isAfterMoment(nov10) )
					.map( momentous.addBy({days: 1}))
					.value();
```

This extends to any date-related list operation.  There are partially applied predicates for filtering based on sequence, add/subtract methods for mapping, methods for generating lists of moment instances at set intervals or randomly within given constraints, and numerous utility methods.

####Filtering

Partially applied sequence predicates make for efficient list filtering.  `isBefore` and `isAfter` compare their second argument against their first:
```javascript
var oct15 = moment("2013-10-15");
var oct20 = moment("2013-10-20");
var oct10 = moment("2013-10-10");

momentous.isBefore(oct15, oct10); //true

//returns a reusable predicate
var isBeforeOct20 = momentous.isBefore(oct20);
isBeforeOct20(oct10); //also true

var dates = [oct10, oct20, oct15];

var before20th = _.filter(dates, isBeforeOct20);
// returns [oct10, oct15] array.

```

`isBetween` behaves similarly but takes three dates, taking the range dates first and second so that it can be easily used as a filter:

```javascript
momentous.isBetween(oct10,oct20,oct15); // true
var between = momentous.isBetween(oct10, oct20);
between(oct15); // true
```

For immediate testing, `isBetween` also has a right-handed variant.  `isMomentBetween` uses its second and third arguments as the range:
```
momentous.isMomentBetween(oct15, oct10, oct20); //true
```

####Mapping

For adding and subtracting time, the four core methods are `add`, `sub`, `addBy` and `subBy`.
`add` and `sub` take a target moment followed by an object specifying the amount to add or subtract.  Partially applying either one to a moment returns a function which can generate new moments at any offset from the original.
```javascript
var today = moment();
var tomorrow = momentous.add(today, {days: 1});
var afterToday = momentous.add(today);

var inThreeDays = afterToday({days: 3});

var in19daysAnd26minutes = afterToday({days: 19,
									minutes: 26});

```

`subBy` and `addBy` are the right-handed variants, and take a time offset before the target moment.  Partially applying them to a given offset returns a function which applies that offset to a clone of any target moment.

```javascript
var today = moment();
var yesterday = momentous.subBy({days: 1}, today);

var twoHoursBefore = momentous.subBy({days: 2});

var july9at7pm = moment("2013-07-09").hours(19);

var july9at5pm = twoHoursBefore(july9at7pm);

``` 

There are many shorthand variants of these functions for adding or subtracting by Moment.js's various units of time:
```javascript
var today = moment();
var anHourAgo = momentous.sub.hours(today, 1);

var add3minutes = momentous.addBy.minutes(3);
var in3minutes = add3minutes(today);
```
The full list is documented in the [API][api].

####List Generation

#####Between two points
The `range` method generates a list of new moment instances from a start moment, an end moment and a step size:
```javascript
var today = moment();
var inFiveDays = momentous.add.days(today, 5);
var nextFewDays = momentous.range(today, inFiveDays, {days: 1});
// `nextFewDays` is now a reference to an array containing
// a clone of `today` and one moment for each day up to but
// not including `inFiveDays`.
```

`rangeBy` takes it step size first, so partial application returns a function which accepts start and end points and generates a list based on the step size initially passed:
```javascript
var minuteRange = momentous.rangeBy({minutes: 1});
var today = moment();
var inAnHour = momentous.add.hours(today, 1);
var hourMinutes = minuteRange(today, inAnHour);
// `hourMinutes` contains one moment instance
// for the start of each one-minute interval
// between `today` and `inAnHour`.
```
Both `range` and `rangeBy` have exclusive variants (`rangeExclusive`, `rangeByExclusive`) which don't include their starting point.

#####Away from or toward one point

There are six methods for generating sequences increasing toward or away from a given date with a fixed size and step count.  They're all variants of two core methods, `nStepsBefore` and `nStepsAfter`.

`nStepsBefore` accepts a number of steps, a step size and an ending date.  It returns an ordered array of moment instances beginning with (`end` - ( `numSteps` * `stepSize`  )) and ending at (`end` - `stepSize`), in which every element at index `i`, `i>0`, has a time equal to the element at index `i-1` plus `stepSize`.

```javascript
var today = moment();
var last2Weeks = momentous.nStepsBefore(14, {days: 1}, today);
// `last2Weeks` contains one element for the start of
// each day-long interval in the past two weeks.
```

`nStepsAfter` does the same thing, but moves away from a given start date.

The `stepsBeforeBy` and `stepsAfterBy` variants of these accept their step size arguments first, and the `stepsBeforeMoment` and `stepsAfterMoment` variants accept their moment arguments first.  These all have built-in partial application, and often a partial application of one variant will be more suited to a given list operation than the others.

[See the full documention on the API page ==>][api]


[api]: ./api.html

Installation
------------

    npm install momentous


GitHub
------------
https://github.com/scivey/momentous


Contact
------------
https://github.com/scivey

http://www.scivey.net

scott.ivey@gmail.com

License
------------
MIT License (MIT)

Copyright (c) 2013 Scott Ivey, <scott.ivey@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
