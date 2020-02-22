<template>
  <div class="c-modal-background">
    <slot />
  </div>
</template>

<script>
const BODY_ELEMENT = document.querySelector('body');

export default {
  name: 'CModalBackground',
  mounted() {
    const { style } = BODY_ELEMENT;
    style.overflow = 'hidden';
  },
  beforeDestroy() {
    const { style } = BODY_ELEMENT;
    style.overflow = '';
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-modal-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255, .66);

    @include md {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
