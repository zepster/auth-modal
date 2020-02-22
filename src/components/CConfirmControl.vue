<template>
  <div class="c-confirm-control">
    <c-input
      ref="ctrl0"
      :value="getValue(0)"
      class="c-confirm-control__input"
      @input="e => onInputHandler(0, e.target.value)"
    />
    <c-input
      ref="ctrl1"
      :value="getValue(1)"
      class="c-confirm-control__input"
      @input="e => onInputHandler(1, e.target.value)"
    />
    <c-input
      ref="ctrl2"
      class="c-confirm-control__input"
      :value="getValue(2)"
      @input="e => onInputHandler(2, e.target.value)"
    />
    <c-input
      ref="ctrl3"
      class="c-confirm-control__input"
      :value="getValue(3)"
      @input="e => onInputHandler(3, e.target.value)"
    />
  </div>
</template>

<script>
import CInput from '@/components/CInput';

const DEFAULT_CODE = () => (['', '', '', '']);

export default {
  name: 'CConfirmControl',
  components: {
    CInput,
  },
  data() {
    return {
      code: DEFAULT_CODE(),
    };
  },
  mounted() {
    /**
     * Опционально
     */
    // this.$refs.ctrl0.$el.focus();
  },
  methods: {
    onInputHandler(index, value) {
      value = value[value.length - 1];
      this.code.splice(index, 1, value);
      if (index < 3 && value) {
        this.$refs[`ctrl${index + 1}`].$el.focus();
      }
      this.tryComplete();
    },
    getValue(index) {
      return this.code[index];
    },
    tryComplete() {
      const code = this.code.join('');
      if (code.length === 4) {
        this.$emit('input', code);
      }
    },
    reset() {
      this.code = DEFAULT_CODE();
    },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-confirm-control {
    display: flex;
    justify-content: space-between;
    margin: auto;
    text-align: center;

    &__input {
      width: 65px;
      height: 65px;
      font-size: 30px;
      line-height: 20px;
      text-align: center;
      padding: 0;
    }

    &__input:not(:last-child) {
      margin-right: 10px;
    }

    @include md {
      &__input {
        width: 90px;
        height: 80px;
        font-size: 30px;
      }

      &__input:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
</style>
