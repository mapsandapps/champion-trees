<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view
        v-if="treeDataLoaded" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Loading } from 'quasar';
import { mapActions, mapState } from 'vuex';

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
