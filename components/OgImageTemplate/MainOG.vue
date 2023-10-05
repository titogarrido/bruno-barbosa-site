<script setup>
// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="w-full h-full flex flex-col text-white bg-[#012340] font-oswald items-center justify-center">
    <!-- <NuxtImg class="w-full" src="/logo-branca-h.png"/> -->
    <div class="text-7xl uppercase">Dr. Bruno Barbosa</div>
    <div class="uppercase mt-10 text-4xl">Saúde e Bem Estar</div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 70px;
}
</style>
