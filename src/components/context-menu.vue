<template>
<div @contextmenu.prevent.stop="contextmenu" class="context-menu">
  <slot></slot>
  <vue-context-menu-content 
    :show="showContextMenu"
    :menus="menus"
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
      console.log(123123)
      // if (!this.menuContentInner) return
      // let clientWidth = window.innerWidth
      // let clientHeight = window.innerHeight
      // let clientX = e.clientX
      // let clientY = e.clientY
      // let positionX = (clientWidth - clientX - 10) < this.menuContentInnerWidth ? e.offsetX - this.menuContentInnerWidth : e.offsetX
      // let positionY = (clientHeight - clientY - 10) < this.menuContentInnerHeight ? e.offsetY - this.menuContentInnerHeight : e.offsetY
      // this.menuContentStyle = {
      //   left: positionX + 'px',
      //   top: positionY + 'px'
      // }
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
