<template>
  <div class="right-panel">
    <div class="actions">
      <div class="style">
        <i class="fas fa-paint-brush" />
      </div>
      <div class="settings">
        <i class="fas fa-cog" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'RightPanel',
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
    div.right-panel {
      background-color: #454545;
      border-top: .5px solid #000;
      width: 250px;
    }
    div.right-panel > div.actions {
      display: flex;
      border-bottom: .5px solid #000;
    }
    div.right-panel > div.actions > div {
      padding: .5rem;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
    }
    div.right-panel > div.actions > div.style
    {
      border-right: .5px solid #000;
    }
    div.right-panel > div.actions > div.setting
    {
      border-right: .5px solid #000;
    }
</style>
