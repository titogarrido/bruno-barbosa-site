<template>
  <div>
    <!-- Your other content goes here -->

    <a
    target="_blank"
    href="https://api.whatsapp.com/send?phone=5571999985001"
      class="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full hover:bg-green-700 focus:outline-none focus:bg-green-700 shadow-lg"
    >
      <img class="h-8" src="/whatsapp.png" />
    </a>
  </div>
</template>

<script setup>
function handleClick() {
  // Handle button click action
  alert("Floating Button Clicked!");
}
</script>
