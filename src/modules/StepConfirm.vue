<template>
  <c-form
    class="step-confirm"
    @submit.prevent=""
  >
    <template v-slot:header>
      <c-text class="step-confirm__title">
        Мы отправили код на {{ phone }}
      </c-text>
      <c-text
        tag="a"
        href="#"
        class="step-confirm__edit"
        @click.prevent="onBackClick"
      >
        Изменить
      </c-text>
    </template>
    <c-confirm-control
      ref="confirmControl"
      @input="onCodeInput"
    />
    <template v-slot:error>
      <c-text
        v-if="$attrs.invalid"
        error
      >
        Вы ввели неправильный код, попробуйте еще раз
      </c-text>
    </template>
    <template v-slot:footer>
      <c-text
        v-if="timerIsRunning"
        class="step-confirm__timer"
      >
        Получить новой код можно
        <br>
        через <c-timer
          :duration="25"
          @done="onTimerDone"
        />
      </c-text>
      <c-text
        v-else
        class="step-confirm__action"
        @click="onResetCode"
      >
        Отправить код
        <br>
        еще раз
      </c-text>
    </template>
  </c-form>
</template>

<script>
import CForm from '@/components/CForm';
import CText from '@/components/CText';
import CConfirmControl from '@/components/CConfirmControl';
import CTimer from '@/components/CTimer';

export default {
  name: 'StepConfirm',
  components: {
    CForm,
    CText,
    CConfirmControl,
    CTimer,
  },
  props: {
    phone: { type: String, required: true },
  },
  data() {
    return {
      timerIsRunning: false,
    };
  },
  mounted() {
    this.timerIsRunning = true;
  },
  methods: {
    onBackClick() {
      this.$emit('back');
    },
    onCodeInput(code) {
      this.$emit('next', { code });
    },
    onTimerDone() {
      this.timerIsRunning = false;
    },
    onResetCode() {
      this.$emit('reset');
      this.timerIsRunning = true;
      this.$refs.confirmControl.reset();
    },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .step-confirm {
    .step-confirm__edit,
    .step-confirm__title {
      font-size: 14px;
    }

    .step-confirm__action,
    .step-confirm__timer {
      color: $gray;
      text-align: center;
      line-height: 20px;
    }

    .step-confirm__action {
      cursor: pointer;
    }

    @include md {
      padding-top: 16px;

      .step-confirm__edit,
      .step-confirm__title {
        font-size: 20px;
      }

      .step-confirm__action,
      .step-confirm__timer {
        font-size: 20px;
      }
    }
  }
</style>
