<template>
  <!-- eslint-disable vue/no-v-html  -->
  <div
    class="main-panel"
    @drop="handleDrop"
    @dragover.prevent
    v-html="content"
  />
</template>

<script>
export default {
    name: 'MainPanel',
    data() {
      return {
        currentElement: false,
        content: ''
      }
    },
    mounted() {
      this.$root.$on('dragging-element', (elem) => {
        this.currentElement = elem
        console.log(this.currentElement)
      })
    },
    methods: {
      handleDrop() {
        if(this.currentElement) {
          this.content += this.currentElement.content
        }
      }
    }
}
</script>

<style scoped>
  div.main-panel {
    width: 100%;
    height: 100%;
  }
</style>
