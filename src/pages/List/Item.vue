<template>
<div>
  <q-item-main
    :label="tree['COMMON NAME']"
    label-lines="1"
    :sublabel="tree['LOCATION']"
    sublabel-lines="1" />
  <q-item-side right :stamp="tree.distanceHuman" />
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
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
</style>
