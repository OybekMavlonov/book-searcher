<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, watch } from 'vue'

const store = useStore()
const router = useRouter()

const didAutoLogout = computed(() => {
  return store.getters.didAutoLogout
})
store.dispatch('tryLogin')

watch(didAutoLogout, (newValue, oldValue) => {
  if(newValue && newValue !== oldValue) {
    router.replace('/auth')
  }
})
</script>
