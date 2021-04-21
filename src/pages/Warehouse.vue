<template>
    <q-page padding>
        <div v-for="c in list" :key="c.id">
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
                { title: '冰毒', introduction: '一种很好吃的毒品', id: '1' }
            ]
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

        },
        delete (id) {

        }
    }
}
</script>
<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 250px
</style>
