<template>
    <div id="new">
        <div class="new_header">
            <img class="goback" @click="goback" src="../assets/img/goback.png"></img>
        </div>
        <div class="top-img">
            <img class="image" :src="'https://images.weserv.nl/?url=' + image">
            <div class="textbox">
                <div class="text-title">{{title}}</div>
                <div class="image_source">{{image_source}}</div>
            </div>
        </div>
        <div v-html="body"></div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                body: '',
                image: '',
                title: '',
                image_source: ''
            }
        },
        methods: {
            getnewbody(id) {
                this.$http.get('/api/api/4/news/' + id).then(res => {
                    console.log(res);
                    this.body = res.body.body;
                    this.image = res.body.image;
                    this.title = res.body.title;
                    this.image_source = res.body.image_source;
                }).catch(err => {
                    console.log(err);
                })
            },
            goback() {
                this.$router.go(-1); //返回上一层
            }
        },
        mounted() {
            console.log(this.$route.query);
            this.getnewbody(this.$route.query.id);
        }
    }
</script>
<style lang="scss" scoped>
    @import url('../assets/body.css');

    .new_header {
        width: 100%;
        height: 50px;
        background-color: #1cbbb4;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #fff;
        position: sticky;
        top: 0;
        z-index: 1000;

        .goback {
            width: 24px;
            height: 24px;
            margin-left: 15px;
        }
    }

    .top-img {
        width: 100%;
        height: 200px;
        position: absolute;
        top: 50px;
        overflow: hidden;

        .image {
            width: 100%;
            transform: translateY(-20%);
        }

        .textbox {
            width: 100%;
            height: 100px;
            position: absolute;
            bottom: 0;
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));

            .text-title {
                box-sizing: border-box;
                padding: 20px 10px 0 10px;
                color: #fff;
                font-size: 18px;
            }

            .image_source {
                color: #fff;
                font-size: 10px;
                position: absolute;
                right: 10px;
                bottom: 10px;
            }
        }
    }
</style>