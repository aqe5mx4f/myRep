<template>
    <div id="DetailInfo">
        <el-container>
            <el-header>
                <Header ></Header>
            </el-header>
            <el-main style="padding:20px 0;">
                <div id="crossInfo" style="width:1200px;margin:0 auto;height:320px;margin-bottom:60px;">
                    <div class="bre-cru">
                        <span><a href="#">首页</a></span><span style="margin:0 6px;">></span>
                        <span>{{lessInfo.pCategory}}</span><span style="margin:0 4px;">/</span><span>{{lessInfo.sCategory}}</span>
                    </div>
                    <div class="video-info">
                        <div class="video-url" style="width:40%;float:left;position:relative;">
                            <img :src="lessInfo.img" alt="" style="width:100%;height:288px;">
                            <div class="click-play" style="position:absolute;width:100%;height:288px;top:0;left:0;background-color: rgba(0, 0, 0, 0.3)">
                                <a href="">
                                    <i class="el-icon-caret-right" style="vertical-align:middle;margin:0;"></i>
                                    <span style="vertical-align:middle;">播放</span>
                                </a>
                            </div>
                        </div>
                        <div class="main-info" style="width:60%;float:right;padding-left:3%;">
                            <div class="name-share" style="width:100%;padding-bottom:10px;text-align:left;">
                                <div class="name">{{lessInfo.name}}</div>
                                <div class="share" style="float:right;width:20%;">
                                    <span>分享</span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div class="lesson-mark" v-if="lessInfo.pChannel==0" style="cursor:pointer;text-align:left;">
                                <a><span>国家精品</span></a>
                            </div>
                            <div class="schedule" style="width:88%;backgroundColor:#f5f5f5;padding:10px 20px 10px;margin-top:10px;color:#666;text-align:left;">
                                <p style="color:#333;line-height:32px;font-size:14px;">第{{lessInfo.courseInfo[courseTime-1]}}次开课</p>
                                <p style="width:100%;">开课时间：<span>{{lessInfo.courseInfo[courseTime-1].starttime}}</span>~<span>{{lessInfo.courseInfo[courseTime-1].endtime}}</span><span style="textAlign:right;color:red;float:right;color:#00C758;">进行至第{{lessInfo.courseInfo[courseTime-1].progress}}周，共{{lessInfo.courseInfo[courseTime-1].lesssonDuring}}课</span></p>
                                <p>学时安排：<span>{{lessInfo.courseInfo[courseTime-1].hourPerWeek}}</span>小时每周</p>
                            </div>
                            <div class="hot"><span>已有{{lessInfo.hot}}人参加</span></div>
                            <div class="join-lesson">立即参加</div>
                        </div>
                    </div>
                </div>
                <div id="spec-info" style="width:100%;background:rgb(247,247,247);">
                    <div id="lessInfo">
                        <div class="lessDetail" style="width:75%;background:#fff;padding:25px 42px;">
                            <div class="tabClick" style="width:100%;font-size:18px;">
                                <p style="border-bottom:1px solid #e6e6e6;line-height:44px;text-align:left;">
                                    <span @click="tabStatus=0" :class="{active:tabStatus==0}" style="padding-bottom:8px;margin-right:30px;" >课程详情</span>
                                    <span @click="tabStatus=1" :class="{active:tabStatus==1}" style="padding-bottom:8px;">课程评价</span>
                                </p>
                            </div>
                            <div class="Info" v-if="tabStatus==0">
                                <div class="lessTeam" style="width:100%;margin-top:25px;background:#F5F8F4;padding:30px">
                                    <div class="mainVerb" style="width:100%;font-size:14px;text-align:left;margin-bottom:10px;">{{lessInfo.courseSummary.lessTeam}}
                                    </div>
                                    <div class="psName" style="width:100%;font-size:16px;">
                                        <p style="text-align:right">————课程团队</p>
                                    </div>
                                </div>
                                <div class="lessDesc" style="text-align:left;padding-top:50px;">
                                    <div class="title"><i class="el-icon-document"></i><span>课程概述</span></div>
                                    <div class="Desc" style="text-align:left;">
                                        <div class="strong" style="white-space:normal;line-height:18px;color:rgb(0,0,0);font-weight:bold;"></div>
                                        <div class="normal" style="margin-top:20px;white-space:normal;line-height:18px;color:rgb(0,0,0);">
                                            <p v-for="(e,i) in lessInfo.courseSummary.lessMainState" :key="i">{{e}}</p>
                                        </div>
                                        <div class="mainTeaDesc" style="color:666;white-space: normal;line-height: 18px;font-size:12px;color:#666;margin-top:50px;">
                                            <p>主要教师介绍：</p>
                                            <p style="text-indent:1em;"> 张祖涛，男，工学博士，西南交通大学机械工程学院教授，....</p>
                                        </div>
                                    </div>
                                    <div class="lessGoal" style="display:flex;display:-webkit-flex;flex-flow:column nowrap;justify-content:space-between;margin-top:60px;">
                                        <div class="goal">
                                            <p class="title"><i class="el-icon-paperclip"></i><span>授课目标</span></p>
                                            <p>希望通过大赛主题、学生组队、竞赛创意、方案设计、作品实现、方案优化、作品展示、网评决赛、国赛答辩、成果保护等内
                                                容学习提高大学生科技创新能力，提高研究生竞赛作品质量及成绩。
                                            </p>
                                        </div>
                                        <div class="plan">
                                            <p class="title"><i class="el-icon-tickets"></i>课程大纲</p>
                                            <div v-for="(e,i) in lessInfo.courseSummary.courseOutline.content" :key="i">
                                                <p class="chartGoal">{{lessInfo.courseSummary.courseOutline.headMark=="01"?(i+1):`第${i+1}讲:`}}{{e.title}}</p>
                                                <p v-for="(a,b) in e.content" :key="b"><span style="padding-right:8px;">{{b+1}}</span>{{a}}</p>
                                            </div>
                                            
                                        </div>
                                        <div class="preKnowl">
                                            <p class="title"><i class="el-icon-tickets"></i>预备知识</p>
                                            <p class="chartGoal" v-for="(e,i) in lessInfo.courseSummary.preknowledge" :key="i" v-html="e"></p>
                                        </div>
                                        <div class="certiReq">
                                            <p class="title"><i class="el-icon-tickets"></i>证书要求</p>
                                            <p v-for="(e,i) in lessInfo.courseSummary.certiRequi" :key="i" v-html="e"></p>
                                        </div>
                                        <div class="referMater">
                                            <p class="title"><i class="el-icon-tickets"></i>参考资料</p>
                                            <p>相关专业类教材。</p>
                                        </div>
                                        <div class="normalQue">
                                            <p class="title"><i class="el-icon-tickets"></i>常见问题</p>
                                            <div  v-for="(e,i) in lessInfo.courseSummary.ferqQue" :key="i" style="color:#666;font-size:12px;">
                                                <p><span style="padding-right:6px;">Q:</span>{{e.que}}</p>
                                                <p><span style="padding-right:6px;">A:</span>{{e.ans}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Comment" v-if="tabStatus==1" style="padding:36px 0">
                                <div class="viewSummary">
                                    <el-row type="flex" justify="start">
                                        <el-col :span="2">
                                            <span class="rate">4.6</span>
                                        </el-col>
                                        <el-col :span="7" style="text-align:left;padding-top:8px;padding-left:16px;">
                                            <div style="width:100%;">
                                                <el-rate
                                                    v-model="value"
                                                    disabled
                                                    :colors="colors"
                                                    score-template="{value}">
                                                </el-rate>
                                            </div>
                                            <div class="totalNum"><span>共{{lessInfo.courseComment==[]?0:(lessInfo.courseComment.length)}}条评价</span></div>
                                        </el-col>
                                        <el-col :span="4" :offset="11">
                                            <el-button type="success" style="float:right" @click="commitComment()">提交评价</el-button>
                                            <el-dialog
                                            v-loading="loading"
                                            :visible.sync="dialogVisible"
                                            width="640px"
                                            :before-close="handleClose">
                                            <div class="head">
                                                <p class="title">撰写《C语言程序设计进阶》的评价</p>
                                                <p class="mark"><span class="label">*</span>总评</p>
                                                <p>
                                                    <el-rate
                                                    v-model="value2"
                                                    :colors="colors"
                                                    text-color="#999999"
                                                    show-text
                                                    :texts="texts">
                                                    </el-rate>
                                                </p>
                                            </div>
                                            <div class="body">
                                                <div>
                                                    <p class="mark" style="display:inline;"><span class="label">*</span>评价内容</p>
                                                    <p class="topLabel" style="display:inline;float:right;"><span :style="{'color':topLabelStatus?'#999':''}">{{topLabelStatus?'请输入5-500字':'至少输入 5 个字'}}</span></p>
                                                    <textarea v-model="areaVal" @blur="areaLeave" placeholder="可以从课程内容组织、授课方式的角度评价课程，或者分享课程给你带来了什么收获和启发"></textarea>
                                                    <p class="bottomLabel" v-if="botLabelStatus" ><i class="el-icon-warning" style="font-size:16px;"></i>请填写评价内容</p>
                                                </div>
                                            </div>
                                            <span slot="footer" class="dialog-footer" style="padding:10px 40px 30px;">
                                                <el-popover
                                                placement="top-start"
                                                width="560"
                                                style="padding:0;"
                                                trigger="hover">
                                                    <div class="dialogComm" style="padding:20px 30px;background:rgb(242,242,242);">
                                                        <p class="strong">我们建议您从下面的角度提写评价:</p>
                                                        <ol>
                                                            <li>描述您对于课程所函盖知识量的评价:</li>
                                                            <li>告诉我们您对课程趣味性的体会</li>
                                                            <li>评价老师在授课过程中的参与度</li>
                                                            <li>对于课程设计您是否有更好的建议</li>
                                                        </ol>
                                                        <p style="padding-left:24px;">更量要的是你学习之后的收获和感想,或者在字习过程中发生的故事,都可以与大家分享!</p>
                                                        <p class="strong" style="margin-top:30px;">您的评价不能:</p>
                                                        <ol>
                                                            <li>包含,威助或人身攻击的词语</li>
                                                            <li>包含与课程和自身字习经历不相关的内容</li>
                                                            <li>转述他人对于课程的感受</li>
                                                        </ol>
                                                        <p style="padding-left:24px;">否则,您的评价将不予呈现。</p>
                                                        <p style="margin-top:30px;">直诚地希里您能将最直实的掌习体验和感受分享始大家,帮助更多热爱字习的同字,中国大字MOOC数力于为您打运最优质的字习体验,您的感受对我们也至关量要!</p>
                                                    </div>
                                                    <span slot="reference" class="popSpan" style="text-decoration:underline;cursor:pointer;font-size:13px;float:left;margin-top:26px;margin-left:20px;">如何写好一篇有价值的评价？</span>
                                                </el-popover>
                                                <el-button type="success" @click="pushComment()">确 定</el-button>
                                                <el-button @click="dialogVisible = false;">取 消</el-button>
                                            </span>
                                            </el-dialog>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="comFilter" style="height:37px;">
                                    <div style="float:right;border:1px solid #ededed;font-size:13px;padding:8px 0 10px;color:#999;">
                                        <span :class="{active:filterComment==lessInfo.courseTime}" @click="filterComment=lessInfo.courseTime" style="border-right:1px solid #e6e6e6;">本次开课</span>
                                        <span :class="{active:filterComment==0}" @click="filterComment=0">全部</span>
                                    </div>
                                </div>
                                <div class="CommContainer">
                                    <div v-for="(e,i) in lessInfo.courseComment" :key="i" style="padding-top:30px;">
                                        <div class="avatar" style="width:5%;float:left;">
                                            <el-avatar size="medium" fit="contain" :src="e.user.photo"></el-avatar>
                                        </div>
                                        <div class="comInfo" style="width:95%;float:right;text-align:left;padding-left:18px;padding-bottom:30px;">
                                            <div class="head">
                                                <span>{{e.user.user}}</span>
                                                <span style="vertical-align:bottom;padding-left:6px;">
                                                    <el-rate
                                                    style="display:inline;"
                                                    v-model="e.star"
                                                    disabled
                                                    :colors="colors"
                                                    score-template="{e.star}">
                                                    </el-rate>
                                                </span>
                                            </div>
                                            <div class="body">
                                                <span>{{e.content}}</span>
                                            </div>
                                            <div class="tail">
                                                <span>发表于{{e.date}}</span>
                                                <span style="margin-left:8px;">第{{lessInfo.courseTime}}次开课</span>
                                                <span style="float:right;"><i class="el-icon-thumb"></i>{{e.admiration}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="teaWithLess" style="width:23%;background:#fff;padding:25px;">
                            <div class="schImg" style="border-bottom:1px solid #e6e6e6;padding-bottom:22px;">
                                <img src="http://localhost:3002/images/school/SouWestJTUni.jpg" alt="">
                            </div>
                            <div class="m-teacher" style="margin-top:24px;">
                                <p class="n-number" style="border-left:4px solid #00C758;font-size: 18px;padding-left: 14px;line-height: 18px;text-align:left;">5位授课老师</p>
                                <div class="teacher-frame">
                                    <div class="teacher-view"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Header from '../components/Header';
import request from '../api/index';
import {mapMutations} from 'vuex';
const PostLessDetail = request.PostLessDetail;
const PostComComent = request.PostComComent;
export default {
    name:'DetailInfo',
    components:{
        Header
    },
    data(){
        return{
            userInfo:{},
            tabStatus:0,
            dialogVisible:false,
            lessInfo:{
                courseSummary:{
                    lessTeam:'',
                    courseOutline:{
                        content:[]
                    }
                },
                courseInfo:{
                    1:{
                        starttime:'',
                        endtime:''
                    }
                },
                courseTime:1
            },
            filterComment:1,
            value:4.5,
            loading:false,
            value2:0,
            colors:['#FF7A3E', '#FF7A3E', '#FF7A3E'],
            texts:['有点失望','咳咳！有待提高','恩！其实可以做得更好','棒！实属上乘','哇！超出预期了'],
            areaVal:'',
            botLabelStatus:false,
            topLabelStatus:false,
        }
    },
    methods:{
        ...mapMutations(['toggleLogin']),
        handleClose(done) {
            done();
        },
        getComment(){
            PostLessDetail({info:this.$route.params.info,allComment:this.filterComment})
            .then(res=>{
                console.log("before");
                this.lessInfo=res.data.data[0];
            }).catch(e=>{console.log("DetailInfo-created-PostLessDetail():error"+e);});
        },
        areaLeave(){
            if(this.areaVal.length==0){
                this.botLabelStatus=true;
                return;
            };
            if(!this.areaVal.length==0){
                this.botLabelStatus=false;
                return;
            }
        },
        commitComment(){
            if(!this.$store.state.userInfo.ifLogin){
                this.toggleLogin(true);
                console.log(this.$store.state.toLogin);
            }else{
                this.topLabelStatus=false;
                this.botLabelStatus=false;
                this.areaVal='';
                this.value2=0;
                this.dialogVisible=true;
            };
        },
        pushComment(){
            if(this.areaVal.length<6){
                this.$message({
                    message:'至少输入5字评价',
                    type: 'warning'
                });
                return;
            };
            if(this.value2==0){
                this.$message({
                    message:'当前未给出等级评价',
                    type: 'warning'
                });
                return;
            };
            this.loading=true;
            PostComComent({id:this.lessInfo.id,star:this.value2,content:this.areaVal})
                .then(res=>{
                    if(res.data.code==1){
                        this.loading=false;
                        this.$message({
                            message:res.data.msg,
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.getComment();
                    }
                }).catch(e=>{
                    console.log(e);
                    this.loading=false;
                    this.$message({
                        message:'服务器错误',
                        type: 'error'
                    });
                })
        }
    },
    watch:{
        areaVal(newVal,oldVal){
            if(newVal.length<5){
                this.topLabelStatus=false;
                return;
            }
            if(newVal.length>4){
                this.topLabelStatus=true;
                return;
            }
        },
        'lessInfo.courseTime':function(Val,oldVal){
            console.log("lessInfo.courseTime:",Val);
            console.log("new");console.log(Val);
            console.log("old");console.log(oldVal);
        }
    },
    created(){
        this.getComment();
    }
}
</script>
<style>
    #DetailInfo .bre-cru{
        text-align: left;
        font-size: 14px;
        margin-bottom: 14px;;
    }
    #DetailInfo .click-play>a{
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120px;
        padding: 12.5px 0;
        border-radius: 100px;
        -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
        background-color: white;
        text-align: center;
        font-size: 18px;
        color: #111111;
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    #DetailInfo .click-play>a:hover{
        background-color: rgba(255, 255, 255, 0.7);
    }
    #DetailInfo .tabClick span.active{
        border-bottom:4px solid #00C758;
        color:#00C758;
    }
    #DetailInfo #lessInfo{
        width: 1200px;
        margin: 0px auto;
        padding: 50px 0px 0px;
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    #DetailInfo .lesson-mark span{
        color: #CBA265;
        font-size: 12px;
        padding: 2px 4px;
        background-color: transparent;
        border: 1px solid #CBA265;
        border-radius: 2px;
    }
    #DetailInfo .join-lesson{
        border-radius: 2px;
        height: 52px;
        line-height: 52px;
        font-size: 18px;
        background-color: #ff7a3e;
        border-color: #ff7a3e;
        width: 30%;
    }
    #DetailInfo .main-info{
        width: 60%;
        float: right;
        padding-left: 3%;
        display: flex;
        display: -webkit-flex;
        flex-flow: column nowrap;
        justify-content: space-around;
    }
    #DetailInfo .main-info .name{
        float:left;
        font-size: 24px;
        color: #333333;
        width:80%;
    }
    #DetailInfo .hot{
        text-align: left;
        line-height: 60px;
        color: #999;
        height: 50px;
        margin-top: 29px;
    }
    #DetailInfo .lessDesc div.title,#DetailInfo .lessDesc p.title{
        padding: 0 0 10px 0;
        font-size: 18px;
        font-weight: bold;
    }
    #DetailInfo .lessDesc .chartGoal{
        font-size: 16px;
        color:#333;
    }
    #DetailInfo #lessInfo .tail i{
        color:#00C758;
    }
    #DetailInfo .normal{
        font-size: 12px;
    }
    #DetailInfo .chartGoal{
        font-size: 16px;
        color:#333;
    }
    #DetailInfo .chartGoal~p{
        color:#999;
        font-size: 13px;
        line-height: 22px;
    }
    #DetailInfo .lessGoal>div{
        margin-top:45px;
    }
    #DetailInfo .lessGoal .plan>p.title~p{
        padding:3px 0;
    }
    #DetailInfo .lessGoal .plan~div>.title~p{
        font-family: 宋体;
        color:black;
        font-size: 14px;
    }
    .normalQue>div>p{
        color:#666;
        line-height: 22px;
        font-size: 12px;
    }
    #DetailInfo .Comment .rate{
        float:left;
        line-height: 64px;
        font-size: 48px;
        color: #FF7A3E;
        font-weight: bold;
        margin-right: 15px;
    }
    #DetailInfo .viewSummary i{
        font-size: 26px;
        color: #FF7A3E;
        margin:0;
    }
    #DetailInfo .totalNum{
        color: #999;
        font-size: 13px;
        line-height: 36px;
        letter-spacing: 1px;
        text-indent: 4px;
    }
    #DetailInfo .comFilter span{
        padding:0 14px;
        cursor: pointer;
    }
    #DetailInfo .comFilter span:hover{
        color:#00C758;
    }
    #DetailInfo .comFilter span.active{
        color:#00C758;
    }
    #DetailInfo .CommContainer{
        display: flex;
        display: -webkit-flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
    }
    #DetailInfo .CommContainer>div{
        width:100%;
    }
    #DetailInfo .CommContainer .head{
        color: #333333;
        font-size: 13px;
        text-decoration: none;
        margin-right: 10px;
        margin-bottom:9px;
    }
    #DetailInfo .CommContainer .head i{
        width:11px;
    }
    #DetailInfo .CommContainer .body{
        color: #666666;
        font-size: 14px;
        position: relative;
        line-height: 24px;
        margin-bottom: 6px;
        word-break: break-word;
    }
    #DetailInfo .CommContainer .tail{
        color: #999999;
        font-size: 13px;
    }
    #DetailInfo .CommContainer .tail i{
        margin-right:8px;
    }
    #DetailInfo #lessInfo .el-dialog{
        text-align: left;
    }
    #DetailInfo #lessInfo .el-dialog__body{
        padding:12px 40px;

    }
    #DetailInfo #lessInfo .el-dialog__wrapper .body{
        padding-top:30px;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper .mark{
        font-size: 14px;
        color:#151515;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper .label{
        color:#FF0202;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper .topLabel,#DetailInfo #lessInfo .el-dialog__wrapper .bottomLabel{
        font-size: 12px;
        color:#ff513a;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper textarea{
        display: block;
        width: 100%;
        height: 240px;
        margin-bottom: 5px;
        padding: 10px 15px;
        box-sizing: border-box;
        line-height: 24px;
        font-size: 14px;
        color: #333;
        border: 1px solid #E6E6E6;
        resize: none;
        margin-top:10px;
        font-family: emoji;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper .head .title{
        margin-bottom: 24px;
        line-height: 26px;
        font-size: 20px;
        color: #333333;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper .el-rate__text{
        padding-left:18px;
    }
    #DetailInfo #lessInfo .el-dialog__wrapper .popSpan:hover{
        color:#00c758;
    }
    i.el-dialog__close{
        color:#666!important;
    }
    .el-popover{
        padding:0;
    }
    .dialogComm ol{
        padding-left:24px;
    }
    .dialogComm li{
        list-style-type: disc;
    }
    .dialogComm p.strong{
        color:#333;
    }
    .dialogComm p{
        color:#666;
    }
    #DetailInfo.teacher-frame{
        display: flex;
        display: -webkit-flex;
        flex-flow:column wrap;
        justify-content: space-between;
    }
</style>