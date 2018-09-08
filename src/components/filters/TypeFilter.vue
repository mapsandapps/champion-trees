<template>
<div class="type-filter">
  Tree species
  <div
    v-for="type in treeTypeList"
    class="option"
    :key="type.value">
    <q-checkbox
      multiple
      v-model="treeTypesSelected"
      size="30px"
      :val="type"
      :label="type"
      @input="toggleCheckbox" />
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';

export default {
  name: 'TypeFilter',
  components: {
  },
  props: {
  },
  data() {
    return {
      treeTypesSelected: []
    };
  },
  computed: {
    ...mapGetters('filters', [
      'filtering'
    ]),
    ...mapGetters('trees', [
      'treeTypeList'
    ])
  },
  watch: {
    filtering() {
      // reset the range when the filters are reset
      if (!this.filtering) {
        this.treeTypesSelected = cloneDeep(this.treeTypeList);
      }
    }
  },
  methods: {
    ...mapActions('filters', [
      'filterTypes'
    ]),
    ...mapMutations('user', [
      'SET_FILTER'
    ]),
    toggleCheckbox(types) {
      let arrayOfTypes = cloneDeep(types);
      delete arrayOfTypes[arrayOfTypes.length];
      this.filterTypes(arrayOfTypes);
    }
  },
  mounted() {
    this.treeTypesSelected = cloneDeep(this.treeTypeList);
  }
};
</script>

<style lang="scss" scoped>
.type-filter {
  /deep/ .q-checkbox-icon {
    font-size: 40px;
  }
  .option {
    line-height: 40px;
  }
}
</style>
