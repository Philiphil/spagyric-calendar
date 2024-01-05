const apsis = require("astronomia/apsis");
const astronomia = require("astronomia/base");
const {JDEToDate, CalendarJulianToJD, CalendarGregorianToJD, Calendar} = require("astronomia/julian");
const eclipse = require("astronomia/eclipse");

let c = new Calendar()
c.fromDate(new Date())

console.log(JDEToDate( apsis.perigee(c.toYear() )))
console.log(JDEToDate( apsis.apogee(c.toYear() )))

console.log(JDEToDate( eclipse.solar(c.toYear() ).jdeMax))
console.log(JDEToDate( eclipse.lunar (c.toYear() ).jdeMax))
