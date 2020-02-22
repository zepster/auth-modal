<template>
  <span>{{ time }}</span>
</template>

<script>
export default {
  name: 'CTimer',
  props: {
    duration: { type: Number, required: true },
  },
  data() {
    return {
      timer: this.duration,
    };
  },
  computed: {
    time() {
      const m = Math.floor(this.timer / 60);
      const sec = `${this.timer % 60}`.padStart(2, '0');
      return `${m}:${sec}`;
    },
  },
  created() {
    this.timeout = null;
  },
  mounted() {
    this.sub();
  },
  beforeDestroy() {
    this.unsub();
  },
  methods: {
    sub() {
      this.timeout = setTimeout(this.onTick, 1000);
    },
    unsub() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    },
    onTick() {
      this.timer -= 1;
      if (!this.timer) {
        this.unsub();
        this.$emit('done');
      } else {
        this.sub();
      }
    },
  },
};
</script>
