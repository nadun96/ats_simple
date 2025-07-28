import CdStepper from '@/components/molecules/CdStepper.vue';
import JobDescription from './tabs/step1/JobDescription.vue';
export default (await import('vue')).defineComponent({
    components: {
        'cd-stepper': CdStepper,
    },
    data() {
        return {
            stepData: [
                {
                    title: 'Job Description',
                    content: JobDescription,
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
    },
});
const __VLS_ctx = {};
const __VLS_componentsOption = {
    'cd-stepper': CdStepper,
};
let __VLS_components;
let __VLS_directives;
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
var __VLS_4 = {};
var __VLS_3;
var __VLS_dollars;
let __VLS_self;
