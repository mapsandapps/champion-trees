<template>
<div class="q-px-lg">
  <h4>Filters</h4>
  <div class="text-faded">
    Currently showing {{ filteredTreesCount() }} of {{ treesCount() }} trees
  </div>
  <q-btn
    class="q-mb-lg"
    @click="resetFilters()">
    Reset filters
  </q-btn>
  <points-filter class="q-mb-lg" />
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
</style>
