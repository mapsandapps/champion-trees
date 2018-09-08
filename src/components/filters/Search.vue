<template>
<div>
  <q-search
  v-model="searchTerm"
  @input="searchChanged" />
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      searchTerm: null
    };
  },
  computed: {
    ...mapGetters('filters', [
      'filtering'
    ]),
    ...mapGetters('filters', {
      storedSearchTerm: 'searchTerm'
    })
  },
  watch: {
    filtering() {
      // reset when the filters are reset
      if (!this.filtering) {
        this.searchTerm = null;
      }
    }
  },
  methods: {
    ...mapActions('filters', [
      'search'
    ]),
    searchChanged() {
      this.search(this.searchTerm);
    }
  },
  mounted() {
    this.searchTerm = this.storedSearchTerm;
  }
};
</script>

<style lang="scss" scoped>
</style>
