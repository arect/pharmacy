<template>
    <q-page class="flex flex-center">
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
            <q-avatar size="300px" font-size="200px" color="white" text-color="grey-3" :icon="randomIcon" v-if="show" @click="reset"/>
            <q-avatar size="300px" font-size="200px" color="white" text-color="grey-3" :icon="randomIcon" v-else @click="reset"/>
        </transition>
    </q-page>
</template>

<script>
export default {
    name: 'Settings',
    data () {
        return {
            icons: [
                'favorite_border', 'work_outline', 'smart_button', 'notifications_none', 'flag',
                'rss_feed', 'filter_drama', 'moped', 'beach_access', 'history_edu'
            ],
            randomIcon: '',
            show: true,
            timer: null
        }
    },
    methods: {
        setTimer () {
            if (this.timer == null) {
                this.timer = setInterval(() => {
                    this.randomIcon = this.icons[Math.floor(Math.random() * this.icons.length)]
                    this.show = !this.show
                }, 5000)
            }
        },
        reset () {
            this.randomIcon = this.icons[Math.floor(Math.random() * 10)]
            this.show = !this.show
            clearInterval(this.timer)
            this.timer = null
            this.setTimer()
        }
    },
    mounted () {
        this.randomIcon = this.icons[Math.floor(Math.random() * 10)]
        clearInterval(this.timer)
        this.timer = null
        this.setTimer()
    },
    unmounted () {
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>
