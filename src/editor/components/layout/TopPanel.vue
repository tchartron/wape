<template>
  <div class="top-panel">
    <div class="logo">
      <i class="fab fa-weebly" />
    </div>
  </div>
</template>

<script>
import TopPanel from 'Components/layout/TopPanel.vue'

export default {
    name: 'TopPanel',
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
    div.top-panel {
        align-items: center;
        background: #454545;
        display: flex;
        height: 3.5rem;
    }
    div.top-panel > div.logo {
        color: #ffffff;
        font-size: 2rem;
        padding: .5rem
    }
</style>
