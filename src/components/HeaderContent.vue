<template>
  <th>

      <p class="dayname"> <ruler-switch :element="day.ruler" />
        {{name}}<br>{{day.date.toLocaleString()}}
      </p>

    <div>
      <planet-switch :favorable="day.PlanetState().saturn" :ruler=1 />
      <planet-switch :favorable="day.PlanetState().jupiter" :ruler=2 />
      <planet-switch :favorable="day.PlanetState().mars" :ruler=3 />
      <planet-switch :favorable="day.PlanetState().sun" :ruler=4 />
      <planet-switch :favorable="day.PlanetState().venus" :ruler=5 />
      <planet-switch :favorable="day.PlanetState().mercury" :ruler=6 />
    </div>
    <div v-if="day.EquinoxDay() !== 0">
      <span v-if="day.EquinoxDay()===1">♈︎︎</span>
      <span v-else-if="day.EquinoxDay()===2">♋︎</span>
      <span v-else-if="day.EquinoxDay()===3">♎︎</span>
      <span v-else-if="day.EquinoxDay()===4">♑︎</span>
      {{t("season."+day.EquinoxDay())}}
    </div>
    <div class="moon">
      <div class="moonlogo">☽</div>
      <p>
        {{t( "moonPhase."+day.planets.moon.phase )}}
        <span v-if="day.planets.moon.phase ===0">🌑︎︎</span>
        <span v-else-if="day.planets.moon.phase ===1">🌒︎︎;</span>
        <span v-else-if="day.planets.moon.phase ===2">🌓︎︎</span>
        <span v-else-if="day.planets.moon.phase ===3">🌔︎︎</span>
        <span v-else-if="day.planets.moon.phase ===4">🌕︎︎</span>
        <span v-else-if="day.planets.moon.phase ===5">🌖︎︎</span>
        <span v-else-if="day.planets.moon.phase ===6">🌗︎︎</span>
        <span v-else-if="day.planets.moon.phase ===7">🌘︎︎</span>

      </p>
      <p>{{t( "trajectory."+day.planets.moon.trajectory )}}
        <span v-if="day.planets.moon.trajectory ===1">☽</span>
        <span v-else>☾</span>
      </p>
      <p>
        {{t( "zodiac."+day.planets.moon.zodiac )}}
        <span v-if="day.planets.moon.zodiac ===0">♈︎</span>
        <span v-else-if="day.planets.moon.zodiac ===1">♉︎;</span>
        <span v-else-if="day.planets.moon.zodiac ===2">♊︎</span>
        <span v-else-if="day.planets.moon.zodiac ===3">♋︎</span>
        <span v-else-if="day.planets.moon.zodiac ===4">♌︎</span>
        <span v-else-if="day.planets.moon.zodiac ===5">♍︎</span>
        <span v-else-if="day.planets.moon.zodiac ===6">♎︎</span>
        <span v-else-if="day.planets.moon.zodiac ===7">♏︎</span>
        <span v-else-if="day.planets.moon.zodiac ===8">♐︎</span>
        <span v-else-if="day.planets.moon.zodiac ===9">♑︎</span>
        <span v-else-if="day.planets.moon.zodiac ===10">♒︎</span>
        <span v-else>♓︎︎</span>
      </p>
      <p>
        {{t( "planette."+day.planets.moon.ruler )}}
          <ruler-switch :element="day.planets.moon.ruler" />
          <favorable-switch :element="day.planets.moon.favorable" />
      </p>
      <p>
        {{t( "element."+day.planets.moon.element )}}
        <element-switch :element="day.planets.moon.element" />
      </p>
    </div>
  </th>
</template>

<script>
import script from "@/script/script";
import {DateTime,Info} from "luxon";
import { useI18n } from 'vue-i18n'
import ElementSwitch from "@/components/ElementSwitch";
import RulerSwitch from "@/components/RulerSwitch";
import FavorableSwitch from "@/components/FavorableSwitch";
import PlanetSwitch from "@/components/PlanetSwitch";

export default {
  name: 'HeaderContent',
  components: {PlanetSwitch, FavorableSwitch, RulerSwitch, ElementSwitch},
  props: {
    element:Object
  },
  computed:{
    day(){
       if(this.element == null){
         return {
           date:DateTime.now(),
           planets:{
             moon :{
               element:0,
               ruler:1,
               zodiac:11,
               trajectory:1,
             },
             MoonZodiacRelationToRuler(){return 0},
             PlaneteState(){
               return {
                 saturn: 0,
                 jupiter: 0,
                 mars: 0,
                 sun: 0,
                 venus: 0,
                 mercury: 0
               }
             }
           }
         }
       }
      return this.element
    },
    name(){
      return Info.weekdays('long')[this.day.date.toFormat("c")-1]
    }

  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return {
      t,
    };
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dayname{
  text-transform: capitalize;
}

.moon{
  background: rgba(100,100,100,0.1);
  padding-top: 0.25em;
  padding-bottom: 0.25em;
  border: 1px solid rgba(100,100,100,0.1);
}
.moonlogo{
  position: absolute;
  z-index: -1;
  font-size: 50px;
  opacity: 0.1;
}
th{
  border:1px solid black;
}
</style>
