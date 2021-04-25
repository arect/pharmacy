<template>
    <div class="q-pa-md row" >
        <div class="col"></div>
        <div class="col-xs-11 col-sm-10 col-md-9 col-lg-7 col-xl-6">
            <q-card flat bordered class="my-card">
                <q-card-section style="text-align: center">
                    <div class="text-h6">开始</div>
                </q-card-section>

                <q-tabs v-model="tab" class="text-primary" align="justify">
                    <q-tab label="登录" name="one" />
                    <q-tab label="注册" name="two" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="one">
                        <q-input bottom-slots v-model="username" label="用户名" type="text" >
                            <template v-slot:append>
                                <q-icon
                                    :name="username === '' ? '' : 'close'"
                                    class="cursor-pointer"
                                    @click="username = ''"
                                />
                            </template>
                        </q-input>
                        <q-input bottom-slots v-model="password" label="密码" :type="isPwd ? 'password' : 'text'">
                            <template v-slot:append>
                                <q-icon
                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                    class="cursor-pointer"
                                    @click="isPwd = !isPwd"
                                />
                            </template>
                        </q-input>
                        <div class="row justify-end">
                            <q-btn flat color="primary"  label="登录" class="col-2" @click="login"/>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="two">
                        <q-stepper
                            v-model="step"
                            vertical
                            color="primary"
                            class="no-shadow"
                            animated
                        >
                            <q-step
                                :name="1"
                                title="选择你的身份"
                                icon="fingerprint"
                                :done="step > 1"
                                :header-nav="step > 1"
                            >
                                <q-select v-model="identity" :options="identityOptions" label="身份" />
                                <q-stepper-navigation>
                                    <q-btn flat color="primary" label="继续" @click="() => { done1 = true; step = 2 }" :disable="identity === ''" />
                                </q-stepper-navigation>
                            </q-step>
                            <q-step
                                :name="2"
                                title="输入用户名"
                                icon="person"
                                :done="step > 2"
                                :header-nav="step > 2"
                            >
                                <q-input bottom-slots v-model="usernameSignUp" label="用户名" type="text" >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="usernameSignUp === '' ? '' : 'close'"
                                            class="cursor-pointer"
                                            @click="usernameSignUp = ''"
                                        />
                                    </template>
                                </q-input>
                                <q-stepper-navigation>
                                    <q-btn flat color="primary" label="继续" @click="() => { done2 = true; step = 3 }" :disable="usernameSignUp === ''" />
                                    <q-btn flat color="blue-grey" label="上一项" @click="step = 1"  />
                                </q-stepper-navigation>
                            </q-step>
                            <q-step
                                :name="3"
                                title="输入邮箱"
                                icon="mail"
                                :done="step > 3"
                                :header-nav="step > 3"
                            >
                                <q-input bottom-slots v-model="emailSignUp" label="电子邮箱" type="email" >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="emailSignUp === '' ? '' : 'close'"
                                            class="cursor-pointer"
                                            @click="emailSignUp = ''"
                                        />
                                    </template>
                                </q-input>
                                <q-stepper-navigation>
                                    <q-btn flat color="primary" label="继续" @click="() => { done3 = true; step = 4 }" :disable="emailSignUp === ''" />
                                    <q-btn flat color="blue-grey" label="上一项" @click="step = 2"  />
                                </q-stepper-navigation>
                            </q-step>
                            <q-step
                                :name="4"
                                title="输入电话号码"
                                icon="phone"
                                :done="step > 4"
                                :header-nav="step > 4"
                            >
                                <q-input bottom-slots v-model="phoneSignUp" label="电话号码" type="tel" >
                                    <template v-slot:append>
                                        <q-icon
                                            :name="phoneSignUp === '' ? '' : 'close'"
                                            class="cursor-pointer"
                                            @click="phoneSignUp = ''"
                                        />
                                    </template>
                                </q-input>
                                <q-stepper-navigation>
                                    <q-btn flat color="primary" label="继续" @click="() => { done4 = true; step = 5 }" :disable="phoneSignUp === ''" />
                                    <q-btn flat color="blue-grey" label="上一项" @click="step = 3"  />
                                </q-stepper-navigation>
                            </q-step>
                            <q-step
                                :name="5"
                                title="输入密码"
                                icon="password"
                                :header-nav="step > 5"
                            >
                                <q-input bottom-slots v-model="passwordSignUp" label="密码" :type="isPwdSignUp ? 'password' : 'text'">
                                    <template v-slot:append>
                                        <q-icon
                                            :name="isPwdSignUp ? 'visibility_off' : 'visibility'"
                                            class="cursor-pointer"
                                            @click="isPwdSignUp = !isPwdSignUp"
                                        />
                                    </template>
                                </q-input>
                                <q-stepper-navigation>
                                    <q-btn flat color="primary" label="注册" @click="signUp" :disable="passwordSignUp === ''" />
                                    <q-btn flat color="blue-grey" label="上一项" @click="step = 4"  />
                                </q-stepper-navigation>
                            </q-step>
                        </q-stepper>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'
export default {
    setup () {
        return {
            tab: ref('one')
        }
    },
    data () {
        return {
            username: '',
            password: '',
            isPwd: true,
            step: 1,
            identity: '',
            identityOptions: ['管理员', '医生', '护士', '普通用户', '何见光明'],
            usernameSignUp: '',
            emailSignUp: '',
            phoneSignUp: '',
            isPwdSignUp: true,
            passwordSignUp: ''
        }
    },
    methods: {
        login () {
            api.get('/test/loginsuccess.php')
            .then((response) => {
                console.log(response.data)
            })
            .catch()
        },
        signUp () {
            api.get('/test/loginsuccess.php')
            .then((response) => {
                console.log(response.data)
            })
            .catch()
        }
    }
}
</script>
<style lang="sass" scoped>
.my-card
    width: 100%
</style>
