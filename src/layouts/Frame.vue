<template>
    <q-layout view="lHh Lpr lFf" class="rounded-borders">
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
        </q-header>
        <q-page-container >
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    name: 'Frame',
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
            show: true
        }
    },
    computed: {
        platform () {
            return process.env.MODE === 'electron'
        }
    }
}
</script>
