import { ref } from 'vue';
const props = defineProps();
const steps = props.steps;
const activeStep = ref(1);
const nextStep = async () => {
    if (activeStep.value < steps.length) {
        const proceed = props.onNext ? await props.onNext(activeStep.value) : true;
        if (proceed !== false) {
            activeStep.value++;
        }
    }
};
const prevStep = async () => {
    if (activeStep.value > 1) {
        const proceed = props.onPrev ? await props.onPrev(activeStep.value) : true;
        if (proceed !== false) {
            activeStep.value--;
        }
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['step-item']} */ ;
/** @type {__VLS_StyleScopedClasses['step-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['step-item']} */ ;
/** @type {__VLS_StyleScopedClasses['step-circle']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "custom-stepper" },
});
for (const [step, index] of __VLS_getVForSourceType((__VLS_ctx.steps))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "step-item" },
        ...{ class: ({
                active: __VLS_ctx.activeStep === index + 1,
                completed: __VLS_ctx.activeStep > index + 1,
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "step-circle" },
    });
    if (__VLS_ctx.activeStep > index + 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (index + 1);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "step-title" },
    });
    (step.title);
    if (index !== __VLS_ctx.steps.length - 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
            ...{ class: "step-line" },
        });
    }
}
if (typeof __VLS_ctx.steps[__VLS_ctx.activeStep - 1].content === 'string') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.steps[__VLS_ctx.activeStep - 1].content) }, null, null);
}
else {
    const __VLS_0 = ((__VLS_ctx.steps[__VLS_ctx.activeStep - 1].content));
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mt-4 d-flex justify-space-between" },
});
const __VLS_4 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.activeStep === 1),
    variant: "outlined",
    color: "primary",
}));
const __VLS_6 = __VLS_5({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.activeStep === 1),
    variant: "outlined",
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.prevStep)
};
__VLS_7.slots.default;
var __VLS_7;
const __VLS_12 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.activeStep === __VLS_ctx.steps.length),
    color: "primary",
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    disabled: (__VLS_ctx.activeStep === __VLS_ctx.steps.length),
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.nextStep)
};
__VLS_15.slots.default;
var __VLS_15;
/** @type {__VLS_StyleScopedClasses['custom-stepper']} */ ;
/** @type {__VLS_StyleScopedClasses['step-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['completed']} */ ;
/** @type {__VLS_StyleScopedClasses['step-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['step-title']} */ ;
/** @type {__VLS_StyleScopedClasses['step-line']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            steps: steps,
            activeStep: activeStep,
            nextStep: nextStep,
            prevStep: prevStep,
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
