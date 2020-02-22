<template>
  <c-modal
    ref="modal"
    :header="header"
  >
    <component
      :is="stepComponent"
      v-bind="stepProps"
      v-on="stepListeners"
    />
  </c-modal>
</template>
<script>
import CModal from '@/components/CModal/CModal';
import StepAuth from '@/modules/StepAuth';
import StepConfirm from '@/modules/StepConfirm';
import confirmService from '@/services/confirm';

const authServiceInstance = confirmService();

const STEP_NAMES = {
  auth: 'auth',
  confirm: 'confirm',
};

const STEP_MAP = {
  [STEP_NAMES.auth]: 'step-auth',
  [STEP_NAMES.confirm]: 'step-confirm',
};

const HEADERS = {
  [STEP_NAMES.auth]: 'Вход или регистрация',
  [STEP_NAMES.confirm]: 'Введите код',
};

export default {
  components: {
    CModal,
    StepAuth,
    StepConfirm,
  },
  data() {
    return {
      currentStep: STEP_NAMES.auth,
      phone: '',
      invalidCode: false,
    };
  },
  computed: {
    stepComponent() {
      return STEP_MAP[this.currentStep];
    },
    header() {
      return HEADERS[this.currentStep];
    },
    stepProps() {
      if (this.currentStep === STEP_NAMES.auth) {
        return {};
      }
      return {
        phone: this.phone,
        invalid: this.invalidCode,
      };
    },
    stepListeners() {
      const base = {
        next: this.onNextStep,
        back: this.onBackStep,
      };
      if (this.currentStep === STEP_NAMES.confirm) {
        base.reset = this.onResetCode;
      }
      return base;
    },
  },
  mounted() {
    const element = document.querySelector('#modal-btn');
    if (element) {
      element.addEventListener('click', this.$refs.modal.show);
    }
  },
  methods: {
    async onNextStep(params) {
      if (this.currentStep === STEP_NAMES.auth) {
        await authServiceInstance.generateCode();
        this.currentStep = STEP_NAMES.confirm;
        this.phone = params.phone;
        return;
      }
      if (await authServiceInstance.confirm(params.code)) {
        this.$refs.modal.close();
        this.currentStep = STEP_NAMES.auth;
      } else {
        this.invalidCode = true;
      }
    },
    onBackStep() {
      this.currentStep = STEP_NAMES.auth;
      this.invalidCode = false;
    },
    async onResetCode() {
      await authServiceInstance.generateCode();
      this.invalidCode = false;
    },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';
  @import 'src/styles/fonts';

  body {
    font-family: $font-family;
  }

  * {
    box-sizing: border-box;
  }

</style>
