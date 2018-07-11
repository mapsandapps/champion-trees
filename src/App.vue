<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import SharedFilters from './filters';

Vue.use(SharedFilters);

export default {
  name: 'App'
}
</script>

<style>
</style>
