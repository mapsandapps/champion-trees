<template>
<q-card class="q-ma-sm">
  <q-card-title>Prototype Diagram</q-card-title>
  <q-card-main>
    <div class="diagram">
      <img src="../assets/tree.png">
      <div class="dbh">{{ dbh }}"</div>
      <div class="height">{{ height }}'</div>
      <div class="spread">{{ spread }}'</div>
      <div class="points">{{ points }} points</div>
    </div>
  </q-card-main>
</q-card>
</template>

<script>
export default {
  name: 'Diagram',
  props: [
    'dbh',
    'height',
    'spread',
    'points'
  ]
};
</script>

<style lang="scss" scoped>
.diagram {
  position: relative;
  img {
    width: 50%;
    height: 50%;
  }
  .dbh {
    position: absolute;
    top: 320px;
    left: 100px;
    color: orange;
  }
  .height {
    position: absolute;
    top: 120px;
    left: 40px;
    color: red;
  }
  .spread {
    position: absolute;
    top: 54px;
    left: 110px;
    color: purple;
  }
  .points {
    position: absolute;
    font-size: 20px;
    top: 124px;
    left: 124px;
    color: blue;
  }
}
</style>
