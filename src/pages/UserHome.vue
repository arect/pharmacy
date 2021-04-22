<template>
    <q-page padding :style-fn="myStyle">
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :visible="false"
            style="height: 100%"
        >
            <div class="row items-start justify-center">
                <div class="col"></div>
                <q-card class="my-card col-xs-10 col-sm-9 col-md-6 col-xl-4" flat bordered>
                    <div class="flex flex-center" style="height: 200px">
                        <q-img
                            src="https://www.jlu.edu.cn/images/big/jd-xhh.jpg"
                            style="height: 100px; width: 100px; border-radius: 50%"
                        />
                    </div>

                    <q-card-section>
                        <div class="text-overline text-orange-9">{{ userInfo.privilege }}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">
                            {{ userInfo.name }}
                            <q-popup-edit v-model="userInfo.name" auto-save v-slot="scope" :cover="false">
                                <q-input v-model="scope.value" dense autofocus hint="昵称" >
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
                            <q-card-section class="text-grey">
                                <div>
                                    电子邮件：{{ userInfo.mail }}<br />
                                    <q-popup-edit v-model="userInfo.mail" auto-save v-slot="scope">
                                        <q-input v-model="scope.value" dense autofocus hint="电子邮件" >
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
                                <div>
                                    电话号码：{{ userInfo.phoneNumber }}<br />
                                    <q-popup-edit v-model="userInfo.phoneNumber" auto-save v-slot="scope">
                                        <q-input v-model="scope.value" dense autofocus hint="电话号码" >
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
                                余额：{{ userInfo.surplus }}
                                <div v-for="i of testList" :key="i.title">
                                    {{ i.title }}：{{ i.value }}
                                    <q-popup-edit v-model="i.value" auto-save v-slot="scope" v-if="i.editable" :cover="false">
                                        <q-input v-model="scope.value" dense autofocus :hint="i.title" :disable="i.isLoading" >
                                            <template v-slot:after>
                                                <q-btn
                                                    flat dense color="negative" icon="close"
                                                    @click.stop="scope.cancel"
                                                    :disable="i.isLoading"
                                                />
                                                <q-btn
                                                    flat dense color="positive" icon="done"
                                                    @click.stop="editTestList(scope, i)"
                                                    :loading="i.isLoading"
                                                />
                                            </template>
                                        </q-input>
                                    </q-popup-edit>
                                </div>
                            </q-card-section>
                        </div>
                    </q-slide-transition>
                </q-card>
                <div class="col"></div>
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
                name: '吉林大学',
                password: '',
                privilege: '年费VIP-9',
                remark: '吉林大学（英语：Jilin University，缩写：JLU），简称吉大，位于中国吉林省长春市，是中国共产党亲手创建的第一所综合性高等学府，是中华人民共和国教育部直属的全国重点大学，中国东北地区重点建设的一所综合性大学，中国211工程、985工程高校之一，位列中国“双一流”大学计划世界一流大学（A类），同时也是国家首批“珠峰计划”、“111计划”、“卓越计划”和“2011计划”重点建设的名牌大学。2021年QS世界大学排名中，吉林大学列世界第493名（中国大陆地区排名第18名）。多年来，吉大为国家培养了大批优秀的高素质人才，取得了许多重大的高水准科研成果，是中国基础科学研究和高层次人才培养的重要基地之一。主要院系有法学院，考古学院，车辆工程学院，数学学院和化学学院等。',
                phoneNumber: '10086',
                mail: 'admin@jlu.edu.cn',
                surplus: '1000',
                salt: ''
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
            testList: [
                { title: '测试项目1', value: '测试内容1', editable: true, isLoading: false },
                { title: '测试项目2', value: '测试内容2', editable: true, isLoading: false },
                { title: '测试项目3', value: '测试内容3', editable: false, isLoading: false },
                { title: '测试项目4', value: '测试内容4', editable: true, isLoading: false }
            ]
        }
    },
    methods: {
        myStyle (offset) {
            return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' }
        },
        editTestList (s, i) {
            i.isLoading = true
            setTimeout(() => {
                i.isLoading = false
                s.set()
            }, 3000)
        }
    }
}
</script>
