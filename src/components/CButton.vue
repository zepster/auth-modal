<template>
  <button
    class="c-button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CInput',
  inheritAttrs: false,
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-button {
    position: relative;
    padding: 22px 19px;
    font-size: 16px;
    line-height: 20px;
    color: $white;
    outline: none;
    cursor: pointer;
    background-color: $primary;
    border: 1px solid $primary;
    width: 100%;
    transition: .2s ease;
    height: 65px;

    &:hover {
      background-color: darken($primary, 5%);
    }

    &[disabled] {
      background-color: #dce4ee;
      border-color: #dce4ee;
    }

    @include md {
      font-size: 20px;
    }
  }
</style>
