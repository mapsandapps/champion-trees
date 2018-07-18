<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view
        v-if="treeDataLoaded" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Loading, colors } from 'quasar';
import { mapActions, mapState } from 'vuex';

colors.setBrand('primary', '#ffc107');
colors.setBrand('secondary', '#047be3');
colors.setBrand('warning', '#db2828');

export default {
  name: 'LayoutDefault',
  components: {
    Loading
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
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
    treeDataLoaded() {
      if (this.treeDataLoaded) {
        Loading.hide();
      }
    }
  },
  mounted() {
    Loading.show({
      message: 'Loading trees...'
    });
    this.fetchTreeData()
      .then(() => {
        this.findUserLocation();
      });
  }
}
</script>

<style>
</style>
