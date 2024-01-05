<template>
  <td    :class="[astroHour.period===2 ? 'night' : '', 'day']" >
    <div class="flexcontainer">
      <p class="date">
        <span class="element">
          <element-switch :element="astroHour.element" />
        </span>
        <span>
          <em>{{astroHour.start.toFormat("HH:mm")}}</em>
        </span>
        <span>
          <em>{{astroHour.end.toFormat("HH:mm")}}</em>
        </span>
      </p>
      <p>
        <em>
          {{t("planette."+astroHour.ruler)}}<br>
          <ruler-switch :element="astroHour.ruler" />
        </em>
      </p>
      <p>
        <span>
          <span v-if="astroHour.Compared()===2">-</span>
          <span v-else-if="astroHour.Compared()===1">+</span>
          <span v-else-if="astroHour.RulerRelationToDayRuler()===2">-</span>
          <span v-else-if="astroHour.RulerRelationToDayRuler()===1">+</span>
        </span>
        <span>
          <span v-if="astroHour.MoonZodiacRelationToRuler()===2">☽-</span>
          <span v-else-if="astroHour.MoonZodiacRelationToRuler()===1">☽+</span>
        </span>
      </p>
    </div>
  </td>
</template>

<script>
import {DateTime} from "luxon";
import { useI18n } from 'vue-i18n'
import ElementSwitch from "@/components/ElementSwitch";
import RulerSwitch  from "@/components/RulerSwitch";

export default {
  name: 'CaseContent',
  components: {ElementSwitch, RulerSwitch},
  props: {
    element:Object,
  },
  computed:{
    astroHour(){
       if(this.element == null){
         return {
           start: DateTime.now(),
           end: DateTime.now(),
           ruler:1,
           element:1,
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
.day{
  background-color:rgba(255,255,0,0.1);
}
.day.night{
  background-color:rgba(0,0,255,0.1);
}
.day.unfavorable,.day.night.unfavorable{
  background-color: rgba(255,0,0,0.1);
}

td{
  width: 200px;
  height: 60px;
}
td div.flexcontainer{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

td div.flexcontainer > p{
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
td div.flexcontainer > p.date >span{
  display: flex;
  height: 100%;
  width: 65px;
  text-align:center;
  justify-content: center;

}
td div.flexcontainer > p.date{
  width: max-content;
  border-right: 1px black dashed;
}
td div.flexcontainer > p.date >span:nth-child(2) > em{
  align-self: flex-end;
}

td div.flexcontainer > p.date > span.element{
 padding-top: 5px;
  width:100%;
}
</style>
