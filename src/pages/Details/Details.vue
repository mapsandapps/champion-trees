<template>
<div>
  <div v-for="(key, index) in keys" :key="index">
    {{ key }}:
    {{ tree[key] }}
  </div>
  <div v-if="tree.Latitude && tree.Longitude">
    <div>Latitude: {{ tree.Latitude }}</div>
    <div>Longitude: {{ tree.Longitude }}</div>
    <q-btn
      @click.native="viewTreeInGoogleMaps(tree)"
      label="View map"
      color="primary" />
  </div>
  <div v-else>No location provided</div>
  <Diagram
    :dbh="tree['DBH (in)']"
    :height="tree['HEIGHT(ft)']"
    :spread="tree['SPREAD (ft)']"
    :points="tree['Points']" />
</div>
</template>

<script>
import keys from 'lodash/keys';
import { openURL } from 'quasar';
import { mapGetters } from 'vuex';

import Diagram from 'components/diagram';

export default {
  name: 'Details',
  components: {
    Diagram
  },
  props: {
  },
  data() {
    return {
      tree: null
    };
  },
  computed: {
    ...mapGetters([
      'getTree'
    ]),
    keys() {
      return keys(this.tree);
    }
  },
  methods: {
    viewTreeInGoogleMaps(tree) {
      openURL(`https://www.google.com/maps/search/${tree.Latitude},+${tree.Longitude}/`);
    }
  },
  beforeMount() {
    // TODO: need to make sure the trees are loaded first
    this.tree = this.getTree(this.$route.params.id);
  }
};
</script>

<style>
</style>
