<template>
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Quasar Framework</q-toolbar-title>
          <q-btn flat dense v-if="isLoggedIn" label="Log out" @click="logout" class="q-mr-xl" />
            <router-link to="/auth" style="text-decoration: none; color: white">
              <q-btn flat dense v-if="!isLoggedIn" label="Register" class="q-mr-xl"/>
            </router-link>
        </q-toolbar>
      </q-header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => {
  return store.getters.isAuthenticated
})

function logout() {
  store.dispatch('logout')
  router.replace('/auth')
}
</script>