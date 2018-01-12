<template>
<div @contextmenu.prevent="contextmenu" class="context-menu">
  <slot></slot>
  <div class="context-menu__content">
    <ul>
      <li class="context-menu--item has-child">
        <div class="context-menu--item__inner">
          div
        </div>
        <div class="context-menu__content">
          <ul>
            <li class="context-menu--item">
              <div class="context-menu--item__inner">
                div
              </div>
              <div class="context-menu__content">
                <ul>
                  <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                  <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                  <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                  <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                   <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                  <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                   <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                  <li class="context-menu--item">
                    <div class="context-menu--item__inner">asdasdasd</div>      
                  </li>
                </ul>
              </div>
            </li>
            <li class="context-menu--item">
              <div class="context-menu--item__inner">asdasdasd</div>
            </li>
            <li class="context-menu--item">
              <div class="context-menu--item__inner">asdasdasda</div>
            </li>
            <li class="context-menu--item">
              <div class="context-menu--item__inner">asdasdasd</div>
            </li>
            <li class="context-menu--item">
              <div class="context-menu--item__inner">asdasdasd</div>
            </li>
          </ul>
        </div>
      </li>
      <li class="context-menu--item">
        <div class="context-menu--item__inner">asdasdasd</div>
      </li>
      <li class="context-menu--item">
        <div class="context-menu--item__inner">asdasdasda</div>
      </li>
      <li class="context-menu--item">
        <div class="context-menu--item__inner">asdasdasd</div>
      </li>
      <li class="context-menu--item">
        <div class="context-menu--item__inner">asdasdasd</div>
      </li>
    </ul>
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
  width: 180px;
  min-height: 30px;
  background: #ffffff;
  box-shadow: 0 2px 8px #a8a8a8;
  z-index: 1;
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
      top: 100%;
      margin-top: -10px;
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
}
</style>
