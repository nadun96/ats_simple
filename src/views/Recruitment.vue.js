import { ref } from 'vue';
import RecruitmentSidebar from '@/components/recruitment/RecruitmentSidebar.vue';
import RecruitmentFilterHeader from '@/components/recruitment/RecruitmentFilterHeader.vue';
import RecruitmentCard from '@/components/recruitment/RecruitmentCard.vue';
const sidebarCollapsed = ref(false);
const jobs = ref([
    {
        id: 1,
        title: 'JAVA Engineer',
        location: 'Freelance - Paris',
        date: 'Jul 2, 2025',
        status: 'Online',
        hired: true,
        type: 'Freelance',
    },
    {
        id: 2,
        title: 'Python Engineer',
        location: 'Freelance - Colombo',
        date: 'Jun 29, 2025',
        status: 'Online',
        hired: true,
        type: 'Freelance',
    },
    // Add more...
]);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    fluid: true,
    ...{ class: "pa-0 d-flex" },
}));
const __VLS_2 = __VLS_1({
    fluid: true,
    ...{ class: "pa-0 d-flex" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
/** @type {[typeof RecruitmentSidebar, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(RecruitmentSidebar, new RecruitmentSidebar({
    collapsed: (__VLS_ctx.sidebarCollapsed),
    ...{ class: "sidebar" },
}));
const __VLS_6 = __VLS_5({
    collapsed: (__VLS_ctx.sidebarCollapsed),
    ...{ class: "sidebar" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "recruitment-main" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "recruitment-main" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
/** @type {[typeof RecruitmentFilterHeader, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(RecruitmentFilterHeader, new RecruitmentFilterHeader({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const __VLS_15 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    fluid: true,
}));
const __VLS_17 = __VLS_16({
    fluid: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_18.slots.default;
for (const [job] of __VLS_getVForSourceType((__VLS_ctx.jobs))) {
    /** @type {[typeof RecruitmentCard, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(RecruitmentCard, new RecruitmentCard({
        key: (job.id),
        job: (job),
    }));
    const __VLS_20 = __VLS_19({
        key: (job.id),
        job: (job),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
}
var __VLS_18;
var __VLS_11;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['recruitment-main']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RecruitmentSidebar: RecruitmentSidebar,
            RecruitmentFilterHeader: RecruitmentFilterHeader,
            RecruitmentCard: RecruitmentCard,
            sidebarCollapsed: sidebarCollapsed,
            jobs: jobs,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
