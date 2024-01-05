<template>
  <div>
    <form>
      <div>
        Latitude : <input type="text" v-model="this.latitude">
        longitude : <input type="text" v-model="this.longitude">
      </div>
      <br>
      <div>
        from : <input type="date"  v-model="this.start">
        to : <input type="date"  v-model="this.end">
      </div>
      <br>
      <select  v-model="this.ruler">
        <option value="0" selected></option>
        <option value="1">{{t("planette.1")}}</option>
        <option value="2">{{t("planette.2")}}</option>
        <option value="3">{{t("planette.3")}}</option>
        <option value="4">{{t("planette.4")}}</option>
        <option value="5">{{t("planette.5")}}</option>
        <option value="6">{{t("planette.6")}}</option>
        <option value="7">{{t("planette.7")}}</option>
      </select>
      <button type="submit" @click="calendar" >
        GO
      </button>
    </form>
    <table v-if="this.range != null">
      <thead>
        <header-content v-for="col in getDay" v-bind:key="col" :element="col" />
      </thead>
      <tbody>
        <tr v-for="n in 24" :key="n">
            <case-content v-for="col in getHours" v-bind:key="col"
                          :element=col[n-1]
            />
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import script from "@/script/script";
import getNearestTimezone from "@/script/timezone";
import {DateTime,Info} from "luxon";
import { useI18n } from 'vue-i18n'
import CaseContent from "@/components/CaseContent";
import HeaderContent from "@/components/HeaderContent";

export default {
  name: 'HelloWorld',
  components: {HeaderContent, CaseContent},
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return {
      t,
    };
  },
  data:function (){
    return{
      latitude:47.52909168136492,
      longitude:19.211395809267913,
      start:"1970-01-01",
      end:"1970-01-01",
      range:[],
      ruler:0
    }
  },
  mounted() {
    let today = DateTime.now().toLocal()
    this.start = today.toFormat("yyyy-LL-dd")
    this.end = today.plus({days:7}).toFormat("yyyy-LL-dd")
  },
  methods:{
    calendar(e){
      e.preventDefault()
      if(this.ruler===0){
        this.range=script.GetAstroDaysInRange(
            DateTime.fromISO(this.start).setZone(getNearestTimezone(this.latitude,this.longitude)),
            DateTime.fromISO(this.end).setZone(getNearestTimezone(this.latitude,this.longitude)),
            this.latitude,
            this.longitude
        )
      }else{
        this.range=script.GetAstroDaysInRangeFiltered(
            DateTime.fromISO(this.start).setZone(getNearestTimezone(this.latitude,this.longitude)),
            DateTime.fromISO(this.end).setZone(getNearestTimezone(this.latitude,this.longitude)),
            this.latitude,
            this.longitude,
            this.ruler
        )
      }
    }
  },
  computed:{
    getCols(){
      let cols=[];
      this.range.forEach(function (e){
        cols[cols.length]= Info.weekdays('long')[e.date.toFormat("c")-1]+" "+ e.date.toLocaleString()
      })
      return cols
    },
    getMoons(){
      let cols=[];
      this.range.forEach(function (e,i,a){
        cols[cols.length]= e.moon
      })
      return cols
    },
    getHours(index){
      let cols=[];
      this.range.forEach(function (e,i,a){
        cols[cols.length]= e.hours
      })
      return cols
    },
    getDay(index){
      let cols=[];
      this.range.forEach(function (e,i,a){
        cols[cols.length]= e
      })
      return cols
    },

},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table > *{
  font-family: 'IM Fell DW Pica',sans-serif !important;
  text-shadow: 0px 0px 2px rgba(40,40,40,0.2);
  font-size: 19px;
}
td div.flexcontainer > p.date > span:nth-child(3){
  opacity: 0;
 }
tbody tr:last-child td div p.date span:nth-child(3){
  opacity: 1;
}
</style>
