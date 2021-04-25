<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row justify-center">
                <q-table
                    :title="tableName"
                    :rows="rows"
                    :columns="columns"
                    row-key="orderId"
                    selection="multiple"
                    v-model:selected="selected"
                    flat
                    bordered
                    :pagination="{ rowsPerPage: 7 }"
                    class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6"
                />
            </div>
            <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
            >
                <div class="row justify-center" v-show="isSelected">
                    <q-card class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6" flat>
                        <q-card-section class="row justify-end">
                            <q-btn flat class="text-red" :loading="isDeleting" @click="deleteOrders">删除</q-btn>
                        </q-card-section>
                    </q-card>
                </div>
            </transition>
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
            tableName: '进货单',
            columns: [],
            rows: [],
            selected: [],
            isDeleting: false
        }
    },
    beforeMount () {
        this.columns = [
            { name: 'orderId', label: '订单ID', field: 'orderId' },
            { name: 'medicineId', label: '药品ID', field: 'medicineId' },
            { name: 'medicineName', label: '药品名称', field: 'medicineName' },
            { name: 'importPrice', label: '进货价格', field: 'importPrice' },
            { name: 'number', label: '进货数量', field: 'number' },
            { name: 'importDate', label: '进货日期', field: 'importDate' },
            { name: 'dealerId', label: '入库人ID', field: 'dealerId' },
            { name: 'remark', label: '备注', field: 'remark' }
        ]
        this.rows = [
            { orderId: '1', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '2', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '3', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '4', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '5', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '6', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '7', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '8', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '9', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '10', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '11', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '12', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '13', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '14', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '15', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '16', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '17', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '18', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '19', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '20', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '21', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '22', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' },
            { orderId: '23', medicineId: '1', medicineName: '冰毒', importPrice: 100, number: 100, importDate: '2021/04/24', dealerId: 'zbq', remark: '阿巴阿巴阿巴' }
        ]
    },
    computed: {
        isSelected () {
            return this.selected.length !== 0
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        },
        deleteOrders () {
            this.isDeleting = true
            for (const o of this.selected) {
                for (let i = 0; i < this.rows.length; i++) {
                    if (this.rows[i].orderId === o.orderId) {
                        this.rows.splice(i, 1)
                        i--
                    }
                }
            }
            this.selected = []
            this.isDeleting = false
        }
    }
}
</script>
