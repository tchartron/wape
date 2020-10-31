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
import Container from 'Editor/Container'
import Element from 'Editor/Element'
import isEmpty from 'lodash/isEmpty'
import { emitter } from 'App/Wape'

export default {
    name: 'MainPanel',
    data() {
      return {
        iframe: Object,
        canvasWidth: 'calc(100vw - 500px)',
        selectedContainer: Object,
        elementHovered: Object,
        selectedElement: Object
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
        this.iframe.document.documentElement.addEventListener('click', this.iframeClick, false)
        this.iframe.document.documentElement.addEventListener('mousemove', this.iframeMouseMove, false)
      },
      iframeMouseMove(event) {
        let element = event.target
        let dontHighlightTags = ['HTML', 'BODY']
        if(!dontHighlightTags.includes(element.tagName)) {
          if(this.elementHovered !== element) {
            if(!isEmpty(this.elementHovered)) {
              this.elementHovered.removeClass('element-hovered')
            }
            this.elementHovered = new Element(element)
            this.elementHovered.addClass('element-hovered')
          }
        }
      },
      iframeClick(event) {
        let elements = this.iframe.document.elementsFromPoint(event.clientX, event.clientY)
        let layout = elements.find((elem) => {
            return (elem.matches('.layout'))
        })
        if(typeof layout !== 'undefined') {
          if(this.selectedContainer.element !== layout) { //if we selected another container than the current one
            if(!isEmpty(this.selectedContainer)) {
              this.selectedContainer.removeClass('container-selected')
            }
            this.selectedContainer = new Container(layout)
            this.selectedContainer.addClass('container-selected')
            // let children = this.selectedContainer.getChildren()
          }
        }
        if(!isEmpty(this.elementHovered)) {
          this.selectedElement = this.elementHovered
        }
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
