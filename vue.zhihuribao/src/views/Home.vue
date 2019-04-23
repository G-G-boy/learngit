<template>
  <div id="home">
    <div class="home_header">知乎日报</div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,key) in top_stories">
         <router-link :to="'/newdetail/?id='+item.id">
            <div class="imgbox">
              <img class="swiper-img" :src="'https://images.weserv.nl/?url=' + item.image">
              <div class="imgtext">{{item.title}}</div>
            </div>
          </router-link>
      </van-swipe-item>
    </van-swipe>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item,key) in list">
        <div class="date">{{item.mydate}}</div>
        <div v-for="(mystories,key) in item.mystories">
          <router-link :to="'/newdetail/?id='+mystories.id">
            <div class="newscard">
              <div class="newscard-left">{{mystories.title}}</div>
              <div class="newscard-right"><img :src="'https://images.weserv.nl/?url=' + mystories.images"></div>
            </div>
          </router-link>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {
    constants
  } from 'crypto';

  export default {
    data() {
      return {
        top_stories: [], //轮播图
        list: [],
        list3: [],
        date: 0,
        loading: false,
        finished: false,
      }
    },
    methods: {
      getdata() {
        this.$http.get('/api/api/4/news/latest').then(res => {
          console.log(res)
          this.top_stories = res.body.top_stories;
          this.list = [{
            mystories: res.body.stories,
            mydate: '今日要闻'
          }]
          // this.date=res.body.date;
          this.getolddata(res.body.date);
        }).catch(err => {
          console.log(err)
        })
      },
      getolddata(olddate) {
        this.$http.get('/api/api/4/news/before/' + olddate).then(res => {
          var datestring = res.body.date;
          var datestringtostring = datestring.toString();
          var a = this.insertStr(datestringtostring, 4, '年');
          var b = this.insertStr(a, 7, '月');
          var c = this.insertStr(b, 10, '日');
          this.date = res.body.date;
          var list2 = {
            mystories: res.body.stories,
            mydate: c
          }
          this.list.push(list2);
          this.loading = false;
          if(res.body.date == 20130520){
            this.finished = true;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      insertStr(soure, start, newStr) {
        return soure.slice(0, start) + newStr + soure.slice(start);
      },
      onLoad() {
        var olddate = this.date;
        this.getolddata(olddate);
      }
    },
    mounted() {
      console.log(this.$store.state.list)
      if(this.$store.state.list.length == 0){
         this.getdata();
      }else{
        this.list = this.$store.state.list;
        this.top_stories = this.$store.state.top_stories;
        this.date = this.$store.state.date;
      }
     
    },
    beforeDestroy(){
      this.$store.state.list = this.list;
      this.$store.state.top_stories = this.top_stories;
       this.$store.state.date = this.date;
    }
  };
</script>
<style lang="scss" scoped>
  .home_header {
    width: 100%;
    height: 50px;
    background-color: #1cbbb4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .imgbox {
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    position: relative;
    overflow: hidden;

    .swiper-img {
      width: 100%;
      transform: translateY(-20%);
    }

    .imgtext {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 100px;
      color: #fff;
      font-size: 17px;
      box-sizing: border-box;
      padding: 30px 10px 0 10px;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    }
  }

  .date {
    margin: 0 auto;
    width: 340px;
    height: 20px;
    line-height: 30px;
    color: #000;
    font-size: 15px;
  }

  .newscard {
    margin: 10px auto;
    width: 350px;
    height: 120px;
    border-radius: 5px;
    /*no*/
    display: flex;
    align-items: center;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

    .newscard-left {
      box-sizing: border-box;
      flex: 1;
      height: 100px;
      color: #000;
      font-size: 15px;
      padding: 10px;
    }

    .newscard-right {
      width: 100px;
      height: 100px;
      margin-right: 10px;
      border-radius: 5px;

      /*no*/
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        /*no*/
      }
    }
  }
</style>