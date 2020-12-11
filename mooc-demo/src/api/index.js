import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = 'application/x-www-from-urlcoded';

export default {
    postRegister(options){
        return axios.post('/register',options);
    },
    postLogin(options){
        return axios.post('/login',options);
    },
    postIfLogin(){
        return axios.post('/login/iflogin');
    },
    PostChannelTab(options){
        return axios.post('/channel/tab',options);
    },
    PostChannelNewBest(options){
        return axios.post('/channel/newBest',options);
    },
    PostChannelFilterLesson(options){
        return axios.post('/channel/filterLesson',options);
    },
    PostLessDetail(options){
        return axios.post('/detail/lesson',options);
    },
    PostComComent(options){
        return axios.post('/detail/lesson/commitComment',options);
    },
    PostgetComent(){
        return axios.post('/detail/lesson/getComment');
    }
}