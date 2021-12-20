<script setup>
import { useStore } from 'vuex';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { HollowDotsSpinner } from 'epic-spinners'

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const processingLogin = ref(false);
const errors = ref([]);

const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password');

const handleLogin = () => {
  processingLogin.value = true;

  if (!email.value.length) {
    errors.value.push('emptyEmail');
  } else {
    errors.value = errors.value.filter(item => item !== 'emptyEmail');
  }
  if (!email.value.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/)) {
    errors.value.push('wrongEmail');
  } else {
    errors.value = errors.value.filter(item => item !== 'wrongEmail');
  }
  if (!password.value.length) {
    errors.value.push('emptyPassword');
  } else {
    errors.value = errors.value.filter(item => item !== 'emptyPassword');
  }

  if (errors.value.length) {
    processingLogin.value = false;
    return;
  }


  setTimeout(() => {
    store.dispatch('auth/login', { email: email.value, password: password.value });
    router.push('/tasks');
    processingLogin.value = false;
  }, 3000);
};

onMounted(async () => {
  if (window.sessionStorage.getItem('auth_token')) {
    await store.dispatch('auth/saveToken', window.sessionStorage.getItem('auth_token'));
    router.push('/tasks');
  }
});
</script>

<template>
  <section
    class="flex flex-col max-w-md sm:w-6/12 md:w-5/12 h-full md:justify-center md:pb-24 mx-auto"
  >
    <h1 class="text-center text-3xl font-semibold mt-2 mb-8">Log In</h1>

    <form @submit.prevent="handleLogin" class="flex flex-col grow md:grow-0">
      <div class>
        <input
          v-model="email"
          type="email"
          class="w-full h-12 rounded-md bg-graybg border-grayborder focus:border-transparent focus:ring-transparent mb-3"
          placeholder="Email"
        />

        <p v-if="errors.includes('emptyEmail')" class="flex items-center mb-3 text-sm text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="mr-2 bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
            />
          </svg>
          Kindly enter an Email!
        </p>
        <p
          v-else-if="errors.includes('wrongEmail')"
          class="flex items-center mb-3 text-sm text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="mr-2 bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
            />
          </svg>
          Kindly enter correct Email!
        </p>
      </div>

      <div class="relative flex justify-between items-center mb-3">
        <input
          v-model="password"
          :type="passwordFieldType"
          class="w-full h-12 rounded-md bg-graybg border border-grayborder focus:border-transparent focus:ring-transparent pr-16"
          placeholder="Password"
        />
        <button
          type="button"
          class="absolute right-0 mr-3"
          @click="() => showPassword = !showPassword"
        >{{ showPassword ? 'Hide' : 'Show' }}</button>
      </div>
      <p
        v-if="errors.includes('emptyPassword')"
        class="flex items-center mb-3 text-sm text-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="mr-2 bi bi-exclamation-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path
            d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
          />
        </svg>
        Kindly enter a Password!
      </p>

      <div class="mt-auto md:mt-8">
        <button
          class="w-full flex items-center justify-center py-14px mb-4 rounded-full bg-black text-white font-semibold"
          type="submit"
        >
          <hollow-dots-spinner
            v-if="processingLogin"
            class="my-2"
            :animation-duration="1000"
            :dot-size="10"
            :dots-num="3"
          />
          <span v-else>Log In</span>
        </button>
        <p class="text-black text-center font-medium">Forgot your password?</p>
      </div>
    </form>
  </section>
</template>
