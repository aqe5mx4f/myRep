<template>
    <div id="ChannelBest">
        <div style="width:1200px;overflow:hidden;">
            <div v-if="IndexStatus>1" style="position:absolute;top:calc(54% - 19px);left:-34px;"><i class="el-icon-arrow-left" @click="IndexStatus--"></i></div>
            <p>最新好课推荐</p>
            <div class="show-frame" :style="{width:ChannelBest.frame.length*1200+'px',transform:'translateX('+(1-IndexStatus)*1200+'px)'}">
              <div class="view-part" v-for="(a,b) in ChannelBest.frame" :key="b">
                <div class="indu-part" v-for="(e,i) in a" :key="i">
                  <div class="img"><img :src="ImgUrlTrans(e.img)"></div>
                  <div class="obj-src"><p><strong>{{e.name}}</strong></p><p>{{e.school}}</p><p style="color:#999;height:23px;line-height:31px;">{{e.teacher}}</p></div>
                  <div class="hot-info"><p><span>进行至第{{e.progress}}周</span><span>{{e.hot}}人参加</span></p></div>
                </div>
              </div>
            </div>
            <div v-if="IndexStatus<ChannelBest.frame.length" style="position:absolute;top:calc(54% - 19px);right:-34px;"><i class="el-icon-arrow-right" @click="IndexStatus++"></i></div>
        </div>
    </div>
</template>
<script>
// import {ImgUrl} from '../common/js/api'
export default {
    name:'ChannelBest',
    components:{},
    props:['Data'],
    data(){
      return{
        IndexStatus:1,
        hid:[],
        ChannelBest:{
          total:0,
          frameCount:0,
          frame:[]
        }
      }
    },
    created(){
      console.log("channelBest--created");
      console.log(this.Data);
    },
    mounted(){
      console.log("channelBest--mounted");
    },
    methods:{
      ImgUrlTrans(url){
            return url
      },
    },
    watch:{
      Data(newVal,oldVal){
        if (newVal.length>0&&newVal.length%5==0){
          console.log("channelBest-watch");
          console.log(this.Data);
          var parent = this,tempArr=[];
          this.ChannelBest.total=this.Data.length;
          this.ChannelBest.frameCount=Math.ceil(this.Data.length/5);
          for(let i=0;i<this.ChannelBest.frameCount;i++){
            for(let j=0;j<5;j++){
              tempArr.push(parent.Data[i*5+j]);
            };
            this.ChannelBest.frame.push(tempArr);
            tempArr=[];
          };
        };
      }
    }
}
</script>
<style>
  #ChannelBest .show-frame{
    margin:0;
  }
  #ChannelBest .indu-part{
    padding-bottom:6px;
  }
  #ChannelBest .indu-part img{
    width: 100%;
    border-radius: 4px;
  }
  #ChannelBest .hot-info span:first-child{
    color:#53B880;
    float: left;
    text-indent: 1em;
  }
  #ChannelBest .hot-info{
    margin:35px 0;
  }
  #ChannelBest .hot-info span+span{
    float: right;
    color:#999;
    margin-right:12px;
  }
</style>