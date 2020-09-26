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
    <transition
      name="fade"
      @after-leave="animationEnd"
    >
      <div
        v-if="(showPanel('add')) && !animating"
        class="add-element"
      >
        <div
          v-for="template in templates"
          :key="template.id"
          class="elem"
          draggable="true"
        >
          <i :class="template.icon" />
          <span class="elem-title">{{ template.title }}</span>
        </div>
      </div>
    </transition>
    <transition
      name="fade"
      @after-leave="animationEnd"
    >
      <div
        v-if="(showPanel('structure') && !animating)"
        class="show-structure"
      >
        <p>STRUCTURE</p>
      </div>
    </transition>
  </div>
</template>

<script>
import templates from 'Editor/templates/templates'

export default {
    name: 'LeftPanel',
    data() {
      return {
        currentPanel: 'add',
        animating: false,
        templates
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
  div.left-panel {
      background-color: #454545;
      border-top: .5px solid #000;
      width: 20rem;
  }
  div.left-panel > div.actions {
    display: flex;
    border-bottom: .5px solid #000;
    margin-bottom: 1rem;
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
  div.left-panel > div.add-element {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 1rem;
  }
  div.left-panel > div.add-element > div.elem {
    display: flex;
    cursor: all-scroll;
    justify-content: space-between;
    flex-direction: column;
    margin: 3% 2.5%;
    width: 45%;
    min-width: 45%;
    box-sizing: border-box;
    border: 1px solid #000;
    padding: 1em;
    border-radius: 5px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.7);
  }
  div.left-panel > div.add-element > div.elem > i {
    font-size: 3rem;
    color: #fff;
    text-align: center;
  }
  /* Animations thanks animista.net */
  .fade-enter-active {
    -webkit-animation: swing-in-top-fwd 0.7s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
            animation: swing-in-top-fwd 0.7s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
  }
  .fade-leave-active {
    -webkit-animation: swing-out-top-bck 0.7s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
            animation: swing-out-top-bck 0.7s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
  }
  @-webkit-keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
              transform: rotateX(-100deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 1;
    }
  }
  @keyframes swing-in-top-fwd {
    0% {
      -webkit-transform: rotateX(-100deg);
              transform: rotateX(-100deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 1;
    }
  }

  @-webkit-keyframes swing-out-top-bck {
    0% {
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 1;
    }
    100% {
      -webkit-transform: rotateX(-100deg);
              transform: rotateX(-100deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 0;
    }
  }
  @keyframes swing-out-top-bck {
    0% {
      -webkit-transform: rotateX(0deg);
              transform: rotateX(0deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 1;
    }
    100% {
      -webkit-transform: rotateX(-100deg);
              transform: rotateX(-100deg);
      -webkit-transform-origin: top;
              transform-origin: top;
      opacity: 0;
    }
  }
</style>
