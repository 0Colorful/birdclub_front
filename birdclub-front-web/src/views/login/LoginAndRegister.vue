<template>
    <div>
        <Dialog
            :show="dialogConfig.show"
            :title="dialogConfig.title"
            :buttons="dialogConfig.buttons"
            width="400px"
            :showCancel="false"
            @close="dialogConfig.show = false"
        >
            <!-- 输入表单 -->
            <el-form 
                class="login-register" 
                :model="formData" 
                :rules="rules" 
                ref="formDataRef"
            >
                <el-form-item prop="email">
                    <el-input
                        size="large"
                        clearable
                        placeholder="请输入邮箱"
                        v-model="formData.email"
                        maxlength="150"
                    >
                        <template #prefix>
                            <span><el-icon><UserFilled /></el-icon></span>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 登录密码 -->
                <el-form-item prop="password" v-if="opType == 1">
                    <el-input
                        size="large"
                        type="password"
                        clearable
                        show-password
                        placeholder="请输入密码"
                        v-model="formData.password"
                    >
                        <template #prefix>
                            <span><el-icon><Lock /></el-icon></span>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 注册 -->
                <div v-if="opType == 0 || opType == 2">
                    <el-form-item prop="emailCode">
                        <div class="send-email-panel">
                            <el-input
                                size="large"
                                placeholder="请输入邮箱验证码"
                                v-model="formData.emailCode"
                            >
                                <template #prefix>
                                    <span><el-icon><CircleCheck /></el-icon></span>
                                </template>
                            </el-input>
                            <el-button type="primary" size="large" class="sendEmail-btn" @click="showSendMailDialog">获取邮箱验证码</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="nickName" v-if="opType == 0">
                        <el-input
                            size="large"
                            clearable
                            placeholder="请输入昵称"
                            v-model="formData.nickname"
                            maxlength="15"
                            show-word-limit
                        >
                            <template #prefix>
                                <span><el-icon><UserFilled /></el-icon></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="registerPassword">
                        <el-input
                            size="large"
                            type="password"
                            clearable
                            show-password
                            placeholder="请输入密码"
                            v-model="formData.registerPassword"
                        >
                            <template #prefix>
                                <span><el-icon><Lock /></el-icon></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="repeatPassword">
                        <el-input
                            size="large"
                            type="password"
                            clearable
                            show-password
                            placeholder="请再次输入密码"
                            v-model="formData.repeatPassword"
                        >
                            <template #prefix>
                                <span><el-icon><Lock /></el-icon></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
                
                <el-form-item prop="checkCode">
                    <div class="check-code-panel">
                        <el-input
                            size="large"
                            placeholder="请输入验证码"
                            v-model="formData.checkCode"
                        >
                            <template #prefix>
                                <span><el-icon><CircleCheck /></el-icon></span>
                            </template>
                        </el-input>
                        <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode(0)">
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 1">
                    <div class="remenberme-panel"><el-checkbox v-model="formData.rememberMe">记住账号</el-checkbox></div>
                    <div class="no-account">
                        <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">忘记密码？</a>
                        <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">去注册<el-icon size="large"><Right /></el-icon></a>
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 0 || opType == 2">
                    <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">去登录<el-icon size="large"><Right /></el-icon></a>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="op-btn" @click="doSubmit">
                        <span v-if="opType == 0">注册</span>
                        <span v-if="opType == 1">登录</span>
                        <span v-if="opType == 2">重置密码</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </Dialog>
        <!-- 发送邮箱验证码 -->
        <Dialog
            :show="dialogConfig4SendMailCode.show"
            :title="dialogConfig4SendMailCode.title"
            :buttons="dialogConfig4SendMailCode.buttons"
            width="500px"
            :showCancel="false"
            @close="dialogConfig4SendMailCode.show = false"
        >
            <el-form 
                class="login-register" 
                :model="formData4SendMailCode" 
                :rules="rules" 
                ref="formData4SendMailCodeRef"
                label-width="80px"
            >
                <el-form-item>
                    给 {{ formData.email }} 邮箱地址发送验证码
                </el-form-item>
                <el-form-item label="验证码：" prop="checkCode">
                    <div class="check-code-panel">
                        <el-input
                            placeholder="请输入验证码"
                            v-model="formData4SendMailCode.checkCode"
                        >
                            <template #prefix>
                                <span><el-icon><CircleCheck /></el-icon></span>
                            </template>
                        </el-input>
                        <img :src="checkCodeUrl4SendMailCode" class="check-code" @click="changeCheckCode(1)">
                    </div>
                </el-form-item>
        </el-form>
        </Dialog>
    </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, reactive, ref} from 'vue'
