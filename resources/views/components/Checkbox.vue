<template>
  <input
    type="checkbox"
    :value="value"
    v-model="proxyChecked"
    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  />
</template>

<script lang="ts">
import { defineComponent, computed, Ref, PropType } from '@vue/composition-api';

export default defineComponent({
  props: {
    checked: {
      type: Array as PropType<boolean[] | boolean>,
      default: false,
    },
    value: {
      type: Array as PropType<boolean[] | boolean>,
      default: false,
    },
  },
  emits: ['update:checked'],
  setup(props, context) {
    const proxyChecked: Ref<boolean | boolean[]> = computed({
      get: () => props.checked,
      set: val => context.emit('update:checked', val),
    });

    return { proxyChecked };
  },
});
</script>
