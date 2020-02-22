<template>
  <component
    :is="tag"
    class="c-text"
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CText',
  props: {
    error: { type: Boolean, required: false, default: false },
    tag: { type: String, required: false, default: 'p' },
  },
  computed: {
    classes() {
      return {
        _error: this.error,
        _link: this.tag === 'a',
        [`_${this.size}`]: true,
      };
    },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-text {
    margin: 0 0 10px;
    padding: 0;
    color: $base;
    font-size: 16px;
    line-height: 16px;

    .c-link {
      color: $base !important;
      text-decoration: underline;
    }

    &._error {
      color: #db5454;
    }

    &._link {
      cursor: pointer;
      color: $primary;
      text-decoration: none;
    }
  }
</style>
