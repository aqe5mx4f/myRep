import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userInfo:{},
    toLogin:false
  },
  getters: {
  },
  mutations: {
    loadInfo(state,userInfo){
      state.userInfo=userInfo;
      console.log("Mutations-loadInfo()-success");
      console.log(userInfo);
      console.log(state.userInfo);
    },
    toggleLogin(state,status){
      state.toLogin=status;
    }
  },
  actions: {
  },
  modules: {
  }
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
