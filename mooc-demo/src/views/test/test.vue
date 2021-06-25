<template>
    <div id="test">

    </div>
</template>
<script>
// import Header from '../components/Header';
// import FadeInOut from '../components/FadeInOut'
// import ChannelBest from '../components/ChannelBest'
// import ChannelImgMid from '../components/Channel-Img-Mid'
// import ChannelLive from '../components/Channel-Live'
// import ChannelAdv from '../components/Channel-Adv-Less'
// import ChannelAllLess from '../components/Channel-All-Less'

// import request from '../api/index'
// const PostChannelTab = request.PostChannelTab;
// const PostChannelNewBest = request.PostChannelNewBest;
// const PostChannelFilterLesson = request.PostChannelFilterLesson;
export default {
    name:'test',
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
        // changeSchannel(){
        //     this.filter={state:0,cate:0,Pskip:0,Plimit:20};
        //     console.log("channel-methods-changeSchannel:before");
        //     this.$nextTick(()=>{
        //         this.$refs.ChannelAllLess.getLess(this.hid)
        //     })
        //     console.log("channel-methods-changeSchannel:after");
        // },
        // GetChannelTab(){
        //     PostChannelTab(this.hid)
        //     .then(res=>{
        //         this.object=res.data.data;
        //         this.tabIndex=this.hid[1];
        //         this.$nextTick(()=>{
        //             this.$refs.ChannelAllLess.getLess(this.hid)
        //         })
        //     }).catch(e=>{
        //         console.log(e);
        //     });
        // }
    },
    created(){
        // this.hid=this.$route.params.hid;
        // this.hid=this.hid.toString().split('-');
        // this.hid=[parseInt(this.hid[0]),parseInt(this.hid[1])];
        // console.log("Channel--created()");
        // console.log(this.hid);
        // PostChannelNewBest(this.hid)
        // .then(res=>{
        //     console.log('channel-created()');
        //     console.log(res.data.data);
        //     this.channelBestData=res.data.data;
        // }).catch(e=>{console.log(e);})

        // this.GetChannelTab()
    }
}
</script>
<style>
</style>