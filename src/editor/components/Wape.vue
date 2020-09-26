<template>
  <div class="wape">
    <TopPanel />
    <div class="wrapper">
      <LeftPanel />
      <div class="canvas" @drop="coco('bob')" @dragover.prevent @dragenter.prevent>
        <MainPanel />
      </div>
      <RightPanel />
    </div>
  </div>
</template>

<script>
import TopPanel from 'Components/layout/TopPanel.vue'
import LeftPanel from 'Components/layout/LeftPanel.vue'
import RightPanel from 'Components/layout/RightPanel.vue'
import MainPanel from 'Components/layout/MainPanel.vue'

export default {
    name: 'Wape',
    components: {
        TopPanel,
        LeftPanel,
        RightPanel,
        MainPanel
    },
    mounted() {
    },
    methods: {
      coco() {
        alert('hello')
      }
    }
}
</script>

<style scoped>
  div.wrapper {
    display: flex;
    height: calc(100vh - 3.5rem);
  }
  div.canvas {
    width: 100%;
  }
</style>
