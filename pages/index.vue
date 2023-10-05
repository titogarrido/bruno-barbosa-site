<template>
  <div class="relative overflow-hidden">
    <Popover as="header" class="relative">
      <div class="bg-[#012340] p-6">
        <nav
          class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div class="flex items-center flex-1">
            <div class="flex items-center justify-between w-full lg:w-auto">
              <a href="#">
                <NuxtImg class="w-96" src="/logo-branca-h.png" alt="" />
              </a>
              <div class="-mr-2 flex items-center lg:hidden">
                <PopoverButton
                  class="bg-slate-200 rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
                >
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div
              class="hidden space-x-24 lg:flex w-full justify-center sm:mx-10 lg:mx-0"
            >
              <NuxtLink
                v-for="item in navigation"
                :key="item.name"
                :to="{ path: '/', hash: item.href }"
                class="text-base font-thin uppercase text-gray-50 hover:text-gray-300"
                >{{ item.name }}</NuxtLink
              >
            </div>
          </div>
          <div class="hidden lg:flex lg:items-center lg:space-x-6">
            <NuxtImg class="h-6" src="/facebook.png" />
            <NuxtImg class="h-6" src="/instagram.png" />
            <NuxtImg class="h-6" src="/tik-tok.png" />
          </div>
        </nav>
      </div>
      <div class="bg-[#BFB3A8] p-5 bg-opacity-70">
        <nav
          class="relative max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6"
        >
          <div class="hidden space-x-8 lg:flex">
            <a
              v-for="item in subnavigation"
              :key="item.name"
              :href="item.href"
              class="text-base font-normal uppercase text-[#012340] hover:text-black hover:underline"
              >{{ item.name }}</a
            >
          </div>
        </nav>
      </div>

      <transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top lg:hidden"
        >
          <div
            class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div class="px-5 pt-4 flex items-center justify-between">
              <div>
                <NuxtImg class="h-16" src="/logo-preta-h.png" alt="" />
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="pt-5 pb-6">
              <div class="px-2 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  >{{ item.name }}</a
                >
              </div>
              <div class="mt-6 px-5">
                <a
                  href="#"
                  class="block text-center w-full py-3 px-4 rounded-md shadow bg-[#012340] text-white font-medium hover:bg-[#072B73]"
                  >Agende sua consulta</a
                >
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

    <main>
      <div
        class="pt-10 bg-gradient-to-r from-[#BFB3A8] to-[#d5ccc4] sm:pt-16 lg:pt-8 lg:overflow-hidden"
      >
        <div class="mx-auto max-w-7xl lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8">
            <div
              class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
            >
              <div class="lg:py-24">
                <h1
                  class="mt-4 text-4xl tracking-tight uppercase font-oswald text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-[80px]"
                >
                  <span class="block">Nutrologia</span>
                  <span class="block text-[#072B73]">de alta performance</span>
                </h1>
                <p
                  class="mt-3 text-base text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  Dr. Bruno Barbosa - CRM-BA XXXXX
                </p>
                <div class="mt-10 sm:mt-12">
                  <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                    <div class="sm:flex">
                      <div class="mt-3 sm:mt-0">
                        <button
                          type="submit"
                          class="block w-full py-3 px-4 rounded-md shadow bg-[#012340] text-white font-medium hover:bg-[#8C6F56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                        >
                          Agende sua consulta
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mt-12 lg:m-0 lg:relative">
              <div
                class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"
              >
                <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                <NuxtImg class="" src="/photo2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--- SEGUNDA SECAO -->

      <div
        id="sobre"
        class="pt-10 bg-stone-200 sm:pt-16 lg:pt-8 lg:overflow-hidden"
      >
        <div class="mx-auto max-w-7xl lg:px-0">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <div class="mt-12 lg:m-0 lg:relative">
              <div
                class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"
              >
                <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                <NuxtImg class="" src="/photo4.png" alt="" />
              </div>
            </div>
            <div
              class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center col-span-2"
            >
              <div class="lg:py-24">
                <h1
                  class="mt-4 text-4xl font-oswald text-slate-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-[80px]"
                >
                  <span class="block font-thin text-4xl uppercase">Sobre</span>
                  <span class="block upper text-[#072B73]"
                    >Dr. Bruno Barbosa</span
                  >
                </h1>
                <div class="text-md max-w-prose mt-4 pb-10">
                  <p>
                    Oh yeah. It's the best part. It's crunchy, it's explosive,
                    it's where the muffin breaks free of the pan and sort of
                    does it's own thing. I'll tell you. That's a million dollar
                    idea right there. Just sell the tops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--- TERCEIRA SECAO -->

      <div class="pt-10 bg-[#e2dcd7] sm:pt-16 lg:py-24 lg:overflow-hidden">
        <div class="mx-auto max-w-7xl lg:px-0">
          <div class="flex items-center justify-center">
            <span class="font-oswald text-4xl pb-10"> Áreas de Atuação </span>
          </div>
          <div class="lg:grid lg:grid-cols-3 lg:gap-8 space-y-4">
            <Card
              image="/emagrecimento.png"
              title="Emagrecimento"
              content="Oh yeah. It's the best part. It's crunchy, it's explosive,
                  it's where the muffin breaks free of the pan and sort of does
                  it's own thing. I'll tell you. That's a million dollar idea
                  right there. Just sell the tops."
            ></Card>
            <Card image="/soro.png" title="Soroterapia"></Card>
            <Card
              image="/slim.png"
              title="Acompanhamento Pós-Bariátrica"
            ></Card>
            <Card image="/stethoscope.png" title="Medicina Integrativa"></Card>
            <Card image="/checkup.png" title="Check-ups"></Card>
            <Card
              image="/reposicao.png"
              title="Terapia de Reposição Hormonal"
            ></Card>
            <Card image="/gender.png" title="Implante Hormonal"></Card>
          </div>
        </div>
      </div>

      <!--- QUARTA SECAO -->

      <div class="pt-10 bg-[#e2dcd7] sm:pt-16 lg:py-24 lg:overflow-hidden">
        <div class="mx-auto max-w-full lg:px-0">
          <!-- Ensure the maximum width is set to full -->
          <div class="flex items-center justify-center"></div>
          <div class="lg:grid lg:grid-cols-1 lg:gap-8">
            <iframe
              class="w-full"
              style="height: 500px"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0129740135258!2d-38.47669542442622!3d-12.971021487344268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161b27e4715d07%3A0xc17dbdd3c5f73148!2sCentroM%C3%A9dico%20Bela%20Vista!5e0!3m2!1spt-BR!2sbr!4v1696466532982!5m2!1spt-BR!2sbr"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <!--- Quinta SECAO -->

      <div
        id="atendimento"
        class="pt-10 pb-10 bg-[#012340] sm:pt-16 lg:py-24 lg:overflow-hidden"
      >
        <div class="mx-auto max-w-7xl lg:px-0">
          <div
            class="flex flex-col items-center justify-center text-white space-y-8"
          >
            <div class="font-oswald text-4xl font-thin">
              Inicie seu tratamento agora
            </div>
            <div
              class="font-oswald text-xl p-4 lg:text-5xl lg:p-8 bg-[#8C6F56] hover:bg-[#012340] rounded-xl flex items-center"
            >
              <span class="mr-4">Agende uma Consulta</span
              ><NuxtImg class="h-10" src="/whatsapp.png" />
            </div>
          </div>
        </div>
      </div>

      <!--- Sexta SECAO -->

      <div
        class="pt-10 bg-gray-900 text-white sm:pt-16 lg:py-24 lg:overflow-hidden"
      >
        <div class="mx-auto max-w-7xl lg:px-0">
          <div class="flex items-center justify-center"></div>
          <div class="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6">
            <div class="flex flex-col justify-center items-center px-4">
              <img src="/logo-branca-h.png" />
              <div>CRM-BA: XXXXXX</div>
            </div>
            <div
              class="flex flex-col justify-center items-center space-y-2 px-4"
            >
              <div>Centro Médico Bela Vista</div>
              <div class="text-center">
                Shopping Bela Vista - Alameda Euvaldo Luz, 92 Piso L2 -
                Pernambués, Salvador - BA, 41098-020
              </div>
            </div>
            <div class="flex flex-col justify-center items-center px-4">
              <div>Telefone: (71) XXXX-XXXX</div>
              <div>Email: xxxx@xxxx.com</div>
            </div>
          </div>
        </div>
      </div>

      <!-- More main page content here... -->
      <Floatingbutton></Floatingbutton>
    </main>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

