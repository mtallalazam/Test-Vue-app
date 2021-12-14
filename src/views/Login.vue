<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password')


const handleLogin = async () => {
  await store.dispatch('auth/login', { email: email.value, password: password.value });
  router.push('/tasks');
};

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
        >Show</button>
      </div>

      <div class="mt-auto md:mt-8">
        <button
          class="w-full py-14px mb-4 rounded-full bg-black text-white font-semibold"
          type="submit"
        >Log In</button>
        <p class="text-black text-center font-medium">Forgot your password?</p>
      </div>
    </form>
  </section>
</template>
