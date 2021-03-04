<template>
    <div id="Channel-All-Less">
        <div style="width:1200px;overflow:hidden;">
            <div></div>
            <p>全部课程<span v-if="LessonContainer.total==0" style="color:#f45d44;font-size:16px;">(暂无)</span></p>
            <div class="LessFilter" style="width:100%;">
                <div class="LeftFilter">
                    <span @click="sfilter.state=0;changeFilter()" :class="{active:sfilter.state==0}">全部({{LessonContainer.total}})</span>
                    <span @click="sfilter.state=1;changeFilter()" :class="{active:sfilter.state==1}">正在进行</span>
                    <span @click="sfilter.state=2;changeFilter()" :class="{active:sfilter.state==2}">即将开始</span>
                    <span @click="sfilter.state=3;changeFilter()" :class="{active:sfilter.state==3}">已结束</span>
                </div>
                <div class="RightFilter">
                    <span @click="sfilter.cate=0;changeFilter()" :class="{active:sfilter.cate==0}">综合</span>
                    <span @click="sfilter.cate=1;changeFilter()" :class="{active:sfilter.cate==1}">热门</span>
                    <span @click="sfilter.cate=2;changeFilter()" :class="{active:sfilter.cate==2}">最新</span>
                </div>
            </div>
            <div class="show-frame">
                <div class="view-part">
                    <a class="indu-part" target="_blank" v-for="(e,i) in LessonContainer.list" :key="i" :href="'#/DetailInfo/'+encodeURI(encodeURI(e.name))+'&'+encodeURI(encodeURI(e.school))+'&'+encodeURI(encodeURI(e.id))" :style="{margin:(i%5==0?'0 0.8% 16px 0':'')||(i%5==4?'0 0 16px 0.8%':'')}">
                        <div class="img"><img :src="ImgUrlTrans(e.img)"></div>
                        <div class="obj-src"><p><strong>{{e.name}}</strong></p><p>{{e.school}}</p><p style="color:#999;height:23px;line-height:31px;">{{e.courseInfo[e.courseTime-1].main_teacher}}</p></div>
                        <div class="hot-info" v-if="e.courseInfo[e.courseTime-1].state==1"><p style="color:#53B880;"><i class="el-icon-unlock"></i><span>进行至第{{e.courseInfo[e.courseTime-1].progress}}周</span><span>{{e.courseInfo[e.courseTime-1].hot}}人参加</span></p></div>
                        <div class="hot-info" v-if="e.courseInfo[e.courseTime-1].state==2"><p style="color:#FA7E46"><i class="el-icon-lock"></i><span>{{e.courseInfo[e.courseTime-1].starttime}}{{e.courseInfo[e.courseTime-1].starttime=='时间待定'?'':'开课'}}</span><span>{{e.courseInfo[e.courseTime-1].hot}}人参加</span></p></div>
                        <div class="hot-info" v-if="e.courseInfo[e.courseTime-1].state==3"><p style="color:#999"><i class="el-icon-unlock"></i><span>已结束{{e.courseInfo[e.courseTime-1].visiable?',可查看内容':''}}</span><span>{{e.courseInfo[e.courseTime-1].hot}}人参加</span></p></div>
                    </a>
                </div>
            </div>
            <div></div>
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="sfilter.Plimit"
                    layout="prev, pager, next, jumper"
                    hide-on-single-page="true"
                    :total="LessonContainer.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'ChannelAllLess',
    components:{},
    props:['Data'],
    data(){
        return{
            antiState:0,
            antiCate:0,
            currentPage:1,
            sfilter:{
                state:0,
                cate:0,
                Pskip:0,
                Plimit:20
            },
            LessonContainer:{}
        }
    },
    methods:{
        ImgUrlTrans(url){
            return url.replace("http://47.93.63.232:3002/images",'/static/self_img');
        },
        changeFilter(){
            console.log("All-Less--methods-changeFilter()");
            console.log(this.antiState,this.sfilter.state);
            console.log(this.antiCate,this.sfilter.cate);
            if(!(this.antiState==this.sfilter.state&&this.antiCate==this.sfilter.cate)){
                
                this.$emit('changefilter',this.sfilter);
                this.antiState=this.sfilter.state;
                this.antiCate=this.sfilter.cate;
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.sfilter.Pskip=val-1;
            console.log("All-Less--methods-handleCurrentChange-getFilter():before");
            this.$emit('changefilter',this.sfilter);
            console.log("All-Less--methods-handleCurrentChange-getFilter():after");
        }
    },
    created(){
        console.log("All-Less--created().Data");
        console.log(this.Data);
    },
    mounted(){
        console.log("All-Less--mounted().Data");
        console.log(this.Data);
    },
    watch:{
        Data(newVal,oldVal){
            this.LessonContainer=this.Data;
        },
        sfilter(newVal,oldVal){
            console.log("sfilter changed");
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