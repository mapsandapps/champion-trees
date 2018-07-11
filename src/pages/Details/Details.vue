<template>
<div>
  <div>Rank: {{ tree['Rank'] | ordinal }}</div>
  <div v-for="(key, index) in keys" :key="index">
    {{ key }}:
    {{ tree[key] }}
  </div>
  <div v-if="tree.Latitude && tree.Longitude">
    <q-btn
      @click.native="viewTreeInGoogleMaps(tree)"
      label="View map"
      color="primary" />
  </div>
  <div v-else>No location provided</div>
  <Diagram
    :dbh="dbh"
    :height="tree['HEIGHT(ft)']"
    :spread="tree['SPREAD (ft)']"
    :points="tree['Points']" />
</div>
</template>

<script>
import keys from 'lodash/keys';
import round from 'lodash/round';
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
    dbh() {
      return round(Number(this.tree['CIR (in)']) / Math.PI, 1);
    },
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
    this.tree = this.getTree(this.$route.params.id);
  }
};
</script>

<style>
</style>
