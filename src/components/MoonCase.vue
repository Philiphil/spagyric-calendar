<template>
      <td class="moon">
        <div class="moonlogo">☽</div>
        <p>
          {{t( "moonPhase."+day.planets.moon.phase )}}
          <span v-if="day.planets.moon.phase ===0">🌑︎︎</span>
          <span v-else-if="day.planets.moon.phase ===1">🌒︎︎</span>
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
          <span v-else-if="day.planets.moon.zodiac ===1">♉︎</span>
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
      </td>

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
  name: 'MoonCase',
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

.moon{
  background: rgba(100,100,100,0.1);
  padding-top: 0.25em;
  padding-bottom: 0.25em;
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



th > div{
  flex: 1;
}


</style>
