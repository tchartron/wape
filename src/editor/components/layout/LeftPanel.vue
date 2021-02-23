<template>
  <div class="left-panel">
    <div class="actions">
      <div class="add" @click="switchPanel('add')">
        <i class="fas fa-plus" />
      </div>
      <div class="structure" @click="switchPanel('structure')">
        <i class="fas fa-bars" />
      </div>
    </div>
    <transition name="fade" @after-leave="animationEnd">
      <div v-if="(showPanel('add')) && !animating" class="add-element">
        <div class="layout-wrapper">
          <div class="layout-category">
            Layouts
          </div>
          <div class="layouts">
            <div v-for="layout in layouts" :key="layout.id" class="layout draggable" :data-id="layout.id">
              <i :class="layout.icon" />
              <span class="elem-title">{{ layout.title }}</span>
            </div>
          </div>
        </div>
        <div v-for="element in elements" :key="element.id" class="element-wrapper" :data-id="element.id">
          <div class="element-category">
            {{ element.title }}
          </div>
          <div class="elements">
            <div v-for="elem in element.elements" :key="elem.id" class="elem draggable" :data-id="elem.id">
              <i :class="elem.icon" />
              <span class="elem-title">{{ elem.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade" @after-leave="animationEnd">
      <div v-if="(showPanel('structure') && !animating)" class="show-structure">
        <p>STRUCTURE</p>
      </div>
    </transition>
  </div>
</template>

<script>
import layouts from 'Editor/blocks/layouts'
import elements from 'Editor/blocks/elements'
// import Drag from 'Editor/DragDrop/Drag'

export default {
    name: 'LeftPanel',
    data() {
      return {
        current_panel: 'add',
        animating: false,
        layouts,
        elements
      }
    },
    mounted() {
      // this.drag = new Drag('.draggable', [...this.layouts, ...this.elements[0].elements, ...this.elements[1].elements, ...this.elements[2].elements])
      // this.drag.bindEvents()
    },
    methods: {
      switchPanel(panel) {
        this.animating = true
        this.current_panel = panel
      },
      showPanel(panel) {
        return (this.current_panel === panel)
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
      width: 250px;
  }
  div.left-panel > div.actions {
    display: flex;
    border-bottom: .5px solid #000;
    height: 2.6rem;
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
    overflow-y: scroll;
    height: calc(100% - 2.7rem);
  }
  /*div.left-panel > div.add-element > div.layout {
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
    user-select: none;
  }*/
 /* div.left-panel > div.add-element > div.layout > svg {
    font-size: 3rem;
    color: #fff;
    margin: auto;
  }*/
  /*div.layout > span.elem-title {
    text-align: center;
    color: #fff;
    font-weight: 300;
    font-size: 0.9rem;
    margin-top: .5rem;
  }*/
  div.left-panel > div.add-element > div.element-wrapper,
  div.left-panel > div.add-element > div.layout-wrapper {
    display: flex;
    flex-direction: column;
    margin: 3% 2.5%;
    width: 95%;
    min-width: 95%;
    box-sizing: border-box;
    user-select: none;
  }
  div.left-panel > div.add-element > div.element-wrapper > div.element-category,
  div.left-panel > div.add-element > div.layout-wrapper > div.layout-category {
    color: #fff;
    text-transform: capitalize;
    font-size: 1.2rem;
    border-bottom: 1px solid #fff;
    padding-bottom: .7rem;
  }
  div.left-panel > div.add-element > div.element-wrapper > div.elements,
  div.left-panel > div.add-element > div.layout-wrapper > div.layouts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  div.left-panel > div.add-element > div.element-wrapper > div.elements > div.elem,
  div.left-panel > div.add-element > div.layout-wrapper > div.layouts > div.layout {
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
    user-select: none;
  }
  div.left-panel > div.add-element > div.element-wrapper > div.elements > div.elem > svg,
  div.left-panel > div.add-element > div.layout-wrapper > div.layouts > div.layout > svg {
    font-size: 2rem;
    color: #fff;
    margin: auto;
  }
  div.left-panel > div.add-element > div.element-wrapper > div.elements > div.elem > span,
  div.left-panel > div.add-element > div.layout-wrapper > div.layouts > div.layout > span {
    text-align: center;
    color: #fff;
    font-weight: 300;
    font-size: 0.9rem;
    margin-top: .5rem;
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
