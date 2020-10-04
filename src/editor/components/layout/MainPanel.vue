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
import Drag from 'Editor/DragDrop/Drag'
import Drop from 'Editor/DragDrop/Drop'

export default {
    name: 'MainPanel',
    data() {
      return {
        iframe: Object,
        drag: Object,
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
        this.drag = new Drag('.draggable')
        this.drop = new Drop('#editor-content')

        // this.$root.$on('dragging-element', (template, event) => {
          // this.drag = new Drag(template, event.target)
          // if(!this.dragEventsBinded) {
            // this.drag.bindEvents()
            // this.dragEventsBinded = true
          // }
          // this.drop = new Drop('#editor-content', this.drag)
          // this.drop.setIframeContext(this.iframe)
          // if(!this.dropEventsBinded) {
            // this.drop.bindEvents()
            // this.dropEventsBinded = true
          // }
        // })
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
