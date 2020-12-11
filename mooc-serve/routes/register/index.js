const express = require("express");
// const svgCaptcha = require("svg-captcha");
const userDB = require("../../db/user");
const lessonDB = require("../../db/lesson");
const path =require('path');
const fs =require('fs');
var courseSummList=[];
// var Obj;var Title;var index=1;
console.log("register");
var file = path.join(__dirname,'lessonDetail.json');
fs.readFile(file,'utf-8',function(err,data){
    if(data){
        console.log('读取成功');
        courseSummList=JSON.parse(data);
    }
})


let router = express.Router();

router.post('/',(req,res)=>{
    let {user,pwd} = req.body;
    if(!user || !pwd){
        res.send({
            code:0,
            msg:'数据无效，请检查后再注册'
        });
        return;
    }
    userDB.findOne({user})
        .then(data=>{
            if(data){
                res.send({
                    code:2,
                    msg:'用户已存在'
                });
            }else{
                userDB.create({user,pwd})
                    .then(d=>{
                        res.send({
                            code:1,
                            msg:'注册成功11'
                        })
                    })
                    .catch(e=>{
                        console.log(e);
                        res.send({
                            code:3,
                            msg:'服务器错误'
                        })
                    })
            }
        })
        .catch(e=>{
            res.send({
                code:3,
                msg:'服务器错误'
            })
        });
    function createDatabase(){
        var toStr=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
        var url="http://localhost:3002/images/lesson/";
        var toCate=[
            {
                pCate:'国家精品',
                sCate:["计算机","理学","工学","经济管理","文史哲","艺术设计","心理学","医药卫生","法学","教育教学","农林园艺"]
            },
            {
                pCate:'计算机',
                sCate:["前言技术","程序设计与开发","C语言不挂科","计算机基础与应用","软件工程","网络与安全技术","硬软件系统及原理","408计算机","2021考研计算机","Python数据分析","小白编程"]
            },
            {
                pCate:'外语',
                sCate:["听力/外语","语言/阅读","写作/翻译","文学与语言学","专门用途英语","综合语种","跨文化交际","对外汉语","大学英语","考神四六级","考研英语","考神考研英语","万词班","实用英语","考神雅思","康哥四六级","BEC/新概念","考神专四专八","专四专八"]
            },
            {
                pCate:'理学',
                sCate:["数学","物理","化学","天文学","地理科学","生物科学","大气与海洋","数理不挂科","21考研数学"]
            },
            {
                pCate:'工学',
                sCate:['电气信息','工学不挂科','机械','土建水利','力学','材料','交通运输','化工与生物制药','能源矿业','轻纺食品','航天航空','农林环境','安全','21考研机械']
            },
            {
                pCate:'22考研',
                sCate:['数学','唐迟英语','英语','政治','408计算机','艺术设计','高数基础','计算机院校走向','电子信息','考神考研','管理类联考','专业课1对1']
            },
            {
                pCate:'期末不挂科',
                sCate:['数学不挂科','高数高分','物理不挂科','工学不挂科','C语言不挂科','有机化学','期末高分','超值组合','期末试卷解析']
            },
            {
                pCate:'应试英语',
                sCate:['四六级','考研英语','万词班','雅思极速','专四专八']
            },
            {
                pCate:'实用英语',
                sCate:['万词班','新概念','BEC商务英语','听说读写单项']
            },
            {
                pCate:'经济管理',
                sCate:['经济','金融','电商与贸易','会计','管理','图书情报','创新创分','思维力','实用英语',"金融考证","管理类联考"]
            },
            {
                pCate:'心理学',
                sCate:['心理学','21考研心理学']
            },
            {
                pCate:'文史哲',
                sCate:['文学文化','新闻联播','哲学','历史','公务员考试']
            },
            {
                pCate:'艺术设计',
                sCate:['考研设计','艺术学','美术学','戏剧与影视','设计学','音乐与舞蹈','设计教程']
            },
            {
                pCate:'医药卫生',
                sCate:['基础医学','临床医学','公共卫生','口腔医学','中医中药学','药学','中医考研','护理学','健康',"老年医学","儿科学",'妇产科学','急诊与灾害医学','医患沟通与伦理学']
            },
            {
                pCate:'教育教学',
                sCate:['教学方法','教学能力','信息化教学','职业素养','学科教学','素质教育','体育教育','学前教育','考研教育学',"公务员考试"]
            },
            {
                pCate:'法学',
                sCate:['政治','法学','思政','社会']
            },
            {
                pCate:'农林园艺',
                sCate:['植物','动物','生态']
            },
            {
                pCate:'音乐与舞蹈',
                sCate:[]
            },
            {
                pCate:'21考研',
                sCate:['数学','孔昱力政治','王一珉政治','唐迟英语','康哥英语','408计算机','考研设计','猴博士高数','21考研机械',"21考研经济学","21考研心理学",'西医综合','管理联考','农科化学','考研教育学','中医考研','领学班','更多专业课']
            },
            {
                pCate:'考证就业',
                sCate:['Python数据分析','小白编程','办公技能','设计教程','金融考证','公务员考试','计算机二级','教师资格证','教师招聘',"记忆力"]
            },
            {
                pCate:'名师专栏',
                sCate:['热门专栏','讲座Live','效率','职场实用技能','情商','思维力','外语','爱情','钢琴',"人文","二胡","其他"]
            },
        ];
        var index=0;
        var obj=
        [
            [ //zero
                [
                    {name:'C语言程序设计进阶',school:'浙江大学',teacher:'翁恺',progress:2,end:false,hot:140,img:'Clang_zeda.webp'},
                    {name:'Python数据分析与展示',school:'北京理工大学',teacher:'嵩天',progress:2,end:false,hot:100,img:'PythonDataAna_beili.webp'},
                    {name:'Python语言程序设计',school:'北京理工大学',teacher:'嵩天',progress:2,end:false,hot:160,img:'Python_beili.webp'},
                    {name:'数据结构',school:'浙江大学',teacher:'陈越',progress:2,end:false,hot:100,img:'datastru_zeda.webp'},
                    {name:'程序设计入门——C语言',school:'浙江大学',teacher:'翁恺',progress:4,end:false,hot:130,img:'progdesC_zeda.webp'},
                    {name:'大学计算机',school:'北京理工大学',teacher:'李凤霞',progress:2,end:false,hot:160,img:'unicomp_beili.webp'},
                    {name:'Java程序设计',school:'北京大学',teacher:'唐大仕',progress:4,end:false,hot:160,img:'Javaprog_beida.webp'},
                    {name:'程序设计基础',school:'哈尔滨工业大学',teacher:'苏小红',progress:2,end:false,hot:120,img:'progdes_hagong.webp'},
                    {name:'Python网络爬虫与信息提取',school:'北京理工大学',teacher:'嵩天',progress:2,end:false,hot:120,img:'PyhonIntCrap_beili.webp'},
                    {name:'Python科学计算三维可视化',school:'北京理工大学',teacher:'黄天羽',progress:2,end:false,hot:100,img:'PythonThree3d_beili.webp'},
                    {name:'大学计算机基础',school:'国防科技大学',teacher:'周海芳',progress:2,end:false,hot:200,img:'uniCompBase_guokeda.webp'},
                    {name:'多媒体技术及应用',school:'深圳大学',teacher:'王志强',progress:2,end:false,hot:190,img:'multimedia_shenda.webp'},
                    {name:'C语言程序设计(下)',school:'北京理工大学',teacher:'李凤霞',progress:2,end:false,hot:260,img:'CProg_beili.webp'},
                    {name:'android智能手机编程',school:'国家开放大学',teacher:'王立',progress:6,end:false,hot:100,img:'androPhoneProg_guokaida.webp'},
                    {name:'大学计算机——计算思维之路',school:'北京交通大学',teacher:'王移芝',progress:2,end:false,hot:100,img:'uniCompIdea_beijiaoda.webp'},
                    {name:'C编程方法学',school:'武汉理工大学',teacher:'李民',progress:2,end:false,hot:100,img:'CProgWay_wuli.webp'},
                    {name:'数据库系统概论（新技术篇）',school:'中国人民大学',teacher:'王珊',progress:2,end:false,hot:100,img:'dataBaseProf_zhongrenda.webp'},
                    {name:'VisualBasic.NET程序设计进阶',school:'同济大学',teacher:'龚沛曾',progress:2,end:false,hot:100,img:'VisualBasicNet_tongji.webp'},
                    {name:'数据结构与算法',school:'北京大学',teacher:'张铭',progress:2,end:false,hot:100,img:'dataStruAlgo_beida.webp'},
                    {name:'基于Java的面向对象编程范式',school:'南京大学',teacher:'刘钦',progress:2,end:false,hot:100,img:'basedJavaProg_nanda.webp'},
                    {name:'离散数学概论',school:'北京大学',teacher:'陈斌',progress:2,end:false,hot:100,img:'decreMath_beida.webp'},
                    {name:'计算机操作系统',school:'南京大学',teacher:'骆斌',progress:2,end:false,hot:100,img:'compOperSys_nanda.webp'},
                    {name:'计算思维的结构',school:'桂林电子科技大学',teacher:'董荣胜',progress:2,end:false,hot:100,img:'compIdeaStruc_diankeda.webp'},
                    {name:'大学计算机--计算思维的视角',school:'山东大学',teacher:'郝兴伟',progress:2,end:false,hot:100,img:'uniCompIdeaView_shandongda.webp'},
                    {name:'C++程序设计',school:'西北工业大学',teacher:'魏英',progress:2,end:false,hot:100,img:'CPlusProg_xigongda.webp'},
                    {name:'程序设计与算法（二）算法基础',school:'北京大学',teacher:'郭炜',progress:2,end:false,hot:100,img:'progDesAlgo_beida.webp'},
                    {name:'大学计算机基础',school:'同济大学',teacher:'杨志强',progress:2,end:false,hot:100,img:'uniCompBase_tongji.webp'},
                    {name:'VisualBasic.NET程序设计入门',school:'同济大学',teacher:'龚沛曾',progress:2,end:false,hot:100,img:'VisualBasicNetBase_tongji.webp'},
                    {name:'VisualBasic6.0程序设计',school:'同济大学',teacher:'龚沛曾',progress:2,end:false,hot:100,img:'VisualBasic60.tongji.webp'},
                    {name:'零基础学Java语言',school:'浙江大学',teacher:'翁恺',progress:2,end:false,hot:100,img:'zeroBaseJava_zeda.webp'},
                    {name:'软件工程',school:'东北大学',teacher:'张爽',progress:2,end:false,hot:100,img:'softProj_dongbeida.webp'},
                    {name:'汇编语言程序设计',school:'电子科技大学',teacher:'邢建川',progress:2,end:false,hot:100,img:'huiBianProg_diankeda.webp'},
                    {name:'高级语言程序设计',school:'吉林大学',teacher:'张长海',progress:2,end:false,hot:100,img:'advLangProg_jida.webp'},
                    {name:'计算机原理',school:'国防科技大学',teacher:'唐玉华',progress:2,end:false,hot:100,img:'compIdea_guokeda.webp'},
                    {name:'云计算技术与应用',school:'河海大学',teacher:'孙宁',progress:2,end:false,hot:100,img:'clouldComp_heda.webp'},
                    {name:'C语言程序设计(上)',school:'北京理工大学',teacher:'李凤霞',progress:2,end:false,hot:100,img:'CProgDesPlus_beili.webp'},
                    {name:'程序设计与算法（三）C++面向对象程序设计',school:'北京大学',teacher:'郭炜',progress:2,end:false,hot:100,img:'ProgDesAlogC_beida.webp'},
                    {name:'程序设计与算法（一）C语言程序设计',school:'北京大学',teacher:'郭炜',progress:2,end:false,hot:100,img:'ProgDesAlogOneC_beida.webp'},
                    {name:'大学计算机基础',school:'中国农业大学',teacher:'陈雷',progress:2,end:false,hot:100,img:'uniCompBase_zhongnongda.webp'},
                    {name:'人工智能原理',school:'北京大学',teacher:'王文敏',progress:2,end:false,hot:100,img:'ArtifIntelli_baida.webp'},
                    {name:'数据结构',school:'西北大学',teacher:'耿国华',progress:2,end:false,hot:100,img:'dataStruc_xibei.webp'},
                    {name:'计算机网络基础及应用',school:'南京理工大学',teacher:'丁晟春',progress:2,end:false,hot:100,img:'compIntBase_nanli.webp'},
                    {name:'多媒体技术与应用',school:'同济大学',teacher:'李湘梅',progress:2,end:false,hot:100,img:'multiMediaApp_tongji.webp'},
                    {name:'数据库技术及应用',school:'东北师范大学',teacher:'李雁翎',progress:2,end:false,hot:100,img:'dataBaseApp_dongshida.webp'},
                    {name:'计算机专业导论',school:'哈尔滨工业大学',teacher:'战德臣',progress:2,end:false,hot:100,img:'compState_hagongda.webp'},
                    {name:'大学信息技术基础',school:'福建农林大学',teacher:'陈琼',progress:2,end:false,hot:100,img:'uniInforBase_funongda.webp'},
                    {name:'计算机硬件技术基础',school:'东北大学',teacher:'柳秀梅',progress:2,end:false,hot:100,img:'compHardSoftApp_dongbeida.webp'},
                    {name:'网络技术与应用',school:'中国人民解放军陆军工程大学',teacher:'沈鑫剡',progress:2,end:false,hot:100,img:'IntApp_renluda.webp'},
                    {name:'高级语言程序设计',school:'东北大学',teacher:'高克宁',progress:2,end:false,hot:100,img:'advLangProg_dongbeida.webp'},
                    {name:'编译原理',school:'哈尔滨工业大学',teacher:'陈鄞',progress:2,end:false,hot:100,img:'debugPrin_hagongda.webp'},
                    {name:'数据结构',school:'华中科技大学',teacher:'李国徽',progress:2,end:false,hot:100,img:'dataStruc_huakeda.webp'},
                    {name:'大学计算机—计算思维导论',school:'哈尔滨工业大学',teacher:'战德臣',progress:2,end:false,hot:100,img:'uniCompIdeaState_hagongda.webp'},
                    {name:'数据库系统概论（高级篇）',school:'中国人民大学',teacher:'王珊',progress:2,end:false,hot:100,img:'dataBaseSysStateAdv_zhongminda.webp'},
                    {name:'数据库系统概论（基础篇）',school:'中国人民大学',teacher:'王珊',progress:2,end:false,hot:100,img:'dataBaseSysStateBase_zhongminda.webp'},
                    {name:'C#程序设计',school:'西北工业大学',teacher:'刘君瑞',progress:2,end:false,hot:100,img:'C#ProgDes_xigongda.webp'},
                    {name:'用Python玩转数据',school:'南京大学',teacher:'张莉',progress:2,end:false,hot:100,img:'dataWithPython_nanda.webp'},
                ],
                [
                    {name:'数学分析（二）',school:'华东师范大学',teacher:'柴俊',progress:2,end:false,hot:140,img:'mathAnalySec_huashida.webp'},
                    {name:'大学物理—近代物理',school:'北京理工大学',teacher:'胡海云',progress:2,end:false,hot:100,img:'mathPhy_beilida.webp'},
                    {name:'大学物理典型问题解析—近代物理',school:'北京理工大学',teacher:'缪劲松',progress:2,end:false,hot:160,img:'uniPhyTypicalQueAna.webp'},
                    {name:'高等数学（二）',school:'国防科技大学',teacher:'朱健民',progress:2,end:false,hot:100,img:'advaMathSec_guokeda.webp'},
                    {name:'微积分（二）',school:'电子科技大学',teacher:'高建',progress:4,end:false,hot:130,img:'minRank_diankeda.webp'},
                    {name:'高等数学（二）',school:'同济大学',teacher:'朱晓平',progress:2,end:false,hot:160,img:'advMathSec_tongji.webp'}
                ],
                [
                    {name:'Java程序设计',school:'北京大学',teacher:'唐大仕',progress:4,end:false,hot:160,img:'Javaprog_beida.webp'},
                    {name:'程序设计基础',school:'哈尔滨工业大学',teacher:'苏小红',progress:2,end:false,hot:120,img:'progdes_hagong.webp'},
                    {name:'Python网络爬虫与信息提取',school:'北京理工大学',teacher:'嵩天',progress:2,end:false,hot:120,img:'PyhonIntCrap_beili.webp'},
                    {name:'Python科学计算三维可视化',school:'北京理工大学',teacher:'黄天羽',progress:2,end:false,hot:100,img:'PythonThree3d_beili.webp'},
                    {name:'大学计算机基础',school:'国防科技大学',teacher:'周海芳',progress:2,end:false,hot:200,img:'uniCompBase_guokeda.webp'},
                    {name:'多媒体技术及应用',school:'深圳大学',teacher:'王志强',progress:2,end:false,hot:190,img:'multimedia_shenda.webp'},
                    {name:'C语言程序设计(下)',school:'北京理工大学',teacher:'李凤霞',progress:2,end:false,hot:260,img:'CProg_beili.webp'},
                    {name:'android智能手机编程',school:'国家开放大学',teacher:'王立',progress:6,end:false,hot:100,img:'androPhoneProg_guokaida.webp'}
                ],
                [
                    {name:'金融学（二）',school:'中央财经大学',teacher:'李健',progress:4,end:false,hot:160,img:'financeSec_zhongcaida.webp'},
                    {name:'社区管理学',school:'东北大学',teacher:'孙萍',progress:2,end:false,hot:120,img:'commuiMana_dongbeida.webp'},
                    {name:'微观经济学',school:'武汉大学',teacher:'文建东',progress:2,end:false,hot:120,img:'microViewEcon_wuda.webp'},
                    {name:'信息化领导力',school:'爱课程',teacher:'沈书生',progress:2,end:false,hot:100,img:'inforLeaderPower_aikecheng.webp'},
                    {name:'人因工程学',school:'东北大学',teacher:'郭伏',progress:2,end:false,hot:200,img:'manCauseEngin_dongbeida.webp'},
                    {name:'运筹学',school:'中国人民解放军陆军工程大学',teacher:'刘华丽',progress:2,end:false,hot:190,img:'planMana_zhongjielugongda.webp'}
                ],
                [
                    {name:'现代礼仪',school:'湖南大学',teacher:'袁涤非',progress:4,end:false,hot:160,img:'modernManner_hunanda.webp'},
                    {name:'新媒体素养',school:'中山大学',teacher:'张志安',progress:2,end:false,hot:120,img:'newMediaManner_zhongshanda.webp'},
                    {name:'中国衣裳——传统服装文化',school:'西南交通大学',teacher:'李任飞',progress:2,end:false,hot:120,img:'tradCostumerCult_xijiaoda.webp'},
                    {name:'新媒体概论',school:'浙江大学',teacher:'韦路',progress:2,end:false,hot:100,img:'newMediaState.webp'},
                    {name:'科举与唐诗',school:'郑州大学',teacher:'王士祥',progress:2,end:false,hot:200,img:'kejuTangPoem.webp'},
                    {name:'吴文化史',school:'苏州大学',teacher:'王卫平',progress:2,end:false,hot:190,img:'wuCultHist.webp'}
                ],
                [
                    {name:'环境设施设计',school:'江南大学',teacher:'张凌浩',progress:4,end:false,hot:160,img:'enivorEquipmentDes_jiangnanda.webp'},
                    {name:'摄影基础',school:'电子科技大学',teacher:'11',progress:2,end:false,hot:120,img:'videoBase_diankeda.webp'},
                    {name:'人人爱设计（下）',school:'山东大学',teacher:'王震亚',progress:2,end:false,hot:120,img:'manmanLoveDes_shandongda.webp'}
                ],
                [
                    {name:'沟通心理学',school:'哈尔滨工业大学',teacher:'裴秋宇',progress:4,end:false,hot:160,img:'commuiPscho_hagongda.webp'},
                    {name:'心理学与生活',school:'南京大学',teacher:'陈昌凯',progress:2,end:false,hot:120,img:'pschoLife_nanjingda.webp'},
                    {name:'婚恋-职场-人格',school:'武汉理工大学',teacher:'张晓文',progress:2,end:false,hot:120,img:'marryWorkareaManation_wulida.webp'}
                ],
                [
                    {name:'AIDS and I ──艾滋病与我',school:'武汉大学',teacher:'熊勇',progress:4,end:false,hot:160,img:'AIDSandI_wuda.webp'},
                    {name:'中药与美容',school:'中国药科大学',teacher:'王秋',progress:2,end:false,hot:120,img:'ChineseDrugMeirong_zhongyida.webp'},
                    {name:'流行病学基础（二）',school:'北京大学',teacher:'吴涛',progress:2,end:false,hot:120,img:'LiuxingxueBase_beida.webp'}
                ],
                [
                    {name:'社会学概论',school:'西安交通大学',teacher:'杨建科',progress:4,end:false,hot:160,img:'socialityState_xijiaoda.webp'},
                    {name:'中国近现代史纲要',school:'浙江大学',teacher:'段治文',progress:2,end:false,hot:120,img:'recentHist_zeda.webp'},
                    {name:'思想道德修养与法律基础',school:'武汉大学',teacher:'佘双好',progress:2,end:false,hot:120,img:'ideaVirtueLawBase_wuda.webp'}
                ],
                [
                    {name:'教师如何做研究',school:'北京大学',teacher:'汪琼',progress:4,end:false,hot:160,img:'teacHowToStudy_beida.webp'},
                    {name:'走向深度的合作学习',school:'爱课程',teacher:'刘徽',progress:2,end:false,hot:120,img:'goToDeepStudy_aikecheng.webp'},
                    {name:'游戏化教学法',school:'爱课程',teacher:'尚俊杰',progress:2,end:false,hot:120,img:'gamizeTeacherStyle_aikecheng.webp'}
                ],
                [
                    {name:'宠物犬鉴赏',school:'华中农业大学',teacher:'熊家军',progress:4,end:false,hot:160,img:'petView_huazhongnongda.webp'},
                    {name:'中国茶道',school:'湖南农业大学',teacher:'朱海燕',progress:2,end:false,hot:120,img:'ChinaTeaStyle_hunannongda.webp'},
                    {name:'生态文明——撑起美丽中国梦',school:'福建农林大学',teacher:'林文雄',progress:2,end:false,hot:120,img:'enivorManStyle_funongda.webp'}
                ]
            ]
        ];
        var length = obj.length;
        for(let i=0;i<length;i++){
            for(let j=0;j<obj[i].length;j++){
                for(let k=0;k<obj[i][j].length;k++){
                    console.log(obj[i][j][k].name);
                    console.log(obj[i][j][k].school);
                    lessonDB.create({
                        id:index,
                        name:obj[i][j][k].name,
                        school:obj[i][j][k].school,
                        pChannel:i,
                        sChannel:j+1,
                        pCategory:toCate[i].pCate,
                        sCategory:toCate[i].sCate[j],
                        courseSummary:courseSummList[index%2],
                        courseInfo:{
                            1:{
                                main_teacher:obj[i][j][k].teacher
                            }
                        },
                        img:url+toStr[i]+'/'+obj[i][j][k].img
                    }).then(d=>{})
                        .catch(e=>{console.log(e);console.log(i,j,k);});
                    index++;
                }
            }
        }
    }
    createDatabase();
    

        // Obj=[
        //     ["全部","计算机","理学","工学","经济管理","文史哲","艺术设计","心理学","医药卫生","法学","教育教学","农林园艺"],
        //     ["全部","前言技术","程序设计与开发","C语言不挂科","计算机基础与应用","软件工程","网络与安全技术","硬软件系统及原理","408计算机","2021考研计算机","Python数据分析","小白编程"],
        //     ["全部","听力/外语","语言/阅读","写作/翻译","文学与语言学","专门用途英语","综合语种","跨文化交际","对外汉语","大学英语","考神四六级","考研英语","考神考研英语","万词班","实用英语","考神雅思","康哥四六级","BEC/新概念","考神专四专八","专四专八"],
        //     ["全部","数学","物理","化学","天文学","地理科学","生物科学","大气与海洋","数理不挂科","21考研数学"],
        //     ['全部','电气信息','工学不挂科','机械','土建水利','力学','材料','交通运输','化工与生物制药','能源矿业','轻纺食品','航天航空','农林环境','安全','21考研机械'],
        //     ['全部','数学','唐迟英语','英语','政治','408计算机','艺术设计','高数基础','计算机院校走向','电子信息','考神考研','管理类联考','专业课1对1'],
        //     ['全部','数学不挂科','高数高分','物理不挂科','工学不挂科','C语言不挂科','有机化学','期末高分','超值组合','期末试卷解析'],
        //     ['全部','四六级','考研英语','万词班','雅思极速','专四专八'],
        //     ['全部','万词班','新概念','BEC商务英语','听说读写单项'],
        //     ['全部','经济','金融','电商与贸易','会计','管理','图书情报','创新创分','思维力','实用英语',"金融考证","管理类联考"],
        //     ['全部','心理学','21考研心理学'],
        //     ['全部','文学文化','新闻联播','哲学','历史','公务员考试'],
        //     ['全部','考研设计','艺术学','美术学','戏剧与影视','设计学','音乐与舞蹈','设计教程'],
        //     ['全部','基础医学','临床医学','公共卫生','口腔医学','中医中药学','药学','中医考研','护理学','健康',"老年医学","儿科学",'妇产科学','急诊与灾害医学','医患沟通与伦理学'],
        //     ['全部','教学方法','教学能力','信息化教学','职业素养','学科教学','素质教育','体育教育','学前教育','考研教育学',"公务员考试"],
        //     ['全部','政治','法学','思政','社会'],
        //     ['全部','植物','动物','生态'],
        //     [''],
        //     ['全部','数学','孔昱力政治','王一珉政治','唐迟英语','康哥英语','408计算机','考研设计','猴博士高数','21考研机械',"21考研经济学","21考研心理学",'西医综合','管理联考','农科化学','考研教育学','中医考研','领学班','更多专业课'],
        //     ['全部','Python数据分析','小白编程','办公技能','设计教程','金融考证','公务员考试','计算机二级','教师资格证','教师招聘',"记忆力"],
        //     ['全部','热门专栏','讲座Live','效率','职场实用技能','情商','思维力','外语','爱情','钢琴',"人文","二胡","其他"],
        // ];
        // Title=["国家精品","计算机","外语","理学","工学","22考研","期末不挂科","应试英语","实用英语","经济管理","心理学",
        //         "文史哲","艺术设计","医药卫生","教育教学","法学","农林园艺","音乐与舞蹈","21考研","考证就业","名师专栏"
        // ];
        // for(let i=0;i<21;i++){
        //     channeltabDB.create({
        //         channel:i,
        //         title:Title[i],
        //         list:Obj[i]
        //     }).then(d=>{})
        //         .catch(e=>{console.log(e);})
        // }

        
});
module.exports = router;
