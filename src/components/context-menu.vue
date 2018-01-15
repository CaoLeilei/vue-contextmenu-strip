<template>
<div @contextmenu.prevent.stop="contextmenu" class="context-menu">
  <slot></slot>
  <vue-context-menu-content 
    ref="contextMenu"
    :show="showContextMenu"
    :menus="menus"
    :is-root="true"
    :client-x="clientX"
    :client-y="clientY"
    @click="menuItemClick">
  </vue-context-menu-content>
</div>
</template>
<script>
import VueContextMenuContent from './context-menu-content'
export default {
  name: 'VueContextMenu',
  components: { VueContextMenuContent },
  props: {
    menus: {
      type: Array,
      default: []
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    show: Boolean
  },
  data () {
    return {
      contextMenu: null,
      clientX: 0,
      clientY: 0,
      showContextMenu: false
    }
  },
  created () {
    window.addEventListener('click', e => {
      e.stopPropagation()
      e.preventDefault()
      this.showContextMenu = false
    }, true)
  },
  mounted () {
    this.contextMenu = this.$refs.contextMenu
    this.clientX = this.$el.offsetLeft
    this.clientY = this.$el.offsetTop
    console.log(this.$el)
    // let menuContentInner = this.$refs['menuContentInner']
    // if (menuContentInner) {
    //   this.menuContentInner = menuContentInner
    //   this.menuContentInnerWidth = menuContentInner.$el.clientWidth
    //   this.menuContentInnerHeight = menuContentInner.$el.clientHeight
    // }
    // this.showContextMenu = false
  },
  watch: {
    show (value) {
      this.showContextMenu = value
    },
    showContextMenu (value) {
      this.$emit('update:show', value)
    }
  },
  methods: {
    contextmenu (e) {
      let clientX = e.clientX
      let clientY = e.clientY
      this.contextMenu.setPositions(clientX, clientY)
      this.showContextMenu = true
    },
    menuItemClick (data) {
      this.$emit('click', data)
    }
  }
}
</script>

<style lang="less" scoped>
.context-menu{
  position: relative;
  cursor: default;
}
</style>
