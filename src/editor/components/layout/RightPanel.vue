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
                <div class="add-item" @click="addFlexColumn(selected_layout)">
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
              <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_layout, selected_flex_col_gap.value, mappers.flex_mapper.gap.regex_pattern)" v-model="selected_flex_col_gap">
                <option v-for='(col_gap, index) in mappers.flex_mapper.gap.values' :key="index" :value="col_gap">{{ col_gap.text }}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- GENERALS -->
        <div class="generals" v-if="(selected_layout !== null)">
          <!-- PADDINGS -->
          <div class="setting-content">
            <div class="setting-subtitle">Paddings</div>
            <div class="setting">
              <label for="padding-all">All</label>
              <select id="padding-all" name="padding-all" @change="replaceClass(selected_layout, selected_all_padding.value, mappers.spacing_mapper.padding.all.regex_pattern)" v-model="selected_all_padding">
                <option v-for='(padding_all, index) in mappers.spacing_mapper.padding.all.values' :key="index" :value="padding_all">{{ padding_all.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-vertical">Vertical</label>
              <select id="padding-vertical" name="padding-vertical" @change="replaceClass(selected_layout, selected_vertical_padding.value, mappers.spacing_mapper.padding.vertical.regex_pattern)" v-model="selected_vertical_padding">
                <option v-for='(padding_vertical, index) in mappers.spacing_mapper.padding.vertical.values' :key="index" :value="padding_vertical">{{ padding_vertical.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-horizontal">Horizontal</label>
              <select id="padding-horizontal" name="padding-horizontal" @change="replaceClass(selected_layout, selected_horizontal_padding.value, mappers.spacing_mapper.padding.horizontal.regex_pattern)" v-model="selected_horizontal_padding">
                <option v-for='(padding_horizontal, index) in mappers.spacing_mapper.padding.horizontal.values' :key="index" :value="padding_horizontal">{{ padding_horizontal.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-top">Top</label>
              <select id="padding-top" name="padding-top" @change="replaceClass(selected_layout, selected_top_padding.value, mappers.spacing_mapper.padding.top.regex_pattern)" v-model="selected_top_padding">
                <option v-for='(padding_top, index) in mappers.spacing_mapper.padding.top.values' :key="index" :value="padding_top">{{ padding_top.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-bottom">Bottom</label>
              <select id="padding-bottom" name="padding-bottom" @change="replaceClass(selected_layout, selected_bottom_padding.value, mappers.spacing_mapper.padding.bottom.regex_pattern)" v-model="selected_bottom_padding">
                <option v-for='(padding_bottom, index) in mappers.spacing_mapper.padding.bottom.values' :key="index" :value="padding_bottom">{{ padding_bottom.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-left">Left</label>
              <select id="padding-left" name="padding-left" @change="replaceClass(selected_layout, selected_left_padding.value, mappers.spacing_mapper.padding.left.regex_pattern)" v-model="selected_left_padding">
                <option v-for='(padding_left, index) in mappers.spacing_mapper.padding.left.values' :key="index" :value="padding_left">{{ padding_left.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-right">Right</label>
              <select id="padding-right" name="padding-right" @change="replaceClass(selected_layout, selected_right_padding.value, mappers.spacing_mapper.padding.right.regex_pattern)" v-model="selected_right_padding">
                <option v-for='(padding_right, index) in mappers.spacing_mapper.padding.right.values' :key="index" :value="padding_right">{{ padding_right.text }}</option>
              </select>
            </div>
          </div>
          <!-- MARGINS -->
          <div class="setting-content">
            <div class="setting-subtitle">Margins</div>
            <div class="setting">
              <label for="margin-all">All</label>
              <select id="margin-all" name="margin-all" @change="replaceClass(selected_layout, selected_all_margin.value, mappers.spacing_mapper.margin.all.regex_pattern)" v-model="selected_all_margin">
                <option v-for='(margin_all, index) in mappers.spacing_mapper.margin.all.values' :key="index" :value="margin_all">{{ margin_all.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-vertical">Vertical</label>
              <select id="margin-vertical" name="margin-vertical" @change="replaceClass(selected_layout, selected_vertical_margin.value, mappers.spacing_mapper.margin.vertical.regex_pattern)" v-model="selected_vertical_margin">
                <option v-for='(margin_vertical, index) in mappers.spacing_mapper.margin.vertical.values' :key="index" :value="margin_vertical">{{ margin_vertical.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-horizontal">Horizontal</label>
              <select id="margin-horizontal" name="margin-horizontal" @change="replaceClass(selected_layout, selected_horizontal_margin.value, mappers.spacing_mapper.margin.horizontal.regex_pattern)" v-model="selected_horizontal_margin">
                <option v-for='(margin_horizontal, index) in mappers.spacing_mapper.margin.horizontal.values' :key="index" :value="margin_horizontal">{{ margin_horizontal.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-top">Top</label>
              <select id="margin-top" name="margin-top" @change="replaceClass(selected_layout, selected_top_margin.value, mappers.spacing_mapper.margin.top.regex_pattern)" v-model="selected_top_margin">
                <option v-for='(margin_top, index) in mappers.spacing_mapper.margin.top.values' :key="index" :value="margin_top">{{ margin_top.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-bottom">Bottom</label>
              <select id="margin-bottom" name="margin-bottom" @change="replaceClass(selected_layout, selected_bottom_margin.value, mappers.spacing_mapper.margin.bottom.regex_pattern)" v-model="selected_bottom_margin">
                <option v-for='(margin_bottom, index) in mappers.spacing_mapper.margin.bottom.values' :key="index" :value="margin_bottom">{{ margin_bottom.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-left">Left</label>
              <select id="margin-left" name="margin-left" @change="replaceClass(selected_layout, selected_left_margin.value, mappers.spacing_mapper.margin.left.regex_pattern)" v-model="selected_left_margin">
                <option v-for='(margin_left, index) in mappers.spacing_mapper.margin.left.values' :key="index" :value="margin_left">{{ margin_left.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-right">Right</label>
              <select id="margin-right" name="margin-right" @change="replaceClass(selected_layout, selected_right_margin.value, mappers.spacing_mapper.margin.right.regex_pattern)" v-model="selected_right_margin">
                <option v-for='(margin_right, index) in mappers.spacing_mapper.margin.right.values' :key="index" :value="margin_right">{{ margin_right.text }}</option>
              </select>
            </div>
          </div>
           <!-- SIZINGS -->
          <div class="setting-content">
            <div class="setting-subtitle">Sizing</div>
            <div class="setting">
              <label for="width">Width</label>
              <select id="width" name="width" @change="replaceClass(selected_layout, selected_width.value, mappers.sizing_mapper.width.regex_pattern)" v-model="selected_width">
                <option v-for='(width, index) in mappers.sizing_mapper.width.values' :key="index" :value="width">{{ width.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="height">Height</label>
              <select id="height" name="height" @change="replaceClass(selected_layout, selected_height.value, mappers.sizing_mapper.height.regex_pattern)" v-model="selected_height">
                <option v-for='(height, index) in mappers.sizing_mapper.height.values' :key="index" :value="height">{{ height.text }}</option>
              </select>
            </div>
          </div>
           <!-- WHITESPACE -->
          <div class="setting-content">
            <div class="setting-subtitle">Whitespace</div>
            <div class="setting">
              <label for="width">Whitespace</label>
              <select id="width" name="width" @change="replaceClass(selected_layout, selected_ws.value, mappers.whitespace_mapper.regex_pattern)" v-model="selected_ws">
                <option v-for='(ws, index) in mappers.whitespace_mapper.values' :key="index" :value="ws">{{ ws.text }}</option>
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
import {
  grid_mapper,
  flex_mapper,
  spacing_mapper,
  sizing_mapper,
  whitespace_mapper
} from 'Editor/mappers/tailwind/layout'
import { appendPlaceholder } from 'Editor/utilities/layout'
import { replaceClass } from 'Editor/utilities/utilities'

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
          spacing_mapper,
          sizing_mapper,
          whitespace_mapper,
        },
        container_options: [],
        element_options: [],
        //Gaps
        selected_col_gap: Object,
        selected_row_gap: Object,
        selected_flex_col_gap: Object,
        //Spacings
        //Paddings
        selected_all_padding: Object,
        selected_vertical_padding: Object,
        selected_horizontal_padding: Object,
        selected_top_padding: Object,
        selected_bottom_padding: Object,
        selected_left_padding: Object,
        selected_right_padding: Object,
        //Margins
        selected_all_margin: Object,
        selected_vertical_margin: Object,
        selected_horizontal_margin: Object,
        selected_top_margin: Object,
        selected_bottom_margin: Object,
        selected_left_margin: Object,
        selected_right_margin: Object,
        //Sizings
        selected_width: Object,
        selected_height: Object,
        //Whitespace
        selected_ws: Object,
      }
    },
    mounted() {
      emitter.on('iframe-click', (args) => { //Fired from MainPanel.vue
        this.selected_layout = args.container
        this.selected_element = args.element
      })
    },
    methods: {
      replaceClass,
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
      addGridColumn(layout_instance) {
        if (layout_instance !== null) {
          layout_instance.cols++
          this.replaceClass(layout_instance, `grid-cols-${layout_instance.cols}`, this.mappers.grid_mapper.cols.template.regex_pattern)
          let total_places_in_grid = ((layout_instance.cols !== 0) ? layout_instance.cols : 1) * ((layout_instance.rows !== 0) ? layout_instance.rows : 1)
          let elements_in_grid = layout_instance.element.children.length
          let number_of_placeholder_to_append = total_places_in_grid - elements_in_grid
          if (number_of_placeholder_to_append > 0) {
            appendPlaceholder('div', layout_instance.element, number_of_placeholder_to_append, 'grid-placeholder')
          }
        }
      },
      addGridRow(layout_instance) {
        if (layout_instance !== null) {
          layout_instance.rows++
          this.replaceClass(layout_instance, `grid-rows-${layout_instance.rows}`, this.mappers.grid_mapper.rows.template.regex_pattern)
          let total_places_in_grid = ((layout_instance.cols !== 0) ? layout_instance.cols : 1) * ((layout_instance.rows !== 0) ? layout_instance.rows : 1)
          let elements_in_grid = layout_instance.element.children.length
          let number_of_placeholder_to_append = total_places_in_grid - elements_in_grid
          if (number_of_placeholder_to_append > 0) {
            appendPlaceholder('div', layout_instance.element, number_of_placeholder_to_append, 'grid-placeholder')
          }
        }
      },
      addFlexColumn(layout_instance) {
        if (layout_instance !== null) {
          layout_instance.addColumn()
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
