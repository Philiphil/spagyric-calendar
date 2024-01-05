import Favorable from "@/script/favorable";
const SunCalc = require('suncalc');
const {DateTime} = require("luxon");
import GetSeasons, {Season} from "./seasons.js";
import Ruler from "@/script/ruler";
import Period from "@/script/period";
import {Element} from "@/script/element";
import GetPlanetInfo from "@/script/astronomy";

function hourToElement(hour){
    if(hour < 7){
        return Element.Feu
    }else if (hour < 14){
        return Element.Air
    }else if (hour < 21){
        return Element.Eau
    }
    return Element.Terre
}

class AstroDay {
    constructor() {
        this.hours = [];
        this.date = DateTime.now()
        this.ruler = Ruler.Sun;
        this.planets = {}
        this.nightRuler = Ruler.Sun;
        this.comparedTo=0
    }

     MoonZodiacRelationToRuler(){
        return this.planets.moon.isFavorable(this.ruler)
     }

     PlanetState(){
        let date = this.date.plus({hours:1})
         let saturn= Favorable.Neutral
         let jupiter= Favorable.Neutral
         let mars= Favorable.Neutral
         let sun= Favorable.Neutral
         let venus= Favorable.Neutral
         let mercury= Favorable.Neutral
         if(this.planets.sun.maximumStart < date &&
             this.planets.sun.maximumEnd > date
         ){
              sun = Favorable.Favorable
         }

         if(this.planets.saturn.maximumStart < date &&
             this.planets.saturn.maximumEnd > date
         ){
             saturn = Favorable.Favorable
         }else if(this.planets.saturn.minimumStart < date &&
             this.planets.saturn.minimumEnd > date
         ){
             saturn = Favorable.Unfavorable
         }

         if(this.planets.jupiter.maximumStart < date &&
             this.planets.jupiter.maximumEnd > date
         ){
             jupiter = Favorable.Favorable
         }else if(this.planets.jupiter.minimumStart < date &&
             this.planets.jupiter.minimumEnd > date
         ){
             jupiter = Favorable.Unfavorable
         }

         if(this.planets.mars.maximumStart < date &&
             this.planets.mars.maximumEnd > date
         ){
             mars = Favorable.Favorable
         }else if(this.planets.mars.minimumStart < date &&
             this.planets.mars.minimumEnd > date
         ){
             mars = Favorable.Unfavorable
         }

         if(this.planets.mercury.maximumStart < date &&
             this.planets.mercury.maximumEnd > date
         ){
             mercury = Favorable.Favorable
         }else if(this.planets.mercury.minimumStart < date &&
             this.planets.mercury.minimumEnd > date
         ){
             mercury = Favorable.Unfavorable
         }

         if(this.planets.venus.maximumStart < date &&
             this.planets.venus.maximumEnd > date
         ){
             venus = Favorable.Favorable
         }else if(this.planets.venus.minimumStart < date &&
             this.planets.venus.minimumEnd > date
         ){
             venus = Favorable.Unfavorable
         }

         return{
             saturn:saturn,
             jupiter:jupiter,
             mars:mars,
             sun:sun,
             venus:venus,
             mercury:mercury,
         }
     }

     EquinoxDay(){
         if(this.season.spring.day === this.date.day
             &&this.season.spring.month===this.date.month
             && this.season.spring.year===this.date.year){
             return Season.Spring
         }
         if(this.season.summer.day === this.date.day
             &&this.season.summer.month===this.date.month
             && this.season.summer.year===this.date.year){
             return Season.Summer
         }
         if(this.season.autumn.day === this.date.day
             &&this.season.autumn.month===this.date.month
             && this.season.autumn.year===this.date.year){
             return Season.Fall
         }
         if(this.season.winter.day === this.date.day
             &&this.season.winter.month===this.date.month
             && this.season.winter.year===this.date.year){
             return Season.Winter
         }
         return 0;
     }


    static makeAstroDay(day, lat, lng) {
        const currentDay = this._makeAstroDay(day, lat, lng);
        return currentDay;
        const previousDay = this._makeAstroDay(day.minus({days:1}), lat, lng);
        let correctedHours = [];
        for (const hour of previousDay.hours) {
            if (hour.start.toSeconds() > day.toSeconds()  || hour.end.toSeconds() > day.toSeconds() ){
                correctedHours.push(hour);
            }
        }

        day=day.plus({day:1})  // Tomorrow
        for (const hour of currentDay.hours) {
            if ( hour.start.toSeconds() > day.toSeconds()   ) break;
            correctedHours.push(hour);
        }
        currentDay.hours = correctedHours;
        return currentDay;
    }

