<!-- A Vertex in the graph -->
<!-- We have the circle with the text inside -->
<template>
  <g text-anchor= "middle" @click.stop= "select">
    <!-- g stands for grouping the elements -->
    <circle :cx= vx :cy= vy r= "25" :class= "{selected: selected}" />
    <!-- The id of the vertex -->
    <text :x= vx :y= vy dy= "5" :class= "{selected: selected}" >{{id}}</text>
    <!-- The name of the vertex -->
    <text :x= vx :y= vy dy= "43" :class= "{selected: selected}" >{{name}}</text>
  </g>
</template>

<script>
  export default {
    name: 'VertexObj',
    props: ['vx', 'vy', 'id', 'selected', 'name'],
    // data() {
    //   // Ask the name for the vertex whenever we instanciate one
    //   let name= prompt("Enter the name of the vertex");  // The name of the vertex
    //   return {
    //     name
    //   }
    // },
    methods: {
      select() {
        this.$emit('selected', this.id);  // Emit an event to the parent to remove focus on the any other child
      }
    }
  }
</script>

<style scoped>
  g {
    cursor: pointer;
  }
  text {
    font-weight: 900;
  }
  circle {
    fill: #ffffff;
  }
  .selected {
    stroke: blue;
  }
</style>