<template>
    <div class="home">
        <!-- 轮播图 -->
        <Carousel></Carousel>
        <!-- 搜索框 -->
        <Search></Search>
        <el-row :gutter="20" class="main-content">
            <el-col :span="16">
                <div class="general-area left-area">
                    <div class="titleDiv"><div class="titleText">热门推荐</div></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="general-area right-area">
                    <div class="titleDiv"><div class="titleText">最新文章</div></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
// @ is an alias to /src
import Carousel from './banner/Carousel.vue';
import Search from './banner/Search.vue'

</script>

<style lang="scss" scoped>
.main-content {
    .general-area {
        margin-top: 15px;
        background-color: rgb(255, 255, 255);
        height: 500px;
        .titleDiv {
            position: relative;
            top: 20px;
            left: 20px;
            padding-left: 10px;
            border-left: 4px solid #7faf41;
            .titleText {
                font-size: 20px;
                font-family: 黑体;
            }
        }
    }
    .left-area {
        
        
    }

    .right-area {
    
    }
}

</style>
