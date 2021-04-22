<template>
    <q-layout view="hHh Lpr lff" class="rounded-borders">
        <q-header elevated>
            <q-bar :class="{ 'q-electron-drag': platform }" v-if="platform" >
                <transition
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in"
                >
                    <div class="row items-center" v-if="show" >
                        <q-icon name="medical_services" />
                        &ensp;
                        <div>药店</div>
                    </div>
                    <div class="row items-center text-red-11" v-else >
                        <q-icon name="flag" />
                        &ensp;
                        <div>在这里设置警告</div>
                    </div>
                </transition>
                <q-space />
                <q-btn dense flat icon="minimize" @click="minimize" />
                <q-btn dense flat icon="crop_square" @click="toggleMaximize" />
                <q-btn dense flat icon="close" @click="closeApp" />
            </q-bar>
            <q-bar class="justify-center" v-else >
                <transition
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in"
                >
                    <div class="row items-center" v-if="show" >
                        <q-icon name="medical_services" />
                        &ensp;
                        <div>药店</div>
                    </div>
                    <div class="row items-center text-red-11" v-else >
                        <q-icon name="flag" />
                        &ensp;
                        <div>在这里设置警告</div>
                    </div>
                </transition>
            </q-bar>
            <q-toolbar>
                <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                <q-toolbar-title>{{ activeItem }}</q-toolbar-title>
                <q-space />
                <q-btn flat @click="back()" round icon="arrow_back"  />
                <q-btn flat @click="show = !show" round icon="visibility"  />
                <q-btn flat round icon="help_outline">
                    <q-popup-proxy >
                        <q-banner>
                            <div v-for="i of myInfo" :key="i.value">
                                {{ i.title }}：{{ i.value }}
                            </div>
                        </q-banner>
                    </q-popup-proxy>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="drawer"
            :width="300"
            :breakpoint="1000"
            overlay
            bordered
            class="bg-grey-3 q-electron-drag--exception"
        >
            <q-scroll-area class="fit">
                <q-list>
                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable :active="menuItem.label === activeItem" v-ripple @click="changeTab(menuItem.label)" >
                            <q-item-section avatar>
                                <q-icon :name="menuItem.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ menuItem.label }}
                            </q-item-section>
                        </q-item>
                        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
                    </template>
                </q-list>
            </q-scroll-area>
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
const menuList = [
    { icon: 'medical_services', label: '全部药品', separator: false, link: 'all' },
    { icon: 'person', label: '我的页面', separator: false, link: 'user-home' },
    { icon: 'settings', label: '设置', separator: false, link: 'settings' }
]
export default {
    name: 'FrameWithDrawer',
    setup () {
        function minimize () {
            if (process.env.MODE === 'electron') {
                window.windowEvent.minimize()
            }
        }

        function toggleMaximize () {
            if (process.env.MODE === 'electron') {
                window.windowEvent.toggleMaximize()
            }
        }

        function closeApp () {
            if (process.env.MODE === 'electron') {
                window.windowEvent.close()
            }
        }

        return {
            minimize,
            toggleMaximize,
            closeApp
        }
    },
    data () {
        return {
            drawer: false,
            menuList,
            activeItem: '主页',
            show: true,
            timestamp: '暂停'
        }
    },
    computed: {
        platform () {
            return process.env.MODE === 'electron'
        },
        myInfo () {
            return [
                { title: '用户名', value: this.$store.state.myToken.username },
                { title: 'token', value: this.$store.state.myToken.token },
                { title: '时间戳', value: this.timestamp }
            ]
        }
    },
    /*
    mounted () {
        this.timer = setInterval(() => {
            this.timestamp = (new Date()).valueOf() / 1000
        }, 1000)
    },
    beforeUnmount () {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },

     */
    methods: {
        back () {
            this.$router.back()
        },
        changeTab (t) {
            this.activeItem = t
            for (const item of menuList) {
                if (item.label === t) {
                    this.$router.push('/' + item.link)
                }
            }
        }
    }
}
</script>
<style lang="sass" scoped>
.menu-list .q-item
    border-radius: 0 32px 32px 0
</style>
