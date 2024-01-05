import Zodiac from "@/script/zodiac";

function getMoonInformations(date) {
    const year = date.year;
    const month = date.month;
    const day = date.day;


    let yy = year - Math.floor((12 - month) / 10);
    let mm = month + 9;
    if (mm >= 12) {
        mm -= 12;
    }

    let k1 = Math.floor(365.25 * (yy + 4712));
    let k2 = Math.floor(30.6 * mm + 0.5);
    let k3 = Math.floor(Math.floor(yy / 100 + 49) * 0.75) - 38;

    let jd = k1 + k2 + day + 59;
    if (jd > 2299160) {
        jd -= k3;
    }

    let ip = normalize((jd - 2451550.1) / 29.530588853);
    let age = ip * 29.53;

    let phase;
    let trajectory;
    if (age < 1.84566) {
        phase = LunarPhase.New
        trajectory = LunarTrajectory.Ascendent;
    } else if (age < 5.53699) {
        phase = LunarPhase.VaxingCrescent
        trajectory = LunarTrajectory.Ascendent;
    } else if (age < 9.22831) {
        phase = LunarPhase.FirstQuarter
        trajectory = LunarTrajectory.Ascendent;
    } else if (age < 12.91963) {
        phase = LunarPhase.VaxingGibbous
        trajectory = LunarTrajectory.Ascendent;
    } else if (age < 16.61096) {
        phase = LunarPhase.Full
        trajectory = LunarTrajectory.Descendent;
    } else if (age < 20.30228) {
        phase = LunarPhase.VaningGibbous
        trajectory = LunarTrajectory.Descendent;
    } else if (age < 23.99361) {
        phase = LunarPhase.LastQuarter
        trajectory = LunarTrajectory.Descendent;
    } else if (age < 27.68493) {
        phase =  LunarPhase.VaningCrescent
        trajectory = LunarTrajectory.Descendent;
    } else {
        phase = LunarPhase.New
        trajectory = LunarTrajectory.Ascendent;
    }

    ip = ip * 2 * Math.PI;

    let dp = 2 * Math.PI * normalize((jd - 2451562.2) / 27.55454988);
    let distance = 60.4 - 3.3 * Math.cos(dp) - 0.6 * Math.cos(2 * ip - dp) - 0.5 * Math.cos(2 * ip);

    let np = 2 * Math.PI * normalize((jd - 2451565.2) / 27.212220817);
    let latitude = 5.1 * Math.sin(np);

    let rp = normalize((jd - 2451555.8) / 27.321582241);
    let longitude = 360 * rp + 6.3 * Math.sin(dp) + 1.3 * Math.sin(2 * ip - dp) + 0.7 * Math.sin(2 * ip);

    let constellation;
    if (longitude < 33.18) {
        constellation = Zodiac.Pisces;
    } else if (longitude < 51.16) {
        constellation = Zodiac.Aries;
    } else if (longitude < 93.44) {
        constellation = Zodiac.Taurus;
    } else if (longitude < 119.48) {
        constellation = Zodiac.Gemini;
    } else if (longitude < 135.30) {
        constellation = Zodiac.Cancer;
    } else if (longitude < 173.34) {
        constellation = Zodiac.Leo;
    } else if (longitude < 224.17) {
        constellation = Zodiac.Virgo;
    } else if (longitude < 242.57) {
        constellation = Zodiac.Libra;
    } else if (longitude < 271.26) {
        constellation = Zodiac.Scorpio;
    } else if (longitude < 302.49) {
        constellation = Zodiac.Sagittarius;
    } else if (longitude < 311.72) {
        constellation = Zodiac.Capricorn;
    } else {
        constellation = Zodiac.Pisces;
    }

    let moonPosition = longitude;

    const zodiacMapping = {
        [Zodiac.Aries]: 0,
        [Zodiac.Taurus]: 1,
        [Zodiac.Gemini]: 2,
        [Zodiac.Cancer]: 3,
        [Zodiac.Leo]: 4,
        [Zodiac.Virgo]: 5,
        [Zodiac.Libra]: 6,
        [Zodiac.Scorpio]: 7,
        [Zodiac.Sagittarius]: 8,
        [Zodiac.Capricorn]: 9,
        [Zodiac.Aquarius]: 10,
        [Zodiac.Pisces]: 11,
    };

    let zodiacSign = Zodiac.Pisces;

    for (const zcase of Object.values(Zodiac)) {
        const startLongitude = zodiacMapping[zcase] * 30;
        const endLongitude = (zodiacMapping[zcase] + 1) * 30;

        if (moonPosition >= startLongitude && moonPosition < endLongitude) {
            zodiacSign = zcase;
            break;
        }
    }

    return {
        date: { year, month, day },
        age,
        distance: distance * 6371, // Convert to kilometers
        ecliptic: { latitude, longitude },
        phase,
        trajectory,
        constellation,
        zodiac: zodiacSign,
    };
}

function normalize(v) {
    v = v - Math.floor(v);
    if (v < 0) {
        v = v + 1;
    }
    return v;
}

const LunarTrajectory = {
    Ascendent: 1,
    Descendent: 0
};

const LunarPhase= {
    New: 0,
    VaxingCrescent:1,
    FirstQuarter:2,
    VaxingGibbous:3,
    Full:4,
    VaningGibbous:5,
    LastQuarter:6,
    VaningCrescent:7
};
export default {
    getMoonInformations:getMoonInformations,
    LunarTrajectory:LunarTrajectory,
}