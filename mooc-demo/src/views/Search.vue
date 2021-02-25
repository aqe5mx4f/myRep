<template>
    <div id="search">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main style="overflow:inherit;background:rgba(247,247,247,1);">
                <div class="searchContainer">
                    <el-row>
                        <el-col :span="18">
                            <div style="width:100%;height:40px;font-size:14px;text-align:left;line-height:40px;">共{{lessContainer.length}}条<span style="color:red;">{{$route.params.SInfo.split('=')[1]}}</span>相关的结果</div>
                            <div style="margin-top:20px;">
                                <div class="filter" style="height:40px;border:1px solid #e6e6e6;line-height:40px;">
                                    <div><span class="rightShu" @click="on=3;loadLess()" :class="{active:on==3}">全部</span></div>
                                    <div><span class="rightShu" @click="on=2;loadLess()" :class="{active:on==2}">正在进行</span></div>
                                    <div><span class="rightShu" @click="on=1;loadLess()" :class="{active:on==1}">即将开始</span></div>
                                    <div><span class="rightShu" @click="on=0;loadLess()" :class="{active:on==0}">已结束</span></div>
                                    <div><span style="padding-left:12px;" @click="gjjp=1;loadLess()" :class="{active:gjjp==1}">国家精品</span></div>
                                </div>
                                <div class="lessContainer" style="width:100%;height:80px;margin-top:20px;padding:10px 0;">
                                    <div class="indu-less" v-for="(e,i) in lessContainer" :key="i">
                                        <a target="_blank"  
                                            :href="'#/DetailInfo/'+encodeURI(encodeURI(e.name))+'&'+encodeURI(encodeURI(e.school))+'&'+encodeURI(encodeURI(e.id))">
                                            <div class="leftSide"><img :src="e.img" alt=""></div>
                                            <div class="rightSide">
                                                <div class="courseName" v-html="e.name.replace(new RegExp($route.params.SInfo.split('=')[1],g),searchlabel)"></div>
                                                <div class="school-teacher">
                                                    <span class="school" v-html="e.school.replace(new RegExp($route.params.SInfo.split('=')[1],g),searchlabel)"></span>
                                                    <span class="teacher" v-for="(item,index) in e.courseInfo[e.courseInfo.length-1].teachers" :key="index">{{item}}</span>
                                                </div>
                                                <div class="simInfo" v-html="e.courseSummary.lessTeam.replace(new RegExp($route.params.SInfo.split('=')[1],g),searchlabel)"></div>
                                                <div class="hot-time">
                                                    <span class="hot"><i class="el-icon-user"></i></span>
                                                    <span class="hot">{{e.courseInfo[e.courseInfo.length-1].hot}}人参加</span>
                                                    <span class="time" style="margin-left:10px;"><i class="el-icon-timer"></i></span>
                                                    <span class="time">进行至第{{e.courseInfo[e.courseInfo.length-1].courseTime}}周</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6"></el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Header from '../components/Header'
import request from '../api/index';
const PostHeaderSearch = request.PostHeaderSearch;
export default {
    name:'Search',
    components:{
        Header
    },
    data(){
        return{
            on:3,
            gjjp:0,
            lessContainer:[],
            searchlabel:''
        }
    },
    computed:{
    },
    created(){
    },
    mounted(){
        this.loadLess();
    },
    methods:{
        loadLess(){
            PostHeaderSearch({search:this.$route.params.SInfo.split('=')[1],on:this.on,gjjp:this.gjjp})
            .then(res=>{
                if(res.data.code==1){
                    this.searchlabel="<span class='searchlabel'>"+this.$route.params.SInfo.split('=')[1]+"</span>";
                    console.log(this.searchlabel);
                    this.lessContainer=res.data.data;
                }else{
                    this.lessContainer=[];
                }
            }).catch(e=>{
                console.log("route-Search-mounted-PostHeaderSearch.catch:error");
                console.log(e);
            });
        }
    }
}
</script>
<style>
    #search .filter>div{
        float:left;
        line-height: 40px;
    }
    #search .filter span.rightShu{
        border-right:1px solid #e6e6e6;
        cursor:pointer;
        padding:0 12px;
    }
    #search .filter span.active{
        color:#00c758;
    }
    #search .indu-less{
        height:174px;
        padding:20px 0;
        background: #fff;
        border-bottom:1px solid #e6e6e6;
    }
    #search .indu-less .leftSide{
        float:left;
    }
    #search .indu-less .leftSide img{
        display: block;
        height:134px;
        width:237px;
    }
    #search .indu-less .rightSide{
        float:left;
        padding:0 14px;
        text-align: left;
        width:663px;
        height:134px;
    }
    #search .indu-less .rightSide .courseName{
        height:20px;
    }
    #search .indu-less .rightSide .school-teacher{
        height: 30px;
        line-height: 25px;
        font-size: 12px;
        color: #999;
    }
    #search .indu-less .rightSide .simInfo{
        width: 100%;
        height: 50px;
        margin: 2px 10px 8px 0;
        font-size: 13px;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    #search .indu-less .rightSide .hot-time{
        height:24px;
        line-height: 24px;
        font-size: 13px;
    }
    #search .indu-less .rightSide .hot-time .hot{
        color:#999;
    }
    #search .indu-less .rightSide .hot-time .time{
        color:#00c758;
    }
    #search span.searchlabel{
        color:#FF9000;
    }
</style>