useHead({
  htmlAttrs: {
    lang: "pt-br",
  },
  link: [
    {
      rel: "icon",
      type: "image/ico",
      href: "/favicon.ico",
    },
  ],
});
const title = "Dr. Bruno Barbosa";
const description =
  "Dr. Bruno Barbosa é especialista em nutrologia de alta performance, oferecendo soluções personalizadas para otimizar a saúde e o bem-estar. Com uma abordagem baseada em ciência e pesquisa avançada, ele ajuda atletas, profissionais e indivíduos em busca de excelência a alcançar seus objetivos nutricionais e de desempenho. Marque sua consulta e descubra como a nutrologia pode impulsionar sua performance e qualidade de vida.";
const ogimage = "http://localhost:3000/__og_image__/og.png";
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  twitterCard: "summary_large_image",
  ogUrl: "http://titogarrido.duckdns.org:3000",
  twitterTitle: title,
  twitterDescription: description,
  ogImage: ogimage,
  twitterImage: ogimage
});

const ogImageOptions = {
  siteName: "Dr. Bruno Barbosa",
  siteLogo: "http://localhost:3000/logo-branca-h.png",
  padding: '100px 100px'
};

defineOgImage({  component: 'MainOG' })

const navigation = [
  { name: "Home", href: "#" },
  { name: "Sobre", href: "#sobre" },
  { name: "Atendimento", href: "#atendimento" },
];
const subnavigation = [
  { name: "Emagrecimento", href: "#" },
  { name: "Implante Hormonal", href: "#" },
  { name: "Terapia Injetável", href: "#" },
  { name: "Medicina Integrativa", href: "#" },
  { name: "Hipertrofia e Alta Performance", href: "#" },
];
</script>

<style>
.map-frame {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-content {
  z-index: 10;
  position: absolute;
  top: 50px;
  left: 50px;
  width: 390px;
  background-color: black;
  color: #fff;
}

html {
  scroll-behavior: smooth;
}
</style>
