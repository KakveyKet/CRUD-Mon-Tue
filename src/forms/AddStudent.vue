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
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  props: ["datatoedit"],
  setup(props, { emit }) {
    const name = ref("");
    const age = ref("");

    const handleSubmit = async () => {
      const reqbody = {
        name: name.value,
        age: age.value,
      };

      try {
        if (props.datatoedit) {
          const response = await axios.put(
            `http://localhost:3000/students/${props.datatoedit.id}`,
            reqbody
          );
          console.log("data updated", response.data);
          handleClose();
        } else {
          const response = await axios.post(
            "http://localhost:3000/students",
            reqbody
          );
          console.log("data added", response.data);
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleClose = () => {
      emit("close");
    };

    onMounted(() => {
      if (props.datatoedit) {
        name.value = props.datatoedit.name;
        age.value = props.datatoedit.age;
      }
    });

    return { handleSubmit, name, age, handleClose };
  },
};
</script>

<style lang="scss" scoped></style>
