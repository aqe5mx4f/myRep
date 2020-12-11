<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{user-select: none;font-size:14px;}
body,dl,dd,dt,p,blockquote,input,textarea,th,td,h1,h2,h3,h4,h5,h6{margin: 0;padding:0;}
ol,ul,li{margin: 0;padding: 0;list-style: none;box-sizing: border-box;}
a{text-decoration:none}
table{border-collapse:collapse;border-spacing:0}
img{border:0;}
div{box-sizing: border-box;}
textarea:focus{
  outline: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
