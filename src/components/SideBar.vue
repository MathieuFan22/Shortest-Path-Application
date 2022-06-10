<!-- The sidebar -->
<template>
  <div id= 'sidebar'>
    <!-- Buttons -->
    <button :class= "{active: placingMode}" @click= "togglePlacingMode">
      Place a vertex
    </button>
    <button :class= "{active: linkingMode}" @click= "toggleLinkingMode">
      Link two vertices
    </button>
    <button :class= "{removal: removingMode}" :disabled= "!removingMode" @click= "$emit('toggleRemoval')">
      Remove vertex
    </button>
    <label>
      From:
    </label>
    <select id= "from">
      <option v-for= "(vertex, index) in vertices" :key= "index" :value= "index+1">
        {{vertex[3] !== ""? ": " + vertex[3]: "Vertex " + (index + 1)}}
      </option>
    </select>
    <label>
      To:
    </label>
    <select id= "to">
      <option v-for= "(vertex, index) in vertices" :key= "index" :value= "index+1">
        {{vertex[3] !== ""? ": " + vertex[3]: "Vertex " + (index + 1)}}
      </option>
    </select>
    <button id= "submit" @click= "evaluate">
      Evaluate
    </button>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    props: {
      placingMode: Boolean,
      linkingMode: Boolean,
      removingMode: Boolean,
      vertices: Array
    },
    methods: {
      togglePlacingMode() {
        // this.placingMode= !this.placingMode;
        // if (this.linkingMode && this.placingMode) {
        //   // Turn off placing mode
        //   this.linkingMode= false;
        // }
        this.$emit('togglePlacingMode');
      },
      toggleLinkingMode() {
        // this.linkingMode= !this.linkingMode;
        // if (this.linkingMode && this.placingMode) {
        //   // Turn off placing mode
        //   this.placingMode= false;
        // }
        this.$emit('toggleLinkingMode');
      },
      evaluate() {
        let _from= document.getElementById('from');
        let _to= document.getElementById('to');
        console.log(parseInt(_from.value), parseInt(_to.value));
        this.$emit('evaluate', parseInt(_from.value), parseInt(_to.value));
      }
    },
  }
</script>

<style scoped>
  button {
    margin: 4px 0;
    cursor: pointer;
    height: 50px;
    width: 95px;
    font-weight: 900;
  }
  select {
    cursor: pointer;
    width: 95px;
  }
  #submit {
    /*position: absolute;*/
    background: #5555ff;
    color: white;
    bottom: 5px;
  }
  #submit:hover {
    background: #4444ff;
  }
  .removal {
    background: red;
    color: #ffffff;
  }
  .active {
    background: #00bb00;
    color: #ffffff;
  }
  #sidebar {
    display: block;
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    border: solid 2px yellow;
  }
</style>