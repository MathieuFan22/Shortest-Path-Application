<template>
  <div>
    <SVGContainer :vertices= "vertices" :placingMode= "placing" @setSelection= "setSelection" @act= "act" @donePlacing= "togglePlacingMode"  />
    <SideBar :placingMode= "placing" :linkingMode= "linking" :removingMode= "removing" @togglePlacingMode= "togglePlacingMode" @toggleLinkingMode= "toggleLinkingMode" @toggleRemoval= "removeVertex" />
  </div>
</template>

<script>
  import SVGContainer from '@/components/SVGContainer';
  import SideBar from '@/components/SideBar';

  export default {
    name: 'App',
    components: {
      SVGContainer,
      SideBar
    },
    data() {
      let placing= false;
      let linking= false;
      let removing= false;
      let currentlySelected= null;
      let vertices= []
      return {
        placing,
        linking,
        removing,
        currentlySelected,
        vertices
      }
    },
    // computed: {
    //   togglePlacingMode() {
    //     return !this.placing;
    //   }
    // },
    methods: {
      /* PRINCIPAL GRAPH HANDLERS */
      act(newVertex) {
        console.log("Acting");
        if (this.placing) {
         // If on placing mode, place vertex else don't place any vertex
         this.vertices.push(newVertex);
         // Then quit placing mode
         this.placing= false;
        }
      },
      unfocus() {
        // Remove the selection from the current Vertex
        if (this.currentlySelected !== null) {
          // Take off the currentlySelected one
          this.vertices[this.currentlySelected][2]= false;
        }
      },
      setSelection(index) {
        this.unfocus()

        // Set the selection to the id
        this.currentlySelected= index - 1;
        this.vertices[this.currentlySelected][2]= true;
        if (!this.linking)
          // Activate the removing method if we are not in linking mode
          this.removing= true;
      },
      removeVertex() {
        // Remove the vertex and reset the vertices array
        // No need to test as the button is disabled if no vertex is selected
        console.log('here: ' + this.currentlySelected);
        let tmp= [];
        for (let i= 0; i < this.vertices.length; i++) {
          if (i !== this.currentlySelected)
            tmp.push(this.vertices[i]);
        }
        this.vertices= tmp;
        this.currentlySelected= null; // Reset the selected item
        this.removing= false; // Finished removal
      },

      /* EVENT HANDLERS */
      togglePlacingMode() {
        this.unfocus();
        this.placing= !this.placing;
        if (this.placing && this.linking) {
          // Turn off linking mode
          this.linking= false;
        }
        this.removing= false; // Disable removal
      },
      toggleLinkingMode() {
        this.unfocus();
        this.linking= !this.linking;
        if (this.linking && this.placing) {
          // Turn off linking mode
          this.placing= false;
        }
        this.removing= false; // Disable removal 
      }
    }
  }
</script>

<style>
  * {
    /* General style */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }
  body {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
