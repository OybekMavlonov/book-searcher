<template>
    <q-layout view="lHh lpr lFf" class="shadow-2">
      <TheHeader/>
      <q-page-container>
        <q-page class="q-pa-md">
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
</template>

<script setup>
import TheHeader from './TheHeader.vue'
</script>
