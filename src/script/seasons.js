const {DateTime} = require("luxon");

const K=Math.PI/180.0;

function S(T) {

    var x;
    x = 	485*Math.cos(K*(324.96 + 1934.136*T));
    x = x + 203*Math.cos(K*(337.23 + 32964.467*T));
    x = x + 199*Math.cos(K*(342.08 + 20.186*T));
    x = x + 182*Math.cos(K*(27.85  + 445267.112*T));
    x = x + 156*Math.cos(K*(73.14  + 45036.886*T));
    x = x + 136*Math.cos(K*(171.52 + 22518.443*T));
    x = x + 77*Math.cos(K*(222.54  + 65928.934*T));
    x = x + 74*Math.cos(K*(296.72  + 3034.906*T));
    x = x + 70*Math.cos(K*(243.58  + 9037.513*T));
    x = x + 58*Math.cos(K*(119.81  + 33718.147*T));
    x = x + 52*Math.cos(K*(297.17  + 150.678*T));
    x = x + 50*Math.cos(K*(21.02   + 2281.226*T));

    x = x + 45*Math.cos(K*(247.54  + 29929.562*T));
    x = x + 44*Math.cos(K*(325.15  + 31555.956*T));
    x = x + 29*Math.cos(K*(60.93   + 4443.417*T));
    x = x + 18*Math.cos(K*(155.12   + 67555.328*T));

    x = x + 17*Math.cos(K*(288.79  + 4562.452*T));
    x = x + 16*Math.cos(K*(198.04  + 62894.029*T));
    x = x + 14*Math.cos(K*(199.76  + 31436.921*T));
    x = x + 12*Math.cos(K*(95.39   + 14577.848*T));
    x = x + 12*Math.cos(K*(287.11  + 31931.756*T));
    x = x + 12*Math.cos(K*(320.81  + 34777.259*T));
    x = x + 9*Math.cos(K*(227.73   + 1222.114*T));
    x = x + 8*Math.cos(K*(15.45    + 16859.074*T));

    return x;
}

function march(Year) {

    let y = (Year - 2000.0)/1000.0;
    var W, dL;
    var JDE0 = 2451623.80984 + 365242.37404*y + 0.05169*y*y  - 0.00411*y*y*y - 0.00057*y*y*y*y;

    let T = (JDE0 - 2451545.0)/36525.0;
    W = 35999.373*T - 2.47;
    W = K*W;
    dL = 1.0 + 0.0334*Math.cos(W) + 0.0007*Math.cos(2*W);

    return JDE0 + (0.00001*S(T))/dL - (66.0 + (Year - 2000))/86400.0;
}

function june(Year) {
    let y = (Year - 2000.0)/1000.0;
    var W, dL;
    var JDE0 = 2451716.56767 + 365241.62603*y + 0.00325*y*y  + 0.00888*y*y*y - 0.00030*y*y*y*y;

    let T = (JDE0 - 2451545.0)/36525.0;
    W = 35999.373*T - 2.47;
    W = K*W;
    dL = 1.0 + 0.0334*Math.cos(W) + 0.0007*Math.cos(2*W);
    return  JDE0 + (0.00001*S(T))/dL - (66.0 + (Year - 2000))/86400.0;
}

function september(Year) {
    let y = (Year - 2000.0)/1000.0;
    var W, dL;
    var JDE0 = 2451810.21715 + 365242.01767*y - 0.11575*y*y  + 0.00337*y*y*y + 0.00078*y*y*y*y;

    let T = (JDE0 - 2451545.0)/36525.0;
    W = 35999.373*T - 2.47;
    W = K*W;
    dL = 1.0 + 0.0334*Math.cos(W) + 0.0007*Math.cos(2*W);
    return JDE0 + (0.00001*S(T))/dL - (66.0 + (Year - 2000))/86400.0;
}

function december(Year) {
    let y = (Year - 2000.0)/1000.0;
    var W, dL;
    var JDE0 = 2451900.05952 + 365242.74049*y - 0.06223*y*y  - 0.00823*y*y*y + 0.00032*y*y*y*y;

    let T = (JDE0 - 2451545.0)/36525.0;
    W = 35999.373*T - 2.47;
    W = K*W;
    dL = 1.0 + 0.0334*Math.cos(W) + 0.0007*Math.cos(2*W);
    return JDE0 + (0.00001*S(T))/dL - (66.0 + (Year - 2000))/86400.0;
}

function caldat (JD) {
    var hour, day, month
    var B, D, F;
    var JD0, C, E;
    var diff, min, str;

    JD0 = Math.floor(JD + 0.5);
    B = Math.floor((JD0-1867216.25)/36524.25);
    C = JD0 + B - Math.floor(B/4) + 1525.0;
    D = Math.floor((C-122.1)/365.25);
    E = 365.0*D + Math.floor(D/4);
    F = Math.floor((C-E)/30.6001);
    day = Math.floor(C-E+0.5) - Math.floor(30.6001*F);

    let dayStr = "" + day;
    if (day<10) dayStr = " " + dayStr;
    month = F - 1 - 12*Math.floor(F/14);
    hour = 24.0*(JD + 0.5 - JD0);
    diff = Math.abs(hour) - Math.floor(Math.abs(hour));
    min = Math.floor(Math.round(diff*60.0));
    if (min===60) {min=0; hour=hour+1.0;}
    if (min>9) str = ":"; else str = ":0";
    let hourStr;
    hourStr = Math.floor(hour) + str + min;
    if (Math.floor(hour)<10) hourStr = "0" + hourStr;

    let monthStr;
    monthStr = month > 10 ? month:"0"+month;
    return[monthStr,dayStr,hourStr ]
}

function toDateFormat(r, year) {
    return year +"-"+ r[0] + "-" + r[1] +  "T" + r[2]+":00";
}

function getSeasons(year){
    return {
        spring: DateTime.fromJSDate(new Date( toDateFormat(caldat(march(year)),year) )),
        summer: DateTime.fromJSDate(new Date( toDateFormat(caldat(june(year)),year) )),
        autumn: DateTime.fromJSDate(new Date( toDateFormat(caldat(september(year)),year) )),
        winter: DateTime.fromJSDate(new Date( toDateFormat(caldat(december(year)),year) )),
    }
}

export default getSeasons;

export const Season = {
    Spring:1,
    Summer:2,
    Fall:3,
    Winter:4,
};