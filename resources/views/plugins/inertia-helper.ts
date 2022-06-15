import { getCurrentInstance } from '@vue/composition-api';

import type { Page } from '@inertiajs/inertia';
import type { Router } from '@inertiajs/inertia/types/router';
import type {
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
  return instance.proxy.$page;
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

/** Get route instance (For Composition api) */
export function route(...args) {
  /** Get Instance */
  const instance = getCurrentInstance();

  if (!instance) {
    // @ts-ignore
    return window.route(args);
    // throw new Error(`Should be used in setup().`);
  }

  return instance.proxy.route(args);
}
