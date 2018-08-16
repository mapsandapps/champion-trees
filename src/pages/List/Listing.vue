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

      <q-btn flat round dense
        icon="more_horiz"
        @click="openActionSheet" />
    </q-toolbar>
  </q-layout-header>
  <div v-if="mode === 'list'" class="list" highlight separator>
    <q-item
      v-for="tree in sortedTrees"
      :key="tree.ID"
      :to="`/trees/${tree.ID}`">
      <Item :tree="tree" />
    </q-item>
  </div>
  <Map v-else />
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
  computed: {
    ...mapGetters('trees', [
      'trees'
    ]),
    ...mapState('user', [
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
        return orderBy(this.trees, ['distance'], ['asc']);
      } else {
        return this.trees;
      }
    }
  },
  methods: {
    ...mapMutations('user', {
      setCurrentListingView: 'SET_CURRENT_LISTING_VIEW'
    }),
    openActionSheet() {
      this.$q.actionSheet({
        title: 'Learn more',
        actions: [
          {
            label: 'About the trees',
            icon: 'info',
            handler: () => {
              this.$router.push({
                name: 'AboutTrees'
              });
            }
          },
          {
            label: 'About the app',
            icon: 'apps',
            handler: () => {
              this.$router.push({
                name: 'AboutApp'
              });
            }
          },
          // {}, // separator
          {
            label: 'Donate',
            icon: 'attach_money',
            handler: () => {
              this.$q.notify('Sorry, but you can\'t donate yet!')
            }
          }
        ],
        dismiss: {
          label: 'Cancel',
          handler: () => {
            this.$q.notify('Cancelled...')
          }
        }
      })
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
.list {
  .q-item {
    padding: 0px;
  }
  .q-item-link:hover {
    background: rgba(189, 189, 189, 0.15);
  }
}
</style>
