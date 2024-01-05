import mooncalc from "@/script/mooncalc";

const {DateTime} = require("luxon");
import GetSeasons from "./seasons.js";
import Zodiac from "@/script/zodiac";
import Ruler from "@/script/ruler";
import Favorable from "@/script/favorable";
import {Element, zodiacToElement} from "@/script/element";

class PlanetInfo{
    constructor() {
        this.maximum=null;
        this.maximumStart=null;
        this.maximumEnd=null;
        this.minimumStart=null;
        this.minimumEnd=null;
    }
}
class SunInfo extends PlanetInfo{
    constructor(year) { super();
        this.seasons=GetSeasons(year)
        this.maximum = this.seasons.summer
        this.maximumStart = this.maximum.minus({days:11})
        this.maximumEnd = this.maximum.plus({days:11})
    }

}
class SaturnInfo extends PlanetInfo{
    constructor(year) { super();
        this.maximum=DateTime.fromJSDate(new Date( year+"-06-26T00:00:00"))

        this.maximumStart = this.maximum.minus({days:12})
        this.maximumEnd = this.maximum.plus({days:12})
        this.maximumEnd.plus({hours:23,minute:59})//23h59

        this.minimumStart=DateTime.fromJSDate(new Date(
            year+"-12-15T00:00:00"
        ))
        this.minimumEnd=DateTime.fromJSDate(new Date(
            year+"-12-31T23:59:00"
        ))
    }

}
class JupiterInfo extends PlanetInfo{
    constructor(year) {
        super();
        this.maximumStart=DateTime.fromJSDate(new Date(
            year+"-03-01T00:00:00"
        ))
        this.maximumEnd=DateTime.fromJSDate(new Date(
            year+"-04-30T23:59:00"
        ))
        this.minimumStart=DateTime.fromJSDate(new Date(
            year+"-10-01T00:00:00"
        ))
        this.minimumEnd=DateTime.fromJSDate(new Date(
            year+"-11-30T23:59:00"
        ))

    }
}
class MarsInfo extends PlanetInfo{
    constructor(year) {
        super();
        this.maximumStart=DateTime.fromJSDate(new Date(
            year+"-02-01T00:00:00"
        ))
        this.maximumEnd=DateTime.fromJSDate(new Date(
            year+"-03-31T23:59:00"
        ))
        this.minimumStart=DateTime.fromJSDate(new Date(
            year+"-08-01T00:00:00"
        ))
        this.minimumEnd=DateTime.fromJSDate(new Date(
            year+"-09-10T23:59:00"
        ))

    }
}
class MercuryInfo extends PlanetInfo{
    constructor(year) {
        super();
        this.maximumStart=DateTime.fromJSDate(new Date(
            year+"-05-15T00:00:00"
        ))
        this.maximumEnd=DateTime.fromJSDate(new Date(
            year+"-07-15T23:59:00"
        ))
        this.minimumStart=DateTime.fromJSDate(new Date(
            year+"-12-08T00:00:00"
        ))
        this.minimumEnd=DateTime.fromJSDate(new Date(
            year+"-12-16T23:59:00"
        ))

    }
}
class VenusInfo extends PlanetInfo{
    constructor(year) {
        super();
        this.maximumStart=DateTime.fromJSDate(new Date(
            year+"-07-01T00:00:00"
        ))
        this.maximumEnd=DateTime.fromJSDate(new Date(
            year+"-08-31T23:59:00"
        ))
        this.minimumStart=DateTime.fromJSDate(new Date(
            year+"-01-01:00:00"
        ))
        this.minimumEnd=DateTime.fromJSDate(new Date(
            year+"-02-26:59:00"
        ))

    }
}


class MoonInfo {
    constructor(date) {
        const moonInfo = mooncalc.getMoonInformations(date);
        this.zodiac = moonInfo.zodiac;
        this.trajectory = moonInfo.trajectory;
        this.element = zodiacToElement( this.zodiac )

        switch (this.zodiac) {
            case Zodiac.Virgo:
                this.ruler = Ruler.Mercury;
                this.favorable = Favorable.Unfavorable;
                break;
            case Zodiac.Taurus:
                this.ruler = Ruler.Venus;
                this.favorable = Favorable.Unfavorable;
                break;
            case Zodiac.Capricorn:
                this.ruler = Ruler.Saturn;
                this.favorable = Favorable.Unfavorable;
                break;
            case Zodiac.Cancer:
                this.ruler = Ruler.Moon;
                this.favorable = Favorable.Unfavorable;
                break;
            case Zodiac.Scorpio:
                this.ruler = Ruler.Mars;
                this.favorable = Favorable.Unfavorable;
                break;
            case Zodiac.Pisces:
                this.ruler = Ruler.Jupiter;
                this.favorable = Favorable.Unfavorable;
                break;
            case Zodiac.Gemini:
                this.ruler = Ruler.Mercury;
                this.favorable = Favorable.Favorable;
                break;
            case Zodiac.Libra:
                this.ruler = Ruler.Venus;
                this.favorable = Favorable.Favorable;
                break;
            case Zodiac.Aquarius:
                this.ruler = Ruler.Saturn;
                this.favorable = Favorable.Favorable;
                break;
            case Zodiac.Sagittarius:
                this.ruler = Ruler.Jupiter;
                this.favorable = Favorable.Favorable;
                break;
            case Zodiac.Aries:
                this.ruler = Ruler.Mars;
                this.favorable = Favorable.Favorable;
                break;
            case Zodiac.Leo:
                this.ruler = Ruler.Sun;
                this.favorable = Favorable.Favorable;
                break;
        }
    }

    isFavorable(ruler){
        if(ruler!==this.ruler) return Favorable.Neutral
        return this.favorable
    }
}

function GetPlanetInfo(date){
    let year = date.year
    return{
        sun: new SunInfo(year),
        saturn: new SaturnInfo(year),
        jupiter: new JupiterInfo(year),
        mars: new MarsInfo(year),
        mercury: new MercuryInfo(year),
        venus: new VenusInfo(year),
        moon: new MoonInfo(date),
    }
}

export default GetPlanetInfo