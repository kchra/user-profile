<template>
  <section class="user-form">
    <header class="page-header">
      <h1>Edit {{ fullUserName }} profile</h1>
    </header>

    <div v-if="isGeneralMessage" class="form-message">
      <span class="message-success"
        >The profile of {{ fullUserName }} have been succesfully save to
        localstorage</span
      >
    </div>

    <div class="form-container">
      <form @submit.prevent="handleForm">
        <ul class="form-fields">
          <li
            class="field-containter"
            :class="{ error: v.firstName.$errors.length }"
          >
            <label class="field-description" for="firstName"
              ><abbr title="This field is mandatory" aria-label="required"
                >*</abbr
              >First name:</label
            >
            <input
              class="field-value"
              type="text"
              name="firstName"
              placeholder="e.g. John"
              v-model="firstName"
              @blur="v.firstName.$touch()"
            />
            <div
              class="field-errors"
              v-for="error of v.firstName.$errors"
              :key="error.$uid"
            >
              <span class="error-msg">{{ error.$message }}</span>
            </div>
          </li>
          <li
            class="field-containter"
            :class="{ error: v.lastName.$errors.length }"
          >
            <label class="field-description" for="lastName"
              ><abbr title="This field is mandatory" aria-label="required"
                >*</abbr
              >Last name:</label
            >
            <input
              class="field-value"
              type="text"
              name="lastName"
              placeholder="e.g. Doe"
              v-model="lastName"
              @blur="v.lastName.$touch()"
            />
            <div
              class="field-errors"
              v-for="error of v.lastName.$errors"
              :key="error.$uid"
            >
              <span class="error-msg">{{ error.$message }}</span>
            </div>
          </li>
          <li
            class="field-containter"
            :class="{ error: v.email.$errors.length }"
          >
            <label class="field-description" for="email"
              ><abbr title="This field is mandatory" aria-label="required"
                >*</abbr
              >Email:</label
            >
            <input
              class="field-value"
              type="email"
              name="email"
              placeholder="e.g. john.doe@example.com"
              v-model="email"
              @blur="v.email.$touch()"
            />
            <div
              class="field-errors"
              v-for="error of v.email.$errors"
              :key="error.$uid"
            >
              <span class="error-msg">{{ error.$message }}</span>
            </div>
          </li>
          <li
            class="field-containter"
            :class="{ error: v.phone.$errors.length }"
          >
            <label class="field-description" for="phone"
              ><abbr title="This field is mandatory" aria-label="required"
                >*</abbr
              >Phone:</label
            >
            <input
              class="field-value"
              type="text"
              name="phone"
              placeholder="e.g. +48 777 666 555"
              v-model="phone"
              @blur="v.phone.$touch()"
            />
            <div
              class="field-errors"
              v-for="error of v.phone.$errors"
              :key="error.$uid"
            >
              <span class="error-msg">{{ error.$message }}</span>
            </div>
          </li>
          <li class="field-containter">
            <label class="field-description" for="birthday"
              ><abbr title="This field is mandatory" aria-label="required"
                >*</abbr
              >Birthday:</label
            >
            <Datepicker
              class="field-value"
              name="birthday"
              v-model="birthday"
              placeholder="e.g 1961-07-21"
            />
            <span></span>
          </li>
          <li class="field-containter">
            <label class="field-description" for="avatar">Avatar:</label>
            <input
              class="field-value"
              type="file"
              @change="onFileChange"
              name="avatar"
            />
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
            <span></span>
            <span class="avatar-arrow-left"></span>
          </li>
          <li class="field-containter">
            <label class="field-description" for="about">About:</label>
            <textarea
              class="field-value"
              v-model="about"
              name="about"
            ></textarea>
            <span></span>
          </li>
        </ul>
        <div class="form-actions">
          <button
            :disabled="isSaveButtonDisabled"
            class="button submit-button"
            :class="{ disabled: isSaveButtonDisabled }"
            type="submit"
          >
            {{ saveButtonValue }}
          </button>
        </div>
      </form>
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
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  ref,
  computed,
} from "vue";

import Datepicker from "vue3-datepicker";

import { initVuelidate } from "@/components/user-form/useUserForm";
import {
  useReturnLocalStorageData,
  useSetLocalStorage,
} from "@/use/localStorage";
import { compareObjects } from "@/helpers";
import { LOCAL_STORAGE_NAME, BREAKPOINTS } from "@/constans";

