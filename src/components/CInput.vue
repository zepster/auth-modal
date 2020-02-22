<template>
  <input
    class="c-input"
    :class="classes"
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
  >
</template>

<script>
export default {
  name: 'CInput',
  inheritAttrs: false,
  props: {
    value: { type: String, required: false, default: '' },
    valid: { type: Boolean, required: false, default: false },
    invalid: { type: Boolean, required: false, default: false },
    phoneMask: { type: Boolean, required: false, default: false },
  },
  computed: {
    classes() {
      return {
        _valid: this.valid && !this.invalid,
        _invalid: this.invalid && !this.valid,
        '_phone-mask': this.phoneMask,
      };
    },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-input {
    font-family: $font-family;
    border: 1px solid #dce4ee;
    position: relative;
    padding: 22px 19px;
    font-size: 18px;
    line-height: 20px;
    color: $black;
    outline: none;
    background-color: transparent;
    width: 100%;
    height: 65px;
    appearance: none;
    border-radius: 0;

    &::placeholder {
      font-family: $font-family;
      line-height: inherit !important;
    }

    &._invalid {
      border-color: #db5454;
    }

    &._phone-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: .7;
    }

    @include md {
      font-size: 20px;
      padding: 22px 27px;
    }
  }
</style>
