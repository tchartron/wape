<template>
  <iframe
    id="content"
    name="content"
    :src="iframeFilePath"
    class="content"
    @load="iframeLoaded"
  />
</template>

<script>
import Iframe from 'Editor/Iframe'

export default {
    name: 'MainPanel',
    data() {
      return {
        // currentElement: false,
        // content: '',
        iframe: Object
      }
    },
    computed: {
      iframeFilePath() {
        return 'iframe.html'
      }
    },
    mounted() {
      this.$root.$on('dragging-element', (elem) => {
        // this.currentElement = elem
        this.iframe.draggedElem = elem
      })
    },
    methods: {
      iframeLoaded() {
        this.iframe = new Iframe('#content', '#editor-content')
        this.iframe.bindEvents()
      }
    }
}
</script>

<style scoped>
  iframe.content {
    display: block;
    border: 0px none;
    height: 100%;
    width: 100%;
  }
</style>
