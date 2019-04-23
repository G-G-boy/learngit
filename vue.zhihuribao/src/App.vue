<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>
<script>
import { constants } from 'crypto';
import index from './components/Index.vue';
export default {
  data(){
    return{
      
    }
  },
  components:{
   'v-index':index,
  },
  methods: {
   
  },
}
</script>

<style lang="scss">

</style>
