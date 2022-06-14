import { getCurrentInstance, toRaw } from '@vue/composition-api';
import form from '@inertiajs/inertia-vue/src/form';

import type { Page } from '@inertiajs/inertia';
import type { Router } from '@inertiajs/inertia/types/router';
import type {
  InertiaForm,
  InertiaFormTrait,
  InertiaHeadManager,
} from '@inertiajs/inertia-vue';

/** Get head manager instance (For Composition api) */
export function useHeadManager(): InertiaHeadManager {
  /** Get Instance */
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(`Should be used in setup().`);
  }
  // @ts-ignore
  return instance.proxy.$headManager;
}

/** Get page instance (For Composition api) */
export function usePage(): Page<any> {
  /** Get Instance */
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(`Should be used in setup().`);
  }
  // @ts-ignore
  return toRaw(instance.proxy.$page);
}

/** Get inertia instance (For Composition api) */
export function useInertia(): Router & InertiaFormTrait {
  /** Get Instance */
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(`Should be used in setup().`);
  }
  // @ts-ignore
  return instance.proxy.$inertia;
}

/** Get form instance (For Composition api) */
export function useForm(...args): InertiaForm<any> {
  return form(args);
}
