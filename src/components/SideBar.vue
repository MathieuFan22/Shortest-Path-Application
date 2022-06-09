<!-- The sidebar -->
<template>
  <div id= 'sidebar'>
    <button :class= "{active: placingMode}" @click= "togglePlacingMode">
      Place a vertex
    </button>
    <button :class= "{active: linkingMode}" @click= "toggleLinkingMode">
      Link two vertices
    </button>
    <button :class= "{removal: removingMode}" :disabled= "!removingMode" @click= "$emit('toggleRemoval')">
      Remove vertex
    </button>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    props: {
      placingMode: Boolean,
      linkingMode: Boolean,
      removingMode: Boolean
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
      }
    },
  }
</script>

<style scoped>
  button {
    cursor: pointer;
    height: 50px;
    width: 100px;
    font-weight: 900;
  }
  .removal {
    background: red;
  }
  .active {
    background: #00bb00;
    color: #ffffff;
  }
  #sidebar {
    display: block;
    position: absolute;
    right: 0;
    float: right;
    width: 100px;
    border: solid 2px yellow;
  }
</style>