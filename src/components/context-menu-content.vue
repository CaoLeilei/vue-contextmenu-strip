<template>
 <div class="context-menu__content" v-show="showContent" @contextmenu.prevent.stop>
    <ul>
      <li class="context-menu--item" 
          v-for="(menu, index) in menus"
          :class="{'has-child': menu.children && menu.children.length}"
          :key="index">
        <div class="context-menu--item__inner" 
             @click="menuItemClick(menu)"
             v-if="menu.type != 'separator'">
          <span>{{menu.label}}</span>
        </div>
        <hr class="context-menu--splite" v-if="menu.type == 'separator'" />
          <!-- <vue-context-menu-content v-if="menu.children && menu.children.length" 
                                    @click="menuItemClick"
                                    :menus="menu.children">
          </vue-context-menu-content> -->
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
    clientX: Number,
    clientY: Number
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
    this.showContent = false
  },
  watch: {
    show (value) {
      this.showContent = value
    },
    showContent (value) {
      this.$emit('update:show', value)
    },
    clientX (value) {
      console.log(value)
    },
    clientY (value) {
      console.log(value)
    }
  },
  methods: {
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
      left: 100%;
      top: 50%;
      margin-left: -10px;
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
