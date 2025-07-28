import { ref, computed } from 'vue';
// Components
import JobDetailSidebar from '@/components/job-detail/JobDetailSidebar.vue';
import JobDetailHeader from '@/components/job-detail/JobDetailHeader.vue';
import JobTabs from '@/components/job-detail/JobTabs.vue';
// Tab Components
import ApplicationsTab from '@/components/job-detail/ApplicationsTab.vue';
import ActivitiesTab from '@/components/job-detail/ActivitiesTab.vue';
import PromoteTab from '@/components/job-detail/PromoteTab.vue';
import ReportingTab from '@/components/job-detail/ReportingTab.vue';
// State
const jobs = ref([
    { id: 1, title: 'JAVA Engineer', type: 'Freelance', location: 'Paris' },
    { id: 2, title: 'Python Engineer', type: 'Freelance', location: 'Colombo' },
    { id: 3, title: 'Marketing Manager', type: 'CDD (6 m)', location: 'Paris' },
]);
const selectedJobId = ref(1);
const sidebarCollapsed = ref(false);
const selectedTab = ref('applications');
const collapsed = ref(false);
function handleToggleCollapse(val) {
    collapsed.value = val;
}
// Computed job
const selectedJob = computed(() => {
    return (jobs.value.find(job => job.id === selectedJobId.value) ?? {
        title: '',
        type: '',
        location: ''
    });
});
// Component mapping based on selectedTab
const currentTabComponent = computed(() => {
    switch (selectedTab.value) {
        case 'applications':
            return ApplicationsTab;
        case 'activities':
            return ActivitiesTab;
        case 'promote':
            return PromoteTab;
        case 'reporting':
            return ReportingTab;
        default:
            return ApplicationsTab;
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
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
/** @type {[typeof JobDetailSidebar, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(JobDetailSidebar, new JobDetailSidebar({
    ...{ 'onToggleCollapse': {} },
    modelValue: (__VLS_ctx.selectedJobId),
    jobs: (__VLS_ctx.jobs),
    collapsed: (__VLS_ctx.collapsed),
}));
const __VLS_6 = __VLS_5({
    ...{ 'onToggleCollapse': {} },
    modelValue: (__VLS_ctx.selectedJobId),
    jobs: (__VLS_ctx.jobs),
    collapsed: (__VLS_ctx.collapsed),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onToggleCollapse: (__VLS_ctx.handleToggleCollapse)
};
var __VLS_7;
const __VLS_12 = {}.VMain;
/** @type {[typeof __VLS_components.VMain, typeof __VLS_components.vMain, typeof __VLS_components.VMain, typeof __VLS_components.vMain, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
/** @type {[typeof JobDetailHeader, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(JobDetailHeader, new JobDetailHeader({
    job: (__VLS_ctx.selectedJob),
}));
const __VLS_17 = __VLS_16({
    job: (__VLS_ctx.selectedJob),
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
/** @type {[typeof JobTabs, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(JobTabs, new JobTabs({
    ...{ 'onUpdateTab': {} },
    selectedTab: (__VLS_ctx.selectedTab),
}));
const __VLS_20 = __VLS_19({
    ...{ 'onUpdateTab': {} },
    selectedTab: (__VLS_ctx.selectedTab),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
let __VLS_22;
let __VLS_23;
let __VLS_24;
const __VLS_25 = {
    onUpdateTab: (...[$event]) => {
        __VLS_ctx.selectedTab = $event;
    }
};
var __VLS_21;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "px-4" },
});
const __VLS_26 = ((__VLS_ctx.currentTabComponent));
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pa-0']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            JobDetailSidebar: JobDetailSidebar,
            JobDetailHeader: JobDetailHeader,
            JobTabs: JobTabs,
            jobs: jobs,
            selectedJobId: selectedJobId,
            selectedTab: selectedTab,
            collapsed: collapsed,
            handleToggleCollapse: handleToggleCollapse,
            selectedJob: selectedJob,
            currentTabComponent: currentTabComponent,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
