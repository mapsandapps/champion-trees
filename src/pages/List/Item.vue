<template>
<div id="item" :class="rank">
  <div class="header">{{ tree['COMMON NAME'] }}</div>
  <div class="subheader">{{ tree['LOCATION'] }}</div>
  <div v-if="tree.distance" class="distance">{{ tree.distance | distanceHuman }}</div>
  <div v-if="rank" class="medal"><img :src="`statics/${rank}.svg`" /></div>
</div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    tree: {
      type: Object,
      required: true
    }
  },
  computed: {
    rank() {
      if (this.tree.Rank == 1) {
        return 'gold';
      } else if (this.tree.Rank == 2) {
        return 'silver';
      } else if (this.tree.Rank == 3) {
        return 'bronze';
      }
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
#item {
  width: 100%;
  height: 132px;
  padding: 20px 10px;
  position: relative;
  border-bottom: 2px solid #cdcdcd;
  border-left: 4px solid transparent;
  &.gold {
    border-left-color: #fed74f;
  }
  &.silver {
    border-left-color: #bfc4c7;
  }
  &.bronze {
    border-left-color: #c9ad90;
  }
  .header {
    font-size: 16px;
  }
  .subheader {
    font-size: 11px;
    color: #707070;
  }
  .distance {
    font-size: 10px;
    color: #2B2B2B;
    position: absolute;
    bottom: 20px;
  }
  .medal {
    position: absolute;
    bottom: 17px;
    right: 10px;
    img {
      width: 40px;
    }
  }
}
</style>
