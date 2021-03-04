<template>
    <div id="header">
        <el-row style="width:1200px;margin:0 auto;">
          <el-col :span="4" style="width:217px;">
            <div class="grid-content bg-purple"><img src="../assets/dash-logo.png" style="width:217px;height:32px;margin-top:calc((60px - 32px)/2)"></div>
          </el-col>
          <el-col :span="12" style="padding:0 66px;width:46%;">
            <div class="grid-content bg-purple-light">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="1">
                  <template slot="title">课程</template>
                  <el-menu-item index="1-1" style="width:700px;height:auto;">
                    <p style="color:#999999">中国大学MOOC，为你提供一流的大学教育</p>
                    <div v-for="(e,i) in headercourse" :key="i">
                      <p><strong>{{e.title}}</strong></p>
                      <ul id="menu-content">
                        <li v-for="(item,index) in e.list" :key="index">
                          <a :href="'#/Channel/'+item.channel+'-0'+'-'+encodeURI(encodeURI(item.title))" target="_blank">{{item.title}}</a>
                        </li>
                      </ul>
                    </div>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="2">学校</el-menu-item>
                <el-menu-item index="3">学校云</el-menu-item>
                <el-menu-item index="4">慕课堂</el-menu-item>
                <el-menu-item index="5">下载APP</el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="4" :offset="1">
            <div class="grid-content bg-purple-light" style="line-height:60px;position:relative;">
              <input type="text" autocomplete="off" v-model="input" placeholder="请输入课程,id或学校" class="el-input__inner" style="border-radius:24px;">
              <i class="el-input__icon el-icon-search" style="height: 39px; color:#409eff;border-radius: 24px; width: 70px;font-size: 24px;position:absolute;top:10.5px;right:0px;"></i>
              <div class="searchOutCome" v-if="searchShow" style="margin-top:-10px;font-size:12px;width:160px;margin-left:20px;">
                <div class="fullOutcome" v-if="searchOutCome" @mouseleave="searchShow=false">
                  <div class="clue">请选择或继续输入...</div>
                  <div class="OutCome">
                    <div v-if="searchOutCome.length>1">
                      <a target="_blank" :href="'#/Search/'+'search='+input">查看'<span>{{this.input}}</span>'所有相关课程</a>
                    </div>
                    <div v-for="(e,i) in searchOutCome" :key="i">
                      <a target="_blank"  
                        :href="'#/DetailInfo/'+encodeURI(encodeURI(e.name))+'&'+encodeURI(encodeURI(e.school))+'&'+encodeURI(encodeURI(e.id))"
                      >{{e.name}}&nbsp({{e.school}})</a>
                    </div>
                  </div>
                </div>
                <div class="emptyOutcome" v-else>无搜索结果,请重新输入</div>
              </div>
            </div>
          </el-col>
          <el-col :span="3" class="log-reg"  style="font-size:17px;float:right;">
            <span v-if="iflogin" style="float:left;line-height:60px;">个人中心</span>
            <el-dropdown v-if="iflogin" trigger="hover" style="float:right;margin-top:calc(30px - 31px/2)">
              <span class="el-dropdown-link">
                <el-avatar shape="square" size="small" fit="cover" :src="ImgUrlTrans(userInfo.photo)"></el-avatar>
                <i class="el-icon-arrow-down el-icon--right" style="vertical-align:super;"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的直播</el-dropdown-item>
                <el-dropdown-item>我的认证证书</el-dropdown-item>
                <el-dropdown-item>我的优惠券</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-if="!iflogin" @click="dialogVisible=true" class="Reg-Log" style="float:right;line-height:60px;">登录&nbsp|&nbsp注册</span>
            <el-dialog
            :visible.sync="dialogVisible"
            lock-scroll="true"
            width="30%"
            :before-close="handleClose">
              <LoginRegister @close-dia="closeDia(status)" @judgeLogin="judgelogin" :closeClick="handleCloseStatus"></LoginRegister>
              
            </el-dialog>
          </el-col>
          
        </el-row>
    </div>
