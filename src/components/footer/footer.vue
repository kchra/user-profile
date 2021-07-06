<template>
  <footer class="footer">
    <div class="footer-links">
      <ul class="links-container">
        <li class="links-item"><a class="links-link" href="#">lorem</a></li>
        <li class="links-item"><a class="links-link" href="#">ipsum</a></li>
        <li class="links-item"><a class="links-link" href="#">dolor</a></li>
      </ul>
    </div>
    <div class="footer-disclamer">
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
$generalFontSize: 16px;
$generalDistance: 12px;

$breakpointSmallDevices: 576px;
$breakpointMediumDevices: 768px;
$breakpointLargeDevices: 992px;
$contentMaxWidth: 1320px;

$textColor: #595964;
$lighttextColor: #8b8b9d;
$whiteColor: #ffffff;
$borderColor: gray;
$borderLightColor: #eee;
$errorColor: red;
$successBgColor: #a1cc79;

.footer {
  background-color: $textColor;
  padding: $generalDistance;
  display: flex;
  flex-wrap: wrap;
}

.footer-links,
.footer-disclamer {
  flex: 0 0 auto;
  width: 50%;
  align-self: center;

  @media all and (max-width: $breakpointMediumDevices - 1) {
    width: 100%;
    text-align: center;
  }
}

.footer-disclamer {
  color: $whiteColor;
  text-align: right;

  @media all and (max-width: $breakpointMediumDevices - 1) {
    text-align: center;
  }
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  list-style: none;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;

  @media all and (max-width: $breakpointMediumDevices - 1) {
    justify-content: center;
  }
}

.links-item {
  flex: 0 0 auto;
  width: auto;
  list-style: none;

  padding: $generalDistance/2;
  margin: 0 $generalDistance;
  padding: 6px;
  margin: 0 12px;
  border-bottom: 3px solid transparent;

  &:hover {
    border-bottom: 3px solid #eee;
  }
}

.links-link {
  padding: $generalDistance/2;
  text-decoration: none;
  color: $borderLightColor;
}
</style>
