<template>
<div>
  <q-layout-header id="header">
    <q-toolbar
      color="primary"
    >
      <q-btn-toggle
        v-model="mode"
        toggle-color="blue"
        rounded
        text-color="black"
        :options="[{ label: 'List', value: 'list' }, { label: 'Map', value: 'map' }]" />
    </q-toolbar>
  </q-layout-header>
  <q-page padding id="listing" class="justify-center">
    <q-list v-if="mode === 'list'" highlight separator>
      <q-item
        v-for="tree in sortedTrees"
        :key="tree.ID" :to="'/trees/' + tree.ID">
        <Item :tree="tree" />
      </q-item>
    </q-list>
    <Map v-else :trees="sortedTrees" />
  </q-page>
</div>
</template>

<script>
import { store } from '../../store';
import { mapGetters, mapMutations, mapState } from 'vuex';

import orderBy from 'lodash/orderBy';

import Item from './Item';
import Map from './Map';

export default {
  name: 'Listing',
  components: {
    Item,
    Map
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getTrees'
    ]),
    ...mapState([
      'currentListingView',
      'geolocationSucceeded'
    ]),
    mode: {
      get() {
        return this.currentListingView;
      },
      set() {
        if (this.currentListingView === 'list') {
          this.setCurrentListingView('map');
        } else {
          this.setCurrentListingView('list');
        }
      }
    },
    sortedTrees() {
      if (this.geolocationSucceeded) {
        return orderBy(this.getTrees, ['distance'], ['asc']);
      } else {
        return this.getTrees;
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentListingView'
    ])
  }
}
</script>

<style lang="scss">
#header {
  text-align: center;
  .q-btn-toggle {
    background-color: white;
    margin: 0 auto;
    .q-btn.inline {
      min-width: 100px;
      &.bg-blue {
        border-radius: 28px;
      }
    }
  }
}
</style>
