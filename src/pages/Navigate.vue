<template>
<div v-if="tree">
  <q-alert
    v-if="compassError"
    class="q-ma-md"
    color="warning"
    icon="warning">
    {{ compassError }}
  </q-alert>
  <div class="tree-info q-py-md">
    <h2>
      {{ tree.LOCATION }}
    </h2>
    <h3>{{ tree['COMMON NAME'] }}</h3>
    <h4
      :style="{ color: primaryColor }">
      {{ tree.distanceHuman }}
    </h4>
  </div>
  <div>
    <div
      v-if="arrowDirection"
      class="arrow-container">
      <q-icon
        color="primary"
        name="arrow_upward"
        :style="{ transform: 'rotate(' + arrowDirection + 'deg)' }"
        size="200px" />
    </div>
  </div>
  <div class="q-pa-md">
    <div>Direction to tree: {{ treeBearing || 'unknown' }}º</div>
    <div>You're facing: {{ compassDirection || 'unknown' }}º</div>
    <q-btn
      class="q-my-md"
      @click.native="viewTreeInGoogleMaps(tree)"
      label="View in Google Maps"
      color="secondary" />
  </div>
</div>
</template>

<script>
import round from 'lodash/round';
import { colors, openURL } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  name: 'Navigate',
  data() {
    return {
      compassDirection: null,
      compassError: null,
      primaryColor: colors.getBrand('primary'),
      tree: null
    };
  },
  computed: {
    ...mapGetters([
      'getTree'
    ]),
    arrowDirection() {
      // TODO: remove this dev mode code
      if (process.env.DEV) {
        return this.tree.bearing - 90; // in dev, assume facing east
      }
      if (this.tree.bearing && this.compassDirection) {
        const direction = this.tree.bearing - this.compassDirection;
        if (direction < 0) {
          return direction + 360;
        } else if (direction >= 360) {
          return direction - 360;
        } else {
          return direction;
        }
      } else {
        return null;
      }
    },
    treeBearing() {
      return round(this.tree.bearing);
    }
  },
  methods: {
    handleEventData(eventData) {
      // NOTE: currently only set to work on iOS
      this.compassDirection = eventData.alpha;
      if (eventData.webkitCompassHeading) {
        this.compassDirection = eventData.webkitCompassHeading;
        this.compassError = null;
      } else {
        // TODO: maybe do something with eventData.alpha, but it's complicated
        this.compassError = 'Compass not supported in this browser';
      }
    },
    viewTreeInGoogleMaps() {
      openURL(`https://www.google.com/maps/search/${this.tree.Latitude},+${this.tree.Longitude}/`);
    }
  },
  mounted() {
    this.tree = this.getTree(this.$route.params.id);
    if (window.DeviceOrientationEvent) {
      this.compassError = 'Compass is supported by this browser, but no reading has occurred';
      window.addEventListener('deviceorientation', this.handleEventData);
    } else {
      this.compassError = 'Compass not supported in this browser';
    }
  },
  beforeDestroy() {
    window.removeEventListener('deviceorientation', this.handleEventData);
  }
};
</script>

<style lang="scss" scoped>
.arrow-container {
  margin: 0 auto;
  width: 200px;
}
.tree-info {
  text-align: center;
}
</style>
