<template>
  <breeze-guest-layout>
    <inertia-head title="Email Verification" />

    <div class="mb-4 text-sm text-gray-600">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      class="mb-4 font-medium text-sm text-green-600"
      v-if="verificationLinkSent"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form @submit.prevent="submit">
      <div class="mt-4 flex items-center justify-between">
        <breeze-button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Resend Verification Email
        </breeze-button>

        <inertia-link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Log Out
        </inertia-link>
      </div>
    </form>
  </breeze-guest-layout>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  type ComputedRef,
} from '@vue/composition-api';
import { useInertia, route } from '@/views/plugins/inertia-helper';

import BreezeButton from '@/views/components/Button.vue';
import BreezeGuestLayout from '@/views/layouts/Guest.vue';

import {
  Head as InertiaHead,
  Link as InertiaLink,
  type InertiaForm,
} from '@inertiajs/inertia-vue';

export default defineComponent({
  components: {
    BreezeButton,
    BreezeGuestLayout,
    InertiaHead,
    InertiaLink,
  },
  props: {
    status: { type: String, default: undefined },
  },
  setup(props) {
    /** Get Inertia instance */
    const inertia = useInertia();

    const form: InertiaForm<{}> = inertia.form({});

    const verificationLinkSent: ComputedRef<boolean> = computed(
      () => props.status === 'verification-link-sent'
    );

    const submit = () => {
      form.post(route('verification.send'));
    };

    return {
      form,
      verificationLinkSent,
      submit,
      route,
    };
  },
});
</script>
