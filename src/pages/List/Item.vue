<template>
<div id="item">
  <q-item-main
    :label="tree['COMMON NAME']"
    label-lines="1"
    :sublabel="tree['LOCATION']"
    sublabel-lines="1" />
  <q-item-side v-if="tree.distance" right :stamp="tree.distance | distanceHuman" />
</div>
</template>

<script>
export default {
  name: 'Item',
  components: {
  },
  props: {
    tree: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
#item {
  width: 100%;
}
</style>
