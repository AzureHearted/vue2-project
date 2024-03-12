<template>
  <div class="container">
    <el-button
      type="primary"
      size="default"
      @click="handle"
    >
      {{ num }}
    </el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 1,
        obj: {
          a: 1,
          b: "",
        },
      };
    },
    methods: {
      async handle() {},
    },
  };
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
  }
</style>
