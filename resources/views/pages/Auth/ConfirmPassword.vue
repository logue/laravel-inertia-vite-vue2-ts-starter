<template>
  <breeze-guest-layout>
    <intrtia-head title="Confirm Password" />

    <div class="mb-4 text-sm text-gray-600">
      This is a secure area of the application. Please confirm your password
      before continuing.
    </div>

    <breeze-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <breeze-label for="password" value="Password" />
        <breeze-input
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
          autofocus
        />
      </div>

      <div class="flex justify-end mt-4">
        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Confirm
        </breeze-button>
      </div>
    </form>
  </breeze-guest-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import BreezeButton from '@/views/components/Button.vue';
import BreezeGuestLayout from '@/views/layouts/Guest.vue';
import BreezeInput from '@/views/components/Input.vue';
import BreezeLabel from '@/views/components/Label.vue';
import BreezeValidationErrors from '@/views/components/ValidationErrors.vue';
import { Head as InertiaHead } from '@inertiajs/inertia-vue';
import { useInertia, route } from '@/views/plugins/inertia-helper';

export default defineComponent({
  components: {
    BreezeButton,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    InertiaHead,
  },
  setup() {
    /** Get Inertia instance */
    const inertia = useInertia();

    const form = inertia.form({
      password: '',
    });

    const submit = () => {
      form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
