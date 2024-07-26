<template>
  <div class="px-3 py-2 bg-white text-black shadow-lg rounded-lg size-32">
    <h1>{{ student.name }}</h1>
    <h1>{{ student.age }}</h1>
  </div>
</template>

<script>
export default {
  props: ["data"],
  setup(props) {
    const student = props.data;
    return { student };
  },
};
</script>

<style lang="scss" scoped></style>
