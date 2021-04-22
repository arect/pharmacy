<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row q-col-gutter-md">
                <div v-for="c in list" :key="c.id" class="col-xs-6 col-sm-4 col-md-3 col-xl-2">
                    <q-card flat bordered class="my-card">
                        <q-card-section>
                            <div class="text-h6">{{ c.title }}</div>
                        </q-card-section>

                        <q-card-section>
                            {{ c.introduction }}
                        </q-card-section>

                        <q-separator dark />

                        <q-card-actions>
                            <q-btn flat @click="edit(c.id)">编辑</q-btn>
                            <q-btn flat @click="delete(c.id)">删除</q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
    name: 'Warehouse',
    data () {
        return {
            m: 'test',
            list: [
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' },
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' }
            ],
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
        edit (id) {
            this.$router.push('/edit-medical/' + id)
        },
        delete (id) {
            api.get('/test/loginsuccess.php')
            .then((response) => {
                this.m = response.data
            })
            .catch()
        },
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        }
    }
}
</script>
