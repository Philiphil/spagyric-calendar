<template>
  <th>
        <div>
          <p class="dayname">
            <ruler-switch :element="day.ruler" />
            {{t("day."+day.date.toFormat("c"))}}<br>{{day.date.toLocaleString()}}
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
            {{t("season."+day.EquinoxDay())}}
            <span v-if="day.EquinoxDay()===1">♈︎︎</span>
            <span v-else-if="day.EquinoxDay()===2">♋︎</span>
            <span v-else-if="day.EquinoxDay()===3">♎︎</span>
            <span v-else-if="day.EquinoxDay()===4">♑︎</span>
          </div>
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
th{
  border:1px solid black;
}



th > div{
  flex: 1;
}


</style>
