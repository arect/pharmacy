<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row justify-center">
                <q-card class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6" flat bordered>
                    <q-card-section class="bg-primary text-white">
                        <div class="text-h6">{{ medical.name }}的详细信息</div>
                    </q-card-section>
                    <q-list bordered class="rounded-borders">
                        <div v-for="item of rows" :key="item.id" >
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
                        <q-btn flat class="text-red">删除</q-btn>
                    </q-card-section>
                </q-card>
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
            rows: [
                { id: 'id', name: 'ID', type: 'number', editable: false },
                { id: 'name', name: '药品名称', type: 'text', editable: true },
                { id: 'spec', name: 'spec', type: 'text', editable: true },
                { id: 'price', name: '价格', type: 'number', editable: true },
                { id: 'effective', name: '功效', type: 'text', editable: true },
                { id: 'producer', name: '制造厂商', type: 'text', editable: true },
                { id: 'produceDate', name: '生产日期', type: 'date', editable: true },
                { id: 'effectiveDate', name: '有效期', type: 'date', editable: true },
                { id: 'remark', name: '备注', type: 'textarea', editable: true }
            ],
            isEditing: false
        }
    },
    beforeMount () {
        this.medical = {
            id: this.$route.params.id,
            name: '冰毒',
            spec: '',
            price: 100,
            effective: '让人爽歪歪',
            producer: '张博清制毒局',
            produceDate: '2021/04/23',
            effectiveDate: '2022/04/22',
            remark: '张博清诚意制作，大师手工打造'
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        },
        edit (s, i) {
            console.log(this.medical[i])
            this.isEditing = true
            setTimeout(() => {
                this.isEditing = false
                s.set()
            }, 500)
        }
    }
}
</script>
