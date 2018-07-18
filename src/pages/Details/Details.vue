<template>
<div v-if="tree" class="q-pa-md">
  <div>{{ tree['Rank'] | ordinal }} largest {{ tree['COMMON NAME'] }} in Atlanta</div>
  <div>At {{ tree['LOCATION'] }}</div>
  <div v-if="tree.Latitude && tree.Longitude">
    <q-btn
      @click="navigateToNavigate"
      label="Navigate to Tree"
      color="primary" />
    <q-btn
      @click.native="viewTreeInGoogleMaps(tree)"
      label="View in Google Maps"
      color="primary" />
  </div>
  <div v-else>No location provided</div>

  <h4>Kitchen Sink</h4>
  <div class="kitchen-sink">
    <div v-for="(key, index) in keys" :key="index">
      {{ key }}:
      {{ tree[key] }}
    </div>
  </div>
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
    navigateToNavigate() {
      this.$router.push({
        name: 'Navigate',
        params: { id: this.tree.ID }
      });
    },
    viewTreeInGoogleMaps(tree) {
      openURL(`https://www.google.com/maps/search/${tree.Latitude},+${tree.Longitude}/`);
    }
  },
  mounted() {
    this.tree = this.getTree(this.$route.params.id);
  }
};
</script>

<style>
.kitchen-sink {
  color: gray;
}
</style>
