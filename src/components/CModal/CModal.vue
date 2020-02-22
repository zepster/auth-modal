<template>
  <c-modal-background v-if="isOpen">
    <div class="c-modal">
      <div
        v-if="closable"
        class="c-modal__close-container"
        @click="close"
      >
        <img
          class="c-modal__close-icon"
          align="Close"
          src="@/assets/icons/cross.svg"
        >
      </div>
      <div class="c-modal__container">
        <div
          v-if="header"
          class="c-modal__header"
        >
          {{ header }}
        </div>
        <div class="c-modal__body">
          <slot />
        </div>
      </div>
    </div>
  </c-modal-background>
</template>

<script>
import CModalBackground from './CModalBackground';

export default {
  name: 'CModal',
  components: {
    CModalBackground,
  },
  props: {
    header: { type: String, required: false, default: '' },
    closable: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    show() {
      this.isOpen = true;
    },
  },
};
</script>

<style lang="scss">

  @import 'src/styles';

  .c-modal {
    position: relative;
    z-index: 1010;
    width: 100%;
    height: 100%;
    background-color: $white;
    box-shadow: 0 7px 70px rgba(0, 50, 123, .1);

    &__header {
      font-size: 22px;
      line-height: 20px;
      margin-bottom: 38px;
      font-weight: 500;
    }

    &__container {
      padding: 52px 15px;
      max-width: 400px;
      margin: auto;
    }

    &__close-container {
      position: absolute;
      right: 17px;
      top: 15px;
      cursor: pointer;
    }

    &__close-icon {
      width: 100%;
      height: 100%;
    }

    @include md {
      width: 520px;
      height: auto;

      &__header {
        font-size: 25px;
      }

      &__container {
        max-width: 100%;
        margin: initial;
        padding: 54px 48px;
      }

      &__close-container {
        right: 24px;
        top: 26px;
      }
    }
  }
</style>
