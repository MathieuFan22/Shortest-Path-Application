<template>
  <div>
    <SVGContainer :vertices= "vertices" :edges= "edges" :placingMode= "placing" :linkingMode= "linking" @setSelection= "setSelection" @addingVertex= "addVertex" @createEdge= "createEdge" @donePlacing= "donePlacing"  />
    <SideBar :placingMode= "placing" :linkingMode= "linking" :removingMode= "removing" :vertices= "vertices" :shortest= "shortest" @togglePlacingMode= "togglePlacingMode" @toggleLinkingMode= "toggleLinkingMode" @toggleRemoval= "removeVertex" @evaluate= "evaluate" @clear= "clear" />
  </div>
</template>

<script>
  import SVGContainer from '@/components/SVGContainer';
  import SideBar from '@/components/SideBar';
  // import { tester, mooreDijkstra, floydWarshall } from '@/shortestPathAlgorithms';
  import { mooreDijkstra } from '@/shortestPathAlgorithms';

  export default {
    name: 'App',
    components: {
      SVGContainer,
      SideBar
    },
    data() {
      // console.log(floydWarshall(tester));
      let placing= false;
      let linking= false;
      let removing= false;
      let shortest= 0;
      let currentlySelected= null;
      let vertices= []; // [cx, xy, selected, name]
      let edges= [];  // ["x1,y1", "x2,y2", forth, weight, v1, v2, passing]

      return {
        placing,
        linking,
        shortest,
        removing,
        currentlySelected,
        vertices,
        edges,
      }
    },
    // computed: {
    //   togglePlacingMode() {
    //     return !this.placing;
    //   }
    // },
    methods: {
      /* PRINCIPAL GRAPH HANDLERS */
      addVertex(newVertex) {
        // if (this.placing) {
         // If on placing mode, place vertex else don't place any vertex
         this.vertices.push(newVertex);
         // Then quit placing mode
         //this.placing= false;
        // }
      },
      createEdge(v1, v2, weight) {
        // v1 and v2 are the id of the vertices to link
        // index= id - 1 as we started indexing at 1
        v1--;
        v2--;

        let forth= false;  // To decide the color of the pointing edge
        if (v1 > v2) {
          // To set colors
          // console.log('Red');
          forth= true;
        }

        let x1= this.vertices[v1][0];
        let y1= this.vertices[v1][1];

        let x2= this.vertices[v2][0];
        let y2= this.vertices[v2][1];

        // Multiplicators
        let hypo= Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        let cos= (x1 - x2)/hypo;
        let sin= (y1 - y2)/hypo;

        let _from= (parseInt(x1 - 25*cos)) + ',' + (parseInt(y1 - 25*sin));
        let _to= (parseInt(x2 + 25*cos)) + ',' + (parseInt(y2 + 25*sin));

        let ret= [_from, _to, forth, weight, v1, v2, false];
        this.edges.push(ret); // v1 and v2 will be used to create M
        this.linkingMode= false;  // Finished linking
        this.unfocus();
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
        if (!this.linking) {
          // Activate the removing method if we are not in linking mode
          this.removing= true;
          this.placing= false;
        }
      },
      /***********************************************************/
      removeVertex() {
        // Remove the vertex and reset the vertices array
        // No need to test as the button is disabled if no vertex is selected
        // console.log('here: ' + this.currentlySelected);
        let tmp= [];
        for (let i= 0; i < this.vertices.length; i++) {
          if (i !== this.currentlySelected)
            tmp.push(this.vertices[i]);
        }
        this.vertices= tmp;
        this.currentlySelected= null; // Reset the selected item
        this.removing= false; // Finished removal
      },
      clear() {
        this.vertices= [];
        this.edges= [];
      },
      getMatrix() {
        // Create the adjacency matrix
        let M= [];
        // Evaluate M
        let range;
        for (let i= 0; i < this.vertices.length; i++) {
          // from vertex i to j
          range= [];
          for (let j= 0; j < this.vertices.length; j++){
            let tmp= 0;
            this.edges.forEach((edge) => {
              // From i to j
              if (edge[4] == i && edge[5] == j) {
                tmp= edge[3]; // Weight
              }
            }); // Enf forEach
            range.push(tmp);
          } // End for j
          M.push(range);
        } // End for i
        return M;
      },

      /* EVENT HANDLERS */
      evaluate(_from, _to, color) {
        // The evaluation
        //let output= mooreDijkstra(this.getMatrix(), _from);
        // let result= mooreDijkstra(this.getMatrix(), _from)[`to-${_to}`]; // Get the path from _from to _to
        let matrix= this.getMatrix();
        let result= mooreDijkstra(matrix, _from)[`to-${_to}`];
        if (result[1] == Infinity)
          alert("No path linking the two vertices");
        else
          this.shortest= result[1];
        // Color the path
        this.drawPath(result[0], color);
      },
      drawPath(result, color) {
        for (let i= 0; i < result.length - 1; i++) {
        // console.log('checking ' + i)
        // let newEdges= [];
          let edge= [];
          for (let j= 0; j < this.edges.length; j++) {
          // console.log(edge);
          // console.log('comparing ' + result[i] + ' and ' + (this.edges[j][4] + 1)+ ' and also ' + result[i+1] + ' and ' + (this.edges[j][5] + 1))
            if (result[i] == this.edges[j][4] + 1 && result[i+1] == this.edges[j][5] + 1) {
              edge.push(j);
              // console.log('Checking');
            }
          // newEdges.push(edge);
          } // End for
        // this.edges= newEdges;
          //Passing
          edge.forEach((index) => {
            this.edges[index][6]= color;
          });
        }
      },
      donePlacing() {
        this.placing= false;
        this.unfocus();
      },
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
    font-weight: bolder;
  }
  body {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
