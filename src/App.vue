<template>
  <div>
    <div class="p-5">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-blue-600 py-2 underline">
          Students
        </h1>
        <button @click="handleOpen" class="btnsubmit">Add New Student</button>
      </div>

      <!-- true -->
      <div v-if="data.length > 0">
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
          <tr v-for="(student, index) in data" :key="index">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td class="flex space-x-2">
              <svg
                @click="handleUpdateStudent(index)"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-blue-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <svg
                @click="handleDeleteStudent(index)"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </td>
          </tr>
        </table>
      </div>
      <!-- false -->
      <div v-else>
        <h2 style="color: red">No student here</h2>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="handleClose" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  <h2 v-if="dataToUpdate === null">Add New Student</h2>
                  <h2 v-else>Update Student</h2>
                </DialogTitle>
                <div class="mt-2">
                  <form @submit.prevent="handleSubmit" style="padding: 20px">
                    <div class="flex flex-col">
                      <label for="id"> id </label>
                      <input required type="number" id="id" v-model="id" />
                    </div>
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

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="handleClose"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { ref } from "vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  setup() {
    const data = ref([
      { id: 1, name: "Kakvey", age: 18 },
      { id: 2, name: "Darenn", age: 22 },
      { id: 3, name: "Nin", age: 21 },
    ]);
    // delete
    const handleDeleteStudent = (index) => {
      data.value.splice(index, 1);
    };

    // Insert
    const id = ref();
    const name = ref("");
    const age = ref();

    const handleSubmit = () => {
      if (dataToUpdate.value === null) {
        data.value.push({
          id: id.value,
          name: name.value,
          age: age.value,
        });
        handleClear();
        handleClose();
      } else {
        const index = dataToUpdate.value;
        data.value[index] = {
          id: id.value,
          name: name.value,
          age: age.value,
        };
        handleClear();
        handleClose();
      }
    };
    const dataToUpdate = ref(null);
    const handleUpdateStudent = (index) => {
      const student = data.value[index];
      if (student) {
        id.value = student.id;
        name.value = student.name;
        age.value = student.age;
        dataToUpdate.value = index;
      }
      handleOpen();
    };

    const handleClear = () => {
      id.value = null;
      name.value = "";
      age.value = null;
    };

    // popup modal
    const isOpen = ref(false);
    const handleOpen = () => {
      isOpen.value = true;
    };
    const handleClose = () => {
      isOpen.value = false;
      handleClear();
      dataToUpdate.value = null;
    };
    return {
      data,
      handleDeleteStudent,
      handleSubmit,
      id,
      name,
      age,
      handleUpdateStudent,
      handleOpen,
      isOpen,
      handleClose,
      dataToUpdate,
    };
  },
};
</script>

<!-- ref -->
<!-- computed -->
<!-- OnMounted -->
<!-- watch -->
