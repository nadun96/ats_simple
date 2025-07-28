const __VLS_props = defineProps();
const __VLS_emit = defineEmits(['update:selectedJobId', 'toggle-collapse']);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VNavigationDrawer;
/** @type {[typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    permanent: (true),
    width: (__VLS_ctx.collapsed ? 60 : 300),
    ...{ class: "pa-2" },
}));
const __VLS_2 = __VLS_1({
    permanent: (true),
    width: (__VLS_ctx.collapsed ? 60 : 300),
    ...{ class: "pa-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ 'onClick': {} },
    icon: true,
}));
const __VLS_7 = __VLS_6({
    ...{ 'onClick': {} },
    icon: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_9;
let __VLS_10;
let __VLS_11;
const __VLS_12 = {
    onClick: (...[$event]) => {
        __VLS_ctx.$emit('toggle-collapse');
    }
};
__VLS_8.slots.default;
const __VLS_13 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
(__VLS_ctx.collapsed ? 'mdi-chevron-right' : 'mdi-chevron-left');
var __VLS_16;
var __VLS_8;
const __VLS_17 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    dense: true,
}));
const __VLS_19 = __VLS_18({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
for (const [job] of __VLS_getVForSourceType((__VLS_ctx.jobs))) {
    const __VLS_21 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ 'onClick': {} },
        key: (job.id),
        value: (job.id),
        active: (__VLS_ctx.modelValue === job.id),
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        key: (job.id),
        value: (job.id),
        active: (__VLS_ctx.modelValue === job.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    let __VLS_27;
    const __VLS_28 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('update:selectedJobId', job.id);
        }
    };
    __VLS_24.slots.default;
    const __VLS_29 = {}.VListItemIcon;
    /** @type {[typeof __VLS_components.VListItemIcon, typeof __VLS_components.vListItemIcon, typeof __VLS_components.VListItemIcon, typeof __VLS_components.vListItemIcon, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
    const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_32.slots.default;
    const __VLS_33 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        color: "green",
    }));
    const __VLS_35 = __VLS_34({
        color: "green",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    __VLS_36.slots.default;
    var __VLS_36;
    var __VLS_32;
    if (!__VLS_ctx.collapsed) {
        const __VLS_37 = {}.VListItemContent;
        /** @type {[typeof __VLS_components.VListItemContent, typeof __VLS_components.vListItemContent, typeof __VLS_components.VListItemContent, typeof __VLS_components.vListItemContent, ]} */ ;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
        const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
        __VLS_40.slots.default;
        const __VLS_41 = {}.VListItemTitle;
        /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
        const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
        __VLS_44.slots.default;
        (job.title);
        var __VLS_44;
        const __VLS_45 = {}.VListItemSubtitle;
        /** @type {[typeof __VLS_components.VListItemSubtitle, typeof __VLS_components.vListItemSubtitle, typeof __VLS_components.VListItemSubtitle, typeof __VLS_components.vListItemSubtitle, ]} */ ;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
        const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
        __VLS_48.slots.default;
        (job.type);
        (job.location);
        var __VLS_48;
        var __VLS_40;
    }
    var __VLS_24;
}
var __VLS_20;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pa-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
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
