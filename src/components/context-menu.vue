<template>
<div @contextmenu.prevent="contextmenu" class="context-menu">
  <slot></slot>
  <div class="context-menu__content">
    <div></div>
  </div>
</div>
</template>
<script>
export default {
  name: 'VueContextMenu',
  props: {
    menus: {
      type: Array,
      default: []
    },
    show: Boolean
  },
  data () {
    return {
      showContextMenu: false
    }
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
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.context-menu{
  position: relative;
}
.context-menu__content {
  position: absolute;
  width: 200px;
  min-height: 30px;
  border: 1px solid #ddd;
}
.context-menu__item {
  width: 100%;
}
</style>
