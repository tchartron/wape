<template>
  <div class="right-panel">
    <div class="actions">
      <div class="layout" @click="switchPanel('layout')">
        <i class="far fa-square" />
      </div>
      <div class="element" @click="switchPanel('element')">
        <i class="fas fa-square" />
      </div>
    </div>

    <!-- GRID PANEL -->

    <transition name="left" @after-leave="animationEnd">
      <div v-if="(showPanel('layout')) && !animating" class="container-settings">
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
                  <div class="remove-item" @click="deleteGridRow(selected_layout, row)"><i class="fas fa-minus"></i></div>
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
                  <div class="remove-item" @click="deleteGridColumn(selected_layout, col)"><i class="fas fa-minus"></i></div>
                </div>
              </div>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Gap</div>
            <div class="setting">
              <label for="rows-gap">Rows gap</label>
              <select id="rows-gap" name="rows-gap" @change="replaceClass(selected_layout, selected_row_gap, mappers.grid_mapper.rows.gap.regex_pattern)" v-model="selected_row_gap">
                <option v-for="(row_gap, index) in mappers.grid_mapper.rows.gap.values" :key="index" :value="row_gap.value">{{ row_gap.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="cols-gap">Cols gap</label>
              <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_layout, selected_col_gap, mappers.grid_mapper.cols.gap.regex_pattern)" v-model="selected_col_gap">
                <option v-for='(col_gap, index) in mappers.grid_mapper.cols.gap.values' :key="index" :value="col_gap.value">{{ col_gap.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Flow</div>
            <div class="setting">
              <label for="flow">Flow</label>
              <select id="flow" name="flow" @change="replaceClass(selected_layout, selected_grid_flow, mappers.grid_mapper.flow.regex_pattern)" v-model="selected_grid_flow">
                <option v-for='(flow, index) in mappers.grid_mapper.flow.values' :key="index" :value="flow.value">{{ flow.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Auto rows</div>
            <div class="setting">
              <label for="rows-auto">Auto rows</label>
              <select id="rows-auto" name="rows-auto" @change="replaceClass(selected_layout, selected_grid_rows_auto, mappers.grid_mapper.rows.auto.regex_pattern)" v-model="selected_grid_rows_auto">
                <option v-for='(rows_auto, index) in mappers.grid_mapper.rows.auto.values' :key="index" :value="rows_auto.value">{{ rows_auto.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Auto cols</div>
            <div class="setting">
              <label for="cols-auto">Cols auto</label>
              <select id="cols-auto" name="cols-auto" @change="replaceClass(selected_layout, selected_grid_cols_auto, mappers.grid_mapper.cols.auto.regex_pattern)" v-model="selected_grid_cols_auto">
                <option v-for='(cols_auto, index) in mappers.grid_mapper.cols.auto.values' :key="index" :value="cols_auto.value">{{ cols_auto.text }}</option>
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
              <select id="cols-gap" name="cols-gap" @change="replaceClass(selected_layout, selected_flex_col_gap, mappers.flex_mapper.gap.regex_pattern)" v-model="selected_flex_col_gap">
                <option v-for='(col_gap, index) in mappers.flex_mapper.gap.values' :key="index" :value="col_gap.value">{{ col_gap.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Direction</div>
            <div class="setting">
              <label for="direction">Flex direction</label>
              <select id="direction" name="direction" @change="replaceClass(selected_layout, selected_flex_direction, mappers.flex_mapper.direction.regex_pattern)" v-model="selected_flex_direction">
                <option v-for='(direction, index) in mappers.flex_mapper.direction.values' :key="index" :value="direction.value">{{ direction.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Wrap</div>
            <div class="setting">
              <label for="wrap">Flex wrap</label>
              <select id="wrap" name="wrap" @change="replaceClass(selected_layout, selected_flex_wrap, mappers.flex_mapper.wrap.regex_pattern)" v-model="selected_flex_wrap">
                <option v-for='(wrap, index) in mappers.flex_mapper.wrap.values' :key="index" :value="wrap.value">{{ wrap.text }}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- GENERALS -->
        <div class="generals" v-if="(selected_layout !== null)">
          <!-- BOX SIZING -->
          <div class="setting-content">
            <div class="setting-subtitle">Box sizing</div>
            <div class="setting">
              <label for="box-sizing">Box sizing</label>
              <select id="box-sizing" name="box-sizing" @change="replaceClass(selected_layout, selected_box_sizing, mappers.box_sizing_mapper.regex_pattern)" v-model="selected_box_sizing">
                <option v-for='(box_sizing, index) in mappers.box_sizing_mapper.values' :key="index" :value="box_sizing.value">{{ box_sizing.text }}</option>
              </select>
            </div>
          </div>
          <!-- PADDINGS -->
          <div class="setting-content">
            <div class="setting-subtitle">Paddings</div>
            <div class="setting">
              <label for="padding-all">All</label>
              <select id="padding-all" name="padding-all" @change="replaceClass(selected_layout, selected_all_padding, mappers.spacing_mapper.padding.all.regex_pattern)" v-model="selected_all_padding">
                <option v-for='(padding_all, index) in mappers.spacing_mapper.padding.all.values' :key="index" :value="padding_all.value">{{ padding_all.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-vertical">Vertical</label>
              <select id="padding-vertical" name="padding-vertical" @change="replaceClass(selected_layout, selected_vertical_padding, mappers.spacing_mapper.padding.vertical.regex_pattern)" v-model="selected_vertical_padding">
                <option v-for='(padding_vertical, index) in mappers.spacing_mapper.padding.vertical.values' :key="index" :value="padding_vertical.value">{{ padding_vertical.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-horizontal">Horizontal</label>
              <select id="padding-horizontal" name="padding-horizontal" @change="replaceClass(selected_layout, selected_horizontal_padding, mappers.spacing_mapper.padding.horizontal.regex_pattern)" v-model="selected_horizontal_padding">
                <option v-for='(padding_horizontal, index) in mappers.spacing_mapper.padding.horizontal.values' :key="index" :value="padding_horizontal.value">{{ padding_horizontal.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-top">Top</label>
              <select id="padding-top" name="padding-top" @change="replaceClass(selected_layout, selected_top_padding, mappers.spacing_mapper.padding.top.regex_pattern)" v-model="selected_top_padding">
                <option v-for='(padding_top, index) in mappers.spacing_mapper.padding.top.values' :key="index" :value="padding_top.value">{{ padding_top.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-bottom">Bottom</label>
              <select id="padding-bottom" name="padding-bottom" @change="replaceClass(selected_layout, selected_bottom_padding, mappers.spacing_mapper.padding.bottom.regex_pattern)" v-model="selected_bottom_padding">
                <option v-for='(padding_bottom, index) in mappers.spacing_mapper.padding.bottom.values' :key="index" :value="padding_bottom.value">{{ padding_bottom.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-left">Left</label>
              <select id="padding-left" name="padding-left" @change="replaceClass(selected_layout, selected_left_padding, mappers.spacing_mapper.padding.left.regex_pattern)" v-model="selected_left_padding">
                <option v-for='(padding_left, index) in mappers.spacing_mapper.padding.left.values' :key="index" :value="padding_left.value">{{ padding_left.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="padding-right">Right</label>
              <select id="padding-right" name="padding-right" @change="replaceClass(selected_layout, selected_right_padding, mappers.spacing_mapper.padding.right.regex_pattern)" v-model="selected_right_padding">
                <option v-for='(padding_right, index) in mappers.spacing_mapper.padding.right.values' :key="index" :value="padding_right.value">{{ padding_right.text }}</option>
              </select>
            </div>
          </div>
          <!-- MARGINS -->
          <div class="setting-content">
            <div class="setting-subtitle">Margins</div>
            <div class="setting">
              <label for="margin-all">All</label>
              <select id="margin-all" name="margin-all" @change="replaceClass(selected_layout, selected_all_margin, mappers.spacing_mapper.margin.all.regex_pattern)" v-model="selected_all_margin">
                <option v-for='(margin_all, index) in mappers.spacing_mapper.margin.all.values' :key="index" :value="margin_all.value">{{ margin_all.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-vertical">Vertical</label>
              <select id="margin-vertical" name="margin-vertical" @change="replaceClass(selected_layout, selected_vertical_margin, mappers.spacing_mapper.margin.vertical.regex_pattern)" v-model="selected_vertical_margin">
                <option v-for='(margin_vertical, index) in mappers.spacing_mapper.margin.vertical.values' :key="index" :value="margin_vertical.value">{{ margin_vertical.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-horizontal">Horizontal</label>
              <select id="margin-horizontal" name="margin-horizontal" @change="replaceClass(selected_layout, selected_horizontal_margin, mappers.spacing_mapper.margin.horizontal.regex_pattern)" v-model="selected_horizontal_margin">
                <option v-for='(margin_horizontal, index) in mappers.spacing_mapper.margin.horizontal.values' :key="index" :value="margin_horizontal.value">{{ margin_horizontal.text }}</option>
              </select>
            </div>
            <!-- <div class="setting">
              <label for="margin-horizontal">Horizontal</label>
              <select id="margin-horizontal" name="margin-horizontal" @change="replaceClass(selected_layout, selected_horizontal_margin.value, mappers.spacing_mapper.margin.horizontal.regex_pattern)" v-model="selected_horizontal_margin">
                <option v-for='(margin_horizontal, index) in mappers.spacing_mapper.margin.horizontal.values' :key="index" :value="margin_horizontal.id" :selected="setDefault(margin_horizontal, selected_layout)">{{ margin_horizontal.text }}</option>
              </select>
            </div> -->
            <div class="setting">
              <label for="margin-top">Top</label>
              <select id="margin-top" name="margin-top" @change="replaceClass(selected_layout, selected_top_margin, mappers.spacing_mapper.margin.top.regex_pattern)" v-model="selected_top_margin">
                <option v-for='(margin_top, index) in mappers.spacing_mapper.margin.top.values' :key="index" :value="margin_top.value">{{ margin_top.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-bottom">Bottom</label>
              <select id="margin-bottom" name="margin-bottom" @change="replaceClass(selected_layout, selected_bottom_margin, mappers.spacing_mapper.margin.bottom.regex_pattern)" v-model="selected_bottom_margin">
                <option v-for='(margin_bottom, index) in mappers.spacing_mapper.margin.bottom.values' :key="index" :value="margin_bottom.value">{{ margin_bottom.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-left">Left</label>
              <select id="margin-left" name="margin-left" @change="replaceClass(selected_layout, selected_left_margin, mappers.spacing_mapper.margin.left.regex_pattern)" v-model="selected_left_margin">
                <option v-for='(margin_left, index) in mappers.spacing_mapper.margin.left.values' :key="index" :value="margin_left.value">{{ margin_left.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="margin-right">Right</label>
              <select id="margin-right" name="margin-right" @change="replaceClass(selected_layout, selected_right_margin, mappers.spacing_mapper.margin.right.regex_pattern)" v-model="selected_right_margin">
                <option v-for='(margin_right, index) in mappers.spacing_mapper.margin.right.values' :key="index" :value="margin_right.value">{{ margin_right.text }}</option>
              </select>
            </div>
          </div>
           <!-- SIZINGS -->
          <div class="setting-content">
            <div class="setting-subtitle">Sizing</div>
            <div class="setting">
              <label for="width">Width</label>
              <select id="width" name="width" @change="replaceClass(selected_layout, selected_width, mappers.sizing_mapper.width.regex_pattern)" v-model="selected_width">
                <option v-for='(width, index) in mappers.sizing_mapper.width.values' :key="index" :value="width.value">{{ width.text }}</option>
              </select>
            </div>
            <div class="setting">
              <label for="height">Height</label>
              <select id="height" name="height" @change="replaceClass(selected_layout, selected_height, mappers.sizing_mapper.height.regex_pattern)" v-model="selected_height">
                <option v-for='(height, index) in mappers.sizing_mapper.height.values' :key="index" :value="height.value">{{ height.text }}</option>
              </select>
            </div>
          </div>
           <!-- WHITESPACE -->
          <div class="setting-content">
            <div class="setting-subtitle">Whitespace</div>
            <div class="setting">
              <label for="whitespace">Whitespace</label>
              <select id="whitespace" name="whitespace" @change="replaceClass(selected_layout, selected_ws, mappers.whitespace_mapper.regex_pattern)" v-model="selected_ws">
                <option v-for='(ws, index) in mappers.whitespace_mapper.values' :key="index" :value="ws.value">{{ ws.text }}</option>
              </select>
            </div>
          </div>
          <!-- OVERFLOW -->
          <div class="setting-content">
            <div class="setting-subtitle">Overflow</div>
            <div class="setting">
              <label for="overflow">Overflow</label>
              <select id="overflow" name="overflow" @change="replaceClass(selected_layout, selected_overflow, mappers.overflow_mapper.regex_pattern)" v-model="selected_overflow">
                <option v-for='(overflow, index) in mappers.overflow_mapper.values' :key="index" :value="overflow.value">{{ overflow.text }}</option>
              </select>
            </div>
          </div>
          <!-- OVERSCROLL -->
          <div class="setting-content">
            <div class="setting-subtitle">Overscroll</div>
            <div class="setting">
              <label for="overscroll">Overscroll</label>
              <select id="overscroll" name="overscroll" @change="replaceClass(selected_layout, selected_overscroll, mappers.overscroll_mapper.regex_pattern)" v-model="selected_overscroll">
                <option v-for='(overscroll, index) in mappers.overscroll_mapper.values' :key="index" :value="overscroll.value">{{ overscroll.text }}</option>
              </select>
            </div>
          </div>
          <!-- POSITION -->
          <div class="setting-content">
            <div class="setting-subtitle">Position</div>
            <div class="setting">
              <label for="position">Position</label>
              <select id="position" name="position" @change="replaceClass(selected_layout, selected_position, mappers.position_mapper.regex_pattern)" v-model="selected_position">
                <option v-for='(position, index) in mappers.position_mapper.values' :key="index" :value="position.value">{{ position.text }}</option>
              </select>
            </div>
            <div class="absolute" v-if="(selected_position === 'absolute')">
              <div class="setting">
                <label for="inset">Inset</label>
                <select id="inset" name="inset" @change="replaceClass(selected_layout, selected_absolute_inset, mappers.absolute_mapper.inset.regex_pattern)" v-model="selected_absolute_inset">
                  <option v-for='(inset, index) in mappers.absolute_mapper.inset.values' :key="index" :value="inset.value">{{ inset.text }}</option>
                </select>
              </div>
              <div class="setting">
                <label for="top">Top</label>
                <select id="top" name="top" @change="replaceClass(selected_layout, selected_absolute_top, mappers.absolute_mapper.top.regex_pattern)" v-model="selected_absolute_top">
                  <option v-for='(top, index) in mappers.absolute_mapper.top.values' :key="index" :value="top.value">{{ top.text }}</option>
                </select>
              </div>
              <div class="setting">
                <label for="right">Right</label>
                <select id="right" name="right" @change="replaceClass(selected_layout, selected_absolute_right, mappers.absolute_mapper.right.regex_pattern)" v-model="selected_absolute_right">
                  <option v-for='(right, index) in mappers.absolute_mapper.right.values' :key="index" :value="right.value">{{ right.text }}</option>
                </select>
              </div>
              <div class="setting">
                <label for="left">Left</label>
                <select id="left" name="left" @change="replaceClass(selected_layout, selected_absolute_left, mappers.absolute_mapper.left.regex_pattern)" v-model="selected_absolute_left">
                  <option v-for='(left, index) in mappers.absolute_mapper.left.values' :key="index" :value="left.value">{{ left.text }}</option>
                </select>
              </div>
              <div class="setting">
                <label for="bottom">Bottom</label>
                <select id="bottom" name="bottom" @change="replaceClass(selected_layout, selected_absolute_bottom, mappers.absolute_mapper.bottom.regex_pattern)" v-model="selected_absolute_bottom">
                  <option v-for='(bottom, index) in mappers.absolute_mapper.bottom.values' :key="index" :value="bottom.value">{{ bottom.text }}</option>
                </select>
              </div>
            </div>
            <!-- VISIBILITY -->
            <div class="setting-content">
              <div class="setting-subtitle">Visibility</div>
              <div class="setting">
                <label for="visibility">Visibility</label>
                <select id="visibility" name="visibility" @change="replaceClass(selected_layout, selected_visibility, mappers.visibility_mapper.regex_pattern)" v-model="selected_visibility">
                  <option v-for='(visibility, index) in mappers.visibility_mapper.values' :key="index" :value="visibility.value">{{ visibility.text }}</option>
                </select>
              </div>
            </div>
            <!-- Z-INDEX -->
            <div class="setting-content">
              <div class="setting-subtitle">Z-index</div>
              <div class="setting">
                <label for="zindex">Z-index</label>
                <select id="zindex" name="zindex" @change="replaceClass(selected_layout, selected_zindex, mappers.zindex_mapper.regex_pattern)" v-model="selected_zindex">
                  <option v-for='(zindex, index) in mappers.zindex_mapper.values' :key="index" :value="zindex.value">{{ zindex.text }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- ELEMENTS PANEL -->

    <transition name="right" @after-leave="animationEnd">
      <div v-if="(showPanel('element')) && !animating" class="element-settings">
        <!-- GRID CHILD -->
        <div class="grid" v-if="isGridChild(selected_layout, selected_element)">
          <div class="setting-content">
            <div class="setting-subtitle">Order</div>
            <div class="setting">
              <label for="order">Grid order</label>
              <select id="order" name="order" @change="replaceClass(selected_element, selected_grid_order, mappers.grid_mapper.generics.order.regex_pattern)" v-model="selected_grid_order">
                <option v-for='(order, index) in mappers.grid_mapper.generics.order.values' :key="index" :value="order.value">{{ order.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Col Span</div>
            <div class="setting">
              <label for="col-span">Grid child col span</label>
              <select id="col-span" name="col-span" @change="replaceClass(selected_element, selected_grid_col_span, mappers.grid_mapper.cols.span.regex_pattern)" v-model="selected_grid_col_span">
                <option v-for='(col_span, index) in mappers.grid_mapper.cols.span.values' :key="index" :value="col_span.value">{{ col_span.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Row Span</div>
            <div class="setting">
              <label for="row-span">Grid child row span</label>
              <select id="row-span" name="row-span" @change="replaceClass(selected_element, selected_grid_row_span, mappers.grid_mapper.rows.span.regex_pattern)" v-model="selected_grid_row_span">
                <option v-for='(row_span, index) in mappers.grid_mapper.rows.span.values' :key="index" :value="row_span.value">{{ row_span.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Col start</div>
            <div class="setting">
              <label for="col-start">Grid child col start</label>
              <select id="col-start" name="col-start" @change="replaceClass(selected_element, selected_grid_col_start, mappers.grid_mapper.cols.start.regex_pattern)" v-model="selected_grid_col_start">
                <option v-for='(col_start, index) in mappers.grid_mapper.cols.start.values' :key="index" :value="col_start.value">{{ col_start.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Col end</div>
            <div class="setting">
              <label for="col-end">Grid child col end</label>
              <select id="col-end" name="col-end" @change="replaceClass(selected_element, selected_grid_col_end, mappers.grid_mapper.cols.end.regex_pattern)" v-model="selected_grid_col_end">
                <option v-for='(col_end, index) in mappers.grid_mapper.cols.end.values' :key="index" :value="col_end.value">{{ col_end.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Row start</div>
            <div class="setting">
              <label for="row-start">Grid child row start</label>
              <select id="row-start" name="row-start" @change="replaceClass(selected_element, selected_grid_row_start, mappers.grid_mapper.rows.start.regex_pattern)" v-model="selected_grid_row_start">
                <option v-for='(row_start, index) in mappers.grid_mapper.rows.start.values' :key="index" :value="row_start.value">{{ row_start.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Row end</div>
            <div class="setting">
              <label for="row-end">Grid child row end</label>
              <select id="row-end" name="row-end" @change="replaceClass(selected_element, selected_grid_row_end, mappers.grid_mapper.rows.end.regex_pattern)" v-model="selected_grid_row_end">
                <option v-for='(row_end, index) in mappers.grid_mapper.rows.end.values' :key="index" :value="row_end.value">{{ row_end.text }}</option>
              </select>
            </div>
          </div>
        </div>
        <!-- FLEX CHILD -->
        <div class="flex" v-if="isFlexChild(selected_layout, selected_element)">
          <div class="setting-content">
            <div class="setting-subtitle">Flex</div>
            <div class="setting">
              <label for="behaviour">Flex behaviour</label>
              <select id="behaviour" name="behaviour" @change="replaceClass(selected_element, selected_flex_behaviour, mappers.flex_mapper.flex.regex_pattern)" v-model="selected_flex_behaviour">
                <option v-for='(behaviour, index) in mappers.flex_mapper.flex.values' :key="index" :value="behaviour.value">{{ behaviour.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Grow</div>
            <div class="setting">
              <label for="grow">Flex grow</label>
              <select id="grow" name="grow" @change="replaceClass(selected_element, selected_flex_grow, mappers.flex_mapper.grow.regex_pattern)" v-model="selected_flex_grow">
                <option v-for='(grow, index) in mappers.flex_mapper.grow.values' :key="index" :value="grow.value">{{ grow.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Shrink</div>
            <div class="setting">
              <label for="grow">Flex shrink</label>
              <select id="grow" name="grow" @change="replaceClass(selected_element, selected_flex_shrink, mappers.flex_mapper.shrink.regex_pattern)" v-model="selected_flex_shrink">
                <option v-for='(shrink, index) in mappers.flex_mapper.shrink.values' :key="index" :value="shrink.value">{{ shrink.text }}</option>
              </select>
            </div>
          </div>
          <div class="setting-content">
            <div class="setting-subtitle">Order</div>
            <div class="setting">
              <label for="order">Flex order</label>
              <select id="order" name="order" @change="replaceClass(selected_element, selected_flex_order, mappers.flex_mapper.order.regex_pattern)" v-model="selected_flex_order">
                <option v-for='(order, index) in mappers.flex_mapper.order.values' :key="index" :value="order.value">{{ order.text }}</option>
              </select>
            </div>
          </div>
        </div>
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
  whitespace_mapper,
  overflow_mapper,
  overscroll_mapper,
  position_mapper,
  absolute_mapper,
  visibility_mapper,
  zindex_mapper,
  box_sizing_mapper,
} from 'Editor/mappers/tailwind/layout'
import { appendPlaceholder } from 'Editor/utilities/layout'
import { replaceClass } from 'Editor/utilities/utilities'

export default {
    name: 'RightPanel',
    data() {
      return {
        current_panel: 'layout',
        animating: false,
        selected_layout: null,
        selected_element: null,
        mappers: {
          grid_mapper,
          flex_mapper,
          spacing_mapper,
          sizing_mapper,
          whitespace_mapper,
          overflow_mapper,
          overscroll_mapper,
          position_mapper,
          absolute_mapper,
          visibility_mapper,
          zindex_mapper,
          box_sizing_mapper,
        },
        container_options: [],
        element_options: [],
        settings: [
            { model: 'selected_col_gap', mapper_values: grid_mapper.cols.gap.values },
            { model: 'selected_row_gap', mapper_values: grid_mapper.rows.gap.values },
            { model: 'selected_flex_col_gap', mapper_values: flex_mapper.gap.values },
            { model: 'selected_all_padding', mapper_values: spacing_mapper.padding.all.values },
            { model: 'selected_vertical_padding', mapper_values: spacing_mapper.padding.vertical.values },
            { model: 'selected_horizontal_padding', mapper_values: spacing_mapper.padding.horizontal.values },
            { model: 'selected_top_padding', mapper_values: spacing_mapper.padding.top.values },
            { model: 'selected_bottom_padding', mapper_values: spacing_mapper.padding.bottom.values },
            { model: 'selected_left_padding', mapper_values: spacing_mapper.padding.left.values },
            { model: 'selected_right_padding', mapper_values: spacing_mapper.padding.right.values },
            { model: 'selected_all_margin', mapper_values: spacing_mapper.margin.all.values },
            { model: 'selected_vertical_margin', mapper_values: spacing_mapper.margin.vertical.values },
            { model: 'selected_horizontal_margin', mapper_values: spacing_mapper.margin.horizontal.values },
            { model: 'selected_top_margin', mapper_values: spacing_mapper.margin.top.values },
            { model: 'selected_bottom_margin', mapper_values: spacing_mapper.margin.bottom.values },
            { model: 'selected_left_margin', mapper_values: spacing_mapper.margin.left.values },
            { model: 'selected_right_margin', mapper_values: spacing_mapper.margin.right.values },
            { model: 'selected_width', mapper_values: sizing_mapper.width.values },
            { model: 'selected_height', mapper_values: sizing_mapper.height.values },
            { model: 'selected_ws', mapper_values: whitespace_mapper.values },
            { model: 'selected_overflow', mapper_values: overflow_mapper.values },
            { model: 'selected_overscroll', mapper_values: overscroll_mapper.values },
            { model: 'selected_position', mapper_values: position_mapper.values },
            { model: 'selected_absolute_inset', mapper_values: absolute_mapper.inset.values },
            { model: 'selected_absolute_top', mapper_values: absolute_mapper.top.values },
            { model: 'selected_absolute_right', mapper_values: absolute_mapper.right.values },
            { model: 'selected_absolute_left', mapper_values: absolute_mapper.left.values },
            { model: 'selected_absolute_bottom', mapper_values: absolute_mapper.bottom.values },
            { model: 'selected_visibility', mapper_values: visibility_mapper.values },
            { model: 'selected_zindex', mapper_values: zindex_mapper.values },
            { model: 'selected_flex_direction', mapper_values: flex_mapper.direction.values },
            { model: 'selected_flex_wrap', mapper_values: flex_mapper.wrap.values },
            { model: 'selected_flex_behaviour', mapper_values: flex_mapper.flex.values },
            { model: 'selected_flex_grow', mapper_values: flex_mapper.grow.values },
            { model: 'selected_flex_shrink', mapper_values: flex_mapper.shrink.values },
            { model: 'selected_grid_order', mapper_values: grid_mapper.generics.order.values },
            { model: 'selected_flex_order', mapper_values: flex_mapper.order.values },
            { model: 'selected_grid_col_span', mapper_values: grid_mapper.cols.span.values },
            { model: 'selected_grid_row_span', mapper_values: grid_mapper.rows.span.values },
            { model: 'selected_grid_col_start', mapper_values: grid_mapper.cols.start.values },
            { model: 'selected_grid_col_end', mapper_values: grid_mapper.cols.end.values },
            { model: 'selected_grid_row_start', mapper_values: grid_mapper.rows.start.values },
            { model: 'selected_grid_row_end', mapper_values: grid_mapper.rows.end.values },
            { model: 'selected_grid_flow', mapper_values: grid_mapper.flow.values },
            { model: 'selected_grid_rows_auto', mapper_values: grid_mapper.rows.auto.values },
            { model: 'selected_grid_cols_auto', mapper_values: grid_mapper.cols.auto.values },
            { model: 'selected_box_sizing', mapper_values: box_sizing_mapper.values },
        ],
        //Gaps
        selected_col_gap: '',
        selected_row_gap: '',
        selected_flex_col_gap: '',
        //Box sizing
        selected_box_sizing: '',
        //Paddings
        selected_all_padding: '',
        selected_vertical_padding: '',
        selected_horizontal_padding: '',
        selected_top_padding: '',
        selected_bottom_padding: '',
        selected_left_padding: '',
        selected_right_padding: '',
        //Margins
        selected_all_margin: '',
        selected_vertical_margin: '',
        selected_horizontal_margin: '',
        selected_top_margin: '',
        selected_bottom_margin: '',
        selected_left_margin: '',
        selected_right_margin: '',
        //Sizings
        selected_width: '',
        selected_height: '',
        //Whitespace
        selected_ws: '',
        //Overflow
        selected_overflow: '',
        //Overscroll
        selected_overscroll: '',
        //Position
        selected_position: '',
        //Absolute
        selected_absolute_inset: '',
        selected_absolute_top: '',
        selected_absolute_right: '',
        selected_absolute_left: '',
        selected_absolute_bottom: '',
        //Visibility
        selected_visibility: '',
        //Z-index
        selected_zindex: '',
        // Flex specifics
        selected_flex_direction: '',
        selected_flex_wrap: '',
        selected_flex_behaviour: '',
        selected_flex_grow: '',
        selected_flex_shrink: '',
        //Grid specifics
        selected_grid_flow: '',
        selected_grid_rows_auto: '',
        selected_grid_cols_auto: '',

        //Elements
        //Order
        selected_grid_order: '',
        selected_flex_order: '',
        //Span, start, end
        selected_grid_col_span: '',
        selected_grid_row_span: '',
        selected_grid_col_start: '',
        selected_grid_col_end: '',
        selected_grid_row_start: '',
        selected_grid_row_end: '',
      }
    },
    mounted() {
      emitter.on('iframe-click', (args) => { //Fired from MainPanel.vue
        this.selected_layout = args.container
        this.selected_element = args.element
        this.triggerSetDefaultValues()
      })
    },
    methods: {
      replaceClass,
      switchPanel(panel) {
        this.animating = true
        this.current_panel = panel
        this.triggerSetDefaultValues()
      },
      showPanel(panel) {
        return (this.current_panel === panel)
      },
      animationEnd() {
        this.animating = false
      },
      isGrid(layout_instance) {
        if (layout_instance === null) {
          return false
        } else {
          return layout_instance.type === 'grid'
        }
      },
      isFlex(layout_instance) {
        if (layout_instance === null) {
          return false
        } else {
          return layout_instance.type === 'flex'
        }
      },
      isGridChild(layout_instance, element_instance) {
        if (layout_instance === null || layout_instance.type !== 'grid') {
          return false
        } else {
          return [...layout_instance.element.children].includes(element_instance.element)
        }
      },
      isFlexChild(layout_instance, element_instance) {
        if (layout_instance === null || layout_instance.type !== 'flex') {
          return false
        } else {
          return [...layout_instance.element.children].includes(element_instance.element)
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
      deleteGridRow(layout_instance, row_number) {
        if (layout_instance !== null) {
          layout_instance.deleteRowChildren(row_number)
          layout_instance.rows--
          this.replaceClass(layout_instance, `grid-rows-${layout_instance.rows}`, this.mappers.grid_mapper.rows.template.regex_pattern)
        }
      },
      deleteGridColumn(layout_instance, col_number) {
        if (layout_instance !== null) {
         layout_instance.deleteColChildren(col_number)
          layout_instance.cols--
          this.replaceClass(layout_instance, `grid-cols-${layout_instance.cols}`, this.mappers.grid_mapper.cols.template.regex_pattern)
        }
      },
      addFlexColumn(layout_instance) {
        if (layout_instance !== null) {
          layout_instance.addColumn()
        }
      },
      setDefaultValues(element_selected) {
        let element_classes = element_selected.getClassesAsArray()
        for (let setting of this.settings) {
          //reset old value
          this[setting.model] = ''
          let found = setting.mapper_values.find((item) => {
            return (element_classes.includes(item.value))
          })
          if (typeof found !== 'undefined') {
            this[setting.model] = found.value
          }
        }
      },
      triggerSetDefaultValues() {
        switch (this.current_panel) {
          case 'layout':
            this.setDefaultValues(this.selected_layout)
          break;
          case 'element':
            this.setDefaultValues(this.selected_element)
          break;
          default:
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
