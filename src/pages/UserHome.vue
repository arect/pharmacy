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
                    <div class="flex flex-center" style="height: 200px">
                        <q-avatar size="100px" font-size="52px" color="primary" text-color="white" icon="person" />
                    </div>
                    <q-card-section>
                        <div class="text-overline text-orange-9">{{ authName }}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">
                            {{ userInfo.name }}
                            <q-popup-edit v-model="userInfo.name" auto-save v-slot="scope" :cover="false">
                                <q-input v-model="scope.value" dense autofocus hint="姓名" >
                                    <template v-slot:after>
                                        <q-btn
                                            flat dense color="negative" icon="close"
                                            @click.stop="scope.cancel"
                                        />
                                        <q-btn
                                            flat dense color="positive" icon="done"
                                            @click.stop="scope.set"
                                        />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </div>
                        <div class="text-caption text-grey">
                            {{ userInfo.remark }}
                            <q-popup-edit v-model="userInfo.remark" auto-save v-slot="scope">
                                <q-input v-model="scope.value" dense autofocus hint="备注" type="textarea" :disable="isLoading" >
                                    <template v-slot:after>
                                        <q-btn
                                            flat dense color="negative" icon="close"
                                            @click.stop="scope.cancel"
                                            :disable="isLoading"
                                        />
                                        <q-btn
                                            flat dense color="positive" icon="done"
                                            @click.stop="editInfo(scope, 'remark')"
                                            :loading="isLoading"
                                        />
                                    </template>
                                </q-input>
                            </q-popup-edit>
                        </div>
                    </q-card-section>

                    <q-card-actions>
                        <q-space />
                        <q-btn
                            color="grey"
                            round
                            flat
                            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                            @click="expanded = !expanded"
                        />
                    </q-card-actions>

                    <q-slide-transition>
                        <div v-show="expanded">
                            <q-separator />
                            <q-card-section class="text-body1 text-grey">
                                <div>
                                    电子邮件：{{ userInfo.mail }}<br />
                                    <q-popup-edit v-model="userInfo.mail" auto-save v-slot="scope">
                                        <q-input v-model="scope.value" dense autofocus hint="电子邮件" :disable="isLoading">
                                            <template v-slot:after>
                                                <q-btn
                                                    flat dense color="negative" icon="close"
                                                    @click.stop="scope.cancel"
                                                    :disable="isLoading"
                                                />
                                                <q-btn
                                                    flat dense color="positive" icon="done"
                                                    @click.stop="editInfo(scope, 'mail')"
                                                    :loading="isLoading"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                                <div>
                                    电话号码：{{ userInfo.phoneNumber }}<br />
                                    <q-popup-edit v-model="userInfo.phoneNumber" auto-save v-slot="scope">
                                        <q-input v-model="scope.value" dense autofocus hint="电话号码" type="tel" :disable="isLoading">
                                            <template v-slot:after>
                                                <q-btn
                                                    flat dense color="negative" icon="close"
                                                    @click.stop="scope.cancel"
                                                    :disable="isLoading"
                                                />
                                                <q-btn
                                                    flat dense color="positive" icon="done"
                                                    @click.stop="editInfo(scope, 'phoneNumber')"
                                                    :loading="isLoading"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-card-section>
                        </div>
                    </q-slide-transition>
                </q-card>
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'UserHome',
    setup () {
        return {
            expanded: ref(false)
        }
    },
    data () {
        return {
            userInfo: {
                ID: 1,
                name: '吉林大学',
                password: '',
                authority: 1,
                phoneNumber: 10086,
                mail: 'admin@jlu.edu.cn',
                salt: '',
                remark: '吉林大学（英语：Jilin University，缩写：JLU），简称吉大，位于中国吉林省长春市，是中国共产党亲手创建的第一所综合性高等学府，是中华人民共和国教育部直属的全国重点大学，中国东北地区重点建设的一所综合性大学，中国211工程、985工程高校之一，位列中国“双一流”大学计划世界一流大学（A类），同时也是国家首批“珠峰计划”、“111计划”、“卓越计划”和“2011计划”重点建设的名牌大学。2021年QS世界大学排名中，吉林大学列世界第493名（中国大陆地区排名第18名）。多年来，吉大为国家培养了大批优秀的高素质人才，取得了许多重大的高水准科研成果，是中国基础科学研究和高层次人才培养的重要基地之一。主要院系有法学院，考古学院，车辆工程学院，数学学院和化学学院等。'
            },
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
            isLoading: false
        }
    },
    computed: {
        authName () {
            switch (this.userInfo.authority) {
                case 1: return 'BIG BROTHER'
                case 2: return '普通员工'
                case 3: return 'D级人员'
                default: return '游客'
            }
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        },
        editInfo (s, i) {
            this.isLoading = true
            // TODO Edit the contents
            setTimeout(() => {
                s.set()
                this.isLoading = false
            }, 1000)
        }
    }
}
</script>
