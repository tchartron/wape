<template>
  <div class="left-panel">
    <div class="actions">
      <div class="add">
        <i class="fas fa-plus" />
      </div>
      <div class="structure">
        <i class="fas fa-bars" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LeftPanel',
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
    div.left-panel {
        background-color: #454545;
        border-top: .5px solid #000;
        height: calc(100vh - 3.5rem);
        width: 15rem;
    }
    div.left-panel > div.actions {
      display: flex;
      flex-grow: 1;
    }
    div.left-panel > div.actions > div {
      padding: .5rem;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
    }
    div.left-panel > div.actions > div.add
    {
      border-right: .5px solid #000;
    }
    div.left-panel > div.actions > div.structure
    {
      border-right: .5px solid #000;
    }
</style>
