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
      <!-- <q-toolbar-title>
        Quasar App
        <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
      </q-toolbar-title> -->
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
    <div v-else>Map goes here</div>
  </q-page>
</div>
</template>

<script>
import { store } from '../../store';
import { mapActions, mapGetters } from 'vuex';

import orderBy from 'lodash/orderBy';

import Item from './Item';

export default {
  name: 'Listing',
  components: {
    Item
  },
  data() {
    return {
      mode: 'list'
    }
  },
  computed: {
    ...mapGetters([
      'getTrees'
    ]),
    sortedTrees() {
      return orderBy(this.getTrees, ['distanceMiles'], ['asc']);
    }
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
