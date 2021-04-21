<template>
    <div class="q-pa-md row" >
        <div class="col"></div>
        <div class="col-8 col-xs-10 col-md-8 col-lg-6">
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
                            <q-btn flat color="primary"  label="登录" />
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                        <q-stepper
                            v-model="step"
                            header-nav
                            vertical
                            ref="stepper"
                            color="primary"
                            class="no-shadow"
                            animated
                        >
                            <q-step
                                :name="1"
                                title="选择你的身份"
                                icon="settings"
                                :done="step > 1"
                                :header-nav="step > 1"
                            >
                                For each ad campaign that you create, you can control how much you're willing to
                                spend on clicks and conversions, which networks and geographical locations you want
                                your ads to show on, and more.

                                <q-stepper-navigation>
                                    <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
                                </q-stepper-navigation>
                            </q-step>
                            <q-step
                                :name="2"
                                title="Create an ad group"
                                caption="Optional"
                                icon="create_new_folder"
                                :done="step > 2"
                                :header-nav="step > 2"
                            >
                                An ad group contains one or more ads which target a shared set of keywords.

                                <q-stepper-navigation>
                                    <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
                                    <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </q-step>
                            <q-step
                                :name="3"
                                title="Create an ad"
                                icon="add_comment"
                                :header-nav="step > 3"
                            >
                                Try out different ad text to see what brings in the most customers, and learn how to
                                enhance your ads using features like ad extensions. If you run into any problems with
                                your ads, find out how to tell if they're running and how to resolve approval issues.

                                <q-stepper-navigation>
                                    <q-btn color="primary" @click="done3 = true" label="Finish" />
                                    <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
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
            step: 1
        }
    }
}
</script>
<style lang="sass" scoped>
.my-card
    width: 100%
</style>
