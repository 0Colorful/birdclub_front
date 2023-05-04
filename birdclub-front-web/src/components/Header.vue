<template>
    <div class="header">
        <!-- logo -->
        <router-link to="/" class="logo">
            <span v-for="item in logoInfo" :style="{color: item.color, fontSize: item.size}">{{ item.letter }}</span>
        </router-link>
        <!-- 板块菜单 -->
        <el-menu
            :default-active="$route.path"
            class="menu-panel"
            mode="horizontal"
            background-color="#fff"
            text-color="#000"
            active-text-color="#4CD507"
            router>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/article">文章</el-menu-item>
            <el-menu-item index="/audio">鸟鸣</el-menu-item>
            <el-menu-item index="/video">视频</el-menu-item>
            <el-menu-item index="/baike">科普</el-menu-item>
        </el-menu>
        <!-- 用户信息板块 -->
        <div class="user-info-panel">
            <!-- <el-button>搜索</el-button>
            <el-button>创作</el-button> -->
            <el-button type="primary" plain @click="loginAndRegister(1)">登录</el-button>
            <el-button type="primary" plain @click="loginAndRegister(0)">注册</el-button>
        </div>
    </div>
    <!-- 登录注册 -->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
</template>

<script setup>
import { ref } from 'vue';
import LoginAndRegister from '@/views/login/LoginAndRegister.vue';

const logoInfo = ref([
    {
        letter: "B",
        color: "#9adc79",
    },
    {
        letter: "i",
        color: "#8dce6d",
    },
    {
        letter: "r",
        color: "#7fbf62",
    },
    {
        letter: "d",
        color: "#72b156",
    },
    {
        letter: "C",
        color: "#8dce6d",
    },
    {
        letter: "l",
        color: "#65a24b",
    },
    {
        letter: "u",
        color: "#58943f",
    },
    {
        letter: "b",
        color: "#4a8534",
    },
])

const loginRegisterRef = ref();
const loginAndRegister = (type) => {
    loginRegisterRef.value.showPanel(type);
}

</script>

<style lang="scss" scoped>
.header {
    display: flex;
    border-bottom: solid 1px #e6e6e6;
    .logo, .user-info-panel{
        padding: 0 30px;
        line-height: 60px;
        background-color: #fff;
    }
    .menu-panel {
        flex: 1;
    }
    .logo {
        font-size: 30px;
        text-decoration: none;
    }
    .user-info-panel {
        .el-button {
            min-height: 30px;
            font-size: 14px;
            padding: 5px 16px;
            color: rgb(83, 80, 80);
            border: 1px solid #acef8a;
            background: #fcfbfb;
            margin-left: 10px;
        }

        .el-button:hover {
            background: #acef8a;
            border-color: #acef8a;
        }

        .el-button:active {
            background: #fff;
            border-color: #acef8a;
        }
    }
    
    .el-menu.el-menu--horizontal {
        border: none;
    }
    .el-menu-item {
        font-size: 16px;
    }
}
</style>