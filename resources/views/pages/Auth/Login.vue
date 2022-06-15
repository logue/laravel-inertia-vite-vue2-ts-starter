<template>
  <breeze-guest-layout>
    <inertia-head title="Log in" />

    <breeze-validation-errors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

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
          autocomplete="current-password"
        />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <breeze-checkbox name="remember" v-model:checked="form.remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <inertia-link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </inertia-link>

        <breeze-button
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </breeze-button>
      </div>
    </form>
  </breeze-guest-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import BreezeButton from '@/views/components/Button.vue';
import BreezeCheckbox from '@/views/components/Checkbox.vue';
import BreezeGuestLayout from '@/views/layouts/Guest.vue';
import BreezeInput from '@/views/components/Input.vue';
import BreezeLabel from '@/views/components/Label.vue';
import BreezeValidationErrors from '@/views/components/ValidationErrors.vue';
import {
  Head as InertiaHead,
  Link as InertiaLink,
  type InertiaForm,
} from '@inertiajs/inertia-vue';
import { useInertia, route } from '@/views/plugins/inertia-helper';

export default defineComponent({
  components: {
    BreezeButton,
    BreezeCheckbox,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    InertiaHead,
    InertiaLink,
  },
  props: {
    canResetPassword: Boolean,
    status: String,
  },
  setup() {
    /** Get Inertia instance */
    const inertia = useInertia();

    const form: InertiaForm<{
      email: string;
      password: string;
      remember: boolean;
    }> = inertia.form({
      email: '',
      password: '',
      remember: false,
    });

    const submit = () => {
      form.post(route('login'), {
        onFinish: () => form.reset('password'),
      });
    };

    return {
      form,
      submit,
    };
  },
});
</script>
