<template>
    <div class="index">
        <div class="next">
            <el-button type="default" @click="nextPage(true)">{{this.page ===4 ? '重置' : '下一步'}}</el-button>
        </div>
        <div class="activeRouter" v-if="page >= 1">
            <p>动态路由</p>
            <el-input v-model="activeRouterPage" placeholder="请输入页码" type="number"></el-input>
            <el-button type="primary" @click="goto('activeRouter', {'id': activeRouterPage})">点击跳转</el-button>
        </div>
        <div class="routerLink" v-if="page >= 2">
            <p>router-link跳转</p>
            <router-link :to="'activeRouter/' + activeRouterPage">点击跳转</router-link>
        </div>
        <div v-if="page >= 3">
            <p>路由组件传参</p>
            <ul>
                <li>
                    <router-link to="/hello/you">/hello/you</router-link>
                </li>
                <li>
                    <router-link to="/static">/static</router-link>
                </li>
                <li>
                    <router-link to="/dynamic/1">/dynamic/1</router-link>
                </li>
                <li>
                    <router-link to="/attrs">/attrs</router-link>
                </li>
            </ul>
            <router-view class="view" foo="123"></router-view>
        </div>
        <div v-if="page >= 4">
            <p>路由守卫验证</p>
            <el-button type="primary" @click="login(true)">登录</el-button>
            <el-button type="primary" @click="login(false)">登出</el-button>
            <el-button type="default" @click="goto('guardRouter')">跳转</el-button>
            <p>{{loginStatus? '已经登录！': '尚未登录'}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                activeRouterPage: '',
                loginStatus: false,
                page: 1,
            }
        },
        methods: {
            goto(name, params = {}) {
                // 如果存在path，那么params不生效，但是query依然生效。但是name可以用params的方式。
                // 以下写法2选1.
                this.$router.push(Object.assign({name: name}, Object.keys(params).length === 0 ? {} : {params: params}));
                // this.$router.push({path: `activeRouter/${this.activeRouterPage}`});
            },
            login(bln) {
                if (bln) {
                    sessionStorage.setItem('login', true);
                    this.loginStatus = true;
                } else {
                    sessionStorage.clear();
                    this.loginStatus = false;
                }
            },
            nextPage() {
                this.page < 4 ? this.page++ : this.page = 1;
            },
        }
    }
</script>

<style lang='less'>
    .index {
        .activeRouter {
            .el-input {
                width: 250px;
                margin-right: 20px;
            }
        }
        .next{
            position: absolute;
            right: 30px;
            top: 30px;
        }
    }
</style>
