import Favorable from "@/script/favorable";
import Period from "@/script/period";

const Ruler = {
    Saturn: 1,
    Jupiter: 2,
    Mars: 3,
    Sun: 4,
    Venus: 5,
    Mercury: 6,
    Moon: 7,
    ToNight: function (i) {
        switch (parseInt(i)) {
            case this.Saturn: return this.Mercury
            case this.Jupiter: return this.Moon
            case this.Mars: return this.Saturn
            case this.Sun: return this.Jupiter
            case this.Venus: return this.Mars
            case this.Mercury: return this.Sun
            case this.Moon: return this.Venus

        }
    },
    FromDateTime: function (i) {
        switch (parseInt(i)) {
            case 1: return this.Moon;
            case 2: return this.Mars;
            case 3: return this.Mercury;
            case 4: return this.Jupiter;
            case 5: return this.Venus;
            case 6: return this.Saturn;
            default: return this.Sun;
        }
    },
    FromInt:function(i){
        const values = [null, this.Saturn, this.Jupiter, this.Mars, this.Sun, this.Venus, this.Mercury, this.Moon];
        return values[i];
    },
    GetFromDayHour: function (jour, hour) {
        const start = this.FromInt(jour)

        let value = start + hour;
        return this.FromInt(value % 7 !== 0 ? value % 7 : 7)
    },
    getRelation: function (period, day, hour) {
        return this.getDayRelation(day,hour)
        return period===Period.Day ? this.getDayRelation(day,hour):this.getNightRelation(day,hour)
    },
    getDayRelation: function (day, hour) {
/*
        - Samedi, jour de Saturne, il vaut mieux ne pas utiliser Jupiter ou Mercure.
        - Dimanche, jour du Soleil, ne pas utiliser Mars.
        - Lundi, jour de la Lune, pas de planète hostile.
        - Mardi, jour de Mars, ne pas utiliser le Soleil.
        - Mercredi, jour de Mercure, ne pas utiliser Saturne.
        - Jeudi, jour de Jupiter, ne pas utiliser Saturne.
        - Vendredi, jour de Vénus, pas de planète hostile.
            Par contre, il y a des combinaisons favorables :
            - Lundi, Mercure est en sympathie.
        - Mercredi, Lune ou Soleil sont en sympathie.
        - Vendredi, le Soleil est en sympathie.
            */
        if (day === this.Saturn && (hour === this.Jupiter || hour === this.Mercury)) return Favorable.Unfavorable;
        if (day === this.Sun && hour === this.Mars) return Favorable.Unfavorable;
        if (day === this.Mars && hour === this.Sun) return Favorable.Unfavorable;
        if (day === this.Mercury && hour === this.Saturn) return Favorable.Unfavorable;
        if (day === this.Jupiter && hour === this.Saturn) return Favorable.Unfavorable;

        if (day === this.Sun && hour === this.Mercury) return Favorable.Favorable;
        if (day === this.Mercury && (hour === this.Mercury || hour === this.Moon)) return Favorable.Favorable;
        if (day === this.Venus && hour === this.Sun) return Favorable.Favorable;

        if (day === hour) return Favorable.Favorable;

        return Favorable.Neutral;
    },
    getNightRelation: function (day, hour) {
        let dayRelation = this.getDayRelation(day,hour)
        let night = this.ToNight(day)

        //Nuit de mardi à mercredi, commence par Saturne, au-dessus de Mars dans l'Arbre de Vie.
        // Les aspects négatifs de nuit doivent ainsi être affaiblis
        //le defavorable devient neutre.
        if(day===this.Mars) return dayRelation === Favorable.Unfavorable ? Favorable.Neutral :Favorable.Favorable
        // Pas sur de la force du Geni Diurne sur le GeniNocturne
        if (dayRelation ===  Favorable.Unfavorable ) return Favorable.Unfavorable

        let nightRelation = this.getDayRelation(night,hour)

        //Si c'est défavorable au geni nocturne, defavorable
        if (nightRelation ===  Favorable.Unfavorable ) return Favorable.Unfavorable

        //Nuit de vendredi à samedi, présidée par Mars, le complément de Vénus. C'est la nuit du
        // Vendredi Saint, celle où les éléments combinés de Vénus et de Mars préparent à l'Epreuve del'Initiation
        //le neutre devient favorable, je me demande si le defavorable saute pas non plus
        if(day===this.Venus) return Favorable.Favorable

        // Pas sur de la force du Geni Diurne sur le GeniNocturne
        return nightRelation ===  Favorable.Favorable ||dayRelation ===  Favorable.Favorable  ? Favorable.Favorable:Favorable.Neutral;
    }
};

export default Ruler;