<template>
  <div class="relative">
    <!-- api -->
    <button class="btnsubmit" @click="handleAddStudent">Add Student</button>
    <div
      class="p-5 bg-indigo-500 rounded-lg shadow-md ml-8 mt-8 w-fit text-white"
    >
      <div class="grid grid-cols-3 gap-4">
        <StudentCard
          :data="data"
          v-for="(data, index) in student"
          :key="index"
        />
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
                  Add New Student
                </DialogTitle>
                <div class="mt-2">
                  <component :is="currentComponent" @close="handleClose">
                  </component>
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
import { ref, onMounted } from "vue";
import axios from "axios";
import AddStudent from "../forms/AddStudent.vue";
import StudentCard from "./StudentCard.vue";
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
    AddStudent,
    StudentCard,
  },
  setup() {
    const currentComponent = ref("");
    const isOpen = ref(false);

    const handleAddStudent = () => {
      currentComponent.value = "AddStudent";
      isOpen.value = true;
    };

    const handleClose = () => {
      isOpen.value = false;
      currentComponent.value = "";
    };
    const student = ref([]);
    const getStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        student.value = response.data;
        console.log("data:", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getStudents();
    });

    return {
      student,
      handleAddStudent,
      currentComponent,
      isOpen,
      handleClose,
    };
  },
};
</script>

<!-- ref -->
<!-- computed -->
<!-- OnMounted -->
<!-- Watch -->
