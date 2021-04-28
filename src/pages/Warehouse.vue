<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row q-col-gutter-md">
                <div v-for="c in list" :key="c.id" class="col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2">
                    <q-card flat bordered class="my-card">
                        <q-card-section>
                            <div class="text-h6">{{ c.name }}</div>
                            <div class="text-subtitle2 text-italic">{{ c.brand }}</div>
                            {{ c.remark }}
                        </q-card-section>
                        <q-separator dark />
                        <q-card-actions>
                            <q-btn flat @click="editItem(c.id)" class="text-primary">编辑</q-btn>
                            <q-btn flat @click="deleteItem(c.id)" class="text-red">删除</q-btn>
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
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 1 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 2 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 3 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 4 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 5 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 6 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 7 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 7 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 9 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 10 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 11 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 12 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 13 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 14 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 15 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 16 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 17 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 18 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 19 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 20 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 21 },
                { name: '冰毒', brand: '张博清牌', remark: '一种很好吃的毒品', id: 22 }
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
        editItem (id) {
            this.$router.push('/edit-medical/' + id)
        },
        deleteItem (id) {
            api.get('/test/loginsuccess.php')
            .then((response) => {
                this.m = response.data
            })
            .catch()
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === id) {
                    this.list.splice(i, 1)
                    break
                }
            }
        },
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        }
    }
}
</script>
