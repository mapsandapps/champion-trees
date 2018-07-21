<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view
        v-if="treeDataLoaded" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Loading, QSpinnerRings, colors } from 'quasar';
import { mapActions, mapState } from 'vuex';

colors.setBrand('primary', '#ffc107');
colors.setBrand('secondary', '#047be3');
colors.setBrand('warning', '#db2828');

export default {
  name: 'LayoutDefault',
  computed: {
    ...mapState([
      'geolocationAttempted',
      'treeDataLoaded'
    ])
  },
  methods: {
    ...mapActions([
      'fetchTreeData',
      'findUserLocation'
    ])
  },
  watch: {
    geolocationAttempted() {
      if (this.geolocationAttempted) {
        this.$q.loading.hide();
      }
    }
  },
  mounted() {
    this.$q.loading.show({
      message: 'Loading trees...',
      spinner: 'QSpinnerRings',
      spinnerColor: 'primary',
      spinnerSize: 100
    });
    this.fetchTreeData()
      .then(() => {
        this.findUserLocation();
      });
    const hideLoading = setInterval(() => {
      // hide spinner eventually, just in case something bugs out
      this.$q.loading.hide();
      clearInterval(hideLoading);
    }, 15000);
  }
}
</script>

<style>
</style>
