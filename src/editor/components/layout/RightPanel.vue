<template>
  <div class="right-panel">
    <div class="actions">
      <div
        class="container"
        @click="switchPanel('container')"
      >
        <i class="far fa-square" />
      </div>
      <div
        class="element"
        @click="switchPanel('element')"
      >
        <i class="fas fa-square" />
      </div>
    </div>
    <transition
      name="left"
      @after-leave="animationEnd"
    >
      <div
        v-if="(showPanel('container')) && !animating"
        class="container-settings"
      >
        CONTAINER
      </div>
    </transition>

    <transition
      name="right"
      @after-leave="animationEnd"
    >
      <div
        v-if="(showPanel('element')) && !animating"
        class="element-settings"
      >
        ELEMENT
      </div>
    </transition>
  </div>
</template>

<script>
export default {
    name: 'RightPanel',
    data() {
      return {
        currentPanel: 'container',
        animating: false,
      }
    },
    mounted() {
    },
    methods: {
      switchPanel(panel) {
        this.animating = true
        this.currentPanel = panel
      },
      showPanel(panel) {
        return (this.currentPanel === panel)
      },
      animationEnd() {
        this.animating = false
      }
    }
}
</script>

<style scoped>
    div.right-panel {
      background-color: #454545;
      border-top: .5px solid #000;
      width: 250px;
      overflow: hidden;
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
    div.right-panel > div.actions > div.container
    {
      border-right: .5px solid #000;
    }
    div.right-panel > div.actions > div.element
    {
      border-right: .5px solid #000;
    }

    /* Animations thanks animista.net */
  .left-enter-active {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
/*  .left-leave-active {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }*/
  .right-enter-active {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
 /* .right-leave-active {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
          animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }*/
  /* Animations thanks animista.net */
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-250px);
              transform: translateX(-250px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-250px);
              transform: translateX(-250px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  @-webkit-keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(250px);
              transform: translateX(250px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(250px);
              transform: translateX(250px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
              transform: translateX(0);
      opacity: 1;
    }
  }

</style>
