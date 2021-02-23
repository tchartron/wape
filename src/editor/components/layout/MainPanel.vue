<template>
  <div id="canvas" class="canvas" :style="{ width: canvas_width }">
    <iframe id="iframe" name="iframe" :src="iframeFilePath" class="iframe" @load="iframeLoaded" />
  </div>
</template>

<script>
import Iframe from 'Editor/Iframe'
import layouts from 'Editor/elements/layouts'
import elements from 'Editor/elements/elements'
import { Dragger } from 'Editor/Dragger/Dragger'
import Container from 'Editor/Container'
import Element from 'Editor/Element'
import isEmpty from 'lodash/isEmpty'
import { emitter } from 'App/Wape'

export default {
    name: 'MainPanel',
    data() {
      return {
        iframe: Object,
        canvas_width: 'calc(100vw - 500px)',
        element_hovered: Object,
        selected_container: Object,
        selected_element: Object
      }
    },
    computed: {
      iframeFilePath() {
        return 'iframe.html'
      }
    },
    mounted() {
      emitter.on('device-change', (args) => { //Fired from TopPanel.vue
        this.canvas_width = args.width
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
          if(this.element_hovered !== element) {
            if(!isEmpty(this.element_hovered)) {
              this.element_hovered.removeClass('element-hovered')
            }
            this.element_hovered = new Element(element)
            this.element_hovered.addClass('element-hovered')
          }
        }
      },
      iframeClick(event) {
        let elements = this.iframe.document.elementsFromPoint(event.clientX, event.clientY)
        let layout = elements.find((elem) => {
            return (elem.matches('.layout'))
        })
        if(typeof layout !== 'undefined') {
          if(this.selected_container.element !== layout) { //if we selected another container than the current one
            if(!isEmpty(this.selected_container)) {
              this.selected_container.removeClass('container-selected')
            }
            this.selected_container = new Container(layout)
            this.selected_container.addClass('container-selected')
            // let children = this.selected_container.getChildren()
          }
        }
        if(!isEmpty(this.element_hovered)) {
          this.selected_element = this.element_hovered
        }
        emitter.emit('iframe-click', { container: this.selected_container, element: this.selected_element })
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
