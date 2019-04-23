<template>
    <div id="index">
        <v-header :title="title"></v-header>
        <h1>这是index的h1</h1>
    </div >
</template>
<script>
import header from './Header';
export default {
    data(){
        return{
            title:'这是index的title'
        }
    },
    components:{
        'v-header':header,
    }
}
</script>
<style lang="scss" scoped>
/* scoped css的局部作用域*/
</style>
