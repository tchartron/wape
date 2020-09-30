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
        currentElement: false,
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
        this.currentElement = elem
        this.iframe.elemDomString = elem.content
      })
    },
    methods: {
      iframeLoaded() {
        this.iframe = new Iframe('#content', '.container')
        this.iframe.bindEvents()
      },
      handleDrop() {
        // if(this.currentElement) {
        //   this.content += this.currentElement.content
        // }
        console.log('dropped')
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
