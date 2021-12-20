<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from "@headlessui/vue";
import { useStore } from 'vuex';
import axios from "axios";
import apis from "../apis";
import dayjs from "dayjs";
import { createToast } from "mosha-vue-toastify";
import { HollowDotsSpinner } from 'epic-spinners';

// Hooks
const store = useStore();

// Local State
let fetchingTasksList = ref(true);
let isOpen = ref(false);
let newTaskSummary = ref('');
let newTaskDescription = ref('');
let newTaskDate = ref('');
let deletingTask = ref(false);
let changingTaskStatus = ref(false);
const processingCreateTask = ref(false);
const errors = ref([]);

// Computed
const incompletedTasksList = computed(() => {
  if (store.state.tasks) {
    const list = store.state.tasks.tasks;
    return list.filter((item) => item.status === 'inprogress');
  } else {
    return [];
  }
});
const completedTasksList = computed(() => {
  if (store.state.tasks) {
    const list = store.state.tasks.tasks;
    return list.filter((item) => item.status === 'completed');
  } else {
    return [];
  }
});

// Methods
let closeModal = function () {
  isOpen.value = false
};
let openModal = function () {
  isOpen.value = true
};
const getCheckedStatus = (task) => task.status === 'completed' ? true : false;
const handleCheckBoxClick = async (task) => {
  changingTaskStatus.value = true;
  const updatedTask = {
    ...task,
    status: task.status === 'completed' ? 'inprogress' : 'completed',
  }
  await store.dispatch('tasks/updateTask', { id: task.id, task: updatedTask })
  changingTaskStatus.value = false;
};
const handleDeleteTask = async (task) => {
  deletingTask.value = true;
  await store.dispatch('tasks/deleteTask', task.id);
  deletingTask.value = false;
};
const handleCreateTask = async () => {
  processingCreateTask.value = true;

  if (!newTaskSummary.value.length) {
    errors.value.push('emptyNewTaskSummary');
  } else {
    errors.value = errors.value.filter(item => item !== 'emptyNewTaskSummary');
  }
  if (!newTaskDescription.value.length) {
    errors.value.push('emptyNewTaskDescription');
  } else {
    errors.value = errors.value.filter(item => item !== 'emptyNewTaskDescription');
  }
  if (!newTaskDate.value.length) {
    errors.value.push('emptyNewTaskDate');
  } else {
    errors.value = errors.value.filter(item => item !== 'emptyNewTaskDate');
  }

  if (errors.value.length) {
    processingCreateTask.value = false;
    return;
  }

  await store.dispatch('tasks/createTask', {
    id: `new-task-${store.state.tasks.tasks.length + 1}`,
    title: newTaskSummary.value,
    description: newTaskDescription.value,
    status: "inprogress",
    due_at: dayjs(newTaskDate.value).format("YYYY-MM-DD HH:mm:ss"),
  });

  closeModal();
  newTaskSummary.value = '';
  newTaskDescription.value = '';
  newTaskDate.value = '';
  processingCreateTask.value = false;
};

// LifeCycle Methods
onMounted(async () => {
  fetchingTasksList.value = true;
  await store.dispatch('tasks/getTasks');
  fetchingTasksList.value = false;
});
</script>

