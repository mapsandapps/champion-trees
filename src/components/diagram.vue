<template>
<div class="diagram">
  <img src="../assets/tree.png">
  <div class="dbh">{{ dbh }}"</div>
  <div class="height">{{ height }}'</div>
  <div class="spread">{{ spread }}'</div>
  <div class="points">{{ points }} points</div>
</div>
</template>[{}]

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

<style>
.diagram {
  position: relative;
}
.dbh {
  position: absolute;
  top: 736px;
  left: 260px;
  color: orange;
}
.height {
  position: absolute;
  top: 286px;
  left: 110px;
  color: red;
}
.spread {
  position: absolute;
  top: 136px;
  left: 280px;
  color: purple;
}
.points {
  position: absolute;
  font-size: 30px;
  top: 300px;
  left: 250px;
  color: blue;
}
</style>