</template>
<script>
import LoginRegister from '../components/LoginRegister';
import request from '../api/index';
import {mapMutations,mapState} from 'vuex';
const PostGetSession = request.PostGetSession;
const PostHeaderCourse = request.PostHeaderCourse;
const PostHeaderSearch = request.PostHeaderSearch;
export default {
    name:'Header',
    components:{
        LoginRegister
    },
    data(){
        return{
            activeIndex:'1-1',
            headercourse:[],
            dialogVisible: false,
            handleCloseStatus:false,
            input:'',
            searchTimeOut:'',
            searchShow:false,
            searchOutCome:0
        }
    },
    computed:{
      ...mapState(['iflogin','userInfo'])
    },
    created(){
      if(this.$store.state.userInfo.user==undefined){
        PostGetSession()
          .then(res=>{
            if(res.data.code==1){
              console.log("header-getSession");
              console.log(this.$store.state.userInfo);
              this.$store.state.userInfo=res.data.data;
              this.$store.state.iflogin=true;
              console.log(this.$store.state.userInfo);
            }
          }).catch(e=>{console.log("App-created()-PostGetSession:error"+e)});
      }
    },
    mounted(){
      PostHeaderCourse()
        .then(res=>{
          if(res.data.code==1){
            this.headercourse=res.data.data;
          };
        }).catch(e=>{
          console.log("header.vue-mounted-PostHeaderCourse-catch:");
          console.log(e);
        })
    },
    watch:{
      ToLogin(Val,oldVal){
        if(Val){
          this.dialogVisible=true;
        };
      }
    },
    methods:{
      ImgUrlTrans(url){
            return url.replace("http://47.93.63.232:3002/images",'/static/self_img/userimg');
      },
        ...mapMutations(['loadInfo','toggleLogin']),
        handleClose(done) {
            this.handleCloseStatus=!this.handleCloseStatus;
            this.toggleLogin(false);
            done();
        },
        closeDia(status){
            this.dialogVisible=status;
            this.toggleLogin(false);
        }
        // judgelogin(data){
        //     if(data.LoginStatus){
        //         this.loadInfo(this.loginInfo);
        //         this.loginInfo=this.$store.state.userInfo
        //     }
        // }
    },
    watch:{
      '$store.state.toLogin':function(Val,oldVal){
        console.log(Val);
        if(Val){
          this.dialogVisible=true;
        }
      },
      input:function(Val,oldVal){
        var thisVue=this;
        window.clearTimeout(this.searchTimeOut);
        this.searchTimeOut=setTimeout(function(){
          if(!Val==''){
            PostHeaderSearch({search:Val,on:3,gjjp:0})
              .then(res=>{
                thisVue.searchShow=true;
                if(res.data.code==1){
                  console.log(res.data.data);
                  thisVue.searchOutCome=res.data.data;
                };
                if(res.data.code==0){
                  thisVue.searchOutCome=0;
                };
              }).catch(e=>{
                console.log("Header-watch-input-PostHeaderSearch-catch--e:");
                console.log(e);
              })
          }
        },1000)       
      }
      
    }
}
</script>
<style>
.log-reg>span:hover{
    color:#00AD4D;
    cursor: pointer;
}
#menu-content{
    display: flex;
    display: -webkit-flex;
    flex-flow:row wrap;
    justify-content: flex-start;
}
#menu-content li {
    display: inline-block;
    border-radius: 24px;
    line-height: 34px;
    margin:5px;
    width:16%;
    text-align: center;
    background-color:rgba(0,0,0,0.04);
}
#menu-content li>a{
  width:100%;
  height:100%;
  display: block;
}
#menu-content li:hover{
  background-color:rgba(0, 199, 88, 0.1);
  color:rgb(0, 199, 88);
}
.searchOutCome>div{
  position:relative;
  z-index:999;
  border:1px solid #d5d5d5;
  background:#f5f5f5;
}
.searchOutCome .clue{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height:30px;
  line-height: 30px;
  text-align: left;
  text-indent: 7px;
}
.searchOutCome .OutCome>div{
  height:32px;
  text-align: left;
  text-indent: 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 32px;
}
.searchOutCome .OutCome>div:hover{
  background: #ECECEE;
}
.searchOutCome .OutCome a{
  color:#00c758;
}
</style>