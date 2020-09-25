<template>
  <div class="top-panel">
    <div class="logo">
      <i class="fab fa-weebly" />
    </div>
    <div class="devices">
      <div class="desktop">
        <i class="fas fa-desktop" />
      </div>
      <div class="tablet">
        <i class="fas fa-tablet-alt" />
      </div>
      <div class="mobile">
        <i class="fas fa-mobile-alt" />
      </div>
    </div>
    <div class="actions">
      <div class="undo">
        <i class="fas fa-undo" />
      </div>
      <div class="redo">
        <i class="fas fa-redo" />
      </div>
      <div class="code">
        <i class="fas fa-code" />
      </div>
      <div class="save">
        <i class="far fa-save" />
      </div>
    </div>
  </div>
</template>

<script>
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
      align-items: center;
      border-right: 0.7px solid #000;
      color: #fff;
      display: flex;
      font-size: 2rem;
      padding: 0 .5rem;
      height: 100%;
    }
    div.top-panel > div.devices {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      height: 100%;
    }
    div.top-panel > div.actions {
      display: flex;
      justify-content: center;
      height: 100%;
    }
    div.top-panel > div.devices > div,
    div.top-panel > div.actions > div {
      align-items: center;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: center;
      font-size: 1.5rem;
      width: 3rem;
    }
    div.top-panel > div.devices > div.desktop,
    div.top-panel > div.actions > div.undo
    {
      border-left: .5px solid #000;
    }
    div.top-panel > div.devices > div.tablet,
    div.top-panel > div.actions > div.redo
    {
      border-left: .5px solid #000;
      border-right: .5px solid #000;
    }
    div.top-panel > div.devices > div.mobile,
    div.top-panel > div.actions > div.code
    {
      border-right: .5px solid #000;
    }
</style>
