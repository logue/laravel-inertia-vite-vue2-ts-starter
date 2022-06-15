import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { importPageComponent } from '@/scripts/vite/import-page-component';
import { InertiaProgress } from '@inertiajs/progress';
import { ZiggyVue } from 'ziggy-js/dist/vue';
import { Ziggy } from '@/js/ziggy';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

/** Application Name */
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    importPageComponent(name, import.meta.glob('../views/pages/**/*.vue')),
  setup({ el, app, props, plugin }) {
    // console.log(el, app, props, plugin);
    // @ts-ignore
    console.log(JSON.parse(el.dataset.page));

    Vue.use(ZiggyVue, Ziggy);
    Vue.use(plugin);
    // @ts-ignore
    Vue.mixin({ methods: { route: window.route } });

    const vueApp = createApp({ render: () => h(app, props) });

    vueApp.mount(el);
  },
});

InertiaProgress.init({ color: '#4B5563' });
