<template>
  <div class="relative">
    <!-- api -->
    <button class="btnsubmit" @click="handleAddStudent">Add Student</button>
    <div class="p-5 rounded-lg shadow-md ml-8 mt-8 w-fit">
      <table>
        <tr>
          <th class="w-[200px] text-blue-500 font-semibold">Action</th>
          <th class="w-[200px] text-blue-500 font-semibold">Id</th>
          <th class="w-[200px] text-blue-500 font-semibold">Name</th>
          <th class="w-[200px] text-blue-500 font-semibold">Age</th>
        </tr>
        <tr v-for="students in student" :key="students.id">
          <td class="space-x-4">
            <button class="text-red-500" @click="handleDeletePop(students.id)">
              Delete
            </button>

            <button @click="handleEditData(students)" class="text-blue-500">
              Edit
            </button>
          </td>
          <td>{{ students.id }}</td>
          <td>{{ students.name }}</td>
          <td>{{ students.age }}</td>
        </tr>
      </table>
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
                  <component
                    :is="currentComponent"
                    :datatoedit="datatoedit"
                    @close="handleClose"
                  >
                  </component>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isDelete" as="template">
      <Dialog as="div" @close="handleCloseDelete" class="relative z-10">
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
                  Delete Student student
                </DialogTitle>
                <div class="mt-2">
                  <button @click="handleCloseDelete">Cancel</button>
                  <button @click="confirmDetele(currnetId)">Yes</button>
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
      datatoedit.value = null;
      getStudents();
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

    // edit
    const datatoedit = ref(null);
    const handleEditData = (item) => {
      datatoedit.value = item;
      console.log("data", datatoedit.value);
      isOpen.value = true;
      currentComponent.value = "AddStudent";
    };
    onMounted(() => {
      getStudents();
    });

    const isDelete = ref(false);
    const currnetId = ref(null);
    const handleDeletePop = (id) => {
      isDelete.value = true;
      currnetId.value = id;
      console.log("student to delete", currnetId.value);
    };

    const handleCloseDelete = () => {
      isDelete.value = false;
      currnetId.value = null;
    };
    const confirmDetele = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/students/${id}`);
        console.log("deleted", id);
        handleCloseDelete();
        getStudents();
      } catch (error) {
        console.log("delete student error", error);
      }
    };

    return {
      student,
      handleAddStudent,
      currentComponent,
      isOpen,
      handleClose,
      handleEditData,
      datatoedit,

      // delete
      handleDeletePop,
      handleCloseDelete,
      isDelete,
      confirmDetele,
      currnetId,
    };
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<!-- ref -->
<!-- computed -->
<!-- OnMounted -->
<!-- Watch -->
