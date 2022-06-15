<template>
  <BreezeGuestLayout>
    <Head title="Log in" />

    <BreezeValidationErrors class="mb-4" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
      {{ status }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <BreezeLabel for="email" value="Email" />
        <BreezeInput
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
        <BreezeLabel for="password" value="Password" />
        <BreezeInput
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
          <BreezeCheckbox name="remember" v-model:checked="form.remember" />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <Link
          v-if="canResetPassword"
          :href="route('password.request')"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </Link>

        <BreezeButton
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Log in
        </BreezeButton>
      </div>
    </form>
  </BreezeGuestLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import BreezeButton from '@/views/components/Button.vue';
import BreezeCheckbox from '@/views/components/Checkbox.vue';
import BreezeGuestLayout from '@/views/layouts/Guest.vue';
import BreezeInput from '@/views/components/Input.vue';
import BreezeLabel from '@/views/components/Label.vue';
import BreezeValidationErrors from '@/views/components/ValidationErrors.vue';
import { Head, Link } from '@inertiajs/inertia-vue';
import { useForm } from '@/scripts/vite/inertia-helper';

export default defineComponent({
  components: {
    BreezeButton,
    BreezeCheckbox,
    BreezeGuestLayout,
    BreezeInput,
    BreezeLabel,
    BreezeValidationErrors,
    Head,
    Link,
  },
  props: {
    canResetPassword: Boolean,
    status: String,
  },
  setup() {
    const form = useForm({
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
