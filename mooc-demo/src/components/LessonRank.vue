<template>
    <div id="lesson-rank">
    <p>本周课程排行</p>
    <el-row type="flex" justify="space-between">
        <el-col :span="7" class="hot-rank" >
            <div @mouseover="EnterStatus.HotStatus=true" @mouseleave="EnterStatus.HotStatus=false">
                <div class="click-arrow arrow-left" v-if="PageStatus.HotRank>1&&EnterStatus.HotStatus" @click="PageStatus.HotRank--"><i class="el-icon-arrow-left"></i></div>
                <p>热门排行TOP50<span class="label1">HOT</span></p>
                <div class="show-frame">
                    <div class="view-part" :style="{width:Math.ceil(LessonRank.hot_rank.length/5)*350+'px',transform:'translateX('+(1-PageStatus.HotRank)*350+'px)'}" >
                        <a class="indu-part" target="_blank" v-for="(e,i) in LessonRank.hot_rank" :key="i" :href="'#/DetailInfo/'+encodeURI(encodeURI(e.name))+'&'+encodeURI(encodeURI(e.school))+'&'+encodeURI(encodeURI(e.id))">
                            <span>{{++i}}</span>
                            <div class="img"><img :src="ImgUrlTrans(e.img)" alt=""></div>
                            <div>
                                <p class="obj">{{e.name}}</p>
                                <p class="src">{{e.school}}</p>
                                <p class="hot">{{e.courseInfo[0].hot}}<span>人参加</span></p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="click-arrow arrow-right" v-if="EnterStatus.HotStatus&&PageStatus.HotRank<Math.ceil(LessonRank.hot_rank.length/5)" @click="PageStatus.HotRank++"><i class="el-icon-arrow-right" ></i></div>
            </div>
        </el-col>
        <el-col :span="7" class="newlesson-rank">
            <div @mouseover="EnterStatus.NewStatus=true" @mouseleave="EnterStatus.NewStatus=false">
                <div class="click-arrow arrow-left" v-if="PageStatus.NewRank>1&&EnterStatus.NewStatus" @click="PageStatus.NewRank--"><i class="el-icon-arrow-left" ></i></div>
                <p>新课排行<span class="label1">NEW</span></p>
                <div class="show-frame">
                    <div class="view-part" :style="{width:Math.ceil(LessonRank.newlesson_rank.length/5)*350+'px',transform:'translateX('+(1-PageStatus.NewRank)*350+'px)'}">
                        <a class="indu-part" target="_blank" v-for="(e,i) in LessonRank.newlesson_rank" :key="i" :href="'#/DetailInfo/'+encodeURI(encodeURI(e.name))+'&'+encodeURI(encodeURI(e.school))+'&'+encodeURI(encodeURI(e.id))">
                            <span>{{++i}}</span>
                            <div class="img"><img :src="ImgUrlTrans(e.img)" alt=""></div>
                            <div>
                                <p class="obj">{{e.name}}</p>
                                <p class="src">{{e.school}}</p>
                                <p class="hot">{{e.courseInfo[0].hot}}<span>人参加</span></p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="click-arrow arrow-right" v-if="EnterStatus.NewStatus&&PageStatus.NewRank<Math.ceil(LessonRank.newlesson_rank.length/5)" @click="PageStatus.NewRank++"><i class="el-icon-arrow-right" ></i></div>
            </div>
        </el-col>
        <el-col :span="7" class="five-star" >
            <div @mouseover="EnterStatus.FiveStatus=true" @mouseleave="EnterStatus.FiveStatus=false">
                <div class="click-arrow arrow-left" v-if="PageStatus.FiveStar>1&&EnterStatus.FiveStatus" @click="PageStatus.FiveStar--"><i class="el-icon-arrow-left" ></i></div>
                <p>五星评价TOP50<span class="label1">GOOD</span></p>
                <div class="show-frame">
                    <div class="view-part" :style="{width:Math.ceil(LessonRank.five_star.length/5)*350+'px',transform:'translateX('+(1-PageStatus.FiveStar)*350+'px)'}">
                        <a class="indu-part" target="_blank" v-for="(e,i) in LessonRank.five_star" :key="i" :href="'#/DetailInfo/'+encodeURI(encodeURI(e.lid.name))+'&'+encodeURI(encodeURI(e.lid.school))+'&'+encodeURI(encodeURI(e.lid.id))">
                            <span>{{++i}}</span>
                            <div class="img"><img :src="ImgUrlTrans(e.lid.img)" alt=""></div>
                            <div>
                                <p class="obj">{{e.lid.name}}</p>
                                <p class="src">{{e.lid.school}}</p>
                                <p class="hot">{{e.lid.courseInfo[0].hot}}<span>人参加</span></p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="click-arrow arrow-right" v-if="PageStatus.FiveStar<Math.ceil(LessonRank.five_star.length/5)&&EnterStatus.FiveStatus" @click="PageStatus.FiveStar++"><i class="el-icon-arrow-right" ></i></div>
            </div>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import request from '../api/index'
