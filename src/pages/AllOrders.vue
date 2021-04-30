<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="q-col-gutter-y-md">
                <div class="row justify-center">
                    <div class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6">
                        <q-card flat bordered>
                            <q-card-section>
                                <div class="q-gutter-sm">
                                    <q-radio v-model="whichOrder" val="Order" label="进货表" />
                                    <q-radio v-model="whichOrder" val="Stock" label="库存表" />
                                    <q-radio v-model="whichOrder" val="Sale" label="销售表" />
                                </div>
                                <q-input v-model="searchContent" label="搜索内容" >
                                    <template v-slot:append>
                                        <q-btn-dropdown flat label="搜索何处">
                                            <q-list>
                                                <q-item clickable v-close-popup v-for="item of columns" @click="searchServer(item.name)" :key="item.name" >
                                                    <q-item-section>
                                                        <q-item-label>{{ item.label }}</q-item-label>
                                                    </q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-btn-dropdown>
                                    </template>
                                </q-input>
                            </q-card-section>
                            <q-linear-progress :indeterminate="isLoading" track-color="white" />
                        </q-card>
                    </div>
                </div>
                <div class="row justify-center">
                    <q-table
                        :rows="rows"
                        :columns="columns"
                        row-key="ID"
                        selection="multiple"
                        v-model:selected="selected"
                        flat
                        bordered
                        :pagination="{ rowsPerPage: 7 }"
                        class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6"
                    />
                </div>
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
            whichOrder: 'Order',
            searchContent: '',
            columns: [],
            rows: [],
            selected: [],
            isDeleting: false,
            isLoading: false
        }
    },
    beforeMount () {
        this.changeColumns('Order')
        this.rows = []
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
                    if (this.rows[i].ID === o.ID) {
                        this.rows.splice(i, 1)
                        i--
                    }
                }
            }
            this.selected = []
            this.isDeleting = false
        },
        searchServer (where) {
            this.isLoading = !this.isLoading
            // TODO this.row = [result]
        },
        changeColumns (str) {
            this.columns = []
            if (str === 'Order') {
                this.columns = [
                    { name: 'ID', label: '订单ID', field: 'ID' },
                    { name: 'medicineID', label: '药品ID', field: 'medicineID' },
                    { name: 'PD', label: '生产日期', field: 'PD' },
                    { name: 'EXP', label: '保质期', field: 'EXP' },
                    { name: 'price', label: '单价', field: 'price' },
                    { name: 'number', label: '数量', field: 'number' },
                    { name: 'dealerID', label: '入库人ID', field: 'dealerID' },
                    { name: 'orderDate', label: '下单日期', field: 'orderDate' },
                    { name: 'remark', label: '备注', field: 'remark' }
                ]
                this.rows = [
                    { ID: 1, medicineID: 1, PD: '2021/04/15', EXP: '2022/04/14', price: 10.5, number: 50, dealerID: 1, orderDate: '2021/04/16', remark: '刚生产的可新鲜了' },
                    { ID: 2, medicineID: 1, PD: '2021/04/15', EXP: '2022/04/14', price: 10.5, number: 10, dealerID: 2, orderDate: '2021/04/16', remark: '' },
                    { ID: 3, medicineID: 2, PD: '2021/01/20', EXP: '2022/01/19', price: 199, number: 18, dealerID: 2, orderDate: '2021/04/16', remark: '挺贵的' },
                    { ID: 4, medicineID: 3, PD: '2020/04/15', EXP: '2021/04/14', price: 5, number: 99, dealerID: 1, orderDate: '2021/04/16', remark: '没事还能吃' },
                    { ID: 5, medicineID: 3, PD: '2022/04/15', EXP: '2023/04/14', price: 0.5, number: 10, dealerID: 3, orderDate: '2021/04/16', remark: '未来科技' }
                ]
            } else if (str === 'Stock') {
                this.columns = [
                    { name: 'ID', label: '订单ID', field: 'ID' },
                    { name: 'medicineID', label: '药品ID', field: 'medicineID' },
                    { name: 'orderID', label: '进货表ID', field: 'orderID' },
                    { name: 'PD', label: '生产日期', field: 'PD' },
                    { name: 'EXP', label: '保质期', field: 'EXP' },
                    { name: 'number', label: '数量', field: 'number' },
                    { name: 'remark', label: '备注', field: 'remark' }
                ]
                this.rows = [
                    { ID: 1, medicineID: 1, orderID: 1, PD: '2021/04/15', EXP: '2022/04/14', number: 50, remark: '存了不少' },
                    { ID: 2, medicineID: 1, orderID: 1, PD: '2021/04/15', EXP: '2022/04/14', number: 10, remark: '' },
                    { ID: 3, medicineID: 2, orderID: 1, PD: '2021/01/20', EXP: '2022/01/19', number: 18, remark: '快没了' },
                    { ID: 4, medicineID: 3, orderID: 1, PD: '2020/04/15', EXP: '2021/04/14', number: 99, remark: '挺多的' }
                ]
            } else if (str === 'Sale') {
                this.columns = [
                    { name: 'ID', label: '订单ID', field: 'ID' },
                    { name: 'medicineID', label: '药品ID', field: 'medicineID' },
                    { name: 'customerID', label: '顾客ID', field: 'customerID' },
                    { name: 'number', label: '数量', field: 'number' },
                    { name: 'dealerID', label: '入库人ID', field: 'dealerID' },
                    { name: 'saleDate', label: '购买日期', field: 'saleDate' },
                    { name: 'remark', label: '备注', field: 'remark' }
                ]
                this.rows = [
                    { ID: 1, medicineID: 1, customerID: 1, saleDate: '2021/04/15', number: 1, dealerID: 1, remark: '刚买没多久' },
                    { ID: 2, medicineID: 2, customerID: 1, saleDate: '2021/04/15', number: 2, dealerID: 2, remark: '一起买的' },
                    { ID: 3, medicineID: 2, customerID: 1, saleDate: '2021/01/20', number: 8, dealerID: 2, remark: '买了挺多' },
                    { ID: 4, medicineID: 3, customerID: 1, saleDate: '2020/04/15', number: 1, dealerID: 6, remark: '' }
                ]
            }
        }
    }
}
</script>
