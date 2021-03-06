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
          <div class="grid" v-if="isGrid(selected_container)">
            <div class="setting-label">Grid settings</div>
            <div class="setting-content">
              <div class="setting-subtitle">Rows</div>
              <div class="setting-wrapper">
                <div class="action">
                  <div class="add-item" @click="addItemInGrid('row')">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
                <div class="rows">
                  <div class="row" v-for="(row, index) in selected_container.rows" :key="index">
                    Row {{ row }}
                  </div>
                </div>
              </div>
              <div class="setting-subtitle">Columns</div>
              <div class="setting-wrapper">
                <div class="action">
                  <div class="add-item" @click="addItemInGrid('col')">
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
                <div class="rows">
                  <div class="row" v-for="(col, index) in selected_container.cols" :key="index">
                    Column {{ col }}
                  </div>
                </div>
              </div>
            </div>
            <div class="setting-content">
              <div class="setting-subtitle">Gap</div>
              <div class="setting">
                <label for="rows-gap">Rows gap</label>
                <select id="rows-gap" name="rows-gap" @change="replaceClass(selected_container, selected_row_gap.value, mappers.grid_mapper.rows.gap.regex_pattern)" v-model="selected_row_gap">
                  <option v-for="(row_gap, index) in mappers.grid_mapper.rows.gap.values" :key="index" :value="row_gap">{{ row_gap.text }}</option>
                </select>
              </div>
              <div class="setting">
                <label for="cols-gap">Cols gap</label>
                <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_container, selected_col_gap.value, mappers.grid_mapper.cols.gap.regex_pattern)" v-model="selected_col_gap">
                  <option v-for='(col_gap, index) in mappers.grid_mapper.cols.gap.values' :key="index" :value="col_gap">{{ col_gap.text }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex" v-if="isFlex(selected_container)">
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
                  <div class="row" v-for="(col, index) in selected_container.cols" :key="index">
                    Column {{ col }}
                  </div>
                </div>
              </div>
            </div>
            <div class="setting-content">
              <div class="setting-subtitle">Gap</div>
              <div class="setting">
                <label for="cols-gap">Cols gap</label>
                <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_container, selected_col_gap.value, mappers.flex_mapper.gap.regex_pattern)" v-model="selected_col_gap">
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
import { createElementAndAppend } from 'Editor/utilities/grid'
import { replaceClass } from 'Editor/utilities/css'

export default {
    name: 'RightPanel',
    data() {
      return {
        current_panel: 'container',
        animating: false,
        selected_container: null,
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
      isFlex(container) {
        if (container === null) {
          return false
        } else {
          return container.type === 'flex'
        }
      },
      // replaceClass(element, new_class, pattern) {
      //   if (pattern !== null) {
      //     let regex = new RegExp(pattern, 'g')
      //     let class_array = [...element.element.classList.values()]
      //     let match = class_array.find((item) => {
      //       return regex.test(item)
      //     })
      //     if (match !== null) {
      //       element.removeClass(match)
      //     }
      //   }
      //   element.addClass(new_class)
      // },
      addItemInGrid(typeToAdd) {
        if (this.selected_container !== null) {
          if (this.selected_container.type === 'grid') {
            if (typeToAdd === 'row') {
              // let new_row_amount = this.selected_container.rows + 1
              // console.log(new_row_amount)
              this.selected_container.rows++
              this.replaceClass(this.selected_container, `grid-rows-${this.selected_container.rows}`, this.mappers.grid_mapper.rows.template.regex_pattern)
              let totalPlacesInGrid = ((this.selected_container.cols !== 0) ? this.selected_container.cols : 1) * ((this.selected_container.rows !== 0) ? this.selected_container.rows : 1)
              let elementsInGrid = this.selected_container.element.children.length
              let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
              if (numberOfPlaceholdersToAppend > 0) {
                  createElementAndAppend('div', this.selected_container.element, numberOfPlaceholdersToAppend, 'grid-placeholder')
              }
            } else if (typeToAdd === 'col') {
              this.selected_container.cols++
              this.replaceClass(this.selected_container, `grid-cols-${this.selected_container.cols}`, this.mappers.grid_mapper.cols.template.regex_pattern)
              let totalPlacesInGrid = ((this.selected_container.cols !== 0) ? this.selected_container.cols : 1) * ((this.selected_container.cols !== 0) ? this.selected_container.cols : 1)
              let elementsInGrid = this.selected_container.element.children.length
              let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
              if (numberOfPlaceholdersToAppend > 0) {
                  createElementAndAppend('div', this.selected_container.element, numberOfPlaceholdersToAppend, 'grid-placeholder')
              }
            }
          } else if (this.selected_container.type === 'flex' && typeToAdd === 'col') {
            console.log(this.selected_container)
          }
        }
      },
      addColumnInFlex() {
        if (this.selected_container !== null) {
          if (this.selected_container.type === 'flex') {

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
  div.setting-wrapper > div.rows > div.row:first-child {
    line-height: 2rem;
    border-top: 1px dotted #fff;
    border-bottom: 1px dotted #fff;
    cursor: pointer;
  }
  div.setting-wrapper > div.rows > div.row {
    line-height: 2rem;
    border-bottom: 1px dotted #fff;
    cursor: pointer;
  }
</style>
