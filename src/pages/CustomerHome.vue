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
                        <q-avatar size="100px" font-size="52px" color="primary" text-color="white" icon="self_improvement" />
                    </div>
                    <q-card-section>
                        <div class="text-h5 q-mt-sm q-mb-xs text-center">
                            {{ userInfo.name }}
                            <q-popup-edit v-model="userInfo.name" auto-save v-slot="scope">
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
                        <div class="text-overline text-orange-9 text-center">{{ authName }}</div>
                        <div class="text-body2 text-grey text-center">
                            <q-icon name="phone"/> : {{ userInfo.phoneNumber }}
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
                    <q-card-section>
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
                            <q-slide-item @left="onLeft" @right="onRight" left-color="green" right-color="red">
                                <template v-slot:left>
                                    <div class="row items-center">
                                        <q-icon left name="attach_money" /> 充值
                                    </div>
                                </template>
                                <template v-slot:right>
                                    <div class="row items-center">
                                        惊喜 <q-icon right name="card_giftcard" />
                                    </div>
                                </template>

                                <q-item class="bg-primary text-white">
                                    <q-item-section avatar>
                                        <q-icon color="white" name="account_balance_wallet" />
                                    </q-item-section>
                                    <q-item-section class="text-h5">{{ userInfo.balance }}</q-item-section>
                                </q-item>
                            </q-slide-item>
                        </div>
                    </q-slide-transition>
                </q-card>
            </div>
        </q-scroll-area>
    </q-page>
</template>

<script>
export default {
    name: 'CustomerHome',
    setup () {
        return {
            expanded: false
        }
    },
    data () {
        return {
            userInfo: {
                ID: 1,
                name: '长春理工大学',
                privilege: 3,
                balance: 100,
                phoneNumber: 10086,
                remark: '长春理工大学（Changchun University of Science and Technology），由吉林省、国家国防科技工业局、长春市共建，是一所以光电技术为特色，光、机、电、算、材相结合为优势，工、理、文、经、管、法、艺协调发展的多科性教学研究型大学；入选中西部高校基础能力建设工程、卓越工程师教育培养计划、高等学校学科创新引智计划、国家级大学生创新创业训练计划、特色重点学科项目、国家建设高水平大学公派研究生项目、新工科研究与实践项目、国家大学生文化素质教育基地、国家国际科技合作基地、中国政府奖学金来华留学生接收院校，为上海合作组织大学、中俄工科大学联盟、中俄综合性大学联盟、中国兵器协同创新联盟成员，享有“中国光学英才摇篮”的美誉。'
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
            switch (this.userInfo.privilege) {
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
        },
        onLeft ({ reset }) {
            this.userInfo.balance = this.userInfo.balance + 100
            setTimeout(() => {
                reset()
            }, 200)
        },
        onRight ({ reset }) {
            this.userInfo.balance = 0
            setTimeout(() => {
                reset()
            }, 200)
        }
    }
}
</script>
