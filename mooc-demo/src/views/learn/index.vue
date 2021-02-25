<template>
    <div id="Learn">
        <el-container>
            <el-header>
                <Header ></Header>
            </el-header>
            <el-main style="padding:10px 0;width:100%;height:600px;">
                <el-header style="background-color:#f8f8f8;border:1px solid #ddd;padding:10px 0;">
                    <el-row style="width:100%;margin:0;">
                        <el-col :span="4">
                            <a href="jacascript:;" target="_blank">
                                <img src="" alt="">
                            </a>
                        </el-col>
                        <el-col :span="20" style="border-left:1px solid #ccc;">
                            <el-row>
                                <el-col :span="3" style="padding-left:3%;text-align:left;line-height:22px;">
                                    <p><a href="javascript:;" target="_blank"><h4 style="font-weight:bold;color:#343d42;font-size:14px;">语言程序设计进阶</h4></a></p>
                                    <p style="color:#00c758;font-size:12px;">翁恺</p>
                                </el-col>
                                <el-col :span="2">
                                    <a href="javascript:;" target="_blank">
                                        <span class="tag" style="background-color:#CBA265;">国家精品</span>
                                    </a>
                                </el-col>
                                <el-col :span="3">
                                    <p style="border:1px solid #FFDC74;background-color:#FDFFD8;width:80%;margin-top:-3px;">
                                        <i class="el-icon-s-flag" 
                                            style="color:#FF4000;font-size:18px;position:relative;top:5px;left:-3px;">
                                        </i>
                                        <span style="color:#859295;font-size:13px;">申请认证证书</span>
                                    </p>
                                </el-col>
                                <el-col :span="2" :offset="11" class="learn-btn-box">
                                    <p class="learn-btn learn-btn-comment">评价课程</p>
                                </el-col>
                                <el-col :span="2" class="learn-btn-box">
                                    <p class="learn-btn learn-btn-during">我的学习时长</p>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-header>
                <el-container>
                    <el-aside>aside</el-aside>
                    <el-main>main</el-main>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Header from '../../components/Header'
export default {
    name:'learn',
    components:{
        Header
    },
    data(){
        return{

        }
    }
}
</script>
<style>
    #Learn span.tag{
        font-size: 12px;
        margin-left: 15px;
        padding: 4px;
        vertical-align: middle;
        color: #fff;
        cursor: pointer;
    }
    #Learn .learn-btn{
        color: #00c758;
        cursor: pointer;
        padding-top: 10px;
    }
    #Learn .learn-btn-box{
        font-size:14px;
    }
</style>