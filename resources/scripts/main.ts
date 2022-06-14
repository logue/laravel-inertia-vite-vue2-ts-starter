import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { importPageComponent } from '@/scripts/vite/import-page-component';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

createInertiaApp({
  resolve: name =>
    importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup({ el, app, props, plugin }) {
    Vue.use(plugin);
    const vueApp = createApp({ render: () => h(app, props) });
    vueApp.mount(el);
  },
});
