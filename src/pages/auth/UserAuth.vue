<template>
  <q-layout view="lHh Lpr fff">
    <q-page
      class="window-height window-width row justify-center items-center"
      style="background: linear-gradient(#8274C5, #5A4A9F);"
    >
      <div class="column q-pa-lg">
        <div class="row">
          <q-card square class="shadow-24" style="width:400px;max-height:540px;">
            <q-card-section class="bg-deep-purple-7">
              <h4 class="text-h5 text-white q-my-md">Authorization</h4>
            </q-card-section>
            <q-card-section class="q-mb-sm">
              <q-form
                style="max-width: 500px;"
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  square
                  clearable
                  type="email"
                  v-model="email"
                  label="Your email *"
                  lazy-rules
                  :rules="[val => !!val || 'Email is missing', isValidEmail,]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>

                <q-input v-model="password"
                         square
                         clearable
                         :rules="[val => val && val.length > 5|| 'at least 6 characters long']"
                         :type="isPwd ? 'password' : 'text'" hint="Password with toggle"
                         label="Password *"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div  class="">
                  <q-btn :label="submitButtonCaption"
                         type="submit"
                         unelevated
                         color="secondary"
                         class="full-width text-white"
                  >
                    <q-spinner
                      v-if="loading"
                      color="white"
                      size="1em"
                      class="q-ml-sm"
                    />
                  </q-btn>
                  <q-btn unelevated label="Reset" type="reset" color="secondary" class="q-mt-sm full-width text-white" />
                  <q-btn unelevated :label="switchModeButtonCaption" color="primary" class="q-mt-sm full-width text-white" @click="switchAuthMode"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import useNotification from "../../hooks/notification.js";

const store = useStore()
const router = useRouter()

const { setResponseError, setSuccess } = useNotification()

const password = ref(null)
const email = ref(null)
const loading = ref(false)
const mode = ref('login')
const isPwd = ref(true)
const error = ref(null)


const isValidEmail = computed(function () {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(email.value) || 'Invalid email';
})

const submitButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Login' :  'Signup'
})

const switchModeButtonCaption = computed(() => {
  return mode.value === 'login' ? 'Signup instead' :  'Login instead'
})

function switchAuthMode() {
  mode.value === 'login' ? mode.value = 'signup' : mode.value = 'login'
}

async function onSubmit () {
  loading.value = true
  try {
    const actionPayload = {
      email: email.value,
      password: password.value
    };

    if (mode.value === 'login') {
      await store.dispatch('login', actionPayload)
      setSuccess({title: 'Successfully logged in'})
    } else {
      await store.dispatch('signup', actionPayload)
      setSuccess({title: 'Successfully signed up'})
    }
    await router.replace('/details')
  } catch (err) {
    setResponseError({error: err})
  }
  loading.value = false
}

function onReset () {
  password.value = null
  email.value = null
}
</script>