<template>
  <div
    v-if="deletingTask || changingTaskStatus"
    class="fixed left-0 top-0 flex items-center justify-center w-screen h-screen bg-black opacity-70 z-50"
  >
    <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" />
  </div>

  <section class>
    <h1 class="text-center text-3xl font-semibold mt-2 mb-8 md:hidden">Task</h1>

    <button class="mb-8 text-lg font-bold text-grayHeading" @click="openModal">+ Add new task</button>

    <div class="mb-8">
      <h2 class="text-lg font-bold text-grayHeading">Incomplete</h2>

      <div v-if="fetchingTasksList" class="my-3">
        <hollow-dots-spinner
          :animation-duration="1000"
          :dot-size="10"
          :dots-num="3"
          color="#575767"
        />
      </div>

      <ul v-else class>
        <li
          v-for="(task, index) in incompletedTasksList"
          :key="index"
          class="group max-w-md flex items-start my-4"
        >
          <input
            type="checkbox"
            @click.prevent="handleCheckBoxClick(task)"
            :checked="getCheckedStatus(task)"
            :name="`${task.id}-${task.title}`"
            :id="`${task.id}-${task.title}`"
            class="w-6 h-6 mr-2 bg-graybg border-grayborder rounded checked:hover:bg-graybg checked:focus:bg-graybg checked:bg-graybg checked:focus:ring-transparent focus:ring-transparent"
          />

          <div class>
            <label
              :for="`${task.id}-${task.title}`"
              class="text-lg text-grayHeading"
            >{{ task.title }}</label>
            <p class="text-sm text-graySubText">⏰ Today, 17.00</p>
          </div>

          <svg
            @click="handleDeleteTask(task)"
            class="lg:hidden lg:group-hover:block ml-auto cursor-pointer transition-all"
            width="20"
            height="23"
            viewBox="0 0 20 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1738 19.6641L17.8379 5.5918H18.9121C19.4004 5.5918 19.7812 5.21094 19.7812 4.72266C19.7812 4.24414 19.4004 3.86328 18.9121 3.86328H14.5762V2.53516C14.5762 1.03125 13.541 0.0644531 11.8711 0.0644531H8.38477C6.72461 0.0644531 5.68945 1.03125 5.68945 2.53516V3.86328H1.36328C0.884766 3.86328 0.494141 4.24414 0.494141 4.72266C0.494141 5.21094 0.884766 5.5918 1.36328 5.5918H2.44727L3.10156 19.6641C3.17969 21.1777 4.13672 22.0762 5.66016 22.0762H14.6348C16.1387 22.0762 17.1055 21.168 17.1738 19.6641ZM7.52539 2.62305C7.53516 2.08594 7.92578 1.70508 8.50195 1.70508H11.7637C12.3398 1.70508 12.7402 2.08594 12.7402 2.62305L12.75 3.86328H7.52539V2.62305ZM5.85547 20.3281C5.31836 20.3281 4.92773 19.9277 4.89844 19.3516L4.24414 5.5918H16.0117L15.3867 19.3516C15.3574 19.9375 14.9766 20.3281 14.4199 20.3281H5.85547ZM13.0234 18.7266C13.3848 18.7266 13.6484 18.4238 13.668 18.0137L13.9609 8.00391C13.9707 7.59375 13.6875 7.28125 13.3262 7.28125C12.9746 7.28125 12.6816 7.60352 12.6719 7.99414L12.3789 17.9941C12.3691 18.4043 12.6426 18.7266 13.0234 18.7266ZM7.26172 18.7266C7.63281 18.7266 7.91602 18.4043 7.90625 17.9941L7.61328 7.99414C7.59375 7.60352 7.30078 7.28125 6.95898 7.28125C6.58789 7.28125 6.31445 7.59375 6.32422 8.00391L6.61719 18.0137C6.62695 18.4238 6.90039 18.7266 7.26172 18.7266ZM10.1426 18.7266C10.4941 18.7266 10.7969 18.4043 10.7969 18.0137V7.99414C10.7969 7.60352 10.5039 7.28125 10.1426 7.28125C9.78125 7.28125 9.48828 7.60352 9.48828 7.99414V18.0137C9.48828 18.4043 9.78125 18.7266 10.1426 18.7266Z"
              fill="red"
            />
          </svg>
        </li>
      </ul>
    </div>

    <div class>
      <h2 class="text-lg font-bold text-grayHeading">Completed</h2>

      <div v-if="fetchingTasksList" class>
        <hollow-dots-spinner
          :animation-duration="1000"
          :dot-size="10"
          :dots-num="3"
          color="#575767"
        />
      </div>

      <ul v-else class>
        <li v-for="(task, index) in completedTasksList" :key="index" class="flex items-start my-4">
          <input
            type="checkbox"
            @click.prevent="handleCheckBoxClick(task)"
            :checked="getCheckedStatus(task)"
            :name="`${task.id}-${task.title}`"
            :id="`${task.id}-${task.title}`"
            class="w-6 h-6 mr-2 text-graybg bg-graybg border-grayborder rounded checked:hover:bg-graybg checked:focus:bg-graybg checked:bg-graybg checked:focus:ring-transparent focus:ring-transparent"
          />
          <label :for="`${task.id}-${task.title}`" class="text-lg text-graySubText">{{ task.title }}</label>
        </li>
      </ul>
    </div>
  </section>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 overflow-y-auto z-10">
        <div class="min-h-screen md:px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="hidden md:block fixed inset-0 bg-black opacity-40" />
          </TransitionChild>

          <span class="hidden md:inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="flex flex-col md:inline-block w-screen h-screen max-w-3xl md:w-10/12 md:h-auto p-4 md:my-8 md:px-12 md:py-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
            >
              <div class="relative flex items-center mt-2 mb-8">
                <button
                  type="button"
                  class="md:hidden absolute mr-3 text-sm font-medium text-black rounded-full"
                  @click="closeModal"
                >Back</button>

                <DialogTitle
                  as="h1"
                  class="w-full leading-6 text-center md:text-left text-3xl font-semibold"
                >New Task</DialogTitle>
              </div>

              <form class="mb-8 md:px-6">
                <div class="flex items-center py-4 border-b border-grayborder">
                  <img src="../../public/Summary.svg" alt class />
                  <input
                    v-model="newTaskSummary"
                    type="text"
                    class="flex-grow bg-transparent border-0 focus:border-transparent focus:ring-transparent"
                    placeholder="Summary"
                  />
                </div>
                <p
                  v-if="errors.includes('emptyNewTaskSummary')"
                  class="flex items-center my-3 text-sm text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="mr-2 bi bi-exclamation-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                    />
                  </svg>
                  Kindly enter a Summary!
                </p>

                <div class="flex items-start py-4 border-b border-grayborder">
                  <img src="../../public/Description.svg" alt class="py-3" />

                  <textarea
                    v-model="newTaskDescription"
                    rows="6"
                    placeholder="Description"
                    class="flex-grow resize-none bg-transparent border-0 focus:border-transparent focus:ring-transparent"
                  ></textarea>
                </div>
                <p
                  v-if="errors.includes('emptyNewTaskDescription')"
                  class="flex items-center my-3 text-sm text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="mr-2 bi bi-exclamation-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                    />
                  </svg>
                  Kindly enter a Description!
                </p>

                <div class="flex flex-grow items-center py-4 border-b border-grayborder">
                  <img src="../../public/DueDate.svg" alt class />
                  <input
                    v-model="newTaskDate"
                    type="text"
                    onfocus="(this.type='date')"
                    placeholder="Due Date"
                    class="bg-transparent border-0 focus:border-transparent focus:ring-transparent"
                  />
                </div>
                <p
                  v-if="errors.includes('emptyNewTaskDate')"
                  class="flex items-center my-3 text-sm text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="mr-2 bi bi-exclamation-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
                    />
                  </svg>
                  Kindly select a Date!
                </p>
              </form>

              <div class="mt-auto flex flex-col items-center md:max-w-sm md:mx-auto">
                <button
                  type="button"
                  class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-black rounded-full"
                  @click="handleCreateTask"
                >
                  <hollow-dots-spinner
                    class="my-1"
                    v-if="processingCreateTask"
                    :animation-duration="1000"
                    :dot-size="10"
                    :dots-num="3"
                  />

                  <span v-else class>Save</span>
                </button>

                <button
                  type="button"
                  class="hidden md:block mt-3 text-sm font-medium text-black rounded-full"
                  @click="closeModal"
                >Cancel</button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
