<template>
    <div id="Channel-Img-Mid">
        <div style="width:1200px;overflow:hidden;">
            <div v-if="IndexStatus>1" style="position:absolute;top:calc(54% - 19px);left:-34px;"><i class="el-icon-arrow-left" @click="IndexStatus--"></i></div>
            <div class="show-frame" :style="{width:ChannelImgMid.frame.length*1200+'px',transform:'translateX('+(1-IndexStatus)*1200+'px)'}">
              <div class="view-part" v-for="(a,b) in ChannelImgMid.frame" :key="b">
                <div class="indu-part" v-for="(e,i) in a" :key="i">
                  <div class="img"><img :src="e.img"></div>
                </div>
              </div>
            </div>
            <div v-if="IndexStatus<ChannelImgMid.frame.length" style="position:absolute;top:calc(54% - 19px);right:-34px;"><i class="el-icon-arrow-right" @click="IndexStatus++"></i></div>
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
           ChannelImgMid:{
               frame:[
                    [
                        {img:require('../assets/channel-img-mid/one.png')},
                        {img:require('../assets/channel-img-mid/two.png')},
                        {img:require('../assets/channel-img-mid/three.png')},
                    ],
                    [
                        {img:require('../assets/channel-img-mid/four.png')},
                        {img:require('../assets/channel-img-mid/five.png')}
                    ]
                ]
           } 
        }
    }

}
</script>