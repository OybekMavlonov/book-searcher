<template>
  <div class="q-pa-md q-gutter-md">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <q-input square outlined v-model="text" @keyup.enter="search(text)" />
      </q-card-section>
      <q-card-section class="row no-padding">
        <div class="q-pa-md col-6 col-sm-4 col-md-3 col-lg-2" v-for="item in searchResults" :key="item.id">
            <router-link :to="{ name: 'details-view', params: { id: item.id }}">
              <q-img :src="item.volumeInfo.imageLinks.thumbnail">
                <div class="absolute-bottom text-subtitle2 text-center">
                  {{ item.volumeInfo.title }}
                </div>
              </q-img>
            </router-link>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from "axios";

const route = useRoute()
const router = useRouter()

const $http = axios;

const text = ref('')
let searchResults = ref([])

async function search(val) {
  try {
    const { data: { items }} = await $http.get(`https://www.googleapis.com/books/v1/volumes?q=${val}`)
    searchResults.value = items
    let currentQuery = {searchValue: text.value}
    await router.replace({ query: currentQuery })
  } catch (e) {
    console.log(e)
  }
}
const { query } = route;

if(query.searchValue) {
  text.value = query.searchValue
  search(query.searchValue)
}
</script>

<style>
.my-card .q-img{
  height: 100%;
}
</style>
