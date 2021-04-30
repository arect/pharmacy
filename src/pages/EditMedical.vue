<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row justify-center q-col-gutter-y-lg">
                <div class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6">
                    <q-card flat bordered>
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h6">{{ medical.name }}的详细信息</div>
                        </q-card-section>
                        <q-list bordered class="rounded-borders">
                            <div v-for="item of medicalRows" :key="item.id" >
                                <q-item clickable v-ripple class="row" >
                                    <div class="col-4">
                                        {{ item.name }}
                                    </div>
                                    <div class="col-8">
                                        {{ medical[item.id] }}
                                        <q-popup-edit v-model="medical[item.id]" auto-save v-slot="scope" :cover="false" v-if="item.editable" >
                                            <q-input
                                                v-model="scope.value"
                                                dense
                                                autofocus
                                                :hint="item.name"
                                                :disable="isEditing"
                                                :type="item.type"
                                                v-if="item.type !== 'date'"
                                            >
                                                <template v-slot:after>
                                                    <q-btn
                                                        flat dense color="negative" icon="close"
                                                        @click.stop="scope.cancel"
                                                        :disable="isEditing"
                                                    />
                                                    <q-btn
                                                        flat dense color="positive" icon="done"
                                                        @click.stop="edit(scope, item.id)"
                                                        :loading="isEditing"
                                                    />
                                                </template>
                                            </q-input>
                                            <q-date
                                                v-model="medical[item.id]"
                                                minimal
                                                flat
                                                v-else
                                            />
                                        </q-popup-edit>
                                    </div>
                                </q-item>
                            </div>
                        </q-list>
                        <q-card-section class="row justify-end">
                            <q-btn flat class="text-red" @click="deleteAll">删除</q-btn>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6" v-for="s of stock" :key="s.ID">
                    <q-slide-transition @hide="deleteStock(s.ID)">
                        <q-card flat bordered v-show="s.isShow">
                            <q-card-section>
                                <div class="text-body1">库存ID：{{ s.ID }}</div>
                            </q-card-section>
                            <q-list bordered class="rounded-borders">
                                <div v-for="item of stockRows" :key="item.id" >
                                    <q-item clickable v-ripple class="row" >
                                        <div class="col-4">
                                            {{ item.name }}
                                        </div>
                                        <div class="col-8">
                                            {{ s[item.id] }}
                                            <q-popup-edit v-model="s[item.id]" auto-save v-slot="scope" :cover="false" v-if="item.editable" >
                                                <q-input
                                                    v-model="scope.value"
                                                    dense
                                                    autofocus
                                                    :hint="item.name"
                                                    :disable="isEditing"
                                                    :type="item.type"
                                                    v-if="item.type !== 'date'"
                                                >
                                                    <template v-slot:after>
                                                        <q-btn
                                                            flat dense color="negative" icon="close"
                                                            @click.stop="scope.cancel"
                                                            :disable="isEditing"
                                                        />
                                                        <q-btn
                                                            flat dense color="positive" icon="done"
                                                            @click.stop="edit(scope, item.id, s.ID)"
                                                            :loading="isEditing"
                                                        />
                                                    </template>
                                                </q-input>
                                                <q-date
                                                    v-model="s[item.id]"
                                                    minimal
                                                    flat
                                                    v-else
                                                />
                                            </q-popup-edit>
                                        </div>
                                    </q-item>
                                </div>
                            </q-list>
                            <q-card-section class="row justify-end">
                                <q-btn flat class="text-red" @click="hideStock(s.ID)">删除</q-btn>
                            </q-card-section>
                        </q-card>
                    </q-slide-transition>
                </div>
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
export default {
    name: 'EditMedical',
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
            medical: {},
            stock: [],
            medicalRows: [
                { id: 'ID', name: 'ID', type: 'number', editable: false },
                { id: 'name', name: '药品名称', type: 'text', editable: true },
                { id: 'price', name: '价格', type: 'number', editable: true },
                { id: 'brand', name: '品牌', type: 'text', editable: true },
                { id: 'remark', name: '备注', type: 'textarea', editable: true }
            ],
            stockRows: [
                { id: 'medicineID', name: '药品ID', type: 'number', editable: false },
                { id: 'orderID', name: '订单ID', type: 'number', editable: false },
                { id: 'PD', name: '生产日期', type: 'date', editable: true },
                { id: 'EXP', name: '保质期', type: 'date', editable: true },
                { id: 'number', name: '库存量', type: 'number', editable: true },
                { id: 'remark', name: '备注', type: 'textarea', editable: true }
            ],
            isEditing: false
        }
    },
    beforeMount () {
        this.medical = {
            id: this.$route.params.id,
            name: '某药品',
            price: 100,
            brand: '张博清牌',
            remark: '张博清诚意制作，大师手工打造'
        }
        this.stock = [
            { ID: 1, medicineID: 1, orderID: 1, PD: '2021/04/26', EXP: '2022/04/25', number: 10, remark: '张博清自豪之作，大师级药品' },
            { ID: 2, medicineID: 1, orderID: 1, PD: '2021/02/26', EXP: '2022/02/25', number: 10, remark: '张博清自豪之作，大师级药品' },
            { ID: 3, medicineID: 1, orderID: 2, PD: '2021/04/26', EXP: '2022/04/25', number: 10, remark: '张博清自豪之作，大师级药品' },
            { ID: 4, medicineID: 1, orderID: 2, PD: '2021/04/26', EXP: '2022/04/25', number: 10, remark: '张博清自豪之作，大师级药品' },
            { ID: 5, medicineID: 1, orderID: 3, PD: '2020/04/26', EXP: '2022/04/25', number: 10, remark: '张博清自豪之作，大师级药品' },
            { ID: 6, medicineID: 1, orderID: 4, PD: '2021/04/26', EXP: '2022/04/25', number: 10, remark: '张博清自豪之作，大师级药品' },
            { ID: 7, medicineID: 1, orderID: 4, PD: '2022/04/26', EXP: '2025/04/25', number: 10, remark: '张博清金盆洗手最后一作，大师告别之作' },
            { ID: 8, medicineID: 1, orderID: 4, PD: '2021/04/26', EXP: '2022/04/25', number: 10, remark: '张博清自豪之作，大师级药品' }
        ]
        for (const s of this.stock) {
            s.isShow = true
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        },
        edit (s, i, t) {
            console.log(this.medical[i])
            this.isEditing = true
            setTimeout(() => {
                this.isEditing = false
                s.set()
            }, 500)
        },
        deleteAll () {
            this.stock = []
            this.medical = []
            this.medicalRows = []
            this.stockRows = []
        },
        hideStock (id) {
            for (let i = 0; i < this.stock.length; i++) {
                if (id === this.stock[i].ID) {
                    this.stock[i].isShow = false
                    break
                }
            }
        },
        deleteStock (id) {
            for (let i = 0; i < this.stock.length; i++) {
                if (id === this.stock[i].ID) {
                    this.stock.splice(i, 1)
                    break
                }
            }
        }
    }
}
</script>
