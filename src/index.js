import ContextMenu from './components/context-menu'

ContextMenu.install = Vue => {
  Vue.component(ContextMenu.name, ContextMenu)
}
export default ContextMenu
