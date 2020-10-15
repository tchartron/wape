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
// import Drop from 'Editor/DragDrop/Drop'
import layouts from 'Editor/elements/layouts'
import elements from 'Editor/elements/elements'
import Dragger from 'Editor/Dragger/Dragger'

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
        let elemArray = []
        for(let elem of elements) {
          elemArray.push(...elem.elements)
        }
        let templates = [...layouts, ...elemArray]
        this.iframe = new Iframe('#iframe')
        this.dragger = new Dragger('.draggable', '.droppable', {
          iframe: this.iframe,
          templates: templates
        })
        // this.drop = new Drop('#editor-content')
        // this.drop.setIframeContext(this.iframe)
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
