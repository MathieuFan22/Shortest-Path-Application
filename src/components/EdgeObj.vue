<!-- SVG group for an edge in the graph -->
<template>
  <g>
    <marker id= "circle">
      <circle cx= "0" cy= "15" r= "20" />
    </marker>
    <path stroke-width= "3" :d= "path" marker-end= "url(#circle)" />
  </g>
</template>

<script>
  export default {
    name: 'EdgeObj',
    props: {
      // Coordinates in the SVG Container
      from: String,
      to: String,
    },
    data() {
      let coord1= this.from.split(',');
      let coord2= this.to.split(',');
      // Getting the coordinates
      let x1= coord1[0];
      let y1= coord1[1];
      let x2= coord2[0];
      let y2= coord2[1];

      let path= `M ${x1} ${y1} L ${x2} ${y2} Z`;
      return {
        path
      }
    }
  }
</script>

<style>
  polyline {
    fill: none;
  }
</style>