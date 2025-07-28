import CdStepper from '@/components/molecules/CdStepper.vue';
import { CdTextInput } from '@/components/atoms';
import { CdRichTextEditor } from '@/components/molecules';
export default (await import('vue')).defineComponent({
    components: {
        'cd-stepper': CdStepper,
        'cd-text-input': CdTextInput,
        'cd-rich-text-editor': CdRichTextEditor,
    },
    data() {
        return {
            stepData: [
                {
                    title: 'Job Description',
                    content: '<div>Content for Job Description</div>',
                },
                {
                    title: 'Form',
                    content: '<div>Content for Form</div>',
                },
                {
                    title: 'Workflow',
                    content: '<div>Content for Workflow</div>',
                },
                {
                    title: 'Job Team',
                    content: '<div>Content for Job Team</div>',
                },
                {
                    title: 'Promote',
                    content: '<div>Content for Promote</div>',
                },
            ],
        };
    },
    methods: {
        handleNext(currentStep) {
            console.log('Next clicked on step:', currentStep);
            // Example: Validate something at step 2
            if (currentStep === 2) {
                const isFormValid = true; // Replace with actual logic
                if (!isFormValid) {
                    alert('Please complete the form before continuing.');
                    return false;
                }
            }
            return true; // allow step transition
        },
        handlePrev(currentStep) {
            console.log('Previous clicked on step:', currentStep);
            return true; // allow going back
        },
        onInputChange(value) {
            console.log('text field updated:', value);
        },
    },
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    'cd-stepper': CdStepper,
    'cd-text-input': CdTextInput,
    'cd-rich-text-editor': CdRichTextEditor,
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
const __VLS_0 = {}.CdStepper;
/** @type {[typeof __VLS_components.CdStepper, typeof __VLS_components.cdStepper, typeof __VLS_components.CdStepper, typeof __VLS_components.cdStepper, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    steps: (__VLS_ctx.stepData),
    onNext: (__VLS_ctx.handleNext),
    onPrev: (__VLS_ctx.handlePrev),
}));
const __VLS_2 = __VLS_1({
    steps: (__VLS_ctx.stepData),
    onNext: (__VLS_ctx.handleNext),
    onPrev: (__VLS_ctx.handlePrev),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "my-3 px-0" },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "my-3 px-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.CdTextInput;
/** @type {[typeof __VLS_components.CdTextInput, typeof __VLS_components.cdTextInput, typeof __VLS_components.CdTextInput, typeof __VLS_components.cdTextInput, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onUpdate:modelValue': {} },
    label: ('Your landing page'),
    hint: ('www.example.com/page'),
    persistentHint: (true),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onUpdate:modelValue': {} },
    label: ('Your landing page'),
    hint: ('www.example.com/page'),
    persistentHint: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    'onUpdate:modelValue': (__VLS_ctx.onInputChange)
};
var __VLS_11;
var __VLS_7;
const __VLS_16 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "my-3 px-0" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "my-3 px-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.CdRichTextEditor;
/** @type {[typeof __VLS_components.CdRichTextEditor, typeof __VLS_components.cdRichTextEditor, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
const __VLS_24 = {}.VFileUpload;
/** @type {[typeof __VLS_components.VFileUpload, typeof __VLS_components.vFileUpload, typeof __VLS_components.VFileUpload, typeof __VLS_components.vFileUpload, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    clearable: true,
    density: "comfortable",
    variant: "comfortable",
}));
const __VLS_26 = __VLS_25({
    clearable: true,
    density: "comfortable",
    variant: "comfortable",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['my-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['my-3']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
var __VLS_dollars;
let __VLS_self;
