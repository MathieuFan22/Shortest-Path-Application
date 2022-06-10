<!-- SVG group for an edge in the graph -->
<template>
  <g text-anchor= "middle">
    <path :class= "{passing: passing}" stroke-width= "3" :d= "path" />
    <!-- The endpoint is just a circle -->
    <circle :class= "{forth: forth}" :cx= "x2" :cy= "y2" r= "4" />
    <text :x= "x2" :y= "y2" :dy= "forth? -20: 20">{{weight}}</text>
  </g>
</template>

<script>
  export default {
    name: 'EdgeObj',
    props: {
      // Coordinates in the SVG Container
      from: String,
      to: String,
      forth: Boolean,
      weight: Number,
      passing: Boolean
    },
    data() {
      let coord1= this.from.split(',');
      let coord2= this.to.split(',');
      // Getting the coordinates
      let x1= parseInt(coord1[0]);
      let y1= parseInt(coord1[1]);
      let x2= parseInt(coord2[0]);
      let y2= parseInt(coord2[1]);

      let path= `M ${x1} ${y1} L ${x2} ${y2} Z`;
      return {
        path,
        x1, y1,
        x2, y2, // The endpoints
      }
    }
  }
</script>

<style scoped>
  text {
    font-weight: 900;
  }
  circle {
    fill: blue;
  }
  .forth {
    fill: red;
  }
  .passing {
    stroke: green;
  }
</style>