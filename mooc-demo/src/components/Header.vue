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
                    <div v-for="(e,i) in course" :key="i">
                      <p><strong>{{e.title}}</strong></p>
                      <ul id="menu-content">
                        <li v-for="item in e.content" :key="item.id">{{item}}</li>
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
          <el-col :span="4" :offset="1"><div class="grid-content bg-purple-light" style="line-height:60px;">
            <el-input placeholder="请输入内容" v-model="input" style="border-radius:22px;"><i slot="suffix" class="el-input__icon el-icon-search" style="backgroundColor:#00c758;height:39px;border-radius:24px;width:70px;margin:10px -4px 0 0;font-size:24px;"></i>
          </el-input>
          </div></el-col>
          <el-col :span="3" class="log-reg"  style="font-size:17px;float:right;">
            <span v-if="loginInfo.ifLogin" style="float:left;line-height:60px;">个人中心</span>
            <el-dropdown v-if="loginInfo.ifLogin" trigger="hover" style="float:right;margin-top:calc(30px - 31px/2)">
              <span class="el-dropdown-link">
                <el-avatar shape="square" size="small" fit="cover" :src="loginInfo.photo"></el-avatar>
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
            <span v-if="!loginInfo.ifLogin" @click="dialogVisible=true" class="Reg-Log" style="float:right;line-height:60px;">登录&nbsp|&nbsp注册</span>
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
import {mapMutations} from 'vuex';
const getIfLogin = request.postIfLogin;
export default {
    name:'Header',
    components:{
        LoginRegister
    },
    data(){
        return{
            activeIndex:'1-1',
            course:{
                top:{
                title:"大学",
                content:["国家精品","计算机","外语","理学","工学",
                    "经济管理","心理学","文史哲","艺术设计","医药卫生",
                    "教育医学","法学","农林园艺","体育运动","音乐与舞蹈",
                    "养生保健","期末试卷","学长学姐说","爱好变副业"
                ]
                },
                mid:{
                title:"升学/择业",
                content:["期末不佳","21考研","22考研","应试英语","限时公开课",
                    "考证就业","实用英语","英语实训"
                ]
                },
                bot:{
                    title:"终生学习",
                    content:["名师专栏"]
                }
            },
            dialogVisible: false,
            handleCloseStatus:false,
            loginInfo:{
                ifLogin:false,
                user:'',
                photo:''
            }
        }
    },
    created:function(){
      if(!this.$store.state.userInfo.ifLogin){
        getIfLogin().then(res=>{
          if(res.data.userInfo){
              this.loginInfo.ifLogin=true;
              this.loginInfo.user=res.data.userInfo.user;
              this.loginInfo.photo=res.data.userInfo.photo;
              this.loadInfo(this.loginInfo);
          };
        }).catch(e=>{console.log("Header.vue - created - getIfLogin()-error");console.log(e);})
      }else{
        this.loginInfo=this.$store.state.userInfo;
      }
    },
    watch:{
      ToLogin(Val,oldVal){
        if(Val){
          this.dialogVisible=true;
        };
      }
    },
    methods:{
        ...mapMutations(['loadInfo','toggleLogin']),
        handleClose(done) {
            this.handleCloseStatus=!this.handleCloseStatus;
            this.toggleLogin(false);
            done();
        },
        closeDia(status){
            this.dialogVisible=status;
            this.toggleLogin(false);
        },
        judgelogin(data){
            if(data.LoginStatus){
                this.loginInfo.ifLogin=true;
                this.loginInfo.user=data.user;
                this.loginInfo.photo=data.photo;
                this.loadInfo(this.loginInfo);
            }
        }
    },
    watch:{
      '$store.state.toLogin':function(Val,oldVal){
            console.log(Val);
            if(Val){
              this.dialogVisible=true;
            }
        }
        // '$store.state.ifLogin':function(Val,oldVal){
        //     console.log(Val);
        //     if(Val){
        //       this.dialogVisible=true;
        //     }
        // },
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
</style>