import { getUUID } from '@/utils/uuid_token'
const { proxy } = getCurrentInstance();

const api = {
    checkCode: "/api/verifyCode",
    sendEmailCode: "/sendVerifyEmail",
    userLogin: "/userLogin",
    userLogout: "/userLogout",
    userRegister: "/userRegister",
    resetPassword: "/resetPassword"
};

// const uuid = ref();
// const getUuid = () => {
//     if (uuid == null) {
//         uuid.value = crypto.randomUUID();
//     } else {
        
//     }
//     return uuid.value;
// }

//0：注册，1：登录，2：找回密码
const opType = ref();
const showPanel = (type) => {
    opType.value = type;
    resetForm();
};
defineExpose({ showPanel });

//验证码
const checkCodeUrl = ref(api.checkCode);
const checkCodeUrl4SendMailCode = ref(api.checkCode)
const changeCheckCode = (type) => {
    // if (type == 0) {
    //     let url = checkCodeUrl.value;
    // } else {
    //     let url = checkCodeUrl4SendMailCode.value;
    // }
    // // uuid = crypto.randomUUID();
    // let result = await proxy.Request({
    //     url: url,
    // });
    // if (!result) {
    //     return ;
    // }
    
    if (type == 0) {
        checkCodeUrl.value = api.checkCode + "?type=" + type + "&uuid=" + getUUID() + "&time=" + new Date().getTime();
    } else {
        checkCodeUrl4SendMailCode.value = api.checkCode + "?type=" + type + "&uuid=" + getUUID() + "&time=" + new Date().getTime();
    }
};

//检验注册重复输入的密码
const checkRepeatPassword = (rule, value, callback) => {
    if (value !== formData.value.registerPassword) {
        callback(new Error(rule.message))
    } else {
        callback()
    }
}

//邮箱验证弹窗配置
const dialogConfig4SendMailCode = reactive({
    show: false,
    title: "发送邮箱验证码",
    buttons: [{
        type: "primary",
        text: "发送验证码",
        click: () => {
            sendEmailCode()
        }
    }]
});
const formData4SendMailCode = ref({});
const formData4SendMailCodeRef = ref();

//显示邮箱验证码弹窗
const showSendMailDialog = () => {
    formDataRef.value.validateField("email", (valid) => {
        if (!valid) {
            return ;
        }
        dialogConfig4SendMailCode.show = true

        nextTick(() => {
            changeCheckCode(1);
            formData4SendMailCodeRef.value.resetFields();
            formData4SendMailCode.value = {
                email: formData.value.email
            }
        })
    });
};

//发送邮件
const sendEmailCode = () => {
    formData4SendMailCodeRef.value.validate(async (valid) => {
        if (!valid) {
            return ;
        }
        const params = Object.assign({}, formData4SendMailCode.value)
        params.operation = 0;
        params.uuid = getUUID();
        params.imageCode = params.checkCode;
        delete params.checkCode;
        let result = await proxy.Request({
            url: api.sendEmailCode,
            params: params,
            dataType: 'json',
            errorCallback: () => {
                changeCheckCode(1)
            }
        });
        if (!result) {
            return ;
        }
        proxy.Message.success("验证码发送成功");
        dialogConfig4SendMailCode.show = false
    });
}


