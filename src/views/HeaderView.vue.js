import { ref } from 'vue';
import MobileNavigationDrawer from '@/components/header/MobileNavigationDrawer.vue';
import AppBarMain from '@/components/header/AppBarMain.vue';
const drawer = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof AppBarMain, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AppBarMain, new AppBarMain({
    ...{ 'onToggleDrawer': {} },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onToggleDrawer': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onToggleDrawer: (...[$event]) => {
        __VLS_ctx.drawer = !__VLS_ctx.drawer;
    }
};
var __VLS_2;
/** @type {[typeof MobileNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(MobileNavigationDrawer, new MobileNavigationDrawer({
    modelValue: (__VLS_ctx.drawer),
}));
const __VLS_8 = __VLS_7({
    modelValue: (__VLS_ctx.drawer),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MobileNavigationDrawer: MobileNavigationDrawer,
            AppBarMain: AppBarMain,
            drawer: drawer,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
