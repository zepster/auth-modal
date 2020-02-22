<template>
  <form
    class="c-form"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      v-if="$slots.header"
      class="c-form__header"
    >
      <slot name="header" />
    </div>
    <div class="c-form__body">
      <slot />
    </div>
    <div class="c-form__error">
      <slot name="error" />
    </div>
    <div class="c-form__footer">
      <slot name="footer" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'CForm',
};
</script>

<style lang="scss">
  .c-form {
    .c-form-group:not(:last-child) {
      margin-bottom: 10px;
    }

    &__error {
      min-height: 50px;
      padding-top: 5px;
    }

    &__header {
      margin-bottom: 30px;
    }
  }
</style>
