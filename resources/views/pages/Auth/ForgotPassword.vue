<template>
  <breeze-guest-layout>
    <inertia-head title="Forgot Password" />

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

    <breeze-validation-errors class="mb-4" />

    <form @submit.prevent="submit">
      <div>
        <breeze-label for="email" value="Email" />
        <breeze-input
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
          autocomplete="username"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <breeze-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Email Password Reset Link
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
import { Head as InertiaHead, type InertiaForm } from '@inertiajs/inertia-vue';
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
  props: {
    status: { type: String, default: undefined },
  },
  setup() {
    /** Get Inertia instance */
    const inertia = useInertia();

    const form: InertiaForm<{ email: string }> = inertia.form({
      email: '',
    });

    const submit = () => {
      form.post(route('password.email'));
    };

    return {
      form,
      submit,
    };
  },
});
</script>
