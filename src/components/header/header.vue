<template>
  <header class="navbar">
    <nav class="navbar-container">
      <a class="navbar-logo" href="#">
        <img src="@/assets/logo.svg" alt="" />
      </a>
      <button
        class="navbar-toggler"
        :class="{ active: isOpenMobileMenu }"
        :aria-expanded="{ isOpenMobileMenu }"
        aria-label="Toggle navigation"
        type="button"
        @click="toggleMobileMenu()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="bi"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          ></path>
        </svg>
      </button>
      <div
        class="navbar-collapse"
        :class="{ active: isOpenMobileMenu }"
        id="navbarNav"
      >
        <ul class="navbar-navigation">
          <li class="navigation-item">
            <router-link disabled="true" class="navigation-link" to="/"
              >Profile</router-link
            >
          </li>
          <li class="navigation-item">
            <router-link class="navigation-link" to="/user-form"
              >Edit profile</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "userForm",
  components: {},
  setup() {
    const isOpenMobileMenu = ref(false);
    const route = useRoute();

    const toggleMobileMenu = () =>
      (isOpenMobileMenu.value = !isOpenMobileMenu.value);

    console.log(route.params);
    return {
      isOpenMobileMenu,
      toggleMobileMenu,
    };
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

.navbar {
  font-size: $generalFontSize;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: $generalDistance 0;
  background-color: $textColor;

  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    max-width: $contentMaxWidth;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-right: $generalDistance; //0.75rem
    padding-left: $generalDistance;
    box-sizing: border-box;

    @media all and (max-width: $breakpointMediumDevices - 1) {
      flex-wrap: wrap;
    }
  }

  &-logo {
    padding: 0;
    margin-right: ($generalDistance/2); //0.25rem
    text-decoration: none;
    white-space: nowrap;

    img {
      margin-top: ($generalDistance/2);
      margin-left: (-$generalDistance/2);
    }
  }

  &-toggler {
    display: block;

    @media all and (min-width: $breakpointMediumDevices) {
      display: none;
    }
  }

  &-collapse {
    display: flex;
    flex-basis: auto;
    flex-grow: 1;
    align-items: center;

    @media all and (max-width: $breakpointMediumDevices - 1) {
      display: none;
    }

    &.active {
      display: flex;
      flex-basis: 100%;
      flex-grow: 1;

      @media all and (max-width: $breakpointMediumDevices - 1) {
        background-color: $lighttextColor;
        margin: 0 (-$generalDistance) (-$generalDistance);
        color: $textColor;
      }
    }
  }

  &-navigation {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    list-style: none;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;

    @media all and (max-width: $breakpointMediumDevices - 1) {
      width: 100%;
      padding-left: 0px;
    }
  }
}

.navigation {
  &-item {
    flex: 0 0 auto;
    width: auto;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid #eee;

      @media all and (max-width: $breakpointMediumDevices - 1) {
        border-bottom-width: 0;
      }
    }

    @media all and (max-width: $breakpointMediumDevices - 1) {
      width: 100%;
      padding-left: 0px;
      border-bottom-width: 0;
    }
  }

  &-link {
    display: block;
    text-decoration: none;
    padding: ($generalDistance/2) $generalDistance;
    color: #ffffff;
    font-weight: 600;
    font-size: $generalFontSize;

    @media all and (max-width: $breakpointMediumDevices - 1) {
      text-align: center;
    }
  }
}
</style>
