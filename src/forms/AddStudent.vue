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
        <button class="btnsubmit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
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
    return { handleSubmit, name, age };
  },
};
</script>

<style lang="scss" scoped></style>
