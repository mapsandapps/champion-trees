<template>
  <q-page padding class="row justify-center">
    <q-list highlight separator>
      <q-item
        v-for="tree in sortedTrees"
        :key="tree.ID" :to="'/trees/' + tree.ID">
        <Item :tree="tree" />
      </q-item>
    </q-list>
  </q-page>
</template>

<style>
</style>

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
  computed: {
    ...mapGetters([
      'getTrees'
    ]),
    sortedTrees() {
      return orderBy(this.getTrees, ['distanceMiles'], ['asc']);
    }
  },
  methods: {
    ...mapActions([
      'fetchTreeData',
      'findUserLocation'
    ])
  },
  mounted() {
    this.fetchTreeData()
      .then(() => {
        this.findUserLocation();
      });
  }
}
</script>
