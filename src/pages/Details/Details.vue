<template>
<div v-if="tree" class="q-pa-md">
  <div>{{ tree['Rank'] | ordinal }} largest {{ tree['COMMON NAME'] }} in Atlanta</div>
  <div>At {{ tree['LOCATION'] }}</div>
  <div>{{ tree.Points }} points</div>
  <div v-if="tree.Latitude && tree.Longitude">
    <q-btn
      class="q-my-md"
      @click="navigateToNavigate"
      label="Navigate to Tree"
      color="primary" />
  </div>
  <div v-else>No location provided</div>

  <q-card class="q-ma-sm kitchen-sink">
    <q-card-title>Kitchen Sink</q-card-title>
    <q-card-main>
      <div v-for="(key, index) in keys" :key="index">
        {{ key }}:
        {{ tree[key] }}
      </div>
    </q-card-main>
  </q-card>
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
    }
  },
  mounted() {
    this.tree = this.getTree(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.kitchen-sink {
  color: gray;
  margin-top: 160px;
}
</style>
