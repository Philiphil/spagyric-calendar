<template>
        <span v-if="_element ===0">🜃</span>
        <span v-else-if="_element ===1">🜄</span>
        <span v-else-if="_element ===2">🜁</span>
        <span v-else >🜂</span>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'ElementSwitch',
  props: {
    element:Object
  },
  computed:{
    _element(){
       if(this.element == null){
         return 
       }
      return this.element
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.dayname{
  text-transform: capitalize;
}

</style>
