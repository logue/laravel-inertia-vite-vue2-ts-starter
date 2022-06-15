<template>
  <slot />
</template>

<script lang="ts">
// This is a peristent layout
// Include me with <template layout="default" />

import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    console.log('default');
  },
});
</script>
