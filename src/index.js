import DatePicker from '../components/date-picker'

const components = [
  DatePicker
]

const install = function(Vue) {
  components.forEach((component) => {
    console.log('haha')
    Vue.component(component.name, component)
  })
}

export default {
  install,
  DatePicker
}