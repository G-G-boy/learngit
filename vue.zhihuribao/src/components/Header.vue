<template>
    <div id="header">
        <h2>{{msg}}--{{title}}</h2>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'这是一个头部组件'
        }
    },
    props:['title']
}
</script>
<style lang="scss" scoped>
h2{
    color: red;
}
   

</style>
