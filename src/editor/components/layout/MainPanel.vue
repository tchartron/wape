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
import Drop from 'Editor/DragDrop/Drop'

export default {
    name: 'MainPanel',
    data() {
      return {
        iframe: Object,
        drop: Object
      }
    },
    computed: {
      iframeFilePath() {
        return 'iframe.html'
      }
    },
    mounted() {
    },
    methods: {
      iframeLoaded() {
        this.iframe = new Iframe('#iframe')
        this.drop = new Drop('#editor-content')
        this.drop.setIframeContext(this.iframe)
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
