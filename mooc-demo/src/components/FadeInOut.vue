<template>
    <div id="FadeInOut">
        <div>
            <img v-for="(e,i) in ImgContent.url" :key="i" :src="e" alt="" :style="{opacity:index==i?'0.9':'0'}">
        </div>
        <div :style="{background:ImgContent.color[index]}">
            <div class="InOut-box">
                <ul>
                    <li v-for="(e,i) in ImgContent.text" :key="i" :style="{color:index==i?'rgba(255,255,255)':''}" @mouseover="endInOut(i)" @mouseleave="startInOut"><i class="el-icon-caret-left" v-if="index==i"></i>{{e}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'FadeInOut',
    components:{},
    data(){
        return{
            ImgContent:{
                url:[
                    require('../assets/channel-in-out/one.webp'),
                    require('../assets/channel-in-out/two.webp'),
                    require('../assets/channel-in-out/three.webp'),
                    require('../assets/channel-in-out/four.webp'),
                    require('../assets/channel-in-out/five.webp'),
                    require('../assets/channel-in-out/six.webp'),
                    require('../assets/channel-in-out/seven.webp')
                ],
                text:[
                    '隧道工程',
                    '【双11】期末不挂全场85折',
                    '双11名师好课，全场6折起',
                    '中国古代建筑艺术',
                    '大学生科技创新课程之起重机创意大赛',
                    '22考研全面升级',
                    '理工科电子学习资料'
                ],
                color:[
                    'rgb(11,27,85)',
                    'rgb(255,99,87)',
                    'rgb(239,61,44)',
                    'rgb(250,209,84)',
                    'rgb(11,27,85)',
                    'rgb(73,174,247)',
                    'rgb(248,149,84)',
                ]
            },
            index:0,
            TimeOut:''
        }
    },
    methods:{
        endInOut(i) {
            clearInterval(this.TimeOut);
            this.index=i
        },
        startInOut(){
            var parent=this;
            this.TimeOut=setInterval(function(){
                ++parent.index;
                parent.index = parent.index%parent.ImgContent.text.length;
            },1500)
        }
    },
    mounted:function(){
        this.startInOut();
    }
}
</script>
<style>
#FadeInOut>div:first-child{
    width:776px;
    height:360px;
    float: left;
    position:relative;
}
 #FadeInOut img{
     position: absolute;
     left:0;
     opacity: 0;
     transition: opacity .4s;
 }
 #FadeInOut>div:last-child{
    width: 424px;
    height: 360px;
    float:right;
    padding:2% 2% 2% 7%;
    transition: all .4s;
 }
 .InOut-box ul{
    padding:20px 0;
    display: flex;
    display: -webkit-flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    background: rgba(0,0,0,0.6);
 }
 .InOut-box li{
    position: relative;
    width:70%;
    text-align: left;
    padding-left:12%;
    height: 20px;
    color:rgb(184,184,184);
    margin-bottom: 16px;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
 }
 .InOut-box li i{
    position: absolute;
    left:16px;
    font-size:16px;
    top:1px;
 }
</style>