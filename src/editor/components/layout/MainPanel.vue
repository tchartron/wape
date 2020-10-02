<template>
  <iframe
    id="iframe"
    name="iframe"
    :src="iframeFilePath"
    class="iframe"
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
      this.$root.$on('dragging-element', (elem, event) => {
        // this.currentElement = elem
        this.iframe.draggedElem = elem
        this.iframe.draggedEvent = event
      })
    },
    methods: {
      iframeLoaded() {
        this.iframe = new Iframe('#iframe', '#editor-content')
        this.iframe.bindEvents()
      }
    }
}
</script>

<style scoped>
  iframe.iframe {
    display: block;
    border: 0px none;
    height: 100%;
    width: 100%;
  }
</style>
