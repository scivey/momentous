
All Momentous methods produce clones of existing Moments, and never mutate the originals.

```javascript
var now = moment();
var later = momentous.add(now, {hours: 5});

console.log( now.format() );
// "2013-11-20 T14:39:53"

console.log( later.format() );
// "2013-11-20 T21:39:53"
```



Paired with Underscore, partially-applied __Momentous__ predicates make it easy to filter lists of dates:

```javascript
var oct15 = moment("2013-10-15");
var fiveDaysBefore = momentous.sub(oct15, {days: 5});
var fiveDaysAfter = momentous.add(oct15, {days: 5});

var dates = momentous.range(fiveDaysBefore, fiveDaysAfter, {days: 1});
// returns a range of dates from tenDaysBefore to
// tenDaysAfter, increasing by adding {days: 1} with
// each step.
var _ = require("underscore");
dates = _.shuffle(dates);
var beforeOct15 = _.filter(dates, momentous.isBeforeMoment(oct15));
beforeOct15 = momentous.sort.ascending(beforeOct15);
momentous.log("MM-DD", beforeOct15);
// [ 10-10, 10-11, 10-12, 10-13, 10-14 ]


```
  efficient at 
It consists of a number of functions for invoking existing moment methods in a functional way, e.g adding time. However, it always returns cloned instances and does not modify the original s.

Many momentous functions can be used as factories for loop callbacks, or as factories for date objects offset from a particular point in time.  All 2 and 3-parameter functions have built-in partial application, and wherever it makes sense they have both left and right*handed variants.

For example, see the momentous version of #add: the moment version allows for manipulation like this:

... But that's the extent of its built-in functionality.

The left-handed momentous version takes MOMENT, OFFSETOBJ and, if both are given, returns a cloned version of MOMENT offset by OFFSETOBJ.
If only MOMENT is passed in, it returns a function which accepts an OFFSETOBJ and returns that offset from the initial moment passed in. In other words, this works:

from today = add(moment())
InFiveHours = from today {hours: 5}

The right handed variant, addBy, is reversed. If only OFFSETOBJ is passed in, it returns a function which applies that offset to any MOMENT passed in.

EXAMPLE

each of these functions has additional convenience versions built-in as methods.
