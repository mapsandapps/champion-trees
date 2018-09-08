<template>
<div>
  <q-toggle
    v-model="filter"
    label="All"
    left-label
    @input="toggleFilter" />
  <span class="q-ml-xs">State champions only</span>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import clone from 'lodash/clone';

export default {
  name: 'StateChampionFilter',
  data() {
    return {
      filter: false
    };
  },
  computed: {
    ...mapGetters('filters', [
      'filtering',
      'stateChampionFilter'
    ])
  },
  watch: {
    filtering() {
      // reset when the filters are reset
      if (!this.filtering) {
        this.filter = clone(this.stateChampionFilter);
      }
    }
  },
  methods: {
    ...mapActions('filters', [
      'filterStateChampion'
    ]),
    toggleFilter(value) {
      this.filterStateChampion(value);
    }
  },
  mounted() {
    this.filter = this.stateChampionFilter;
  }
};
</script>

<style lang="scss" scoped>
</style>
