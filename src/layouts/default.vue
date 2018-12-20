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
  data() {
    return {
      geolocationWatcherID: null
    }
  },
  computed: {
    ...mapState('trees', [
      'treeDataLoaded'
    ]),
    ...mapState('user', [
      'geolocationAttempted'
    ])
  },
  methods: {
    ...mapActions('trees', [
      'fetchTreeData'
    ]),
    ...mapActions('user', [
      'findUserLocation',
      'setLocation'
    ]),
    handleGeolocationData(data) {
      this.setLocation(data.coords);
    },
    handleGeolocationError(error) {
      this.$q.notify({
        message: 'Geolocation failed',
        icon: 'location_off'
      });
    }
  },
  mounted() {
    this.$q.loading.show({
      message: 'Loading trees and your location...',
      spinner: 'QSpinnerRings',
      spinnerColor: 'primary',
      spinnerSize: 100
    });
    Promise.all([
      this.fetchTreeData(),
      this.findUserLocation()
    ])
    .then(() => {
      this.$q.loading.hide();
      if (window.Cypress) {
        window.dataLoaded = true;
      }
    })
    .catch(() => {
      this.$q.loading.hide();
      if (window.Cypress) {
        window.dataLoaded = true;
      }
    });
    const hideLoading = setInterval(() => {
      // hide spinner eventually, just in case something bugs out
      this.$q.loading.hide();
      clearInterval(hideLoading);
    }, 15000);

    this.geolocationWatcherID = navigator.geolocation.watchPosition(this.handleGeolocationData, this.handleGeolocationError);
  },
  beforeDestroy() {
    navigator.geolocation.clearWatch(this.geolocationWatcherID);
  }
}
</script>

<style>
</style>
