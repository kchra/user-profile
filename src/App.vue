<template>
  <Header />
  <main class="main">
    <router-view />
  </main>
  <Footer />
</template>

<script>
import { defineComponent } from "vue";

import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
  },
});
</script>

<style lang="scss">
$generalFontSize: 16px;
$generalDistance: 12px;
$generalBorderRadius: 5px;

$contentMaxWidth: 1320px;

$textColor: #595964;
$whiteColor: #ffffff;
$borderColor: gray;
$borderLightColor: #eee;
$errorColor: red;
$successBgColor: #a1cc79;

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: $generalFontSize;
  color: $textColor;
}

.main {
  max-width: $contentMaxWidth;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: $generalDistance;
  padding-left: $generalDistance;
  box-sizing: border-box;
}
</style>
