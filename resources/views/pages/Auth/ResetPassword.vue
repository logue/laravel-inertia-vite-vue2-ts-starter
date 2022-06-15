<template>
  <breeze-guest-layout>
    <inertia-head title="Reset Password" />

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

      <div class="mt-4">
        <breeze-label for="password" value="Password" />
        <breeze-input
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="mt-4">
        <breeze-label for="password_confirmation" value="Confirm Password" />
        <breeze-input
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <breeze-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Reset Password
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
    email: { type: String, default: undefined },
    token: { type: String, default: undefined },
  },
  setup(props) {
    /** Get Inertia instance */
    const inertia = useInertia();

    const form: InertiaForm<{
      token: string;
      email: string;
      password: string;
      password_confirmation: string;
    }> = inertia.form({
      token: props.token,
      email: props.email,
      password: '',
      password_confirmation: '',
    });

    const submit = () => {
      form.post(route('password.update'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
