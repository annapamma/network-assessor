<template>
  <div ref="colorPicker" />
  <div ref="colorPickerContainer" />
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
    mounted() {
      createPicker({
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
    }
  }
</script>

<style scoped>
</style>
