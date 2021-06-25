<template>
    <div id="Channel-All-Less">
        <div style="width:1200px;overflow:hidden;">
            <div></div>
            <p>全部课程<span v-if="Total==0" style="color:#f45d44;font-size:16px;">(暂无)</span></p>
            <div class="LessFilter" style="width:100%;">
                <div class="LeftFilter">
                    <span @click="filter.state=0;changeFilter()" :class="{active:filter.state==0}">全部({{Total}})</span>
                    <span @click="filter.state=1;changeFilter()" :class="{active:filter.state==1}">正在进行</span>
                    <span @click="filter.state=2;changeFilter()" :class="{active:filter.state==2}">即将开始</span>
                    <span @click="filter.state=3;changeFilter()" :class="{active:filter.state==3}">已结束</span>
                </div>
                <div class="RightFilter">
                    <span @click="filter.cate=0;changeFilter()" :class="{active:filter.cate==0}">综合</span>
                    <span @click="filter.cate=1;changeFilter()" :class="{active:filter.cate==1}">热门</span>
                    <span @click="filter.cate=2;changeFilter()" :class="{active:filter.cate==2}">最新</span>
                </div>
            </div>
            <div class="show-frame">
                <div class="view-part">
                    <a class="indu-part" target="_blank" v-for="(e,i) in LessonContainer" :key="i" :href="'#/DetailInfo/'+encodeURI(encodeURI(e.name))+'&'+encodeURI(encodeURI(e.school))+'&'+encodeURI(encodeURI(e.id))" :style="{margin:(i%5==0?'0 0.8% 16px 0':'')||(i%5==4?'0 0 16px 0.8%':'')}">
                        <div class="img"><img :src="ImgUrlTrans(e.img)"></div>
                        <div class="obj-src"><p><strong>{{e.name}}</strong></p><p>{{e.school}}</p><p style="color:#999;height:23px;line-height:31px;">{{e.courseInfo[e.courseTime-1].main_teacher}}</p></div>
                        <div class="hot-info" v-if="e.courseInfo[e.courseTime-1].state==1"><p style="color:#53B880;"><i class="el-icon-unlock"></i><span>进行至第{{e.courseInfo[e.courseTime-1].progress}}周</span><span>{{e.courseInfo[e.courseTime-1].hot}}人参加</span></p></div>
                        <div class="hot-info" v-if="e.courseInfo[e.courseTime-1].state==2"><p style="color:#FA7E46"><i class="el-icon-lock"></i><span>{{e.courseInfo[e.courseTime-1].starttime}}{{e.courseInfo[e.courseTime-1].starttime=='时间待定'?'':'开课'}}</span><span>{{e.courseInfo[e.courseTime-1].hot}}人参加</span></p></div>
                        <div class="hot-info" v-if="e.courseInfo[e.courseTime-1].state==3"><p style="color:#999"><i class="el-icon-unlock"></i><span>已结束{{e.courseInfo[e.courseTime-1].visiable?',可查看内容':''}}</span><span>{{e.courseInfo[e.courseTime-1].hot}}人参加</span></p></div>
                    </a>
                </div>
            </div>
            <div></div>
            <div class="block" style="height:60px">
                <span class="demonstration"></span>
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :page-sizes="[10,20,50,100]"
                    layout="prev, pager, next,sizes, jumper"
                    
                    :total="Total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import request from '../api/index'
const PostChannelFilterLesson = request.PostChannelFilterLesson;
import {ImgUrl} from '../common/js/api'
export default {
    name:'ChannelAllLess',
    components:{},
    props:['Data'],
    data(){
        return{
            hid:[],
            antiState:0,
            antiCate:0,
            currentPage:1,
            PageSize:10,
            Total:0,
            filter:{
                state:0,
                cate:0,
                Pskip:0,
                Plimit:10
            },
            LessonContainer:[]
        }
    },
    methods:{
        ImgUrlTrans(url){
            return ImgUrl+url
        },
        getLess(hid){
            this.hid=hid
            this.currentPage=1
            this.Total=0
            this.PageSize=10
            this.filter={state:0,cate:0,Pskip:0,Plimit:10}
            PostChannelFilterLesson([this.hid,this.filter])
                .then(res=>{
                    console.log(res.data);
                    this.LessonContainer=res.data.data.list;
                    this.Total=res.data.data.total
                }).catch(e=>{console.log('Channel-methods-getAllLess-PostChannelFilterLesson:'+e);})
        },
        getLessMore(){
            PostChannelFilterLesson([this.hid,this.filter])
                .then(res=>{
                    console.log(res.data);
                    this.LessonContainer=res.data.data.list;
                    this.Total=res.data.data.total
                }).catch(e=>{console.log('Channel-methods-getAllLess-PostChannelFilterLesson:'+e);})
        },
        changeFilter(){
            console.log(this.antiState,this.filter.state);
            console.log(this.antiCate,this.filter.cate);
            if(!(this.antiState==this.filter.state&&this.antiCate==this.filter.cate)){
                this.antiState=this.filter.state;
                this.antiCate=this.filter.cate;
            }
            this.getLessMore()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage=1
            this.filter.Plimit=val;
            this.filter.Pskip=0
            this.getLessMore()
        },
        handleCurrentChange(val) {
            if(val-1!==this.filter.Pskip){
                this.currentPage=val
                this.filter.Pskip=val-1;
                this.getLessMore()
            }
        }
    },
    created(){
    },
    mounted(){
    },
    watch:{
        Data(newVal,oldVal){
            this.LessonContainer=this.Data;
        },
        filter(newVal,oldVal){
            console.log("filter changed");
        }
    }
}
</script>
<style>
    #Channel-All-Less>div>p{
        padding:35px 10px 6px;
    }
    #Channel-All-Less .LeftFilter{
        float:left;
    }
    #Channel-All-Less .RightFilter{
        float:right;
    }
    #Channel-All-Less .LessFilter{
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        color: #666;
        margin-top:15px;
    }
    #Channel-All-Less .LeftFilter>span,#Channel-All-Less .RightFilter>span{
        cursor: pointer;
        margin:0 20px 12px 0;
    }
    #Channel-All-Less .LeftFilter>span.active{
        color:#00C758;
    }
    #Channel-All-Less .RightFilter>span.active{
        color:#00C758;
    }
    #Channel-All-Less .indu-part{
        padding-bottom: 45px;
        position: relative;
    }

    #Channel-All-Less .indu-part img{
        width:100%;
    }
    #Channel-All-Less .hot-info{
        text-indent: 6px;
        text-align: left;
        position: absolute;
        bottom:5px;
        width:100%;
    }
    #Channel-All-Less .hot-info span:first-child {
        float: left;
        text-indent: 1em;
    }
    #Channel-All-Less .hot-info span+span {
        float: right;
        color: #999;
        margin-right: 12px;
    }
    #Channel-All-Less .hot-info i+span{
        padding-left:4px;
    }
</style>