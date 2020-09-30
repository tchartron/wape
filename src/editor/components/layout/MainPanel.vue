<template>
  <!-- eslint-disable vue/no-v-html  -->
  <div class="main-panel">
    <iframe
      id="content"
      name="content"
      :src="iframeFilePath"
      class="content"
      @load="iframeLoaded"
    />
  </div>
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
      })
    },
    methods: {
      iframeLoaded() {
        this.iframe = new Iframe('#content')
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
  div.main-panel {
    width: 100%;
    height: 100%;
  }
  iframe.content {
    display: block;
    border: 0px none;
    height: 100%;
    width: 100%;
  }
</style>
