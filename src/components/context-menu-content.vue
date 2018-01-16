<template>
 <div class="context-menu__content" 
      :style="styleName" 
      v-show="showContent" 
      @contextmenu.prevent.stop>
    <ul>
      <li class="context-menu--item" 
          v-for="(menu, index) in menus"
          :class="[{'has-child': menu.children && menu.children.length}, menu.classY ? menu.classY : '', menu.classX ? menu.classX : 'right']"
          :key="index">
        <div class="context-menu--item__inner" 
             @click="menuItemClick(menu)"
             v-if="menu.type != 'separator'">
          <span>{{menu.label}}</span>
        </div>
        <hr class="context-menu--splite" v-if="menu.type == 'separator'" />
        <vue-context-menu-content v-if="menu.children && menu.children.length"
                                  :is-root="false"
                                  @click="menuItemClick"
                                  :menus="menu.children">
        </vue-context-menu-content>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'VueContextMenuContent',
  props: {
    menus: {
      type: Array,
      default: []
    },
    show: {
      type: Boolean,
      default: false
    },
    isRoot: {
      type: Boolean,
      default: true
    },
    left: Number,
    top: Number
  },
  data () {
    return {
      stylesName: {},
      showContent: true,
      menuContentInnerWidth: 0,
      menuContentInnerHeight: 0,
      styleName: {}
    }
  },
  mounted () {
    let menuContentInner = this.$el
    this.menuContentInnerWidth = menuContentInner.offsetWidth
    this.menuContentInnerHeight = menuContentInner.offsetHeight
    this.showContent = !this.isRoot
  },
  watch: {
    show (value) {
      this.showContent = value
    },
    showContent (value) {
      this.$emit('update:show', value)
    },
    isRoot (value) {
      if (!value) {
        this.showContent = true
      } else {
        this.showContent = false
      }
    }
  },
  methods: {
    setPositions (x, y) {
      let clientWidth = window.innerWidth
      let clientHeight = window.innerHeight
      let left = clientWidth - x < this.menuContentInnerWidth ? (x - this.left - this.menuContentInnerWidth) : x - this.left
      let top = clientHeight - y < this.menuContentInnerHeight ? (y - this.top - this.menuContentInnerHeight) : y - this.top
      this.styleName = {
        left: left + 'px',
        top: top + 'px'
      }
      this.getChildPosition(left + this.left, top + this.top, this.menus)
    },
    getChildPosition (pX, pY, menus) {
      let top = pY
      let clientWidth = window.innerWidth
      let clientHeight = window.innerHeight
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].children && menus[i].children.length) {
          let height = this.getChildrenHeight(menus[i].children)
          if (top + height + 35 > clientHeight) {
            menus[i].classY = 'bottom'
          } else {
            console.log('top')
            menus[i].classY = 'top'
          }
          if (pX + 360 > clientWidth) {
            menus[i].classX = 'left'
          } else {
            menus[i].classX = 'right'
          }
          console.log(height)
        }
        if (menus[i].type === 'separator') {
          top += 21
        } else {
          top += 35
        }
      }
    },
    getChildrenHeight (menus) {
      let height = 0
      menus.forEach(item => {
        if (item.type === 'separator') {
          height += 21
        } else {
          height += 35
        }
      })
      return height
    },
    menuItemClick (menuItem) {
      this.$emit('click', menuItem)
    }
  }
}
</script>

<style lang="less" scoped>
.context-menu__content {
  position: absolute;
  width: 180px;
  min-height: 30px;
  background: #ffffff;
  box-shadow: 0 2px 8px #a8a8a8;
  z-index: 99;
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
    text-align: left;
    
  }
  .context-menu--item {
    position: relative;
    display: block;
    padding: 0 10px;
    font-size: 12px;
    &:hover {
      background:#efefef;
    }
    .context-menu__content {
        display: none;
      }
    &.top {
      .context-menu__content {
        top: 50%;
        bottom: auto;
      }
    }
    &.bottom {
      .context-menu__content {
        top: auto;
        bottom: 50%;
      }
    }
    &.right {
      .context-menu__content {
        left: auto;
        margin-left: -10px;
        right: -180px;
      }
    }
    &.left {
      .context-menu__content {
        left: -180px;
        margin-right: -10px;
        right: auto;
      }
    }
    &.is-hover,
    &:hover {
     >.context-menu__content {
        display: block;
      } 
    }
  }
}

.context-menu--item {
  &.has-child {
    >.context-menu--item__inner {
      &:after {
        content: " ";
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -4px;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4px;
        border-color: transparent transparent transparent  #333333;
      }
    }
  }
}

.context-menu--item__inner {
  position: relative;
  width: 100%;
  height: 35px;
  line-height: 35px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 10px;
  box-sizing: border-box;
  user-select: none;
}
.context-menu--splite {
  margin-top:    10px;
  margin-bottom: 10px;
  border: 0;
  border-top: 1px solid #ddd;
}
</style>
