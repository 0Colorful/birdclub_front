<template>
    <div class="main-content">
        <el-row :gutter="20" class="article-content">
            <el-col :span="15">
                <div class="general-area left-area">
                    <div class="titleDiv"><div class="titleText">最新文章</div></div>
                </div>
            </el-col>
            <el-col :span="9">
                <div class="general-area right-area">
                    <div class="titleDiv"><div class="titleText">热门文章</div></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.main-content {
    margin-top: 40px;
    .article-content {
        .general-area {
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
}



</style>