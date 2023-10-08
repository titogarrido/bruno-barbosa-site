<template>
  <div
    class="p-6 border rounded-xl bg-stone-100 shadow-xl flex flex-col items-center justify-center min-h-full mt-4"
  >
    <div>
      <img class="h-24" :src="image" />
    </div>
    <div class="mt-2 text-lg uppercase text-center">{{ title }}</div>
    <div class="text-md text-justify mt-4">
      <p>
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["image", "title", "content"]);
</script>

<style></style>