export default defineComponent({
  name: "userForm",
  components: {
    Datepicker,
  },
  setup() {
    const userData = useReturnLocalStorageData();
    /** Convert date from string to Date type */
    userData.birthday = new Date(userData.birthday);
    /** form models */
    const user = reactive(userData);
    const userIconUrl = ref();
    const isGeneralMessage = ref(false);
    const screenWidth = ref();

    const fullUserName = computed(() => `${user.firstName} ${user.lastName}`);
    const isSaveButtonDisabled = computed(
      () => v.value.$invalid || isGeneralMessage.value
    );

    /** computed variable containing different messages(values) depends on */
    const saveButtonValue = computed(() =>
      !v.value.$errors.length && v.value.$invalid
        ? "Fill in the filds first ..."
        : v.value.$invalid
        ? "Form contains errors ..."
        : isGeneralMessage.value
        ? "Data have been saved..."
        : "Save"
    );

    const isBreakpoint = computed(() => {
      let currnetBreakpoint = undefined;

      const isSmall = screenWidth.value <= BREAKPOINTS["small"];
      const isMedium =
        screenWidth.value <= BREAKPOINTS["medium"] &&
        screenWidth.value > BREAKPOINTS["small"];
      const isLarge =
        BREAKPOINTS[name] === "large" &&
        screenWidth.value <= BREAKPOINTS["large"] &&
        screenWidth.value > BREAKPOINTS["medium"];

      if (isSmall) currnetBreakpoint = "small";
      else if (isMedium) currnetBreakpoint = "medium";
      else if (isLarge) currnetBreakpoint = "large";

      return currnetBreakpoint;
    });

    /** Inicialize of validation */
    const v = initVuelidate(user);

    /** Because of v-model dosn't support file type input we have to provide function for managing this value */
    const onFileChange = (event) => {
      const file = event.target.files[0];
      userIconUrl.value = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.onloadend = function () {
        user.avatar = reader.result;
      };
      reader.readAsDataURL(file);
    };

    /** Collect data from form */
    const getFormData = (event) => {
      const data = {};
      const formData = new FormData(event.target);

      for (var [key, value] of formData.entries()) {
        data[key] = value;
      }

      /** Add images in base64 form */
      data["avatar"] = user.avatar;

      return data;
    };

    /** managne of general message status */
    const handleGeneralMessage = (value = false) => {
      isGeneralMessage.value = value;

      isGeneralMessage.value &&
        setTimeout(() => (isGeneralMessage.value = false), 5000);
    };

    /** save data to localStorage after save button */
    const handleForm = (event) => {
      const data = getFormData(event);

      /** save new data to localstorage */
      useSetLocalStorage(LOCAL_STORAGE_NAME, data);

      /** if there is no difference between data saved in localstorage nad data grabed from form after save we can show success general message */
      if (compareObjects(useReturnLocalStorageData(), data)) {
        handleGeneralMessage(true);
      }
    };

    onMounted(() => {
      window.addEventListener("resize", () => {
        screenWidth.value = window.innerWidth;
      });
    });

    return {
      handleForm,
      onFileChange,
      isGeneralMessage,
      isSaveButtonDisabled,
      isBreakpoint,
      saveButtonValue,
      fullUserName,
      userIconUrl,
      userData,
      ...toRefs(user),
      v,
    };
  },
});
</script>

<style lang="scss">
$fieldLineHeight: 50px;
$formMaxWidth: 500px;
$fieldWidth: 450px;
$descriptionMinWidth: 100px;
$generalFontSize: 16px;
$generalDistance: 12px;
$generalBorderRadius: 5px;

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

.page-header {
  text-align: left;
  padding: 0 $generalDistance;
  color: $textColor;
}

.form-message {
  margin: $generalDistance;

  .message-success {
    background-color: $successBgColor;
    font-weight: bold;
    color: $whiteColor;
    padding: $generalDistance;
    display: block;
  }
}

.form-container {
  display: flex;
  position: relative;
  margin-bottom: $generalDistance * 2;

  > * {
    flex: 50%;
  }
}

.form-fields {
  list-style-type: none;
  list-style-position: outside;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: $generalDistance;
}

.form-fields,
.form-actions {
  width: 100%;
  text-align: right;
}

.field-containter {
  padding: $generalDistance;
  padding-right: $generalDistance * 2;
  line-height: $fieldLineHeight;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.field-description {
  display: block;
  min-width: $descriptionMinWidth;
  text-align: left;

  abbr {
    padding-right: $generalDistance / 2;
  }
}

.field-value {
  box-sizing: border-box;
  margin-left: auto;
  max-width: $fieldWidth;
  width: 100%;
  padding: $generalDistance;
  border-width: 1px;
  border-style: solid;
  border-radius: $generalBorderRadius;
  border-color: $borderLightColor;
  font-size: $generalFontSize;

  .field-containter.error & {
    border-color: $errorColor;
  }

  &:-moz-placeholder {
    color: $borderColor;
  }

  &::-webkit-input-placeholder {
    color: $borderColor;
  }

  @media all and (max-width: $breakpointSmallDevices - 1) {
    max-width: 100%;
  }
}

.field-errors {
  margin-left: auto;
  max-width: $fieldWidth;
  width: 100%;
  text-align: left;

  .field-containter.error & {
    color: $errorColor;
    font-size: 0.75rem;
    line-height: ($fieldLineHeight / 2);
  }
}

.v3dp__datepicker {
  display: block;
  margin-left: auto;
  max-width: $fieldWidth;
  width: 100%;

  .field-value {
    width: 100%;
  }

  @media all and (max-width: $breakpointSmallDevices - 1) {
    max-width: 100%;
  }
}

.form-actions {
  padding: $generalDistance ($generalDistance * 2) ($generalDistance * 2)
    $generalDistance;
  box-sizing: border-box;
}

.button {
  display: inline-block;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  padding: $generalDistance;
  font-size: $generalFontSize;
  width: 100%;
  border-radius: $generalBorderRadius;
  border-width: 1px;
  border-style: solid;
  font-weight: 700;

  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;

  &.disabled {
    pointer-events: none;
    opacity: 0.55;
  }
}

.avatar-preview,
.avatar-preview-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $borderLightColor;
  margin-right: $generalDistance;

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

.avatar-arrow-left {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  position: absolute;
  right: 0;
  border-right: ($generalDistance * 2) solid $borderLightColor;

  @media all and (min-width: $breakpointMediumDevices) {
    bottom: 13px;
  }

  @media all and (max-width: $breakpointMediumDevices - 1) {
    display: none;
  }
}

.avatar-preview {
  @media all and (max-width: $breakpointMediumDevices - 1) {
    display: none !important;
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
