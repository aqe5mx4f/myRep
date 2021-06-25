// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI, { Form } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { slideTitle } from '../src/common/js/slide'

Vue.use(ElementUI);

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    if (to.name == 'Dashboard') {
        console.log('to Dashboard')
        if (to.name !== from.name) {
            slideTitle('中国大学MOOC(慕课)_国家精品课程在线学习平台')
        }
    };
    if (to.name == 'Channel') {
        console.log('to Channel;:hid=');
        console.log(to.params.hid);
        var ChannelArray = to.params.hid.split('-'),
            title;
        title = decodeURI(decodeURI(ChannelArray[2]));
        if (to.name !== from.name) {
            slideTitle(title + '_中国大学MOOC(慕课)')
        }
        // document.title = title + '_中国大学MOOC(慕课)';
    };
    if (to.name == 'DetailInfo') {
        console.log('to DetailInfo;:info=');
        console.log(to.params.info);
        var DetailInfoArray = to.params.info.split('&'),
            title = '';
        var ArrayLen = DetailInfoArray.length;
        for (let i = 0; i < ArrayLen; i++) {
            title += decodeURI(decodeURI(DetailInfoArray[i])) + '_';
            console.log(title);
        };
        // document.title = title + '中国大学MOOC(慕课)';
        if (to.name !== from.name) {
            slideTitle(title + '中国大学MOOC(慕课)')
        }
    };
    if (to.name == 'Search') {
        // document.title = '搜索课程_' + '中国大学MOOC(慕课)';
        if (to.name !== from.name) {
            slideTitle('搜索课程_' + '中国大学MOOC(慕课)')
        }
    };
    next();
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})