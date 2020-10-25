<template>
  <div class="wape">
    <TopPanel />
    <div class="wrapper">
      <LeftPanel />
      <MainPanel />
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
</style>
