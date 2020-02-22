<template>
  <div class="c-form-group">
    <label
      v-if="title"
      class="c-form-group__label"
      :for="labelTarget"
    >
      {{ title }}
    </label>
    <div class="c-form-group__control">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CFormGroup',
  props: {
    title: { type: String, required: false, default: '' },
    labelTarget: { type: String, required: false, default: '' },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-form-group {
    &__label {
      font-size: 16px;
      line-height: 20px;
      color: #404040;
      display: inline-block;
      margin-bottom: 14px;
    }

    &__control {
      position: relative;
      display: flex;
      overflow: hidden;
      background-color: $white;
    }

    @include md {
      &__label {
        font-size: 18px;
      }
    }
  }
</style>
