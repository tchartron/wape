<template>
  <div id="canvas" class="canvas" :style="{ width: canvas_width }">
    <iframe id="iframe" name="iframe" :src="iframeFilePath" class="iframe" @load="iframeLoaded" />
  </div>
</template>

<script>
import Iframe from 'Editor/Iframe'
import layouts from 'Editor/blocks/layouts'
import elements from 'Editor/blocks/elements'
import { Dragger } from 'Editor/Dragger/Dragger'
import Layout from 'Editor/classes/layouts/Layout'
import Grid from 'Editor/classes/layouts/Grid'
import Flex from 'Editor/classes/layouts/Flex'
import Element from 'Editor/classes/elements/Element'
import isEmpty from 'lodash/isEmpty'
import { emitter } from 'App/Wape'
import { layoutType } from 'Editor/utilities/layout'
import { findFirstChildMatching } from 'Editor/utilities/utilities'

export default {
    name: 'MainPanel',
    data() {
      return {
        iframe: Object,
        canvas_width: 'calc(100vw - 500px)',
        element_hovered: null,
        selected_layout: null,
        selected_element: null
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
        if (!dontHighlightTags.includes(element.tagName)) {
          if (this.element_hovered !== element) {
            if (this.element_hovered !== null) {
              this.element_hovered.classList.remove('element-hovered')
            }
            // this.element_hovered = new Element(element)
            this.element_hovered = element
            if (!this.element_hovered.matches('.toolbar, .toolbar *')) {
              this.element_hovered.classList.add('element-hovered')
            }
          }
        } else {
          if (this.element_hovered !== null) {
            this.element_hovered.classList.remove('element-hovered')
          }
          this.element_hovered = null
        }
      },
      iframeClick(event) {
        if (event.target.classList) {
          if (event.originalTarget.closest('.toolbar') !== null) { //Clicked in toolbar
            return false
          }
        }
        let elements = this.iframe.document.elementsFromPoint(event.clientX, event.clientY)
        let layout = elements.reverse().find((elem) => { // reverse elements to place flex containers before their columns (we need flex columns to have the layout class to handle dropping elements inside in dragger.js)
            return (elem.matches('.layout')) //If you find .flex first take this as main layout not the columns inside it
        })
        if (typeof layout !== 'undefined') {
          if (this.selected_layout === null || this.selected_layout.element !== layout) { //if we selected another layout than the current one
            if (this.selected_layout !== null) {
              this.selected_layout.removeClass('layout-selected')
              //remove previous layout toolbar
              // console.log(this.selected_layout)
              let previous_toolbar = this.selected_layout.element.querySelector('.toolbar')
              if (previous_toolbar !== null) {
                this.selected_layout.element.querySelector('.toolbar').remove()
              }
            }
            let layout_type = layoutType(layout)
            switch(layout_type) {
              case 'grid':
                this.selected_layout = new Grid(layout, layout_type)
              break;
              case 'flex':
                this.selected_layout = new Flex(layout, layout_type)
              break;
              default:
                this.selected_layout = new Layout(layout, layout_type)
            }
            this.selected_layout.addClass('layout-selected')
            this.selected_layout.displayToolbar()
          }
        } else {
          this.selected_layout = null
        }
        let element = elements.find((elem) => {
            return (elem.matches('.element-hovered'))
        })
        if (typeof element !== 'undefined') {
          if (this.selected_element === null || this.selected_element !== element) {
            if (this.selected_element !== null) {
              this.selected_element.removeClass('element-selected')
            }
            this.selected_element = new Element(element)
            this.selected_element.addClass('element-selected')
            // this.selected_element.displayToolbar()
            }
          } else {
            this.selected_element = null
        }
        emitter.emit('iframe-click', { container: this.selected_layout, element: this.selected_element })
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
