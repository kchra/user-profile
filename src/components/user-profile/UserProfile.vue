<template>
  <section class="user-profile">
    <header class="page-header">
      <h1>User profile</h1>
    </header>
    <div class="profile-container">
      <ul class="profile">
        <li class="profile-item">
          <div class="item-label">First name:</div>
          <div class="item-value">{{ firstName }}</div>
        </li>
        <li class="profile-item">
          <div class="item-label">Last name:</div>
          <div class="item-value">{{ lastName }}</div>
        </li>
        <li class="profile-item">
          <div class="item-label">Email:</div>
          <div class="item-value">{{ email }}</div>
        </li>
        <li class="profile-item">
          <div class="item-label">Phone:</div>
          <div class="item-value">{{ phone }}</div>
        </li>
        <li class="profile-item">
          <div class="item-label">Birthday:</div>
          <div class="item-value">{{ birthday }}</div>
        </li>
        <li class="profile-item">
          <div class="item-label">Avatar:</div>
          <div class="item-value">
            <div class="avatar-preview-mini">
              <img
                decoding="async"
                loading="lazy"
                v-if="userIconUrl"
                :src="userIconUrl"
              />
              <img
                decoding="async"
                loading="lazy"
                v-else-if="avatar"
                :src="avatar"
              />
            </div>
          </div>
        </li>
        <li class="profile-item">
          <div class="item-label">About:</div>
          <div class="item-value">{{ about }}</div>
        </li>
      </ul>
      <div class="avatar-preview">
        <div class="avatar-container">
          <img
            decoding="async"
            loading="lazy"
            v-if="userIconUrl"
            :src="userIconUrl"
          />
          <img
            decoding="async"
            loading="lazy"
            v-else-if="avatar"
            :src="avatar"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, toRefs } from "vue";

import { useReturnLocalStorageData } from "@/use/localStorage";

import { LOCAL_STORAGE_NAME } from "@/constans";

export default defineComponent({
  setup() {
    const userData = useReturnLocalStorageData(LOCAL_STORAGE_NAME);

    return {
      ...toRefs(userData),
    };
  },
});
</script>

<style lang="scss">
$generalFontSize: 16px;
$generalDistance: 12px;
$itemLineHeight: 50px;

$textColor: #595964;
$lighttextColor: #8b8b9d;
$whiteColor: #ffffff;
$borderColor: gray;
$borderLightColor: #eee;
$errorColor: red;
$successBgColor: #a1cc79;

$breakpointSmallDevices: 576px;
$breakpointMediumDevices: 768px;
$breakpointLargeDevices: 992px;
$contentMaxWidth: 1320px;

.page-header {
  text-align: left;
  padding: 0 $generalDistance;
  color: $textColor;
}

.profile-container {
  font-size: $generalFontSize;
  display: flex;
  margin-bottom: $generalDistance * 2;
}

.profile,
.avatar-preview {
  flex: 50%;
}

.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: right;
  margin: 0;
  padding: 0 $generalDistance * 2 $generalDistance * 2 $generalDistance;
}

.profile-item {
  display: flex;
  flex-direction: row;
  line-height: $itemLineHeight;
  border-bottom: 1px solid $borderLightColor;

  &:last-child {
    border-bottom-width: 0;
  }
}

.item-label {
  display: block;
  min-width: 100px;
  text-align: left;
  padding: $generalDistance $generalDistance $generalDistance 0;
  line-height: $itemLineHeight;
}

.item-value {
  box-sizing: border-box;
  margin-left: auto;
  max-width: 450px;
  width: 100%;
  padding: $generalDistance;
  text-align: left;
  font-weight: bold;
}

.avatar-preview,
.avatar-preview-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $borderLightColor;

  .avatar-container {
    display: flex;
    justify-content: center;
    max-width: 360px;
    width: 100%;
    height: 360px;
    overflow: hidden;
    background-color: $whiteColor;
    content: "avatar";
  }

  img {
    content-visibilit: auto;
    background-size: cover;
    width: 100%;

    @media all and (max-width: $breakpointMediumDevices - 1) {
      width: 60%;
    }
  }
}

.avatar-preview-mini {
  display: none;
  padding: 24px;
  max-width: 450px;
  box-sizing: border-box;
  margin: $generalDistance * 2 0 0 auto;
  content-visibilit: auto;
  background-size: cover;

  @media all and (max-width: $breakpointMediumDevices - 1) {
    display: flex;
  }

  @media all and (max-width: $breakpointSmallDevices - 1) {
    margin-left: 0;
    max-width: 100%;
  }
}
</style>
