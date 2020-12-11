<template>
    <div id="Channel-Adv-Less">
        <div style="width:1200px;overflow:hidden;">
            <div v-if="IndexStatus>1" style="position:absolute;top:calc(66% - 19px);left:-34px;"><i class="el-icon-arrow-left" @click="IndexStatus--"></i></div>
            <p>考试/考研</p>
            <div class="show-frame" :style="{width:ChannelAdv.frame.length*1200+'px',transform:'translateX('+(1-IndexStatus)*1200+'px)'}">
              <div class="view-part" v-for="(a,b) in ChannelAdv.frame" :key="b">
                <div class="indu-part" v-for="(e,i) in a" :key="i">
                    <div class="img"><img :src="e.img"></div>
                    <div class="obj-src">
                        <p class="content">{{e.content}}</p>
                        <p class="addInfo" v-if="!!e.addInfo">{{e.addInfo}}</p>
                        <p class="name">{{e.teacher}}</p>
                        <p class="team" v-if="!!e.team">{{e.team}}人团</p>
                        <p class="info">
                            {{e.hot}}人参加
                            <span class="Nprice">¥{{e.Nprice}}</span>
                            <span class="Oprice">¥{{e.Oprice}}</span>
                        </p>
                        <span class="lesslabel" v-if="!!e.lesslabel">{{e.lesslabel}}门课</span>
                    </div>
                    
                </div>
              </div>
            </div>
            <div v-if="IndexStatus<ChannelAdv.frame.length" style="position:absolute;top:calc(66% - 19px);right:-34px;"><i class="el-icon-arrow-right" @click="IndexStatus++"></i></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'ChannelAdvLess',
    components:{},
    data(){
        return{
            IndexStatus:1,
            ChannelAdv:{
               frame:[
                    [
                        {
                            content:'8小时高数选填方法速成课',
                            addInfo:'',
                            teacher:'刘金峰',
                            img:require('../assets/channel-adv-less/one.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:3,
                            lesslabel:""
                        },
                        {
                            content:'【领500元券】2022考研数学领学3班',
                            addInfo:'宝藏老师组合/独家解题通法/每日督学答疑',
                            teacher:'刘金峰、武忠祥',
                            img:require('../assets/channel-adv-less/two.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:"",
                            lesslabel:8
                        },
                        {
                            content:'物理不挂科-4小时学完材料力学',
                            addInfo:'',
                            teacher:'刘金峰',
                            img:require('../assets/channel-adv-less/three.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:"",
                            lesslabel:""
                        },
                        {
                            content:'电路不挂科-4小时学完电路',
                            addInfo:'',
                            teacher:'刘金峰',
                            img:require('../assets/channel-adv-less/three.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:"",
                            lesslabel:""
                        },
                        {
                            content:'理论力学不挂科-4小时学完理论力学',
                            addInfo:'',
                            teacher:'刘金峰',
                            img:require('../assets/channel-adv-less/three.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:"",
                            lesslabel:""
                        },
                    ],
                    [
                        {
                            content:'数字电路不挂科-4小时学完数字电路',
                            teacher:'刘金峰',
                            addInfo:'',
                            img:require('../assets/channel-adv-less/three.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:"",
                            lesslabel:""
                        },
                        {
                            content:'数字电路不挂科-4小时学完数字电路',
                            teacher:'刘金峰',
                            addInfo:'',
                            img:require('../assets/channel-adv-less/three.webp'),
                            hot:2406,
                            Oprice:99,
                            Nprice:9.9,
                            team:"",
                            lesslabel:""
                        },
                    ]
                ]
           }
        }
    }
}
</script>
<style>
    #Channel-Adv-Less .indu-part{
        position: relative;
        height:272px;
    }
    #Channel-Adv-Less .img{
        max-height:126px;
        width:100%;
    }
    #Channel-Adv-Less img{
        width:100%;
        border-radius: 4px;
    }
    #Channel-Adv-Less .obj-src{
        padding:10px 0;
    }
    #Channel-Adv-Less .content{
        font-size: 14px;
        color: #333;
        font-weight: bold;
        line-height: 24px;
        overflow: hidden;
        text-indent: 0;
        padding:0 1em;
    }
    #Channel-Adv-Less .addInfo{
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        margin: 8px 0;
        color: #666;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    #Channel-Adv-Less .name{
        color:#999;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding:3px 0 7px;
    }
    #Channel-Adv-Less .team{
        position: absolute;
        bottom: 38px;
        background: rgba(255,115,51,0.1);
        border-radius: 2px;
        color: #FF7A3E;
        text-align: center;
        width: 39px;
        text-indent: 0;
        margin-left: calc(100% - 49px);
    }
    #Channel-Adv-Less .info{
        position: absolute;
        bottom: 13px;
        color:#999;
    }
    #Channel-Adv-Less .Nprice{
        color: #FF7A3E;
        font-size: 20px;
        height: 20px;
        line-height: 20px;
        font-weight: 600;
        margin-left:64px;
    }
    #Channel-Adv-Less .Oprice{
        font-size: 12px;
        margin-left: 6px;
        color: #999;
        text-decoration: line-through;
    }
    #Channel-Adv-Less .lesslabel{
        position:absolute;
        top:8px;
        left:8px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-indent: 0;
        padding: 0 6px;
        margin: 0 4px 8px 0;
        color: #fff;
        background: rgba(0,0,0,0.5);
        border-radius: 3px;
    }
</style>