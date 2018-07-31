<template>
<div class="diagram">
  <div class="spread">{{ spread }}' spread</div>
  <img src="~assets/tree2.png">
  <span class="height">{{ height }}'<br>height</span>
  <div class="dbh">{{ dbh }}" diameter at breast height</div>
  <div class="points">{{ points }} points</div>
</div>
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
  width: 255px;
  img,
  .height {
    display: inline-block;
    vertical-align: middle;
  }
  .dbh,
  .spread {
    width: 205px;
    text-align: center;
  }
  .height {
    padding-top: 130px;
    height: 293px;
  }
  .points {
    position: absolute;
    font-size: 20px;
    top: 114px;
    left: 44px;
  }
}
</style>
