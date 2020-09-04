<template>
  <div>
    <div ref="colorPicker" />
    <div ref="colorPickerContainer" />
  </div>
</template>

<script>
  import '@simonwep/pickr/dist/themes/classic.min.css';
  import { createPicker } from '@/colorpicker/createPicker'

  export default {
    name: "ColorPicker",
    props: {
      color: String,
      updateColor: Function
    },
    data() {
      return {
        pickr: null
      }
    },
    mounted() {
      this.pickr = createPicker({
        container: this.$refs.colorPickerContainer,
        el: this.$refs.colorPicker,
        theme: 'classic',
        components: {
          preview: true,
          hue: true,
          interaction: {
            input: true,
            save: true
          }
        },
        default: this.color,
        position: 'right'
      }, { onSave: this.updateColor })
    },
    beforeDestroy() {
      this.pickr.destroyAndRemove()
    }
  }
</script>

<style scoped>
</style>
