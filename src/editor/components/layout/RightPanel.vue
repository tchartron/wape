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
          <!-- GRID -->
          <div class="grid" v-if="isGrid(selected_layout)">
            <div class="setting-label">Grid settings</div>
            <div class="setting-content">
              <div class="setting-subtitle">Rows</div>
              <div class="setting-wrapper">
                <div class="action">
                  <div class="add-item" @click="addGridRow(selected_layout)">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
                <div class="rows">
                  <div class="row" v-for="(row, index) in selected_layout.rows" :key="index">
                    <div class="item-title">Row {{ row }}</div>
                    <div class="remove-item" @click="deleteGridRow(selected_layout)"><i class="fas fa-minus"></i></div>
                  </div>
                </div>
              </div>
              <div class="setting-subtitle">Columns</div>
              <div class="setting-wrapper">
                <div class="action">
                  <div class="add-item" @click="addGridColumn(selected_layout)">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
                <div class="rows">
                  <div class="row" v-for="(col, index) in selected_layout.cols" :key="index">
                    <div class="item-title">Column {{ col }}</div>
                    <div class="remove-item" @click="deleteGridRow(selected_layout)"><i class="fas fa-minus"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="setting-content">
              <div class="setting-subtitle">Gap</div>
              <div class="setting">
                <label for="rows-gap">Rows gap</label>
                <select id="rows-gap" name="rows-gap" @change="replaceClass(selected_layout, selected_row_gap.value, mappers.grid_mapper.rows.gap.regex_pattern)" v-model="selected_row_gap">
                  <option v-for="(row_gap, index) in mappers.grid_mapper.rows.gap.values" :key="index" :value="row_gap">{{ row_gap.text }}</option>
                </select>
              </div>
              <div class="setting">
                <label for="cols-gap">Cols gap</label>
                <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_layout, selected_col_gap.value, mappers.grid_mapper.cols.gap.regex_pattern)" v-model="selected_col_gap">
                  <option v-for='(col_gap, index) in mappers.grid_mapper.cols.gap.values' :key="index" :value="col_gap">{{ col_gap.text }}</option>
                </select>
              </div>
            </div>
          </div>
          <!-- FLEX -->
          <div class="flex" v-if="isFlex(selected_layout)">
            <div class="setting-label">Columns settings</div>
            <div class="setting-content">
              <div class="setting-subtitle">Columns</div>
              <div class="setting-wrapper">
                <div class="action">
                  <div class="add-item" @click="addColumnInFlex('col')">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
                <div class="rows">
                  <div class="row" v-for="(col, index) in selected_layout.cols" :key="index">
                    Column {{ col }}
                  </div>
                </div>
              </div>
            </div>
            <div class="setting-content">
              <div class="setting-subtitle">Gap</div>
              <div class="setting">
                <label for="cols-gap">Cols gap</label>
                <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_layout, selected_col_gap.value, mappers.flex_mapper.gap.regex_pattern)" v-model="selected_col_gap">
                  <option v-for='(col_gap, index) in mappers.flex_mapper.gap.value' :key="index" :value="col_gap">{{ col_gap.text }}</option>
                </select>
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
import { grid_mapper, flex_mapper } from 'Editor/mappers/tailwind'
import { appendPlaceholder } from 'Editor/utilities/layout'

export default {
    name: 'RightPanel',
    data() {
      return {
        current_panel: 'container',
        animating: false,
        selected_layout: null,
        selected_element: null,
        mappers: {
          grid_mapper,
          flex_mapper,
        },
        container_options: [],
        element_options: [],
        selected_col_gap: Object,
        selected_row_gap: Object
      }
    },
    mounted() {
      emitter.on('iframe-click', (args) => { //Fired from MainPanel.vue
        this.selected_layout = args.container
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
      isFlex(container) {
        if (container === null) {
          return false
        } else {
          return container.type === 'flex'
        }
      },
      replaceClass(element, new_class, pattern) {
        if (pattern !== null) {
          let regex = new RegExp(pattern, 'g')
          let class_array = [...element.element.classList.values()]
          let match = class_array.find((item) => {
            return regex.test(item)
          })
          if (match !== null) {
            element.removeClass(match)
          }
        }
        element.addClass(new_class)
      },
      addGridColumn(container_instance) {
        if (container_instance !== null) {
          container_instance.cols++
          this.replaceClass(container_instance, `grid-cols-${container_instance.cols}`, this.mappers.grid_mapper.cols.template.regex_pattern)
          let totalPlacesInGrid = ((container_instance.cols !== 0) ? container_instance.cols : 1) * ((container_instance.rows !== 0) ? container_instance.rows : 1)
          let elementsInGrid = container_instance.element.children.length
          let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
          if (numberOfPlaceholdersToAppend > 0) {
            appendPlaceholder('div', container_instance.element, numberOfPlaceholdersToAppend, 'grid-placeholder')
          }
        }
      },
      addGridRow(container_instance) {
        if (container_instance !== null) {
          container_instance.rows++
          this.replaceClass(container_instance, `grid-rows-${container_instance.rows}`, this.mappers.grid_mapper.rows.template.regex_pattern)
          let totalPlacesInGrid = ((container_instance.cols !== 0) ? container_instance.cols : 1) * ((container_instance.rows !== 0) ? container_instance.rows : 1)
          let elementsInGrid = container_instance.element.children.length
          let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
          if (numberOfPlaceholdersToAppend > 0) {
            appendPlaceholder('div', container_instance.element, numberOfPlaceholdersToAppend, 'grid-placeholder')
          }
        }
      },
      addColumnInFlex() {
        if (this.selected_layout !== null) {
          if (this.selected_layout.type === 'flex') {

          }
        }
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

  div.setting-label {
    color: #fff;
    text-transform: capitalize;
    font-size: 1.2rem;
    border-bottom: 1px solid #fff;
    padding-bottom: .7rem;
  }

  div.container-settings,
  div.element-settings {
    margin: 3% 2.5%;
    width: 95%;
    min-width: 95%;
    box-sizing: border-box;
    user-select: none;
    overflow-y: scroll;
    height: calc(100% - 2.7rem);
  }

  div.setting-subtitle {
    color: #fff;
    font-size: 1.1rem;
    margin: 0.7rem 0.2rem 0.3rem;
  }

  div.setting-content {
    margin: 0.5rem;
    color: #d3d3d3;
    border-bottom: 1px dashed #fff;
    padding-bottom: 0.7rem;
  }

  div.setting {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 1.7rem;
  }

  div.action {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }
  div.action > div.add-item {
    padding: .5rem;
    border: 1px solid #000;
    cursor: pointer;
    color: #fff;
  }
  div.action > div.add-item:hover {
    padding: .5rem;
    border: 1px solid #000;
    background-color: #707070;
    cursor: pointer;
  }
  div.row > div.remove-item {
    padding: 0.2rem 0.5rem;
    border: 1px solid #000;
    cursor: pointer;
    margin: 0.3rem 0;
  }
  div.row > div.remove-item:hover {
    padding: 0.2rem 0.5rem;
    border: 1px solid #000;
    background-color: #707070;
    cursor: pointer;
    margin: 0.3rem 0;
  }
  div.setting-wrapper > div.rows > div.row:first-child {
    line-height: 2rem;
    border-top: 1px dotted #fff;
    border-bottom: 1px dotted #fff;
    cursor: pointer;
  }
  div.setting-wrapper > div.rows > div.row {
    display: flex;
    justify-content: space-between;
    line-height: 2rem;
    border-bottom: 1px dotted #fff;
    cursor: pointer;
  }
  div.item-title {
    display: flex;
    align-items: center;
  }
</style>
