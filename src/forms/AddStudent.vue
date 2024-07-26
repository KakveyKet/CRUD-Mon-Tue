<template>
  <div>
    <div class="mt-2">
      <form @submit.prevent="handleSubmit" style="padding: 20px">
        <div class="flex flex-col">
          <label for="name"> name </label>
          <input required type="text" id="name" v-model="name" />
        </div>
        <div class="flex flex-col">
          <label for="age"> age </label>
          <input required type="number" id="age" v-model="age" />
        </div>
        <br />
        <button type="submit" class="btnsubmit">Submit</button>

        <button
          type="button"
          class="btnsubmit bg-red-500 ml-4"
          @click="handleClose"
        >
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  props: [""],
  setup(props, { emit }) {
    const name = ref("");
    const age = ref("");
    const handleSubmit = async () => {
      const reqbody = {
        name: name.value,
        age: age.value,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/students",
          reqbody
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const handleClose = () => {
      emit("close");
    };
    return { handleSubmit, name, age, handleClose };
  },
};
</script>

<style lang="scss" scoped></style>
