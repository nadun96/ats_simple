import { ref, watch } from 'vue';
const props = defineProps();
const emit = defineEmits(['update-tab']);
const tab = ref(props.selectedTab);
// Sync local tab value when prop changes
watch(() => props.selectedTab, (newVal) => {
    tab.value = newVal;
});
// Emit event when local tab changes
watch(tab, (val) => {
    emit('update-tab', val);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VTabs;
/** @type {[typeof __VLS_components.VTabs, typeof __VLS_components.vTabs, typeof __VLS_components.VTabs, typeof __VLS_components.vTabs, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.tab),
    backgroundColor: "transparent",
    grow: true,
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.tab),
    backgroundColor: "transparent",
    grow: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VTab;
/** @type {[typeof __VLS_components.VTab, typeof __VLS_components.vTab, typeof __VLS_components.VTab, typeof __VLS_components.vTab, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    value: "applications",
}));
const __VLS_7 = __VLS_6({
    value: "applications",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
var __VLS_8;
const __VLS_9 = {}.VTab;
/** @type {[typeof __VLS_components.VTab, typeof __VLS_components.vTab, typeof __VLS_components.VTab, typeof __VLS_components.vTab, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    value: "promote",
}));
const __VLS_11 = __VLS_10({
    value: "promote",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
var __VLS_12;
const __VLS_13 = {}.VTab;
/** @type {[typeof __VLS_components.VTab, typeof __VLS_components.vTab, typeof __VLS_components.VTab, typeof __VLS_components.vTab, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    value: "reporting",
}));
const __VLS_15 = __VLS_14({
    value: "reporting",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
var __VLS_16;
const __VLS_17 = {}.VTab;
/** @type {[typeof __VLS_components.VTab, typeof __VLS_components.vTab, typeof __VLS_components.VTab, typeof __VLS_components.vTab, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    value: "activities",
}));
const __VLS_19 = __VLS_18({
    value: "activities",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
var __VLS_20;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            tab: tab,
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
