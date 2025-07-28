import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { defineProps } from 'vue';
import { CdLabel } from '../atoms';
const __VLS_props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-1" },
});
if (__VLS_ctx.label) {
    const __VLS_0 = {}.CdLabel;
    /** @type {[typeof __VLS_components.CdLabel, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        label: (__VLS_ctx.label),
        required: (__VLS_ctx.required),
    }));
    const __VLS_2 = __VLS_1({
        label: (__VLS_ctx.label),
        required: (__VLS_ctx.required),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
const __VLS_4 = {}.QuillEditor;
/** @type {[typeof __VLS_components.QuillEditor, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    theme: "snow",
    toolbar: "essential",
    ...{ style: {} },
}));
const __VLS_6 = __VLS_5({
    theme: "snow",
    toolbar: "essential",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            QuillEditor: QuillEditor,
            CdLabel: CdLabel,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
