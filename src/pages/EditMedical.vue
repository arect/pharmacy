<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            没做
            {{ medical.id }}
        </q-scroll-area>
    </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
    name: 'EditMedical',
    data () {
        return {
            m: 'test',
            thumbStyle: {
                right: '4px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            },
            barStyle: {
                right: '2px',
                borderRadius: '9px',
                backgroundColor: '#027be3',
                width: '9px',
                opacity: 0.2
            },
            medical: {
                title: 'title',
                introduction: '如果你看到这句话，说明没有联网',
                id: this.$route.params.id,
                sum: 0,
                price: 0
            }
        }
    },
    beforeCreate () {
        api.get('/test/loginsuccess.php')
        .then((response) => {
            this.m = response.data
        })
        .catch()
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        }
    }
}
</script>
