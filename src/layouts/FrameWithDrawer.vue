<template>
    <q-layout view="hHh Lpr lff" class="rounded-borders">
        <q-header elevated>
            <q-bar :class="{ 'q-electron-drag': platform }" v-if="platform" >
                <q-icon name="medical_services" />
                <div>药店</div>
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
                    <div class="row items-center" v-else >
                        <q-icon name="flag" />
                        &ensp;
                        <div>未连接到互联网</div>
                    </div>
                </transition>
            </q-bar>
            <q-toolbar>
                <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                <q-toolbar-title>{{ activeItem }}</q-toolbar-title>
                <q-space />
                <q-btn flat @click="back()" round icon="arrow_back"  />
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="drawer"
            :width="200"
            :breakpoint="1000"
            overlay
            bordered
            class="bg-grey-3"
        >
            <q-scroll-area class="fit">
                <q-list>
                    <template v-for="(menuItem, index) in menuList" :key="index">
                        <q-item clickable :active="menuItem.label === activeItem" v-ripple @click="activeItem = menuItem.label" >
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

        return { minimize, toggleMaximize, closeApp }
    },
    data () {
        return {
            drawer: false,
            menuList,
            activeItem: '主页',
            show: true
        }
    },
    computed: {
        platform () {
            return process.env.MODE === 'electron'
        }
    },
    watch: {
        activeItem (newActiveItem, oldActiveItem) {
            for (const item of menuList) {
                if (item.label === newActiveItem) {
                    this.$router.push(item.link)
                }
            }
        }
    },
    methods: {
        back () {
            this.$router.back()
        }
    }
}
</script>
<style lang="sass" scoped>
.menu-list .q-item
    border-radius: 0 32px 32px 0
</style>
