<template>
<div>
  Points
  <q-range
    v-model="pointsRange"
    :min="0"
    :max="400"
    label-always
    @input="changeRange()" />
</div>
</template>

<script>
import throttle from 'lodash/throttle';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'PointsFilter',
  data() {
    return {
      pointsRange: {
        min: 0,
        max: 400
      }
    };
  },
  computed: {
    ...mapGetters('trees', [
      'trees',
      'treeSpeciesList',
      'treeTypeList'
    ]),
    ...mapState('filters', [
      'filtering'
    ])
  },
  watch: {
    filtering() {
      // reset the range when the filters are reset
      if (!this.filtering) {
        this.pointsRange = {
          min: 0,
          max: 400
        }
      }
    }
  },
  methods: {
    ...mapActions('filters', [
      'filterPoints'
    ]),
    changeRange: throttle(function() {
      this.filterPoints(this.pointsRange);
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
</style>