    static _makeAstroDay(day, lat, lng) {
        const astroDay = new AstroDay();
        astroDay.date =day
        astroDay.ruler = Ruler.GetFromDayHour(Ruler.FromDateTime(day.toFormat("c")), 0);
        astroDay.nightRuler = Ruler.GetFromDayHour( astroDay.ruler, 12);
        astroDay.planets = GetPlanetInfo(day)
        astroDay.season = GetSeasons(astroDay.date.year)

        let fixedSunCaldDay =day.plus({hours:1})
        let result = SunCalc.getTimes(fixedSunCaldDay.toJSDate(), lat, lng);

        const sunset = DateTime.fromMillis(result.sunset.getTime())
        let sunrise = DateTime.fromMillis(result.sunrise.getTime())
        const dureeHeurePlanetaire = (sunset.toSeconds()-sunrise.toSeconds() ) / 12;

        let next =day.plus({day:1})
        let result2 = SunCalc.getTimes(next.toJSDate(), lat, lng);
        let sunrise2 = DateTime.fromMillis(result2.sunrise.getTime())
        const dureeHeureNocturne = (  (sunrise2.toSeconds()-sunset.toSeconds() )) / 12;

        const jour = Ruler.FromDateTime( day.toFormat('c') );

        for (let i = 0; i <= 11; i++) {
            const startTimestamp = sunrise.toSeconds() + (dureeHeurePlanetaire * i);
            const start = DateTime.fromSeconds(startTimestamp)
            start.setZone(day.zoneName)

            const endTimestamp = startTimestamp + dureeHeurePlanetaire;
            const end = DateTime.fromSeconds(endTimestamp)
            end.setZone(day.zoneName)

            let hour = new AstroHour(
                start,
                end,
                Ruler.GetFromDayHour(jour, i),
                Period.Day,
                hourToElement(i+1),
                astroDay,
            )
            astroDay.hours.push(hour);
        }

        for (let i = 0; i <= 11; i++) {
            const startTimestamp = sunset.toSeconds() + (dureeHeureNocturne * i);
            const start = DateTime.fromSeconds(startTimestamp)
            start.setZone(day.zoneName)

            const endTimestamp = startTimestamp + dureeHeureNocturne;
            const end =  DateTime.fromSeconds(endTimestamp)
            end.setZone(day.zoneName);

            let hour=new AstroHour(
                start,
                end,
                Ruler.GetFromDayHour(jour, i + 12),
                Period.Night,
                hourToElement(i+15),
                astroDay,
            )

            astroDay.hours.push(hour);
        }

        return astroDay;
    }
}

class AstroHour {
    constructor(start, end, ruler,period ,element,day) {
        this.start = start;
        this.end = end;
        this.ruler = ruler;
        this.period = period;
        this.element=element;
        this.day = day;
    }

    Compared(){
        if (this.day.comparedTo===0) return Favorable.Neutral
        if(this.day.comparedTo < this.day.ruler) return Favorable.Unfavorable

        // prendre en compte night
       if ( Ruler.getDayRelation(Ruler.FromInt(this.day.comparedTo),this.ruler)
           === Favorable.Unfavorable ) return Favorable.Unfavorable

       return  Ruler.getRelation( this.period, Ruler.FromInt(this.day.comparedTo), this.ruler)

    }

    RulerRelationToDayRuler(){
        return Ruler.getRelation(this.period, this.day.ruler,this.ruler)
    }

    MoonZodiacRelationToRuler(){
        return this.day.MoonZodiacRelationToRuler()===Favorable.Unfavorable ?
            Favorable.Unfavorable : this.day.planets.moon.isFavorable(this.ruler)
    }

}

function getAstroDaysInRange(startDay, endDay, lat, lng) {
    const days = [];
    let season = GetSeasons(startDay.year)

    while (startDay <= endDay) {
        days.push(AstroDay.makeAstroDay(startDay, lat, lng));
        startDay = startDay.plus({ days: 1 });
    }
    console.log(days)
    return days;
}

function getAstroDaysInRangeFiltered(startDay, endDay, lat, lng,filter) {
    let astroDays = getAstroDaysInRange(startDay,endDay,lat,lng)
    for (let i = 0; i < astroDays.length ; i++) {
        astroDays[i].comparedTo=filter
        if(filter< astroDays[i].ruler ){
                astroDays[i].dayFavorable=Favorable.Unfavorable
                for (let j = 0; j <  astroDays[i].hours.length ; j++) {
                    astroDays[i].hours[j].dayFavorable= Favorable.Unfavorable
                }
            }else{
                astroDays[i].dayFavorable= Ruler.getDayRelation(Ruler.FromInt(filter),astroDays[i].ruler)
                for (let j = 0; j <  astroDays[i].hours.length ; j++) {
                    if(astroDays[i].dayFavorable !== Favorable.Unfavorable ){
                        astroDays[i].hours[j].dayFavorable=
                            Ruler.getRelation( astroDays[i].hours[j].period, Ruler.FromInt(filter),astroDays[i].hours[j].ruler)
                    }
                }
            }
    }
    return astroDays;
}


export default {
    GetAstroDaysInRange : getAstroDaysInRange,
    GetAstroDaysInRangeFiltered:getAstroDaysInRangeFiltered,
}