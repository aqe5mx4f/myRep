const mongoose = require('mongoose');

let lesson = mongoose.model("lesson",new mongoose.Schema({
    id:{type:Number,requires:true},
    name:{type:String,required:true},
    school:{type:String,require:true},
    pChannel:{type:Number,required:true},
    sChannel:{type:Number,required:true},
    pCategory : {type:String,required:true},
    sCategory : {type:String,required:true},
    courseTime:{type:Number,default:1},
    courseSummary:{type:Object,require:true},
    img:{type:String,required:true},
    courseInfo:{
        1:{
            main_teacher : {type:String,required:true},
            teachers:{type:Array,default:[]},
            hot:{type:Number,default:0},
            progress:{type:Number,default:0},
            lesssonDuring:{type:Number,default:10},
            starttime:{type:String,default:'时间待定'},
            endtime:{type:String,default:'时间待定'},
            visiable:{type:Boolean,default:false},
            averageHot:{type:Number,default:0},
            state:{type:Number,default:2},
        }
    },
    courseComment:[
        {
            user:{type:mongoose.Schema.Types.ObjectId,ref:"user",requires:true},
            admiration:{type:Number,default:0},
            content:{type:String,required:true},
            star:{type:Number,default:0},
            commentTime:{type:Number,default:1},
            date:{type:Date,default:Date.now},
        }
    ],
})); 
// var toStr=[zero,one,two,three,four,five,six,seven,eight,nine,ten];
// var url="http://localhost:3002/"
// var toCate=['国家精品'];
// var obj=[
//     [
//         {name:'多媒体技术及应用',school:'深圳大学',pChannel:0,sChannel:0,category:'',teacher:'王志强',progress:2,end:false,img:'multimedia_shenda.webp'},
//         {name:'C语言程序设计进阶',school:'浙江大学',pChannel:0,sChannel:0,category:'',teacher:'翁恺',progress:2,end:false,img:'Clang_zeda.webp'},
//         {name:'Python语言程序设计',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'嵩天',progress:2,end:false,img:'Python_beili.webp'},
//         {name:'程序设计基础',school:'哈尔滨工业大学',pChannel:0,sChannel:0,category:'',teacher:'苏小红',progress:2,end:false,img:'progdes_hagong.webp'},
//         {name:'数据结构',school:'浙江大学',pChannel:0,sChannel:0,category:'',teacher:'陈越',progress:2,end:false,img:'datastru_zeda.webp'},
//         {name:'程序设计入门——C语言',school:'浙江大学',pChannel:0,sChannel:0,category:'翁恺',teacher:'',progress:2,end:false,img:'progdesC_zeda.webp'},
//         {name:'大学计算机',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'李凤霞',progress:2,end:false,img:'unicomp_beili.webp'},
//         {name:'Java程序设计',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'唐大仕',progress:2,end:false,img:'Javaprog_beida.webp'},
//         {name:'Python网络爬虫与信息提取',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'嵩天',progress:2,end:false,img:'PyhonIntCrap_beili.webp'},
//         {name:'大学计算机基础',school:'国防科技大学',pChannel:0,sChannel:0,category:'',teacher:'周海芳',progress:2,end:false,img:'uniCompBase_guokeda.webp'},
//         {name:'Python科学计算三维可视化',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'黄天羽',progress:2,end:false,img:'PythonThree3d_beili.webp'},
//         {name:'C语言程序设计(下)',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'李凤霞',progress:2,end:false,img:'CProg_beili.webp'},
//         {name:'计算思维的结构',school:'桂林电子科技大学',pChannel:0,sChannel:0,category:'',teacher:'董荣胜',progress:2,end:false,img:'calcIdea_diankeda.webp'},
//         {name:'android智能手机编程',school:'国家开放大学',pChannel:0,sChannel:0,category:'',teacher:'王立',progress:2,end:false,img:'androPhoneProg_guokaida.webp'},
//         {name:'大学计算机——计算思维之路',school:'北京交通大学',pChannel:0,sChannel:0,category:'',teacher:'王移芝',progress:2,end:false,img:'uniCompIdea_beijiaoda.webp'},
//         {name:'C编程方法学',school:'武汉理工大学',pChannel:0,sChannel:0,category:'',teacher:'李民',progress:2,end:false,img:'CProgWay_wuli.webp'},
//         {name:'数据库系统概论（新技术篇）',school:'中国人民大学',pChannel:0,sChannel:0,category:'',teacher:'王珊',progress:2,end:false,img:'dataBaseProf_zhongrenda.webp'},
//         {name:'离散数学概论',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'陈斌',progress:2,end:false,img:'decreMath_beida.webp'},
//         {name:'高级语言程序设计',school:'吉林大学',pChannel:0,sChannel:0,category:'',teacher:'张长海',progress:2,end:false,img:'advLangProg_jida.webp'},
//         {name:'用Python玩转数据',school:'南京大学',pChannel:0,sChannel:0,category:'',teacher:'张莉',progress:2,end:false,img:'dataWithPython_nanda.webp'},
//         {name:'数据结构与算法',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'张铭',progress:2,end:false,img:'dataStruAlgo_beida.webp'},
//         {name:'基于Java的面向对象编程范式',school:'南京大学',pChannel:0,sChannel:0,category:'',teacher:'刘钦',progress:2,end:false,img:'basedJavaProg_nanda.webp'},
//         {name:'计算机操作系统',school:'南京大学',pChannel:0,sChannel:0,category:'',teacher:'骆斌',progress:2,end:false,img:'compOperSys_nanda.webp'},
//         {name:'程序设计与算法（二）算法基础',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'郭炜',progress:2,end:false,img:'progDesAlgo_beida.webp'},
//         {name:'云计算技术与应用',school:'河海大学',pChannel:0,sChannel:0,category:'',teacher:'孙宁',progress:2,end:false,img:'clouldComp_heda.webp'},
//         {name:'C++程序设计',school:'西北工业大学',pChannel:0,sChannel:0,category:'',teacher:'魏英',progress:2,end:false,img:'CPlusProg_xigongda.webp'},
//         {name:'VisualBasic.NET程序设计进阶',school:'同济大学',pChannel:0,sChannel:0,category:'',teacher:'龚沛曾',progress:2,end:false,img:'VisualBasicNet_tongji.webp'},
//         {name:'Python数据分析与展示',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'嵩天',progress:2,end:false,img:'PythonDataAna_beili.webp'},
//         {name:'大学计算机--计算思维的视角',school:'山东大学',pChannel:0,sChannel:0,category:'',teacher:'郝兴伟',progress:2,end:false,img:'uniCompIdeaView_shandongda.webp'},
//         {name:'大学计算机基础',school:'同济大学',pChannel:0,sChannel:0,category:'',teacher:'杨志强',progress:2,end:false,img:'uniCompBase_tongji.webp'},
//         {name:'VisualBasic.NET程序设计入门',school:'同济大学',pChannel:0,sChannel:0,category:'',teacher:'龚沛曾',progress:2,end:false,img:'VisualBasicNetBase_tongji.webp'},
//         {name:'VisualBasic6.0程序设计',school:'同济大学',pChannel:0,sChannel:0,category:'',teacher:'龚沛曾',progress:2,end:false,img:'VisualBasic60.tongji.webp'},
//         {name:'零基础学Java语言',school:'浙江大学',pChannel:0,sChannel:0,category:'',teacher:'翁恺',progress:2,end:false,img:'zeroBaseJava_zeda.webp'},
//         {name:'软件工程',school:'东北大学',pChannel:0,sChannel:0,category:'',teacher:'张爽',progress:2,end:false,img:'softProj_dongbeida.webp'},
//         {name:'汇编语言程序设计',school:'电子科技大学',pChannel:0,sChannel:0,category:'',teacher:'邢建川',progress:2,end:false,img:'huiBianProg_diankeda.webp'},
//         {name:'计算机原理',school:'国防科技大学',pChannel:0,sChannel:0,category:'',teacher:'唐玉华',progress:2,end:false,img:'compIdea_guokeda.webp'},
//         {name:'C语言程序设计(上)',school:'北京理工大学',pChannel:0,sChannel:0,category:'',teacher:'李凤霞',progress:2,end:false,img:'CProgDesPlus_beili.webp'},
//         {name:'程序设计与算法（三）C++面向对象程序设计',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'郭炜',progress:2,end:false,img:'ProgDesAlogC_beida.webp'},
//         {name:'程序设计与算法（一）C语言程序设计',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'郭炜',progress:2,end:false,img:'ProgDesAlogOneC_beida.webp'},
//         {name:'大学计算机基础',school:'中国农业大学',pChannel:0,sChannel:0,category:'',teacher:'陈雷',progress:2,end:false,img:'uniCompBase_zhongnongda.webp'},
//         {name:'人工智能原理',school:'北京大学',pChannel:0,sChannel:0,category:'',teacher:'王文敏',progress:2,end:false,img:'ArtifIntelli_baida.webp'},
//         {name:'数据结构',school:'西北大学',pChannel:0,sChannel:0,category:'',teacher:'耿国华',progress:2,end:false,img:'dataStruc_xibei.webp'},
//         {name:'计算机网络基础及应用',school:'南京理工大学',pChannel:0,sChannel:0,category:'',teacher:'丁晟春',progress:2,end:false,img:'compIntBase_nanli.webp'},
//         {name:'多媒体技术与应用',school:'同济大学',pChannel:0,sChannel:0,category:'',teacher:'李湘梅',progress:2,end:false,img:'multiMediaApp_tongji.webp'},
//         {name:'数据库技术及应用',school:'东北师范大学',pChannel:0,sChannel:0,category:'',teacher:'李雁翎',progress:2,end:false,img:'dataBaseApp_dongshida.webp'},
//         {name:'计算机专业导论',school:'哈尔滨工业大学',pChannel:0,sChannel:0,category:'',teacher:'战德臣',progress:2,end:false,img:'compState_hagongda.webp'},
//         {name:'大学信息技术基础',school:'福建农林大学',pChannel:0,sChannel:0,category:'',teacher:'陈琼',progress:2,end:false,img:'uniInforBase_funongda.webp'},
//         {name:'计算机硬件技术基础',school:'东北大学',pChannel:0,sChannel:0,category:'',teacher:'柳秀梅',progress:2,end:false,img:'compHardSoftApp_dongbeida.webp'},
//         {name:'网络技术与应用',school:'中国人民解放军陆军工程大学',pChannel:0,sChannel:0,category:'',teacher:'沈鑫剡',progress:2,end:false,img:'IntApp_renluda.webp'},
//         {name:'高级语言程序设计',school:'东北大学',pChannel:0,sChannel:0,category:'',teacher:'高克宁',progress:2,end:false,img:'advLangProg_dongbeida.webp'},
//         {name:'编译原理',school:'哈尔滨工业大学',pChannel:0,sChannel:0,category:'',teacher:'陈鄞',progress:2,end:false,img:'debugPrin_hagongda.webp'},
//         {name:'数据结构',school:'华中科技大学',pChannel:0,sChannel:0,category:'',teacher:'李国徽',progress:2,end:false,img:'dataStruc_huakeda.webp'},
//         {name:'大学计算机—计算思维导论',school:'哈尔滨工业大学',pChannel:0,sChannel:0,category:'',teacher:'战德臣',progress:2,end:false,img:'uniCompIdeaState_hagongda.webp'},
//         {name:'数据库系统概论（高级篇）',school:'中国人民大学',pChannel:0,sChannel:0,category:'',teacher:'王珊',progress:2,end:false,img:'dataBaseSysStateAdv_zhongminda.webp'},
//         {name:'数据库系统概论（基础篇）',school:'中国人民大学',pChannel:0,sChannel:0,category:'',teacher:'王珊',progress:2,end:false,img:'dataBaseSysStateBase_zhongminda.webp'}
//     ]
//     // [
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''},
//     //     {name:'',school:'',pChannel:0,sChannel:0,category:'',teacher:'',progress:2,end:false,img:''}
//     // ]
// ]


module.exports = lesson