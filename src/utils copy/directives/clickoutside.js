export default {
  bind: function(el, binding, vnode) {
    var documentHandler = function(e) {
      if (el.contains(e.target)) {
        return false
      }

      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__clickoutsideHandler = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind: function(el, binding) {
    document.removeEventListener('click', el.__clickoutsideHandler)
    delete el.__clickoutsideHandler
  }
}
