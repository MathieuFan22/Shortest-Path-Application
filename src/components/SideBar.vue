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
    <!-- <button :class= "{removal: removingMode}" :disabled= "!removingMode" @click= "$emit('toggleRemoval')">
      Remove vertex
    </button> -->
    <button class= "removal" @click= "$emit('clear')">
      Clear
    </button>

    <label>Path color:</label>
    <select id= "color">
      <option value= 'green'>Green</option>
      <option value= 'purple'>Purple</option>
      <option value= 'yellow'>Yellow</option>
      <option value= 'orange'>Orange</option>
    </select>

    <div id= "submitter">
      <h3 v-if= "shortest !== 0">Path Weight: <span id= 'min' :class= "getColor">{{shortest}}</span></h3>
      <br />
      <label>
        From:
      </label>
      <select id= "from">
        <option v-for= "(vertex, index) in vertices" :key= "index" :value= "index+1">
          {{vertex[3] !== ""? (index + 1) + ": " + vertex[3]: "Vertex " + (index + 1)}}
        </option>
      </select>
      <label>
        To:
      </label>
      <select id= "to">
        <option v-for= "(vertex, index) in vertices" :key= "index" :value= "index+1">
          {{vertex[3] !== ""? (index + 1) + ": " + vertex[3]: "Vertex " + (index + 1)}}
        </option>
      </select>
      <button id= "submit" @click= "evaluate">
        Evaluate
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    props: {
      placingMode: Boolean,
      linkingMode: Boolean,
      removingMode: Boolean,
      vertices: Array,
      shortest: Number
    },
    computed: {
      getColor() {
        return document.getElementById('color').value;
      }
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
        if (parseInt(_from.value) == parseInt(_to.value))
          alert("Please select two different vertices");  // Same vertex
        else
        this.$emit('evaluate', parseInt(_from.value), parseInt(_to.value), document.getElementById('color').value);
      }
    },
  }
</script>

<style scoped>
  button {
    margin: 2px;
    cursor: pointer;
    height: 50px;
    width: 145px;
    font-weight: 900;
    border-radius: 10px;
  }
  select {
    margin: 2px;
    cursor: pointer;
    width: 145px;
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
  #submitter {
    position: absolute;
    bottom: 5px;
  }
  .removal {
    background: red;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .active {
    background: #00bb00;
    color: #ffffff;
  }
  #sidebar {
    display: block;
    position: absolute;
    right: 0;
    width: 150px;
    height: 100%;
    text-align: center;
  }
  #min {
    display: block;
    text-align: center;
    font-size: 50px;
  }
</style>