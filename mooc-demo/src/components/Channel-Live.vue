<template>
    <div id="Channel-Live">
        <div style="width:1200px;overflow:hidden;">
            <div v-if="IndexStatus>1" style="position:absolute;top:calc(66% - 19px);left:-34px;"><i class="el-icon-arrow-left" @click="IndexStatus--"></i></div>
            <p>最近直播</p>
            <div class="show-frame" :style="{width:ChannelLive.frame.length*1200+'px',transform:'translateX('+(1-IndexStatus)*1200+'px)'}">
              <div class="view-part" v-for="(a,b) in ChannelLive.frame" :key="b">
                <div class="indu-part" v-for="(e,i) in a" :key="i">
                  <div class="img"><img :src="e.img"></div>
                  <div class="obj-src">
                    <p class="label">未开始</p>
                    <p class="time">{{e.time}}</p>
                    <p class="content">{{e.content}}</p>
                    <p>{{e.teacher}}</p>
                </div>
                </div>
              </div>
            </div>
            <div v-if="IndexStatus<ChannelLive.frame.length" style="position:absolute;top:calc(66% - 19px);right:-34px;"><i class="el-icon-arrow-right" @click="IndexStatus++"></i></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Channel-Img-Mid',
    components:{},
    data(){
        return{
           IndexStatus:1,
           ChannelLive:{
               frame:[
                    [
                        {
                            time:'11月18日 19:00-21:00',
                            content:'拉开22数学考研人差距的70个通法',
                            teacher:'刘金峰',
                            img:require('../assets/Channel-Live/one.webp')
                        },
                        {
                            time:'11月18日 19:00-21:00',
                            content:'拉开22数学考研人差距的70个通法',
                            teacher:'刘金峰',
                            img:require('../assets/Channel-Live/two.webp')
                        },
                        {
                            time:'11月18日 19:00-21:00',
                            content:'拉开22数学考研人差距的70个通法',
                            teacher:'刘金峰',
                            img:require('../assets/Channel-Live/one.webp')
                        }
                    ],
                    [
                        {
                            time:'11月18日 19:00-21:00',
                            content:'拉开22数学考研人差距的70个通法',
                            teacher:'刘金峰',
                            img:require('../assets/Channel-Live/one.webp')
                        },
                        {
                            time:'11月18日 19:00-21:00',
                            content:'拉开22数学考研人差距的70个通法',
                            teacher:'刘金峰',
                            img:require('../assets/Channel-Live/two.webp')
                        }
                    ]
                ]
           } 
        }
    }

}
</script>
<style>
    #Channel-Live .indu-part img{
        width:72px;
        height:72px;
        border-radius: 100%;
    }
    #Channel-Live .img{
        float:right;
        padding:32px;
    }
    #Channel-Live .obj-src{
        float:left;
    }
    #Channel-Live .obj-src .label{
        text-indent: 7px;
        width: 48px;
        font-size: 12px;
        background: rgba(64,153,255,1);
        border-radius: 4px 0 4px 0;
        height: 20px;
        line-height: 17px;
        color: rgb(255,255,255);
    }
    #Channel-Live .obj-src .time{
        margin-top:16px;
    }
    #Channel-Live .obj-src .content{
        font-weight: bold;
        line-height: 30px;
        color:inherit;
    }
</style>