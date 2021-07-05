<template>
  <div
    class="input-errors"
    v-for="error of vlidate.name.$errors"
    :key="error.$uid"
  >
    <span class="error-msg">{{ error.$message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FieldError",
});
</script>
