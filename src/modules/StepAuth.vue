<template>
  <c-form @submit.prevent="onSubmitForm">
    <c-form-group
      label-target="phone"
      title="Номер телефона"
    >
      <c-input
        :value="placeholder"
        phone-mask
        type="tel"
        disabled
      />
      <c-input
        id="phone"
        ref="phone"
        v-model="formattedValue"
        class="form-control"
        type="tel"
        @keydown="onkeydown"
      />
    </c-form-group>
    <c-button
      type="submit"
    >
      Продолжить
    </c-button>
    <template v-slot:error>
      <c-text
        v-if="error"
        error
      >
        {{ error }}
      </c-text>
    </template>
    <template v-slot:footer>
      <c-text>
        Нажимая кнопку «Продолжить», я даю согласие на обработку моих
        персональных данных
        и принимаю настоящие
        <c-text
          href="#"
          class="c-link"
          tag="a"
        >
          Соглашения
        </c-text>
      </c-text>
    </template>
  </c-form>
</template>

<script>
import { formatter as newFormatter } from '@/utils/phoneFormat';
import { KEY_CODES } from '@/utils/constants';
import CForm from '@/components/CForm';
import CFormGroup from '@/components/CFormGroup';
import CInput from '@/components/CInput';
import CButton from '@/components/CButton';
import CText from '@/components/CText';

const formatter = newFormatter({
  prefix: '+7',
  maskSign: '_',
  groupDelimiter: '-',
});

export default {
  name: 'StepAuth',
  components: {
    CInput,
    CButton,
    CForm,
    CFormGroup,
    CText,
  },
  data() {
    return {
      phoneValue: '',
      error: '',
    };
  },
  computed: {
    placeholder() {
      return formatter.formatPlaceholder(this.phoneValue);
    },
    /**
     * В целях простоты обработка особых случаев опущена
     */
    formattedValue: {
      get() {
        return formatter.format(this.phoneValue);
      },
      set(event) {
        const { value } = event.target;
        this.phoneValue = formatter.parse(value);
      },
    },
  },
  mounted() {
    /**
     * Опционально
     */
    // this.$refs.phone.$el.focus();
  },
  methods: {
    /**
     * В целях простоты обработка особых случаев опущена
     */
    onkeydown(e) {
      const { keyCode } = e;
      const isNumber = KEY_CODES.tests.isNumber(e);
      const isAllowCode = (keyCode === KEY_CODES.CODES.BS
        || keyCode === KEY_CODES.CODES.ENTER
        || keyCode === KEY_CODES.CODES.TAB
        || keyCode === KEY_CODES.CODES.DEL);
      const isDone = formatter.isDone(this.phoneValue);
      if ((isNumber && !isDone) || isAllowCode) {
        return;
      }
      e.preventDefault();
    },
    /**
     * Async контракт
     */
    isValidForm() {
      return new Promise((res) => {
        const isValid = formatter.isDone(this.phoneValue);
        if (isValid) {
          res(true);
        } else {
          throw new Error();
        }
      });
    },
    /**
     * Одна общая ошибка
     */
    onValidationError() {
      this.error = 'Для продолжения ведите корректный номер телефона';
    },
    async onSubmitForm() {
      try {
        await this.isValidForm();
        this.error = '';
        this.$emit('next', { phone: this.formattedValue });
      } catch (e) {
        this.onValidationError();
      }
    },
  },
};
</script>
