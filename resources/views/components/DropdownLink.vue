<template>
  <inertia-link
    class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
  >
    <slot />
  </inertia-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { Link as InertiaLink } from '@inertiajs/inertia-vue';

export default defineComponent({
  components: {
    InertiaLink,
  },
});
</script>
