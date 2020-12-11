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
              <li v-for="(e,i) in cateCourse.category" :key="i">
                <!-- <a :href="e.href"><strong>{{e.title}}</strong></a> -->
                <router-link :to="'/Channel/'+(i+'-'+'0')"><strong>{{e.title}}</strong></router-link>
                <span v-for="(item,index) in e.children" :key="index">
                  <!-- <a :href="item.href">{{item.content}}</a><span v-if="index<(e.children.length-1)">/</span> -->
                  <router-link :to="'/Channel/'+(i+'-'+(index+1))">{{item.content}}</router-link><span v-if="index<(e.children.length-1)">/</span>
                </span>
              </li>
            </ul>
            <p v-if="!hover" style="padding:0 15px;text-align:left;position:absolute;top:calc(100% - 20px);width:100%;z-index:3;" @mouseover="hover=true">更多<i class="el-icon-arrow-down"></i></p>
            <p>人质</p>
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
            <el-button type="success" round style="width:77%;">登录/注册</el-button>
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

        <div id="live-video">
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
        </div>

        <div id="edit-reco">
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
        </div>

        <LessonRank></LessonRank>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import LessonRank from '../components/LessonRank'
import Header from '../components/Header'
export default {
  name: 'Dashboard',
  components:{
    LessonRank,
    Header
  },
  data () {
    return {
      input:"",
      cateCourse:{
        category:[
          {
          title:"国家精品",
          url:""
          },
          {
            title:"计算机",
            url:"",
            children:[
              {
              content:"前沿技术",
              url:""
              },
              {
              content:"软件工程",
              url:""
              }
            ]
          },
          {
            title:"外语",
            url:"",
            children:[
              {
              content:"听力/口语",
              url:""
              },
              {
              content:"写作翻译",
              url:""
              }
            ]
          },
          {
            title:"理学",
            url:"",
            children:[
              {
              content:"数学",
              url:""
              },
              {
              content:"物理",
              url:""
              },
              {
              content:"化学",
              url:""
              },
              {
              content:"天文学",
              url:""
              }
            ]
          },
          {
            title:"工学",
            url:"",
            children:[
              {
              content:"力学",
              url:""
              },
              {
              content:"材料",
              url:""
              }
            ]
          },
          {
            title:"22考研",
            url:"",
            children:[
              {
              content:"数学",
              url:""
              },
              {
              content:"唐迟英语",
              url:""
              },
              {
              content:"408计算机",
              url:""
              }
            ]
          },
          {
            title:"期末不挂科",
            url:"",
            children:[
              {
              content:"高数不挂科",
              url:""
              },
              {
              content:"物理不挂科",
              url:""
              }
            ]
          },
          {
            title:"应试英语",
            url:"",
            children:[
              {
              content:"四六级",
              url:""
              },
              {
              content:"万词班",
              url:""
              }
            ]
          },
          {
            title:"实用英语",
            url:""
          },
          {
            title:"经济管理",
            url:"",
            children:[
              {
              content:"经济",
              url:""
              },
              {
              content:"金融",
              url:""
              },
              {
              content:"电商",
              url:""
              }
            ]
          },
          {
            title:"心理学",
            url:""
          },
          {
            title:"文史哲",
            url:"",
            children:[
              {
              content:"文学文化",
              url:""
              },
              {
              content:"新闻传播",
              url:""
              },
              {
              content:"电商",
              url:""
              }
            ]
          },
          {
            title:"艺术设计",
            url:"",
            children:[
              {
              content:"艺术学",
              url:""
              },
              {
              content:"美术学",
              url:""
              }
            ]
          },
          {
            title:"医药卫生",
            url:"",
            children:[
              {
              content:"基础医学",
              url:""
              },
              {
              content:"临床医学",
              url:""
              }
            ]
          },
          {
            title:"教育教学",
            url:"",
            children:[
              {
              content:"教育方法",
              url:""
              },
              {
              content:"教育能力",
              url:""
              }
            ]
          },
          {
            title:"法学",
            url:"",
            children:[
              {
              content:"法学",
              url:""
              },
              {
              content:"思政",
              url:""
              },
              {
              content:"社会",
              url:""
              }
            ]
          },
          {
            title:"农林园艺",
            url:"",
            children:[
              {
              content:"植物",
              url:""
              },
              {
              content:"动物",
              url:""
              },
              {
              content:"生态",
              url:""
              }
            ]
          },
          {
            title:"音乐与舞蹈",
            url:""
          },
          {
            title:"21考研",
            url:"",
            children:[
              {
              content:"数学",
              url:""
              },
              {
              content:"孔昱力政治",
              url:""
              }
            ]
          },
          {
            title:"考证就业",
            url:"",
            children:[
              {
              content:"公务员考试",
              url:""
              },
              {
              content:"办公",
              url:""
              }
            ]
          },
          {
            title:"名师专栏",
            url:"",
            children:[
              {
              content:"热门专栏",
              url:""
              },
              {
              content:"情商",
              url:""
              }
            ]
          },
        ]
      },
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
  computed:{
  },
  
  watch:{
  },
  methods:{
    
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
}
ul.in-out li{
  text-align:left;
  padding:0 0 0 15px;
  overflow: hidden;
  height:28px;
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
ul.in-out li:hover{
  background: rgba(0, 199, 88, 0.1);
  color: rgb(0, 199, 88);
}
ul.in-out a:hover{
  cursor: pointer;
  text-decoration: underline;
}
.el-row.asso-uni{
  background-color: rgba(255,255,255,1);
  margin:18px auto 0;
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
