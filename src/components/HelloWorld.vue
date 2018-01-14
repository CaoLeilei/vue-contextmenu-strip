<template>
  <div class="hello">
    <div style="900px; height:300px; margin:0 auto;">
      <vue-context-menu :menus="menu" @click="menuItemClick">
        <div style="width: 100%; height: 300px; border:1px solid #ddd;">你好这是一个天才的梦想</div>
      </vue-context-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      menu: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    for (let i = 0; i < 6; i++) {
      if (i !== 4) {
        let obj = {
          label: 'menu-' + i + '-1' + 'Welcome to Your Vue.js App'
        }
        if (i === 3) {
          obj.children = [
            {label: 'menu-' + i + '-1'},
            {label: 'menu-' + i + '-2'},
            {label: 'menu-' + i + '-3'},
            {label: 'menu-' + i + '-3'},
            {label: 'menu-' + i + '-3'},
            {label: 'menu-' + i + '-3'}
          ]
        }
        this.menu.push(obj)
      } else {
        let obj = {
          type: 'separator'
        }
        this.menu.push(obj)
      }
    }
  },
  methods: {
    menuItemClick (data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
