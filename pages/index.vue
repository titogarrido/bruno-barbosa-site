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
                <NuxtImg
                  class="w-3/4 lg:w-1/2"
                  src="/logo-branca-h.png"
                  alt=""
                />
              </a>
              <div class="-mr-2 flex items-center lg:hidden">
                <PopoverButton
                  class="bg-[#BFB3A8] rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
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
            <a target="_blank" href="https://instagram.com/dr.brunobarbosa"
              ><NuxtImg class="h-6" src="/instagram.png"
            /></a>
            <NuxtImg class="h-6" src="/tik-tok.png" />
          </div>
        </nav>
      </div>
      <div class="bg-[#BFB3A8] p-5 bg-opacity-70">
        <nav
          class="relative max-w-7xl mx-auto flex items-center justify-center px-4 sm:px-6"
        >
          <div class="hidden space-x-8 lg:flex">
            <NuxtLink
              v-for="item in subnavigation"
              :key="item.name"
              :to="item.href"
              class="text-base font-normal uppercase text-[#012340] hover:text-black hover:underline"
              >{{ item.name }}</NuxtLink
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
                  Dr. Bruno Barbosa - CRM-BA 28.988
                </p>
                <div class="mt-10 sm:mt-12">
                  <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                    <div class="sm:flex">
                      <div class="mt-3 sm:mt-0">
                        <a
                          target="_blank"
                          href="https://api.whatsapp.com/send?phone=5571999985001"
                          class="block w-full py-3 px-4 rounded-md shadow bg-[#012340] text-white font-medium hover:bg-[#8C6F56] text-center"
                        >
                          Agende uma consulta
                        </a>
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
                <div class="text-md max-w-prose mt-4 pb-10 text-justify">
                  <p>
                    Apaixonado pela Nutrologia e Medicina Integrativa desde a
                    formação pela UFBA (2016), Dr. Bruno Barbosa já contabiliza
                    centenas de pacientes que passaram por uma verdadeira
                    mudança de vida nos últimos anos. E para melhor! Prioriza
                    abordar cada indivíduo de maneira única, combinando
                    tecnologia de ponta e atendimento humanizado para oferecer
                    os melhores resultados a seus pacientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--- TERCEIRA SECAO -->

      <div
        id="cards"
        class="pt-10 bg-[#e2dcd7] sm:pt-16 lg:py-24 lg:overflow-hidden"
      >
        <div class="mx-auto max-w-7xl lg:px-0">
          <div class="flex items-center justify-center">
            <span class="font-oswald text-4xl pb-10"> Áreas de Atuação </span>
          </div>
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <Card
              image="/emagrecimento.png"
              title="Emagrecimento"
              content="Abordagem personalizada para uma perda de peso saudável e sustentável. Com orientação individualizada e plano de emagrecimento adaptado ao seu estilo de vida, você além de perder peso, vai ganhar saúde e confiança."
            ></Card>
            <Card
              image="/muscle.png"
              title="Hipertrofia e Alta performance"
              content="Ganhe massa muscular com alta performance. Desenvolvemos planos adaptados, incluindo orientação nutricional e estratégias avançadas para alcançar seus objetivos de forma segura e eficaz."
            ></Card>
            <Card
              image="/soro.png"
              title="Terapia Injetável"
              content="Revitalize seu corpo de dentro pra fora. Experimente a soroterapia personalizada e tenha mais energia e bem estar todos os dias."
            ></Card>
            <Card
              image="/slim.png"
              title="Acompanhamento Pós-Bariátrica"
              content="Oferecemos suporte personalizado para garantir que você alcance e mantenha seus objetivos de saúde. Dispomos de equipe especializada para abordar todos os cuidados necessários, como orientação nutricional, terapias integrativas e muito mais."
            ></Card>
            <Card
              image="/stethoscope.png"
              title="Medicina Integrativa"
              content="Vemos você como um todo, não apenas seus sintomas. Nossa abordagem inclui uma variedade de terapias destinadas a promocao da saúde."
            ></Card>
            <Card
              image="/checkup.png"
              title="Check-ups"
              content="Realizamos avaliações detalhadas para que você tenha o controle total da sua saúde. O objetivo é entender o seu corpo, prevenir problemas antes que surjam e garantir uma vida saudável e vibrante."
            ></Card>
            <Card
              image="/reposicao.png"
              title="Terapia de Reposição Hormonal"
              content="Recupere o seu equilíbrio hormonal através de uma terapia segura e eficaz."
            ></Card>
            <Card
              image="/gender.png"
              title="Implante Hormonal"
              content="Descubra os benefícios dos implantes hormonais: seguros, convenientes e eficazes. Esses dispositivos subcutâneos podem melhorar significativamente sua qualidade de vida."
            ></Card>
            <Card
              image="/analytics.png"
              title="Avaliação Biométrica e Bioimpedância"
              content="Descubra seu estado de saúde atual e monitore seu progresso com nossa tecnologia de bioimpedância de última geração."
            ></Card>
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
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=5571999985001"
              class="font-oswald text-xl p-4 cursor-pointer lg:text-5xl lg:p-8 bg-[#8C6F56] hover:bg-[#012340] rounded-xl flex items-center"
            >
              <span class="mr-4">Agende uma Consulta</span
              ><NuxtImg class="h-10" src="/whatsapp.png" />
            </a>
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
              <NuxtImg src="/logo-branca-h.png" />
              <div>CRM-BA: 28.988</div>
            </div>
            <div
              class="flex flex-col justify-center items-center space-y-2 px-4"
            >
              <div>Clínica Heal</div>
              <div class="text-center">
                Shopping da Cidade | Av. ACM, 1298 | Itaigara - Salvador - BA
              </div>
            </div>
            <div class="flex flex-col justify-center items-center px-4">
              <div>Telefone: (71) 2132-6494</div>
              <div>Whatsapp: (71) 99998-5001</div>
              <div>Email: contato@drbrunobarbosa.com.br</div>
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
const ogimage = "https://www.drbrunobarbosa.com.br/__og_image__/og.png";
useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  twitterCard: "summary_large_image",
  ogUrl: "https://www.drbrunobarbosa.com.br",
  twitterTitle: title,
  twitterDescription: description,
  ogImage: ogimage,
  twitterImage: ogimage,
});

const ogImageOptions = {
  siteName: "Dr. Bruno Barbosa",
  siteLogo: "http://www.drbrunobarbosa.com.br/logo-branca-h.png",
  padding: "100px 100px",
};

defineOgImage({ component: "MainOG" });

const navigation = [
  { name: "Home", href: "#" },
  { name: "Sobre", href: "#sobre" },
  { name: "Atendimento", href: "#atendimento" },
];
const subnavigation = [
  { name: "Emagrecimento", href: "#cards" },
  { name: "Implante Hormonal", href: "#cards" },
  { name: "Terapia Injetável", href: "#cards" },
  { name: "Medicina Integrativa", href: "#cards" },
  { name: "Hipertrofia e Alta Performance", href: "#cards" },
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
