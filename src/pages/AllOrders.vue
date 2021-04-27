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
                                        <q-btn round flat icon="search" @click="searchServer" />
                                        <q-btn-dropdown flat label="搜索全部">
                                            <q-list>
                                                <q-btn flat icon="search" @click="searchServer" />
                                                <q-item clickable v-close-popup @click="onItemClick">
                                                    <q-item-section>
                                                        <q-item-label>Photos</q-item-label>
                                                    </q-item-section>
                                                </q-item>

                                                <q-item clickable v-close-popup @click="onItemClick">
                                                    <q-item-section>
                                                        <q-item-label>Videos</q-item-label>
                                                    </q-item-section>
                                                </q-item>

                                                <q-item clickable v-close-popup @click="onItemClick">
                                                    <q-item-section>
                                                        <q-item-label>Articles</q-item-label>
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
        this.columns = [
            { name: 'ID', label: '订单ID', field: 'ID' },
            { name: 'medicineId', label: '药品ID', field: 'medicineId' },
            { name: 'medicineName', label: '药品名称', field: 'medicineName' },
            { name: 'importPrice', label: '进货价格', field: 'importPrice' },
            { name: 'number', label: '进货数量', field: 'number' },
            { name: 'importDate', label: '进货日期', field: 'importDate' },
            { name: 'dealerId', label: '入库人ID', field: 'dealerId' },
            { name: 'remark', label: '备注', field: 'remark' }
        ]
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
                    if (this.rows[i].orderId === o.orderId) {
                        this.rows.splice(i, 1)
                        i--
                    }
                }
            }
            this.selected = []
            this.isDeleting = false
        },
        searchServer () {
            this.isLoading = !this.isLoading
            // TODO
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
            }
        }
    }
}
</script>
