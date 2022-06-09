<!-- SVG Canvas to draw path etc -->
<template>
  <div id= 'container'>
    <svg @click= "emitToApp">
      <!-- When passing the parameter to setSelection, we pass directly index to get it from the Array in the main App -->
      <VertexObj v-for= "(vertex, index) in vertices" :key= "index" :vx= "vertex[0]" :vy= "vertex[1]" :id= "index + 1" :selected= "vertex[2]" @selected= "passToApp" />
      <EdgeObj v-for= "(edge, index) in edges" :key= "index" :from= "edge[0]" :to= "edge[1]" />
      <EdgeObj from= "0,0" to= "50,50" />
    </svg>
  </div>    
</template>

<script>
  import VertexObj from '@/components/VertexObj'; 
  import EdgeObj from '@/components/EdgeObj';

  export default {
    name: 'SVGContainer',
    components: {
      VertexObj,
      EdgeObj
    },
    props: {
      placingMode: Boolean,
      vertices: Array,
      edges: Array
    },
    // data() {
    //   let vertices= []; // The list of the vertices
    //   let currentlySelected= null;  // No selected vertex yet
    //   return {
    //     vertices,
    //     currentlySelected
    //   }
    // },
    // methods: {
    //   act(e) {
    //     if (this.placingMode) {
    //      // If on placing mode, place vertex else don't place any vertex
    //      console.log([e.clientX, e.clientY]);
    //      this.vertices.push([e.clientX, e.clientY, false]);
    //      // Then quit placing mode
    //      this.$emit('donePlacing');
    //     }
    //   },
    //   setSelection(id) {
    //     // Set the selection to the id
    //     if (this.currentlySelected !== null) {
    //       // Take off the currentlySelected one
    //       this.vertices[this.currentlySelected][2]= false;
    //     }
    //     this.currentlySelected= id - 1;
    //     this.vertices[this.currentlySelected][2]= true;
    //   },
    // }
    methods: {
      emitToApp(e) {
        // Add the coordinate directly to the main controller in App
        this.$emit('act', [e.clientX, e.clientY, false]);
      },
      passToApp(index) {
        console.log(index);
        this.$emit('setSelection', index);
      }
    }
  }
</script>

<style>
  svg {
    border: solid 1px #000000;
    height: 100%;
    width: 100%;
  }
  path, circle {
    stroke: #000000;
    stroke-width: 3px;
    fill: none;
  }
  #container {
    border: solid 2px blue;
    position: absolute;
    width: calc(100% - 100px);
    height: 100%;
  }
</style>