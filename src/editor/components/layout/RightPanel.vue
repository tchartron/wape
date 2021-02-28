<template>
  <div class="right-panel">
    <div class="actions">
      <div class="container" @click="switchPanel('container')">
        <i class="far fa-square" />
      </div>
      <div class="element" @click="switchPanel('element')">
        <i class="fas fa-square" />
      </div>
    </div>
    <transition name="left" @after-leave="animationEnd">
      <div v-if="(showPanel('container')) && !animating" class="container-settings">
          <div class="options">
            <div class="grid" v-if="isGrid(selected_container)">
              <div class="gap">
                <div class="select">
                  <label for="rows-gap">Rows gap</label>
                  <select id="rows-gap" name="rows-gap" @change="replaceClass(selected_container, selected_row_gap.value, mappers.grid_mapper.gap.regex_patterns.rows_gap)" v-model="selected_row_gap">
                    <option v-for='(row_gap, index) in mappers.grid_mapper.gap.rows_gap' :key="index" :value="row_gap">{{ row_gap.text }}</option>
                  </select>
                </div>
                <div class="select">
                  <label for="cols-gap">Cols gap</label>
                  <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_container, selected_col_gap.value, mappers.grid_mapper.gap.regex_patterns.cols_gap)" v-model="selected_col_gap">
                    <option v-for='(col_gap, index) in mappers.grid_mapper.gap.cols_gap' :key="index" :value="col_gap">{{ col_gap.text }}</option>
                  </select>
                </div>
              </div>
            </div>
        </div>
      </div>
    </transition>

    <transition name="right" @after-leave="animationEnd">
      <div v-if="(showPanel('element')) && !animating" class="element-settings">
        ELEMENT
      </div>
    </transition>
  </div>
</template>

<script>
import { emitter } from 'App/Wape'
import isEmpty from 'lodash/isEmpty'
import { grid_mapper } from 'Editor/mappers/tailwind/grid'

export default {
    name: 'RightPanel',
    data() {
      return {
        current_panel: 'container',
        animating: false,
        selected_container: null,
        selected_element: null,
        mappers: {
          grid_mapper
        },
        container_options: [],
        element_options: [],
        selected_col_gap: Object,
        selected_row_gap: Object
      }
    },
    mounted() {
      emitter.on('iframe-click', (args) => { //Fired from MainPanel.vue
        this.selected_container = args.container
        this.selected_element = args.element
      })
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
      },
      isGrid(container) {
        if (container === null) {
          return false
        } else {
          return container.type === 'grid'
        }
      },
      replaceClass(element, new_class, pattern) {
        if (pattern !== null) {
          let regex = new RegExp(pattern, 'g')
          let match = element.element.className.match(regex)
          if (match !== null) {
            element.removeClass(match[0])
          }
        }
        element.addClass(new_class)
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
