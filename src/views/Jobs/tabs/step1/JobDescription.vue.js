import JobDescriptionCard from './JobDescriptionCard.vue';
import SocietyCard from './SocietyCard.vue';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof SocietyCard, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SocietyCard, new SocietyCard({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof JobDescriptionCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(JobDescriptionCard, new JobDescriptionCard({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            JobDescriptionCard: JobDescriptionCard,
            SocietyCard: SocietyCard,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
