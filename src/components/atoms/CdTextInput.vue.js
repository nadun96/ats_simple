import { CdLabel } from '.';
const __VLS_props = withDefaults(defineProps(), {
    variant: 'outlined',
    persistentHint: false,
});
const __VLS_emit = defineEmits(['update:modelValue']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    variant: 'outlined',
    persistentHint: false,
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
const __VLS_4 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onUpdate:modelValue': {} },
    density: "compact",
    hint: (__VLS_ctx.hint),
    placeholder: (__VLS_ctx.placeholder),
    persistentHint: (__VLS_ctx.persistentHint),
    variant: (__VLS_ctx.variant),
    required: (__VLS_ctx.required),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onUpdate:modelValue': {} },
    density: "compact",
    hint: (__VLS_ctx.hint),
    placeholder: (__VLS_ctx.placeholder),
    persistentHint: (__VLS_ctx.persistentHint),
    variant: (__VLS_ctx.variant),
    required: (__VLS_ctx.required),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    'onUpdate:modelValue': (...[$event]) => {
        __VLS_ctx.$emit('update:modelValue', $event);
    }
};
var __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CdLabel: CdLabel,
        };
    },
    emits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