//登录注册弹窗配置
const dialogConfig = reactive({
    show: false,
    title: "标题",
});
const formData = ref({});
const formDataRef = ref();
const rules = {
    email: [
        {required: true, message: "请输入邮箱"},
        {validator: proxy.Verify.email, message: "邮箱格式不正确"},
    ],
    password: [
        {required: true, message: "请输入密码"}
    ],
    emailCode: [
        {required: true, message: "请输入邮箱验证码"}
    ],
    nickname: [
        {required: true, message: "请输入昵称"}
    ],
    registerPassword: [
        {required: true, message: "请输入密码"},
        {validator: proxy.Verify.password, message: "必须包括数字和字母, 可使用特殊字符(~!@#$%^&*_), 长度8~20位"},
    ],
    repeatPassword: [
        {required: true, message: "请再次输入密码"},
        {validator: checkRepeatPassword, message: "两次输入的密码不一致"}
    ],
    checkCode: [
        {required: true, message: "请输入验证码"},
    ]


};

//重置表单
const resetForm = () => {
    dialogConfig.show = true;
    if (opType.value == 0) {
        dialogConfig.title = "注册";
    } else if (opType.value == 1) {
        dialogConfig.title = "登录";
    } else if (opType.value == 2) {
        dialogConfig.title = "重置密码";
    }
    nextTick(() =>{
        changeCheckCode(0);
        formDataRef.value.resetFields();
        formData.value = {};
    });
};

// 登录、注册、重置密码  提交表单
const doSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
        return;
    }
    let params = {};
    Object.assign(params, formData.value);
    //注册
    if (opType.value == 0 || opType.value == 2) {
        params.password = params.registerPassword;
        params.imageCode = params.checkCode;
        params.uuid = getUUID();
        delete params.checkCode;
        delete params.repeatPassword;
        delete params.registerPassword;
    }
    //登录
    if (opType.value == 1) {
        let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
        let cookiePassword =
            cookieLoginInfo == null ? null : cookieLoginInfo.password;
        if (params.password !== cookiePassword) {
            params.password = md5(params.password);
        }
    }
    let url = null;
    if (opType.value == 0) {
        url = api.userRegister;
    } else if (opType.value == 1) {
        url = api.userLogin;
    } else if (opType.value == 2) {
        url = api.resetPassword;
    }
    let result = await proxy.Request({
        url: url,
        params: params,
        dataType: 'json',
        errorCallback: () => {
            changeCheckCode(0);
        },
    });
    if (!result) {
        return;
    }
    //注册返回
    if (opType.value == 0) {
        proxy.Message.success("注册成功,请登录");
        showPanel(1);
    } else if (opType.value == 1) {
      //登录
        if (params.rememberMe) {
            const loginInfo = {
            email: params.email,
            password: params.password,
            rememberMe: params.rememberMe,
            };
            proxy.VueCookies.set("loginInfo", loginInfo, "7d");
        } else {
            proxy.VueCookies.remove("loginInfo");
        }
        dialogConfig.show = false;
        proxy.Message.success("登录成功");
        store.commit("updateLoginUserInfo", result.data);
    } else if (opType.value == 2) {
        //重置密码
        proxy.Message.success("重置密码成功,请登录");
        showPanel(1);
    }
  });
};

</script>

<style lang="scss" scoped>
.login-register {
    .send-email-panel {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
    .sendEmail-btn {
        margin-left: 10px;
    }
    .check-code-panel {
        display: flex;
        .check-code {
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .remenberme-panel {
        width: 100%;
    }
    .no-account {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .op-btn {
        width: 80%;
        margin: 0 auto;
    }
    .a-link {
        text-decoration: none;
        color: #048beb;
    }
}

.el-form-item {
    align-items: center;
}

</style>
