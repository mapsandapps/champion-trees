<template>
<div v-if="tree" class="details-container">
  <div class="card details-card">
    <div class="details">
      <div class="header">{{ tree['COMMON NAME'] }}</div>
      <div class="subheader">{{ tree['LOCATION'] }}</div>
      <div class="distance">
        <q-icon name="place" />
        {{ tree.distance | distanceHuman }}
      </div>
    </div>
    <div
      v-if="tree.latitude && tree.longitude"
      class="navigate">
      <router-link
        :to="`/trees/${tree.ID}/navigate`">
        <q-icon
          @click="navigateToNavigate"
          name="navigation"
          color="primary"
          size="64px" />
        <div>Navigate</div>
      </router-link>
    </div>
    <div v-else>No location provided</div>
  </div>

  <div class="card">
    <div class="header">Stats</div>
    <div class="stats">
      <div>
        <div class="stat">{{ tree.Rank | ordinal }}</div>
        <div class="stat-caption">Largest of species in Atlanta</div>
      </div>
      <div>
        <div class="stat">{{ tree.points }}</div>
        <div class="stat-caption">Points</div>
      </div>
    </div>
  </div>

  <div class="card">
    <Diagram
      :dbh="dbh"
      :height="tree['HEIGHT(ft)']"
      :spread="tree['SPREAD (ft)']"
      :points="tree.points" />
  </div>

  <div class="card">
    <div class="header q-mb-md">Points</div>
    <q-list>
      <q-item>
        <q-item-side icon="adjust" color="primary" />
        <!-- TODO: could change to font awesome "bullseye" -->
        <q-item-main>
          Trunk
        </q-item-main>
        <q-item-side right color="black">
          {{ tree['CIR (in)'] }}
        </q-item-side>
      </q-item>
      <q-item>
        <q-item-side icon="import_export" color="primary" />
        <q-item-main>
          Height
        </q-item-main>
        <q-item-side right color="black">
          {{ tree['HEIGHT(ft)'] }}
        </q-item-side>
      </q-item>
      <q-item>
        <q-item-side icon="zoom_out_map" color="primary" />
        <q-item-main>
          Crown spread
        </q-item-main>
        <q-item-side right color="black">
          {{ spread }}
        </q-item-side>
      </q-item>
      <q-item-separator />
      <q-item>
        <q-item-side icon="import_export" color="primary" />
        <q-item-main>
          Total points
        </q-item-main>
        <q-item-side right color="black">
          {{ tree.points }}
        </q-item-side>
      </q-item>
    </q-list>
  </div>

  <q-card class="q-ma-sm kitchen-sink">
    <q-card-title>Kitchen Sink</q-card-title>
    <q-card-main>
      <div v-for="(key, index) in keys" :key="index">
        {{ key }}:
        {{ tree[key] }}
      </div>
    </q-card-main>
  </q-card>
</div>
</template>

<script>
import keys from 'lodash/keys';
import round from 'lodash/round';
import { mapGetters } from 'vuex';

import Diagram from 'components/Diagram';

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
    ...mapGetters('trees', [
      'getTree'
    ]),
    dbh() {
      return round(Number(this.tree['CIR (in)']) / Math.PI, 1);
    },
    keys() {
      return keys(this.tree);
    },
    spread() {
      return Number(this.tree['SPREAD (ft)'] / 4);
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
.details-container {
  background-color: #f5f5f5;
}
.card {
  background-color: white;
  margin-bottom: 10px;
  border-top: 1px solid #c5c5c5;
  border-bottom: 1px solid #c5c5c5;
  padding: 20px;
}
.details-card {
  display: grid;
  grid-template-columns: 1fr 62px;
  grid-column-gap: 16px;
}
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  text-align: center;
  padding-top: 16px;
  .stat {
    font-size: 32px;
    color: #ffa801;
  }
  .stat-caption {
    font-size: 12px;
    color: #707070;
  }
}
.details,
.navigate {
  display: inline-block;
  vertical-align: top;
}
.navigate {
  width: 62px;
  text-align: right;
  button {
    .q-btn-inner {
      i,
      div {
        display: block;
      }
    }
  }
  a {
    text-decoration: none;
    color: #ffa801;
  }
}
.kitchen-sink {
  color: gray;
  margin-top: 160px;
}
.header {
  font-size: 32px;
}
.subheader {
  font-size: 22px;
  color: #707070;
}
.distance {
  font-size: 20px;
  color: #2B2B2B;
}
</style>
