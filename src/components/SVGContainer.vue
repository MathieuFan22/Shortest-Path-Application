<!-- SVG Canvas to draw path etc -->
<template>
  <div id= 'container'>
    <svg @click= "emitToApp">
      <!-- When passing the parameter to setSelection, we pass directly index to get it from the Array in the main App -->
      <VertexObj v-for= "(vertex, index) in vertices" :key= "index" :vx= "vertex[0]" :vy= "vertex[1]" :id= "index + 1" :selected= "vertex[2]" :name= "vertex[3]" @selected= "passToApp" />
      <EdgeObj v-for= "(edge, index) in edges" :key= "index" :from= "edge[0]" :to= "edge[1]" :forth= "edge[2]" :weight= "edge[3]" :passing= "edge[6]" />
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
      linkingMode: Boolean,
      vertices: Array,
      edges: Array
    },
    data() {
      let first= undefined;
      return {
        first,
      }
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
        let { clientX, clientY }= e;  // Destructure the event
        if (this.placingMode) {
          let name= prompt("Enter the vertex name (facultative)");
          if (name !== null)  // Only validate when name is different from null as null == cancelling
          {
            console.log(name);
            this.$emit('addingVertex', [clientX, clientY, false, name]);
          }
          else
            this.$emit('donePlacing');
        }
        else {
          this.$emit('donePlacing');
        }
        // Clear the first selected variable
        this.first= undefined;
      },
      // async waitSecondParam() {
      //   // Wait the second parameter
      //   let v2= undefined;
      //   while (v2 == undefined) {

      //   }
      // },
      passToApp(index) {
        if (this.linkingMode) {
          // linkingMode requires 2 index to link
          if (this.first != undefined) {
            if (this.first !== index) {
              let p, weight;
              do {
                p= prompt("Enter the weight (1 is the default weight)");
                if (parseInt(p) <= 0)
                  alert('Please enter a positive number');
              } while (parseInt(p) <= 0 && p !== null && p !== "");
              if (p !== null) {
                if (p == "")
                  weight= 1;
                else
                  weight= parseInt(p);
                this.$emit('createEdge', this.first, index, weight);
                this.first= undefined;  // Reset first
              }
              else {
                this.first= undefined;
                this.$emit('donePlacing');
              }
            }
            else {
              // Reset if they are the same
              this.$emit('donePlacing');
              this.first= undefined;
            }
          }
          else {
            this.$emit('setSelection', index); // Selection color
            this.first= index;
          }
        }
        else
          this.$emit('setSelection', index);
      }
    }
  }
</script>

<style>
  svg {
    height: 100%;
    width: 100%;
  }
  path, circle {
    stroke: #000000;
    stroke-width: 3px;
    fill: none;
  }
  #container {
    margin: 5px 10px 5px 5px;
    cursor: pointer;
    border: solid 1px black;
    background: #bbbbbb;
    position: absolute;
    width: calc(100% - 160px);
    height: calc(100% - 10px);
  }
</style>