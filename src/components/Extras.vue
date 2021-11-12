<template>
  <div class="component">
    <img class="img-fluid my-3" :src="extra.tall" alt="" />
  </div>
</template>


<script>
export default {
  props: {
    extra: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>