<template>
  <div class="left-panel">
    <div class="actions">
      <div
        class="add"
        @click="switchPanel('add')"
      >
        <i class="fas fa-plus" />
      </div>
      <div
        class="structure"
        @click="switchPanel('structure')"
      >
        <i class="fas fa-bars" />
      </div>
    </div>
    <div
      v-if="(showPanel('add'))"
      class="add-element"
    >
      <p>ADD</p>
    </div>
    <div
      v-if="(showPanel('structure'))"
      class="show-structure"
    >
      <p>STRUCTURE</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LeftPanel',
    data() {
      return {
        currentPanel: 'add'
      }
    },
    mounted() {
    },
    methods: {
      switchPanel(panel) {
        this.currentPanel = panel
      },
      showPanel(panel) {
        return (this.currentPanel === panel)
      }
    }
}
</script>

<style scoped>
    div.left-panel {
        background-color: #454545;
        border-top: .5px solid #000;
        width: 15rem;
    }
    div.left-panel > div.actions {
      display: flex;
      border-bottom: .5px solid #000;
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
