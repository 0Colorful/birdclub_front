<template>
    <div class="home">
        <!-- 轮播图 -->
        <Carousel></Carousel>
        <!-- 搜索框 -->
        <Search></Search>
    </div>
</template>

<script>
// @ is an alias to /src
import Carousel from './banner/Carousel.vue';
import Search from './banner/Search.vue'

export default {
    name: 'HomeView',
        components: {
            Carousel,
            Search
    }
}
</script>

<style>
body {
    background-color: rgb(242, 242, 242);
}

</style>
