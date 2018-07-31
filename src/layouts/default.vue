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

colors.setBrand('primary', '#ffa801');
colors.setBrand('secondary', '#047be3');
colors.setBrand('warning', '#db2828');
colors.setBrand('positive', '#00c960')

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
  mounted() {
    this.$q.loading.show({
      message: 'Loading trees...',
      spinner: 'QSpinnerRings',
      spinnerColor: 'primary',
      spinnerSize: 100
    });
    Promise.all([
      this.fetchTreeData(),
      this.findUserLocation()
    ])
    .then(() => { // FIXME: not working
      this.$q.loading.hide();
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
