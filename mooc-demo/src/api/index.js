import axios from 'axios';

axios.defaults.baseURL = 'http://47.93.63.232:3002';
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = 'application/x-www-from-urlcoded';

export default {
    postRegister(options) {
        return axios.post('/register', options);
    },
    postLogin(options) {
        return axios.post('/login', options);
    },
    PostUpdateInfo(options) {
        return axios.post('/login/updateInfo', options);
    },
    PostGetSession() {
        return axios.post('/login/getSession');
    },
    PostChannelAll() {
        return axios.post('/channel/all');
    },
    PostRankHot() {
        return axios.post('/rank/hot');
    },
    PostRankNew() {
        return axios.post('/rank/new');
    },
    PostRankStar() {
        return axios.post('/rank/star');
    },
    PostChannelTab(options) {
        return axios.post('/channel/tab', options);
    },
    PostHeaderCourse() {
        return axios.post('/header/course');
    },
    PostHeaderSearch(options) {
        return axios.post('/header/search', options);
    },
    PostChannelNewBest(options) {
        return axios.post('/channel/newBest', options);
    },
    PostChannelFilterLesson(options) {
        return axios.post('/channel/filterLesson', options);
    },
    PostLessDetail(options) {
        return axios.post('/detail/lesson', options);
    },
    PostJoinLess(options) {
        return axios.post('/detail/lesson/joinLess', options);
    },
    PostComComent(options) {
        return axios.post('/detail/comment/commitComment', options);
    },
    PostgetComent(options) {
        return axios.post('/detail/comment', options);
    },
    PostgiveThumbsUp(options) {
        return axios.post('/detail/comment/thumbsUp', options);
    }

}