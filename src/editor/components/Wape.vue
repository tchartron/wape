<template>
  <div class="wape">
    <TopPanel />
    <div class="wrapper">
      <LeftPanel />
      <div
        id="canvas"
        class="canvas"
        :style="{ width: canvasWidth }"
      >
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
import { emitter } from 'App/Wape'

export default {
    name: 'Wape',
    components: {
        TopPanel,
        LeftPanel,
        RightPanel,
        MainPanel
    },
    data() {
      return {
        canvasWidth: 'calc(100vw - 500px)'
      }
    },
    mounted() {
      emitter.on('device-change', (args) => {
        this.canvasWidth = args.width
      })
    },
    methods: {
    }
}
</script>

<style scoped>
  div.wrapper {
    display: flex;
    height: calc(100vh - 3.5rem);
    justify-content: space-between;
    background-color: #7f7f7f;
  }
  div.canvas {
    width: calc(100vw - 500px);
    height: 100%;
    background-color: #fff;
    transition: width 0.5s ease 0s;
  }
</style>
