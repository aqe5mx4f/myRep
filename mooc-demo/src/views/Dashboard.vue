<template>
  <div class="dashboard">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main style="overflow:inherit;background:rgba(247,247,247,1);">
        <el-row style="height:364px;width:1200px;margin:0 auto;">
          <el-col :span="5" style="height:364px;position:relative;background:rgba(255,255,255,1)">
            <ul :style="hover?'':'height:340px;overflow:hidden;'" class="in-out" @mouseleave="hover=false">
              <li v-for="(e,i) in cateCourse" :key="i" class="UpToHide">
                <!-- <a :href="e.href"><strong>{{e.title}}</strong></a> -->
                <span class="cha-tab-p">
                  <router-link :to="'/Channel/'+(i+'-'+'0'+'-'+encodeURI(encodeURI(e.title)))" target="_blank">{{e.title}}</router-link>
                </span>
                <span class="cha-tab-c" v-if="!(e.channel==0)">
                  <span v-for="(item,index) in e.list" :key="index">
                    <!-- <a :href="item.href">{{item.content}}</a><span v-if="index<(e.children.length-1)">/</span> -->
                    <router-link :to="'/Channel/'+((i)+'-'+(index+1)+'-'+encodeURI(encodeURI(e.title)))" target="_blank">{{item}}</router-link><span v-if="index<(e.list.length-1)">/</span>
                </span>
                </span>
              </li>
            </ul>
            <p v-if="!hover" style="padding:0 12px;text-align:left;position:absolute;top:calc(100% - 20px);width:100%;z-index:3;" @mouseover="hover=true">更多<i class="el-icon-arrow-down"></i></p>
          </el-col>
          <el-col :span="14"  style="height:360px;margin:0 2.06665%;">
            <el-carousel trigger="click" height="360px;">
              <el-carousel-item style="height:364px;">
                <img src="../assets/Fadein-out/one.png" alt="">
              </el-carousel-item >
              <el-carousel-item style="height:364px;">
                <img src="../assets/Fadein-out/two.jpg" alt="">
              </el-carousel-item>
              <el-carousel-item style="height:364px;">
                <img src="../assets/Fadein-out/three.png" alt="">
              </el-carousel-item>
              <el-carousel-item style="height:364px;">
                <img src="../assets/Fadein-out/four.png" alt="">
              </el-carousel-item>
              <el-carousel-item style="height:364px;">
                <img src="../assets/Fadein-out/five.png" alt="">
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="4" style="height:100%;background:rgba(255,255,255,1);position:relative">
            <p style="padding:27px 12%">免费学习来自名校名师的精品课程</p>
            <div style="margin:30px;">
              <img src="../assets/login.png" alt="">
            </div>
            <el-button type="success" round style="width:77%;" @click="GoToLoign();">登录/注册</el-button>
            <p style="font-size:12px;position:absolute;top:calc(100% - 35px);color:rgb(153,153,153);width:100%;">网易和高等教育出版社出品</p>
          </el-col>
        </el-row>
        <el-row class="asso-uni">
          <el-col :span="4" style="line-height:60px;"><span style="line-height:60px;font-size:16px;">全国724所合作学校</span><i class="el-icon-arrow-right"></i></el-col>
          <el-col :span="4"><a><img src="../assets/school/peking.png" alt=""></a></el-col>
          <el-col :span="4"><a><img src="../assets/school/zju.png" alt=""></a></el-col>
          <el-col :span="4"><a><img src="../assets/school/nju.png" alt=""></a></el-col>
          <el-col :span="4"><a><img src="../assets/school/whu.png" alt=""></a></el-col>
          <el-col :span="4"><a><img src="../assets/school/heb.png" alt=""></a></el-col>
        </el-row>

        <!-- <div id="live-video">
          <div style="width:1200px;overflow:hidden;">
            <div v-if="FrameStatus>1" style="position:absolute;top:calc(54% - 19px);left:-34px;"><i class="el-icon-arrow-left" @click="FrameStatus--"></i></div>
            <p>最近直播</p>
            <div class="show-frame" :style="{width:LiveVideo.frame.length*1200+'px',transform:'translateX('+(1-FrameStatus)*1200+'px)'}">
              <div class="view-part" v-for="(a,b) in LiveVideo.frame" :key="b">
                <div class="indu-part" v-for="(e,i) in a" :key="i" :style="{margin:(i%4==0?'0 0.8% 16px 0':'')||(i%4==3?'0 0 16px 0.8%':'')}">
                  <div class="time">·<span>{{e.time}}</span></div>
                  <div>
                    <div style="width:20%;height:40%;float:left;margin:6% 0 0 8%;"><img :src="e.img" alt="" style="width:100%;height:100%;border-radius:100%;"></div>
                    <div class="desc-info"><p>{{e.content}}</p><div class="name-info"><p v-for="item in e.info" :key="item.id">{{item}}</p></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="FrameStatus<LiveVideo.frame.length" style="position:absolute;top:calc(54% - 19px);right:-34px;"><i class="el-icon-arrow-right" @click="FrameStatus++"></i></div>
          </div>
        </div> -->

        <!-- <div id="edit-reco">
          <div style="width:1200px;overflow:hidden;">
            <div v-if="RecoStatus>1" style="position:absolute;top:calc(54% - 19px);left:-34px;"><i class="el-icon-arrow-left" @click="RecoStatus--"></i></div>
            <p>编辑推荐</p>
            <div class="show-frame" :style="{width:EditReco.frame.length*1200+'px',transform:'translateX('+(1-RecoStatus)*1200+'px)'}">
              <div class="view-part" v-for="(a,b) in EditReco.frame" :key="b">
                <div class="indu-part" v-for="(e,i) in a" :key="i">
                  <div class="img"><img :src="e.img"></div>
                  <div class="obj-src"><p><strong>{{e.object}}</strong></p><p>{{e.source}}</p></div>
                  <div class="hot-info"><p><span>{{e.hot}}</span>人参加</p><el-divider></el-divider><p>{{e.info}}</p></div>
                </div>
              </div>
            </div>
            <div v-if="RecoStatus<EditReco.frame.length" style="position:absolute;top:calc(54% - 19px);right:-34px;"><i class="el-icon-arrow-right" @click="RecoStatus++"></i></div>
          </div>
        </div> -->

        <LessonRank></LessonRank>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LessonRank from '../components/LessonRank'
