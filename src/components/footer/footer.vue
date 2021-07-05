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
      <span>Lorem ipsum dolor</span>
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
$breakpointMobile: 768px;

.footer {
  background-color: #595964;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
}
.footer-links,
.footer-disclamer {
  flex: 0 0 auto;
  width: 50%;
  align-self: center;

  @media all and (max-width: $breakpointMobile - 1) {
    width: 100%;
  }
}

.footer-links {
}

.footer-disclamer {
  color: #ffffff;
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
}

.links-item {
  flex: 0 0 auto;
  width: auto;
  list-style: none;
}

.links-link {
  padding: 8px;
  text-decoration: none;
  color: #ffffff;
}
</style>
