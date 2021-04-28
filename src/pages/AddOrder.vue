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
                        <div class="text-h6">添加{{ tableName }}</div>
                        <div class="q-gutter-sm">
                            <q-radio v-model="table" val="Order" label="进货表" />
                            <q-radio v-model="table" val="Stock" label="库存表" />
                            <q-radio v-model="table" val="Sale" label="销售表" />
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div v-for="item of columns" :key="item.name">
                            <div v-if="item.type === 'date'">
                                <q-input :disable="!item.editable" bottom-slots v-model="item.value" :label="item.label" mask="date" :rules="[val => isValidation(val)]">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                <q-date v-model="item.value">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div v-else-if="item.type === 'textarea'">
                                <q-input :disable="!item.editable" bottom-slots v-model="item.value" :label="item.label" type="textarea" />
                            </div>
                            <div v-else-if="item.type === 'id'">
                                <q-select
                                    v-model="item.value"
                                    use-input
                                    input-debounce="0"
                                    :label="item.label"
                                    :options="activeIdOptions(item.name)"
                                    @filter="filterFn"
                                    behavior="dialog"
                                    :rules="[val => (val !== '' && val !== null) || '不能为空']"
                                >
                                    <template v-slot:option="scope">
                                        <q-item v-bind="scope.itemProps">
                                            <q-item-section avatar>
                                                <q-avatar color="primary" text-color="white">{{ scope.opt.label[0] }}</q-avatar>
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                                                <q-item-label caption>{{ scope.opt.value }}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                    <template v-slot:no-option>
                                        <q-item>
                                            <q-item-section class="text-grey">
                                                未查找到匹配项
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
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
    name: 'AddOrder',
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
            columns: [],
            table: 'Order',
            medicineIDConst: [],
            dealerIDConst: [],
            orderIDConst: [],
            customerIDConst: [],
            medicineID: [],
            dealerID: [],
            orderID: [],
            customerID: []
        }
    },
    beforeMount () {
        this.changeColumns('Order')
        this.medicineIDConst = [
            { label: '冰毒', value: 1111111 }
        ]
        this.dealerIDConst = [
            { label: '张博清', value: 12345678901 },
            { label: '张博清2', value: 12345678902 },
            { label: '2张博清', value: 12345678903 }
        ]
        this.orderIDConst = [
            { label: 'test', value: 111 }
        ]
        this.customerIDConst = [
            { label: '张博清', value: 12345678901 },
            { label: '张博清2', value: 12345678902 },
            { label: '2张博清', value: 12345678903 }
        ]
        this.medicineID = this.medicineIDConst
        this.dealerID = this.dealerIDConst
        this.orderID = this.orderIDConst
        this.customerID = this.customerIDConst
    },
    computed: {
        tableName () {
            this.changeColumns(this.table)
            switch (this.table) {
                case 'Order': return '进货单'
                case 'Stock': return '库存单'
                case 'Sale': return '销售单'
                default: return '偷税单'
            }
        },
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
        changeColumns (str) {
            this.columns = []
            if (str === 'Order') {
                this.columns = [
                    { name: 'ID', label: '订单ID', value: '自动设定', editable: false, type: 'text' },
                    { name: 'medicineID', label: '药品', value: '', editable: true, type: 'id' },
                    { name: 'PD', label: '生产日期', value: '', editable: true, type: 'date' },
                    { name: 'EXP', label: '保质期', value: '', editable: true, type: 'date' },
                    { name: 'price', label: '单价', value: 0, editable: true, type: 'number' },
                    { name: 'number', label: '数量', value: 0, editable: true, type: 'number' },
                    { name: 'dealerID', label: '入库人', value: '', editable: true, type: 'id' },
                    { name: 'orderDate', label: '下单日期', value: '', editable: true, type: 'date' },
                    { name: 'remark', label: '备注', value: '', editable: true, type: 'textarea' }
                ]
            } else if (str === 'Stock') {
                this.columns = [
                    { name: 'ID', label: '订单ID', value: '自动设定', editable: false, type: 'text' },
                    { name: 'medicineID', label: '药品', value: '', editable: true, type: 'id' },
                    { name: 'orderID', label: '进货表ID', value: '', editable: true, type: 'id' },
                    { name: 'PD', label: '生产日期', value: '', editable: true, type: 'date' },
                    { name: 'EXP', label: '保质期', value: '', editable: true, type: 'date' },
                    { name: 'number', label: '数量', value: 0, editable: true, type: 'number' },
                    { name: 'remark', label: '备注', value: '', editable: true, type: 'textarea' }
                ]
            } else if (str === 'Sale') {
                this.columns = [
                    { name: 'ID', label: '订单ID', value: '自动设定', editable: false, type: 'text' },
                    { name: 'medicineID', label: '药品', value: '', editable: true, type: 'id' },
                    { name: 'customerID', label: '顾客', value: '', editable: true, type: 'id' },
                    { name: 'number', label: '数量', value: 0, editable: true, type: 'number' },
                    { name: 'dealerID', label: '入库人', value: '', editable: true, type: 'id' },
                    { name: 'saleDate', label: '购买日期', value: '', editable: true, type: 'date' },
                    { name: 'remark', label: '备注', value: '', editable: true, type: 'textarea' }
                ]
            }
        },
        isValidation (val) {
            if (val === '') {
                return '日期不能为空'
            }
            if (!/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(val)) {
                return '日期格式错误'
            }
            return true
        },
        activeIdOptions (which) {
            switch (which) {
                case 'medicineID': return this.medicineID
                case 'dealerID': return this.dealerID
                case 'orderID': return this.orderID
                case 'customerID': return this.customerID
            }
        },
        filterFn (val, update) {
            if (val === '') {
                update(() => {
                    this.medicineID = this.medicineIDConst
                    this.dealerID = this.dealerIDConst
                    this.orderID = this.orderIDConst
                    this.customerID = this.customerIDConst
                })
                return
            }
            update(() => {
                this.medicineID = this.medicineIDConst.filter(v => v.label.indexOf(val) > -1)
                this.dealerID = this.dealerIDConst.filter(v => v.label.indexOf(val) > -1)
                this.orderID = this.orderIDConst.filter(v => v.label.indexOf(val) > -1)
                this.customerID = this.customerIDConst.filter(v => v.label.indexOf(val) > -1)
            })
        },
        submit () {
            console.log(this.columns)
        }
    }
}
</script>
