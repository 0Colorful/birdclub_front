<template>
    <div class="midDiv">
        <el-row :gutter="20">
        <el-col :span="16">
            <div class="grid-content ep-bg-purple" >
                <el-input v-model="input" placeholder="请输入搜索内容" class="input-with-select" clearable>
                    <template #prepend>
                        <el-select v-model="select" style="width: 80px">
                            <el-option label="文章" value="1" />
                            <el-option label="鸟鸣" value="2" />
                            <el-option label="视频" value="3" />
                            <el-option label="科普" value="4" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button>
                            <el-icon><Search /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </el-col>
        <el-col :span="8">
            <!-- <div class="grid-content ep-bg-purple">
                <el-button class="writeBtn">创作文章</el-button>
            </div> -->
        </el-col>
    </el-row>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('')
const select = ref('1')
</script>

<style lang="scss" scoped>
.midDiv {
    margin: 0 30px;
    background-color: rgb(255, 255, 255);
    .input-with-select {
        margin: 10px 30px;
        width: 600px;
    }
}

</style>