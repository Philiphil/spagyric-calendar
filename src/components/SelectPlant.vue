<template>
  <input list="plant" type="text" v-model="this.selectedPlant" @input="_selectedPlant"/>
  <datalist id="plant">
    <option v-for="(plant) in plantEntries" v-bind:key="plant">
      {{ plant[0] }}
    </option>
  </datalist>
  <p>{{this.getSelectPlant}}</p>
</template>

<script>
import Plants from "@/script/plantDb";
import { useI18n } from 'vue-i18n'

export default {
  name: 'SelectPlant',
  components: {Plants},
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return {
      t,Plants
    };
  },

  data:function (){
    return{
      selectedPlant:"",
    }
  },
  computed:{
    getSelectPlant(){
      if (this.selectedPlant in this.Plants) {
        return this.t("planette."+this.Plants[this.selectedPlant])
      }
      return this.selectedPlant === "" ? "" : "?"
    },
    plantEntries() {
      return Object.entries(this.Plants);
    },
  }
}
</script>
