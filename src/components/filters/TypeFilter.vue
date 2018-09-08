<template>
<div class="type-filter">
  <div class="q-my-md">
    <q-btn
      flat
      color="secondary"
      @click="showAllTypes">
      Check all
    </q-btn>
    <q-btn
      flat
      color="secondary"
      @click="showNoTypes">
      Uncheck all
    </q-btn>
  </div>
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
import { mapActions, mapGetters, mapState } from 'vuex';

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
    ]),
    ...mapState('filters', [
      'typeFilter'
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
    showAllTypes() {
      this.filterTypes(cloneDeep(this.treeTypeList));
      this.treeTypesSelected = cloneDeep(this.treeTypeList);
    },
    showNoTypes() {
      this.filterTypes([]);
      this.treeTypesSelected = [];
    },
    toggleCheckbox(types) {
      let arrayOfTypes = cloneDeep(types);
      delete arrayOfTypes[arrayOfTypes.length];
      this.filterTypes(arrayOfTypes);
    }
  },
  mounted() {
    this.treeTypesSelected = this.typeFilter;
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
