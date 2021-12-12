<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
</script>

<template>
  <section class>
    <h1 class="text-center text-3xl font-semibold mt-2 mb-8 md:hidden">Location</h1>

    <button class="mb-7 text-lg font-bold text-grayHeading">+ Check In</button>

    <div class>
      <h2 class="text-lg font-bold text-grayHeading">Current location</h2>

      <ul class>
        <li class="flex items-start my-4">
          📍
          <div class>
            <label for="check1" class="text-lg text-grayHeading">Pustegrand, Stockholm, SE</label>
            <p class="text-sm text-graySubText">59.3293° N, 18.0686° E</p>
          </div>
        </li>
      </ul>
    </div>

    <div class>
      <h2 class="text-lg font-bold text-grayHeading">Previous location</h2>

      <ul class>
        <li class="flex items-start my-4">
          📍
          <div class>
            <label for="check1" class="text-lg text-grayHeading">Pustegrand, Stockholm, SE</label>
            <p class="text-sm text-graySubText">59.3293° N, 18.0686° E</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
