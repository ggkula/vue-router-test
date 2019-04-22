import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
const Index = () => import('@/pages/index.vue');
const ActiveRouter = () => import('@/pages/activeRouter.vue');
const PropsRouter = () => import('@/pages/propsRouter.vue');
const GuardRouter = () => import('@/pages/guardRouter.vue');

function dynamicPropsFn(route) {
    const now = new Date()
    return {
        name: (now.getFullYear() + parseInt(route.params.years)) + '!'
    }
}

const router =  new VueRouter({
    routes: [
        {
            path: "",
            name: 'index',
            component: Index,
            children: [
                {
                    path: '/hello/:name',
                    component: PropsRouter,
                    props: true
                }, // Pass route.params to props
                {
                    path: '/static',
                    component: PropsRouter,
                    props: {name: 'world'}
                }, // static values
                {
                    path: '/dynamic/:years',
                    component: PropsRouter,
                    props: dynamicPropsFn
                }, // custom logic for mapping between route and props
                {
                    path: '/attrs',
                    component: PropsRouter,
                    props: {name: 'attrs'}
                }]
        },
        {
            path: "/activeRouter/:id",
            name: 'activeRouter',
            component: ActiveRouter,
        },
        {
            path: '/guardRouter',
            name: 'guardRouter',
            component: GuardRouter,
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = sessionStorage.getItem('login');
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth) {
            alert('请登录');
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
});

export default router;
