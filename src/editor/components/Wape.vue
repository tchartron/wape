<template>
  <div class="wape">
    <TopPanel />
    <div class="wrapper">
      <LeftPanel />
      <div class="canvas">
        content
      </div>
      <RightPanel />
    </div>
  </div>
</template>

<script>
import TopPanel from 'Components/layout/TopPanel.vue'
import LeftPanel from 'Components/layout/LeftPanel.vue'
import RightPanel from 'Components/layout/RightPanel.vue'

export default {
    name: 'Wape',
    components: {
        TopPanel,
        LeftPanel,
        RightPanel
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
  div.wrapper {
    display: flex;
  }
  div.canvas {
    width: 100%;
  }
</style>
