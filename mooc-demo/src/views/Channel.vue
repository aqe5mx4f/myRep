<template>
    <div id="channel">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main style="overflow:inherit;background:rgba(247,247,247,1);padding:0;display:flex;display:-webkit-flex;flex-flow:column nowrap;">
                <div class="TabHolder">
                    <div id="ChannelTab">
                        <div>
                            <h3 class="title">{{object.title}}</h3>
                            <span v-if="object.list.length>0" @click="tabIndex=0;hid[1]=0;changeSchannel()" :style="{color:tabIndex==0?'#fff':'',backgroundColor:tabIndex==0?'#00C758':''}"><a :href="'#/Channel/'+hid[0]+'-'+0+'-'+encodeURI(encodeURI(object.title))">全部</a></span>
                            <span v-for="(e,i) in object.list" :key="i" @click="tabIndex=i+1;hid[1]=i+1;changeSchannel()" :style="{color:tabIndex==(i+1)?'#fff':'',backgroundColor:tabIndex==(i+1)?'#00C758':''}"><a :href="'#/Channel/'+hid[0]+'-'+(i+1)+'-'+encodeURI(encodeURI(object.title))">{{e}}</a></span>
                        </div>
                    </div>
                </div>
                <div class="fadeInOut">
                    <FadeInOut></FadeInOut>
                </div>
                <div class="channelBest">
                    <ChannelBest :Data="channelBestData"></ChannelBest>
                </div>
                <div class="channel-img-mid">
                    <ChannelImgMid></ChannelImgMid>
                </div>
                <div class="channel-live">
                    <ChannelLive></ChannelLive>
                </div>
                <div class="channel-adv">
                    <ChannelAdv></ChannelAdv>
                </div>
                <div class="channel-all-less">
                    <ChannelAllLess :Data="channelAllLess" @changefilter="getAllFilter"></ChannelAllLess>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Header from '../components/Header';
import FadeInOut from '../components/FadeInOut'
import ChannelBest from '../components/ChannelBest'
import ChannelImgMid from '../components/Channel-Img-Mid'
import ChannelLive from '../components/Channel-Live'
import ChannelAdv from '../components/Channel-Adv-Less'
import ChannelAllLess from '../components/Channel-All-Less'

import request from '../api/index'
const PostChannelTab = request.PostChannelTab;
const PostChannelNewBest = request.PostChannelNewBest;
const PostChannelFilterLesson = request.PostChannelFilterLesson;
export default {
    name:'Channel',
    components:{
        Header,
        FadeInOut,
        ChannelBest,
        ChannelImgMid,
        ChannelLive,
        ChannelAdv,
        ChannelAllLess
    },
    data(){
        return{
            hid:[],
            object:{},
            tabIndex:0,
            channelBestData:[],
            channelAllLess:[],
            filter:{
                state:0,
                cate:0,
                Pskip:0,
                Plimit:20
            }
        }
    },
    methods:{
        getAllLess(){
            PostChannelFilterLesson([this.hid,this.filter])
                .then(res=>{
                    console.log(res.data);
                    this.channelAllLess=res.data.data;
                }).catch(e=>{console.log('Channel-methods-getAllLess-PostChannelFilterLesson:'+e);})
        },
        changeSchannel(){
            this.filter={state:0,cate:0,Pskip:0,Plimit:20};
            console.log("channel-methods-changeSchannel:before");
            this.getAllLess();
            console.log("channel-methods-changeSchannel:after");
        },
        getAllFilter(params){
            this.filter=params;
            console.log("channel-methods-getAllFilter()");
            console.log(this.filter);
            console.log(this.hid);
            this.getAllLess();
        },
    },
    created(){
        this.hid=this.$route.params.hid;
        this.hid=this.hid.toString().split('-');
        this.hid=[parseInt(this.hid[0]),parseInt(this.hid[1])];
        console.log("Channel--created()");
        console.log(this.hid);
        PostChannelNewBest(this.hid)
            .then(res=>{
                console.log('channel-created()');
                console.log(res.data.data);
                this.channelBestData=res.data.data;
            }).catch(e=>{console.log(e);})
        
    },
    mounted(){
        PostChannelTab(this.hid)
            .then(res=>{
                this.object=res.data.data;
                this.tabIndex=this.hid[1];
            }).catch(e=>{
                console.log(e);
            });
        this.getAllLess();
    }
}
</script>
<style>
    .el-main>div{
        width:1200px;
        margin:0 auto;
    }
    #ChannelTab{
        margin-top:25px;
    }
    #ChannelTab h3{
        height: 32px;
        line-height: 32px;
        float:left;
        padding-right: 44px;
        font-size: 24px;
        font-weight: 500;
        font-family: PingFangSC-Medium,PingFangSC;
        color: #333
    }
    #ChannelTab h3~span{
        cursor: pointer;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 32px;
        line-height: 32px;
        float:left;
        font-size: 14px;
        padding: 0 20px;
        text-align: center;
        color: #666666;
        border-radius: 16px;
        margin: 0 12px 14px 0;
    }
    #ChannelTab a{
        color:#666;
    }
</style>