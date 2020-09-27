<template>
  <!-- eslint-disable vue/no-v-html  -->
  <div
    class="main-panel"
    @drop="handleDrop"
    @dragover.prevent
  >
    <iframe
      id="content"
      name="content"
      :src="iframeFilePath"
      class="content"
    />
  </div>
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
    computed: {
      iframeFilePath() {
        return 'iframe.html'
      }
    },
    mounted() {
      this.$root.$on('dragging-element', (elem) => {
        this.currentElement = elem
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
  iframe.content {
    display: block;
    border: 0px none;
    height: 100%;
    width: 100%;
  }
</style>
