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
      {{ tree.distance | distanceHuman }}
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
    <q-btn
      v-if="seen"
      class="q-my-md"
      @click.native="uncheckTree(tree)"
      label="Mark unseen"
      color="warning" />
    <q-btn
      v-else
      class="q-my-md"
      @click.native="checkTree(tree)"
      icon="check"
      label="Mark seen"
      color="positive" />
  </div>
</div>
</template>

<script>
import round from 'lodash/round';
import { colors, openURL } from 'quasar';
import { mapActions, mapGetters } from 'vuex';

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
      'bearingFromUser',
      'getTree',
      'treeSeen'
    ]),
    arrowDirection() {
      // TODO: remove this dev mode code
      if (process.env.DEV) {
        return this.treeBearing - 90; // in dev, assume facing east
      }
      if (this.treeBearing && this.compassDirection) {
        const direction = this.treeBearing - this.compassDirection;
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
    seen() {
      return this.treeSeen(this.tree.ID)
    },
    treeBearing() {
      return round(this.bearingFromUser(this.tree));
    }
  },
  methods: {
    ...mapActions([
      'checkTree',
      'uncheckTree'
    ]),
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
      openURL(`https://www.google.com/maps/search/${this.tree.latitude},+${this.tree.longitude}/`);
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
