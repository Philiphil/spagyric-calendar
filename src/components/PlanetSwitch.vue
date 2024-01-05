<template>
  <span v-if="favorable!==0">
    <ruler-switch :element=_ruler></ruler-switch>
    <favorable-switch :element="_favorable" />
  </span>
</template>

<script>
import RulerSwitch from "@/components/RulerSwitch";
import FavorableSwitch from "@/components/FavorableSwitch";
import ElementSwitch from "@/components/ElementSwitch";
export default {
  name: 'PlanetSwitch',
  components: {FavorableSwitch, RulerSwitch, ElementSwitch},
  props: {
    favorable:Number,
    ruler:Number,
  },
  computed:{
    _favorable(){
      if(this.favorable == null){
        return
      }
      return this.favorable
    },
    _ruler(){
      if(this.ruler == null){
        return
      }
      return this.ruler
    },

  }
}
</script>