const PostRankHot= request.PostRankHot;
const PostRankNew= request.PostRankNew;
const PostRankStar= request.PostRankStar;
import {ImgUrl} from '../common/js/api'
export default {
    name:"LessonRank",
    data(){
        return{
            LessonRank:{
                hot_rank:[],
                newlesson_rank:[],
                five_star:[]
            },
            PageStatus:{
                HotRank:1,
                NewRank:1,
                FiveStar:1
            },
            EnterStatus:{
                HotStatus:false,
                NewStatus:false,
                FiveStatus:false
            }
        }
    },
    created(){
        console.log(ImgUrl)
    },
    methods:{
        ImgUrlTrans(url){
            return ImgUrl+url
        },
    },
    mounted(){
        PostRankHot()
            .then(res=>{
                if(res.data.code==1){
                    this.LessonRank.hot_rank=(res.data.list.sort(function(a,b){return b.courseInfo[0].hot-a.courseInfo[0].hot;}));
                    console.log(this.LessonRank);
                }
            }).catch(e=>{
                console.log("lessrank-mounted-PostRankHot-catch-error:");
                console.log(e);
            }),
        PostRankNew()
            .then(res=>{
                if(res.data.code==1){
                    this.LessonRank.newlesson_rank=res.data.list;
                }
            }).catch(e=>{
                console.log("lessrank-mounted-PostRankNew-catch-error:");
                console.log(e);
            }),
        PostRankStar()
            .then(res=>{
                if(res.data.code==1){
                    this.LessonRank.five_star=res.data.list;
                }
            }).catch(e=>{
                console.log("lessrank-mounted-PostRankStar-catch-error:");
                console.log(e);
            })
    }
}
</script>
<style>
    #lesson-rank{
        width:1200px;
        margin:0 auto;
    }
    #lesson-rank>p{
        font-weight:500;
        text-align:left;
        font-size:26px;
        padding:0 10px 0;
    }
    #lesson-rank .show-frame{
        overflow: hidden;
        margin:0;
    }
    #lesson-rank .view-part{
        padding-top: 28px;
        height: 518px;
        flex-flow: column wrap;
        justify-content: flex-start;
        transition: all ease-in 0.25s;
    }
    #lesson-rank .show-frame .indu-part{
        display: flex;
        display: -webkit-flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        height: 20%;
        width:350px;
        margin:0;
    }
    #lesson-rank .el-row>div{
        background-color: rgba(255,255,255,1);
        border-radius: 4px;
        padding-top: 26px;
        margin-top: 24px;
        position: relative;
    }
    #lesson-rank .el-row>div>div>p{
        text-align: left;
        font-size: 16px;
        font-weight: 600;
        padding-bottom:15px;
        color: rgba(51,51,51,1);
        text-indent: 1em;
    }
    #lesson-rank .el-row span.label1{
        float:right;
        font-size: 18px;
        font-weight: bold;
        font-style: italic;
        color: #E2E2E2;
        padding-right: 20px;
    }
    #lesson-rank .indu-part>span{
        color: #FA5055;
        font-family: Helvetica-BoldOblique,Helvetica;
        width: 20px;
        text-align: right;
        font-size: 20px;
        float: left;
        margin: 4px 11px 0 0;
    }
    #lesson-rank .indu-part .img img{
        width: 112px;
    }
    #lesson-rank .indu-part .obj{
        text-align: left;
        width: 150px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(51,51,51,1);
        padding-left: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    #lesson-rank .indu-part .src{
        color: #666;
        text-align: left;
        padding: 3px 0 0 14px;
        line-height: 23px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 150px;
    }
    #lesson-rank .indu-part .hot{
        color: #999;
        text-align: left;
        padding-left: 14px;
    }
    #lesson-rank .indu-part:hover{
        color:inherit;
        -webkit-box-shadow: 0 0 0 rgba(0,0,0,0);
        box-shadow: 0 0 0 0 rgba(0,0,0,0);
    }
</style>
