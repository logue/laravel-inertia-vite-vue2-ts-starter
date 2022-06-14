<template>
  <BreezeGuestLayout>
    <Head title="Email Verification" />

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
        <BreezeButton
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          Resend Verification Email
        </BreezeButton>

        <Link
          :href="route('logout')"
          method="post"
          as="button"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Log Out
        </Link>
      </div>
    </form>
  </BreezeGuestLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import BreezeButton from '@/views/components/Button.vue';
import BreezeGuestLayout from '@/views/layouts/Guest.vue';

import useForm from '@inertiajs/inertia-vue/src/form';
import { Head, Link } from '@inertiajs/inertia-vue';
import route from 'ziggy-js';

export default defineComponent({
  components: {
    BreezeButton,
    BreezeGuestLayout,
    Head,
    Link,
  },
  props: {
    status: { type: String, default: undefined },
  },
  setup(props) {
    const form = useForm();

    const submit = () => {
      form.post(route('verification.send'));
    };

    const verificationLinkSent = computed(
      () => props.status === 'verification-link-sent'
    );

    return {
      form,
      verificationLinkSent,
      submit,
      route,
    };
  },
});
</script>
