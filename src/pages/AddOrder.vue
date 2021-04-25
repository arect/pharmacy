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
                    <q-card-section class="bg-primary text-white">
                        <div class="text-h6">添加订单</div>
                    </q-card-section>
                    <q-card-section>
                        <div v-for="item of order" :key="item.id">
                            <q-input v-if="item.editable" bottom-slots v-model="item[item.id]" :label="item.name" :type="item.type" />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
export default {
    name: 'AllOrders',
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
            order: [
                { orderId: 0, id: 'orderId', name: '订单ID', editable: false, type: 'number' },
                { medicineId: 0, id: 'medicineId', name: '药品ID', editable: false, type: 'number' },
                { medicineName: '', id: 'medicineName', name: '药品名称', editable: true, type: 'text' },
                { importPrice: 0, id: 'importPrice', name: '进货价', editable: true, type: 'number' },
                { number: 0, id: 'number', name: '数量', editable: true, type: 'number' },
                { importData: '', id: 'importData', name: '入库时间', editable: true, type: 'date' },
                { dealerId: 0, id: 'dealerId', name: '入库人ID', editable: true, type: 'number' },
                { remark: '', id: 'remark', name: '备注', editable: true, type: 'textarea' }
            ]
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        }
    }
}
</script>
