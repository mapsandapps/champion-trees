<template>
<div class="q-px-lg">
  <h3>Filters</h3>
  <div class="text-faded">
    Currently showing {{ filteredTreesCount() }} of {{ treesCount() }} trees
  </div>
  <q-btn
    class="q-my-lg"
    @click="resetFilters()">
    Reset filters
  </q-btn>
  <div class="header">Points</div>
  <points-filter class="q-mb-lg" />
  <div class="header">Tree species</div>
  <type-filter class="q-mb-lg" />
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PointsFilter from 'components/filters/PointsFilter';
import TypeFilter from 'components/filters/TypeFilter';

export default {
  name: 'filters',
  components: {
    PointsFilter,
    TypeFilter
  },
  methods: {
    ...mapActions('filters', [
      'resetFilters'
    ]),
    ...mapGetters('filters', [
      'filteredTreesCount',
      'filtering'
    ]),
    ...mapGetters('trees', [
      'treesCount'
    ])
  }
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 12px;
}
</style>
