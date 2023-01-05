<template>
  <h2 class="text-center q-ma-md">Book Details</h2>
  <div class="q-pa-md row justify-center q-gutter-md">
    <q-card class="my-card col-12 col-md-4" v-if="info">
      <q-card-section>
        <q-img v-if="info.imageLinks && info.imageLinks.thumbnail" :src="info.imageLinks.thumbnail"></q-img>
      </q-card-section>
    </q-card>
    <q-card class="my-card col-12 col-md-4" v-if="info">
      <q-card-section>
        <div class="text-h6">{{ info.title }}</div>
        <div class="text-subtitle2" v-if="info.authors">by {{ info.authors.join('&') }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-html="info.description" style="word-break: break-word">
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
const $http = axios;

const props = defineProps({
  id: String,
})
let info = ref({})
async function getItemData() {
  try {
    const { data: { volumeInfo }} = await $http.get(`https://www.googleapis.com/books/v1/volumes/${props.id}`)
    info.value = volumeInfo
  } catch (e) {
    console.log(e)
  }
}
getItemData()
</script>

<style scoped>
.my-card {
  width: 600px;
}

.my-card .q-img {
  max-height: 650px;
  height: 100%
}
</style>


