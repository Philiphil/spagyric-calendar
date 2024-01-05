import Zodiac from "@/script/zodiac";
import Ruler from "@/script/ruler";

export const Element = {
    Terre: 0,
    Eau: 1,
    Air: 2,
    Feu: 3
};

export function zodiacToElement(zodiac) {
    switch (zodiac) {
        case Zodiac.Virgo:
        case Zodiac.Taurus:
        case Zodiac.Capricorn:
            return Element.Terre;
        case Zodiac.Cancer:
        case Zodiac.Scorpio:
        case Zodiac.Pisces:
            return Element.Eau;
        case Zodiac.Gemini:
        case Zodiac.Libra:
        case Zodiac.Aquarius:
            return Element.Air;
        default:
            return Element.Feu;
    }
}

export function rulerToElement(ruler) {
    switch (ruler) {
        case Ruler.Sun:
        case Ruler.Mars:
            return Element.Feu;
        case Ruler.Mercury:
        case Ruler.Saturn:
            return Element.Terre;
        case Ruler.Venus:
        case Ruler.Jupiter:
            return Element.Air;
        case Ruler.Moon:
        default:
            return Element.Eau;
    }
}

