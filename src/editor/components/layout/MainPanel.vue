<template>
  <div
    id="canvas"
    class="canvas"
    :style="{ width: canvasWidth }"
  >
    <iframe
      id="iframe"
      name="iframe"
      :src="iframeFilePath"
      class="iframe"
      @load="iframeLoaded"
    />
  </div>
</template>

<script>
import Iframe from 'Editor/Iframe'
import layouts from 'Editor/elements/layouts'
import elements from 'Editor/elements/elements'
import Dragger from 'Editor/Dragger/Dragger'
import { emitter } from 'App/Wape'

export default {
    name: 'MainPanel',
    data() {
      return {
        iframe: Object,
        canvasWidth: 'calc(100vw - 500px)'
      }
    },
    computed: {
      iframeFilePath() {
        return 'iframe.html'
      }
    },
    mounted() {
      emitter.on('device-change', (args) => {
        this.canvasWidth = args.width
      })
    },
    methods: {
      iframeLoaded() {
        let elemArray = []
        for(let elem of elements) {
          elemArray.push(...elem.elements)
        }
        let templates = [...layouts, ...elemArray]
        this.iframe = new Iframe('#iframe')
        this.dragger = new Dragger('.draggable', {
          iframe: this.iframe,
          templates: templates
        })
      }
    }
}
</script>

<style scoped>
  div.canvas {
    width: calc(100vw - 500px);
    height: 100%;
    background-color: #fff;
    transition: width 0.5s ease 0s;
  }
  iframe.iframe {
    display: block;
    border: 0px none;
    height: 100%;
    width: 100%;
  }
</style>
