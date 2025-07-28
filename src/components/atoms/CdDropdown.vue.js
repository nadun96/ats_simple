import { CdLabel } from '@/components/atoms';
const __VLS_props = defineProps();
const __VLS_emit = defineEmits(['update:modelValue']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['styled-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['styled-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['styled-dropdown']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "styled-dropdown" },
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.$emit('update:modelValue', $event.target ? $event.target.value : '');
        } },
    value: (__VLS_ctx.modelValue),
    disabled: (__VLS_ctx.disabled),
});
for (const [option, index] of __VLS_getVForSourceType((__VLS_ctx.options))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (index),
        value: (option.value),
    });
    (option.displayValue);
}
/** @type {__VLS_StyleScopedClasses['styled-dropdown']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CdLabel: CdLabel,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
