<template>
  <div
    class="main-panel"
    @drop="coco('bob')"
    @dragover.prevent
  />
</template>

<script>
export default {
    name: 'MainPanel',
    mounted() {
    },
    methods: {
      coco() {
        console.log('drop')
      }
    }
}
</script>

<style scoped>
  div.main-panel {
    width: 100%;
    height: 100%;
  }
</style>
