<template>
    <div>
        <!-- 公共导航区域 -->
        <div>
            <Header></Header>
        </div>

        <div>
            <router-view></router-view>
        </div>        

        <!-- 公共底部 -->
        <Footer></Footer>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// const loginRegisterRef = ref();
// const loginAndRegister = (type) => {
//     loginRegisterRef.value.showPanel();
// }

</script>

<style lang="scss">


</style>
