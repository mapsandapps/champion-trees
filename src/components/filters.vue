<template>
<div class="q-px-lg">
  <h4>Filters</h4>
  <points-filter />
  <q-btn
    @click="resetFilters()">
    Reset filters
  </q-btn>
</div>
</template>

<script>
import { mapActions } from 'vuex';

import PointsFilter from 'components/filters/PointsFilter';

export default {
  name: 'filters',
  components: {
    PointsFilter
  },
  methods: {
    ...mapActions('filters', [
      'resetFilters'
    ])
  }
};
</script>

<style lang="scss" scoped>
</style>
