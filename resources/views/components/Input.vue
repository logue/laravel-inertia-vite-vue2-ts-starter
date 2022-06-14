<template>
  <input
    class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  type PropType,
  type Ref,
} from '@vue/composition-api';

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<HTMLInputElement>, required: true },
  },
  emits: ['update:modelValue'],
  setup() {
    const input: Ref<HTMLInputElement | undefined> = ref();

    onMounted(() => {
      if (input.value && input.value.hasAttribute('autofocus')) {
        input.value.focus();
      }
    });
    return {
      input,
    };
  },
});
</script>
