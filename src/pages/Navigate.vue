<template>
<div v-if="tree">
  <div>{{ tree.LOCATION }}</div>
  <div>{{ tree.distanceHuman }}</div>
  <div>{{ tree.bearing }}</div>
  <div>{{ compassDirection }}</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Navigate',
  components: {
  },
  props: {
  },
  data() {
    return {
      compassDirection: null,
      tree: null
    };
  },
  computed: {
    ...mapGetters([
      'getTree'
    ])
  },
  methods: {
  },
  mounted() {
    this.tree = this.getTree(this.$route.params.id);
    if (window.DeviceOrientationEvent) {
      this.compassDirection = 'Compass is supported by this browser, but no reading has occurred';
      window.addEventListener('deviceorientation', eventData => {
        // NOTE: currently only set to work on iOS
        this.compassDirection = eventData.alpha;
        if (eventData.webkitCompassHeading) {
          this.compassDirection = eventData.webkitCompassHeading;
        } else {
          // TODO: maybe do something with eventData.alpha, but it's complicated
          this.compassDirection = 'Compass not supported in this browser';
        }
      });
    } else {
      this.compassDirection = 'Compass not supported in this browser';
    }
  },
  beforeDestroy() {
    window.removeEventListener('deviceorientation');
  }
};
</script>

<style lang="scss" scoped>
</style>