import Header from '../components/Header'
import request from '../api/index'
import {mapMutations,mapState} from 'vuex';
const PostChannelAll = request.PostChannelAll;
import { ImgUrl } from '../common/js/api'
export default {
  name: 'Dashboard',
  components:{
    LessonRank,
    Header
  },
  data () {
    return {
      input:"",
      cateCourse:{},
      ImageGroup:{
        content:["../assets/Fadein-out/one.png","../assets/Fadein-out/two.jpg","../assets/Fadein-out/three.png","../assets/Fadein-out/four.png","../assets/Fadein-out/five.png"]
      },
      hover:false,
      LiveVideo:{
        frame:[
          [
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
          ],
          [
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
          ],
          [
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
          ],
          [
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
            {
              time:"今天19:00开始",
              img:require('../assets/live-video/one.png'),
              content:"武忠祥教授夜谈：考研数学如何自成一派？",
              info:["有道考神","曲根"]
            },
          ]
        ]
      },
      FrameStatus:1,
      RecoStatus:1,
      EditReco:{
        frame:[
          [
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
          ],
          [
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
          ],
          [
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
            {
              img:require('../assets/edit-reco/elec.png'),
              object:"模拟电子技术基础",
              source:"国防科技大学",
              hot:5007,
              info:"走近精彩的电子技术"
            },
          ],
        ]
      }
    }
  },
  methods:{
    // ...mapMutations(['loadInfo','toggleLogin'])
    GoToLoign(){
      this.$store.commit('toggleLogin',true);
    }
  },
  computed:{
  },
  mounted(){
      PostChannelAll()
      .then(res=>{
          if(res.data.code==1){
            this.cateCourse=res.data.data;
          }
      }).catch(e=>{
        console.log('dashboard-mounted-PostChannelTab():error');
        console.log(e);
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-main>.el-row,.el-header>.el-row{
  width: 1200px;
  margin:0 auto;
}
.el-carousel__container{
  height:360px!important;
}
.el-carousel__item img{
  width:722px;
  height:364px;
}
.el-carousel--horizontal{
  height:364px;
}
.el-carousel--horizontal>div{
  height:364px;
}
.el-input--suffix .el-input__inner{
  border-radius:20px;
}
ul.in-out{
  overflow: hidden;
  position: absolute;
  z-index: 2;
  background-color: rgba(255,255,255,1);
  padding:6px 0 0;
  width:100%;
}
ul.in-out li{
  text-align:left;
  padding:0 12px;
  overflow: hidden;
  height:34px;
  line-height:34px;
}
ul.in-out li a{
  line-height: 28px;
  color:inherit;
}
ul.in-out li span a+span{
  margin:0 4px;
}
ul.in-out li>a{
  margin-right: 10px;
}
ul.in-out li a+a{
  opacity: 0.6;
  font-size:13px;
}
ul.in-out li:hover>span{
  color: rgb(0, 199, 88);
}
ul.in-out span.cha-tab-p{
  font-size: 14px;
  font-weight: 500;
  color: rgb(51, 51, 51);
  margin-right:8px;
}
ul.in-out span.cha-tab-c{
  font-size: 12px;
  line-height: 17px;
  font-weight: 400;
  color: rgb(153,153,153);
}
ul.in-out a:hover{
  cursor: pointer;
  text-decoration: underline;
}
.el-row.asso-uni{
  background-color: rgba(255,255,255,1);
  margin:18px auto 18px;
}
.el-row.asso-uni .el-col-4{
  height:60px;
  line-height: 84px;
}
.el-row.asso-uni a{
  height:36px;
  display: inline-block;
  line-height: 60px;
}
.el-row.asso-uni img{
  width:110px ;
  height:31px;
}
#edit-reco .indu-part{
  width:18.72%;
}
#live-video .indu-part{
  width:23.8%;
}
#live-video .indu-part .time{
  width: 36%;
  font-size: 12px;
  border-radius: 25px;
  color: rgba(153,153,153,1);
  background: rgba(245,245,245,1);
  margin: 5% 0 0 4%;
  height: 20px;
  line-height: 20px;
}
#live-video .indu-part .desc-info{
  float: right;
  width:72%;
  margin:6% 0 8%;
}
#live-video .indu-part .desc-info>p{
  padding:0 10%;
  text-align: left;
}
#live-video .indu-part .name-info{
  color:#999;
}
#live-video .indu-part .name-info p:first-child{
  float:left;
  padding:5% 0 0 10%;
}
#live-video .indu-part .name-info p+p{
  float:left;
  padding:5% 0 0 3%
}
#edit-reco .img,#edit-reco .img img{
  width: 100%;
}
#edit-reco .hot-info{
  padding: 16% 1em 36px;
  text-align: left;
  color: #999;
  font-size: 12px;
}
.el-divider--horizontal{
  margin:8px 0!important;
}
</style>
