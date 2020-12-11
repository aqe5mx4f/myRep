<template>
    <div class="log-reg-dialog">
        <p class="TabFilter">
            <span @click="LoginStatus?resetForm('LogForm'):'';LoginStatus=false;RegisterStatus=true" :style="{borderBottom:RegisterStatus?'2px solid #00C758':'2px solid #ddd'}">注册</span>
            <span @click="RegisterStatus?resetForm('RegForm'):'';LoginStatus=true;RegisterStatus=false" :style="{borderBottom:LoginStatus?'2px solid #00C758':'2px solid #ddd'}">登录</span>
        </p>
        <div class="register" v-if="RegisterStatus">
            <el-form :model="RegForm" status-icon :rules="rules" ref="RegForm" label-width="100px" class="demo-registerForm">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="RegForm.account" prefix-icon="el-icon-user" placeholder="账号必须以字母开头，4-16位" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="RegForm.pass" autocomplete="off" prefix-icon="el-icon-lock" placeholder="密码必须含有字母，6-16位"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="RegForm.checkPass" autocomplete="off" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('RegForm','register')">注册</el-button>
                    <el-button @click="CloseDia();resetForm('RegForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login" v-if="LoginStatus">
            <el-form :model="LogForm" status-icon :rules="rules" ref="LogForm" label-width="100px" class="demo-logForm">
                <el-form-item label="账号" prop="logaccount">
                    <el-input v-model="LogForm.logaccount" prefix-icon="el-icon-user" placeholder="账号必须以字母开头，4-16位"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="logpass">
                    <el-input type="password" v-model="LogForm.logpass" autocomplete="off" prefix-icon="el-icon-lock" placeholder="密码必须含有字母，6-16位"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('LogForm','login')">登录</el-button>
                    <el-button @click="CloseDia();resetForm('LogForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '../api/index'
const getRegister = request.postRegister;
import {mapStates}  from 'vuex';
const getLogin = request.postLogin;
export default {
    name:'LoginRegister',
    data(){
        var checkAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            }
            if (!(/^[a-zA-Z][\w!@#$%^&*.]{3,16}$/.test(value))){
                return callback(new Error('账号必须以字母开头，4-16位'))
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if(!/[a-zA-Z]/.test(value)&&!/[\S]{6,16}/.test(value)){
                    callback(new Error('密码必须含有字母，6-16位'));
                }
                if (this.RegForm.checkPass !== '') {
                    this.$refs.RegForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.RegForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var checkLogAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            }
            if (!(/^[a-zA-Z][\w!@#$%^&*.]{3,16}$/.test(value))){
                return callback(new Error('账号必须以字母开头，4-16位'))
            }
            callback();
        };
        var validateLogPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            if(/[a-zA-Z]/.test(value)||/[\S]{6,16}/.test(value)){
                callback();
            }
            callback(new Error('密码必须含有字母，6-16位'));
        };
        return{
            LoginStatus:false,
            RegisterStatus:true,
            RegForm: {
                pass: '',
                checkPass: '',
                account: ''
            },
            LogForm:{
                logpass:'',
                logaccount:''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                account: [
                    { validator: checkAccount, trigger: 'blur' }
                ],
                logpass:[
                    { validator: validateLogPass, trigger: 'blur' }
                ],
                logaccount: [
                    { validator: checkLogAccount, trigger: 'blur' }
                ]
            },
            close_status:false
        }
    },
    props:['close-click'],
    created(){
        if(this.$store.state.toLogin){
            this.LoginStatus=true;
            this.RegisterStatus=false;
        }
    },
    methods:{
        submitForm(formName,status) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            alert('校验失败');
            return;
          };
          if(status==='register'){
              getRegister({user:this.RegForm.account,pwd:this.RegForm.pass})
                .then(res=>{
                    if(res.data.code==1){
                        this.$message({
                            message:res.data.msg,
                            type:'success',
                            duration:2000
                        });
                        this.resetForm('RegForm');
                        this.LoginStatus=true;
                        this.RegisterStatus=false;
                        
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:'error',
                            duration:1000
                        });
                    }
                })
                .catch(e=>{
                    this.$message({
                        message:'注册失败，请稍后再试',
                        type:'error',
                        duration:1000
                    });
                })
          };
          if(status==='login'){
              getLogin({user:this.LogForm.logaccount,pwd:this.LogForm.logpass})
                .then(res=>{
                    if(res.data.code==1){
                        this.$message({
                            message:res.data.msg,
                            type:'success',
                            duration:1000
                        });
                        this.CloseDia();
                        this.$emit('judgeLogin',{LoginStatus:true,user:res.data.user,photo:res.data.photo});
                    }else{
                        this.$message({
                            message:res.data.msg,
                            type:'error',
                            duration:1000
                        });
                    }
                })
                .catch(e=>{
                    this.$message({
                        message:'注册失败，请稍后再试',
                        type:'error',
                        duration:1000
                    });
                })
          }
        });
        },
        resetForm(formName) {
            this.$refs[formName].clearValidate();
            if(formName=='LogForm'){
                    this.LogForm.logaccount='';
                    this.LogForm.logpass='';
            }else{
                this.RegForm.account='';
                this.RegForm.pass='';
                this.RegForm.checkPass='';
            }
        },
        CloseDia(){
            this.$emit("close-dia",false);
            // this.LoginStatus=false;
            // this.RegisterStatus=true;
        }
    },
    watch:{
        closeClick:function(Val,oldVal){
            if(this.RegisterStatus){
                this.resetForm('RegForm');
                return;
            }
            if(this.LoginStatus){
                this.resetForm('LogForm');
                return;
            }
        },
        '$store.state.toLogin':function(Val,oldVal){
            console.log(Val);
            if(Val){
                this.LoginStatus=true;
                this.RegisterStatus=false;
            }
        }
    }
}
</script>
<style>
    .log-reg-dialog{
        margin-top:-27px;
    }
    .el-dialog__header{
        padding:0;
    }
    .TabFilter{
        font-size: 21px;
        width:80%;
        height:38px;
        line-height: 36px;
        margin:0 auto;
        color:#333;
    }
    .TabFilter>span{
        width:50%;
    }
    .TabFilter>span:first-child{
        float:left;
    }
    .TabFilter>span+span{
        float:right;
    }
    .login,.register{
        margin-top:28px;
        padding:0 calc(2% + 67px) 0 2%;
    }
</style>