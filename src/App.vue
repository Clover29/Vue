<template>

<Header/>
<NavBar/>
<Content/>
</template>

<script>
import Header from './components/layouts/TheHeader.vue'
import NavBar from './components/layouts/TheNavBar.vue'
import Content from './components/layouts/TheContent.vue'
export default {
  name: 'App',
  components: {
    Header,
    NavBar,
    Content
  }
}
</script>

<style>
@import url(./css/main.css);
</style>
