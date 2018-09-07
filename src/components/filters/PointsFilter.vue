<template>
<div>
  Points
  <q-range
    v-model="pointsRange"
    :min="0"
    :max="maxPoints || 400"
    label-always
    @input="changeRange()" />
</div>
</template>

<script>
import throttle from 'lodash/throttle';
import { mapActions, mapGetters } from 'vuex';

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
      'maxPoints',
      'trees',
      'treeSpeciesList',
      'treeTypeList'
    ]),
    ...mapGetters('filters', [
      'filtering'
    ])
  },
  watch: {
    filtering() {
      // reset the range when the filters are reset
      if (!this.filtering) {
        this.pointsRange = {
          min: 0,
          max: this.maxPoints || 400
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
  },
  mounted() {
    this.pointsRange.max = this.maxPoints;
  }
};
</script>

<style lang="scss" scoped>
</style>
