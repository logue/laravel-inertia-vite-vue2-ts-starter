import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { importPageComponent } from '@/scripts/vite/import-page-component';
import { InertiaProgress } from '@inertiajs/progress';
import { ZiggyVue } from 'ziggy-js/dist/vue';
import ziggy from 'ziggy-js';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

/** Application Name */
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

/** Register Vue to Inertia */
createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup({ el, app, props, plugin }) {
    /** Get data-page attribute */
    // @ts-ignore
    const page = JSON.parse(el.dataset.page);

    /** Vue Instance */
    const App = createApp({ render: () => h(app, props) });
    // Add route function.
    App.mixin({ methods: { route: ziggy } });
    // Register inertia
    App.use(plugin);
    // Register route
    App.use(ZiggyVue, page.props.ziggy);
    // Mount
    App.mount(el);
  },
});

InertiaProgress.init({ color: '#4B5563' });
