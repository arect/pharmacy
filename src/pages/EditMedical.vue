<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <q-table
                title="详细信息"
                :rows="rows"
                :columns="columns"
                row-key="name"
                flat
            />
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
            medical: {
                id: this.$route.params.id,
                name: '冰毒',
                spec: '',
                price: 100,
                effective: '让人爽歪歪',
                producer: '张博清制毒局',
                produceDate: '2021-4-23',
                effectiveDate: '2022-4-22',
                remark: '张博清诚意制作，大师手工打造'
            },
            columns: [
                { name: 'name', label: '属性', sortable: false, align: 'left', field: 'name' },
                { name: 'value', label: '值', sortable: false, align: 'left', field: 'value' }
            ],
            rows: []
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
            produceDate: '2021-4-23',
            effectiveDate: '2022-4-22',
            remark: '张博清诚意制作，大师手工打造'
        }
        this.rows = [
            { name: '药品名称', value: this.medical.name },
            { name: 'spec', value: this.medical.spec },
            { name: '价格', value: this.medical.price },
            { name: '功效', value: this.medical.effective },
            { name: '厂商', value: this.medical.producer },
            { name: '生产日期', value: this.medical.produceDate },
            { name: '有效期', value: this.medical.effectiveDate },
            { name: '备注', value: this.medical.remark }
        ]
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        }
    }
}
</script>
