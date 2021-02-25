import Vue from 'vue'
import Vuex from 'vuex'
import request from '../api/index';
const PostUpdateInfo = request.PostUpdateInfo;
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        userInfo: {},
        toLogin: false,
        iflogin: false,
        emit_detailInfo_getLessInfo: false,
        formatDate: function(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return YY + MM + DD + " " + hh + mm + ss;
        }
    },
    getters: {},
    mutations: {
        loadInfo(state, userInfo) {
            state.userInfo = userInfo;
            state.iflogin = true;
            console.log("Mutations-loadInfo()-success");
        },
        toggleLogin(state, status) {
            state.toLogin = status;
        },
        updateInfo(state) {
            PostUpdateInfo({ _id: state.userInfo._id })
                .then(res => {
                    state.userInfo = res.data.Info;
                    state.emit_detailInfo_getLessInfo = true;
                    console.log(state.emit_detailInfo_getLessInfo);
                    console.log(state.userInfo);
                }).catch(e => { console.log("store-mutations-updateInfo--error" + e) });
        }
    },
    actions: {},
    modules: {}
})



// const moduleA = {
//   state :() =>({
//     count : 0
//   }),
//   getters:{
//     doubleCount(state){
//       return state.count*2
//     },
//     sumWithRootCount (state,getters,rootState){
//       return state.count + rootState.count;
//     }
//   },
//   mutations:{
//     increment(state){
//       state.count++;
//     }
//   },
//   actions:{
//     incrementIfOddOnRootSum ({state,commit,rootState}){
//       if((state.count + rootState.count) %2 ===1){
//         commit('increment')
//       }
//     }
//   }

// }
// const moduleB = {
//   state :() =>{

//   },
//   getters:{

//   },
//   mutations:{

//   },
//   actions:{

//   }

// }
// export default new Vuex.Store({
//   modules: {
//     a:moduleA,
//     b:moduleB
//   }
// })