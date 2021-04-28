<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row justify-center">
                <q-card class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6" flat bordered >
                    <q-card-section>
                        <div class="text-h6">添加药品</div>
                    </q-card-section>
                    <q-card-section>
                        <div v-for="item of columns" :key="item.name">
                            <div v-if="item.type === 'textarea'">
                                <q-input :disable="!item.editable" bottom-slots v-model="item.value" :label="item.label" type="textarea" />
                            </div>
                            <div v-else>
                                <q-input :disable="!item.editable" bottom-slots v-model="item.value" :label="item.label" :type="item.type" :rules="[val => val !== '' || '不能为空']" />
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="row justify-end">
                        <q-btn flat :class="{ 'text-primary': canSubmit, 'text-red': !canSubmit }" @click="submit" :disable="!canSubmit">提交</q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
export default {
    name: 'AddMedical',
    data () {
        return {
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
            columns: [
                { name: 'ID', label: '订单ID', value: '自动设定', editable: false, type: 'text' },
                { name: 'name', label: '药品名称', value: '', editable: true, type: 'text' },
                { name: 'price', label: '单价', value: 0, editable: true, type: 'number' },
                { name: 'brand', label: '品牌', value: '', editable: true, type: 'text' },
                { name: 'remark', label: '备注', value: '', editable: true, type: 'textarea' }
            ]
        }
    },
    computed: {
        canSubmit () {
            for (const i of this.columns) {
                if (i.name !== 'remark' && (i.value === '' || i.value === null)) {
                    return false
                }
            }
            return true
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        },
        submit () {}
    }
}
</script>
