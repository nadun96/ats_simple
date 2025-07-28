import { ref } from 'vue';
import NewViewDialog from './NewViewDialog.vue';
const views = ref([
    { id: 1, name: 'Recrutements en cours', icon: 'mdi-briefcase-outline' },
    { id: 2, name: 'Favoris', icon: 'mdi-star-outline' },
    { id: 3, name: 'Candidatures spontanées', icon: 'mdi-account-multiple' },
    { id: 4, name: 'Archivés', icon: 'mdi-archive-outline' }
]);
const selectedView = ref(1);
const dialogVisible = ref(false);
const isCollapsed = ref(false);
const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
};
const selectView = (id) => {
    selectedView.value = id;
};
const handleCreate = (name) => {
    console.log('the new view created:', name);
    views.value.push({
        id: Date.now(),
        name,
        icon: 'mdi-eye' // Default icon for new views
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VNavigationDrawer;
/** @type {[typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    permanent: (true),
    rail: (__VLS_ctx.isCollapsed),
    app: true,
    width: "250",
    ...{ class: "pt-2" },
}));
const __VLS_2 = __VLS_1({
    permanent: (true),
    rail: (__VLS_ctx.isCollapsed),
    app: true,
    width: "250",
    ...{ class: "pt-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "d-flex justify-space-between align-center px-4" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "d-flex justify-space-between align-center px-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
if (!__VLS_ctx.isCollapsed) {
    const __VLS_9 = {}.VListItemTitle;
    /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        ...{ class: "text-subtitle-1 font-weight-bold" },
    }));
    const __VLS_11 = __VLS_10({
        ...{ class: "text-subtitle-1 font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    __VLS_12.slots.default;
    var __VLS_12;
}
const __VLS_13 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    icon: true,
    size: "small",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    icon: true,
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    onClick: (__VLS_ctx.toggleCollapse)
};
__VLS_16.slots.default;
const __VLS_21 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
(__VLS_ctx.isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left');
var __VLS_24;
var __VLS_16;
var __VLS_8;
if (!__VLS_ctx.isCollapsed) {
    const __VLS_25 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_28.slots.default;
    const __VLS_29 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        ...{ 'onClick': {} },
        block: true,
        color: "primary",
        variant: "outlined",
    }));
    const __VLS_31 = __VLS_30({
        ...{ 'onClick': {} },
        block: true,
        color: "primary",
        variant: "outlined",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_33;
    let __VLS_34;
    let __VLS_35;
    const __VLS_36 = {
        onClick: (...[$event]) => {
            if (!(!__VLS_ctx.isCollapsed))
                return;
            __VLS_ctx.dialogVisible = true;
        }
    };
    __VLS_32.slots.default;
    var __VLS_32;
    var __VLS_28;
}
const __VLS_37 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ class: "my-2" },
}));
const __VLS_39 = __VLS_38({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
const __VLS_41 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    density: "compact",
    nav: true,
}));
const __VLS_43 = __VLS_42({
    density: "compact",
    nav: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
__VLS_44.slots.default;
for (const [view] of __VLS_getVForSourceType((__VLS_ctx.views))) {
    const __VLS_45 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ 'onClick': {} },
        key: (view.id),
        value: (view.id),
        ...{ class: ({ 'bg-blue-lighten-5': __VLS_ctx.selectedView === view.id }) },
    }));
    const __VLS_47 = __VLS_46({
        ...{ 'onClick': {} },
        key: (view.id),
        value: (view.id),
        ...{ class: ({ 'bg-blue-lighten-5': __VLS_ctx.selectedView === view.id }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    let __VLS_49;
    let __VLS_50;
    let __VLS_51;
    const __VLS_52 = {
        onClick: (...[$event]) => {
            __VLS_ctx.selectView(view.id);
        }
    };
    __VLS_48.slots.default;
    const __VLS_53 = {}.VListItemIcon;
    /** @type {[typeof __VLS_components.VListItemIcon, typeof __VLS_components.vListItemIcon, typeof __VLS_components.VListItemIcon, typeof __VLS_components.vListItemIcon, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({}));
    const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    const __VLS_57 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
    const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
    __VLS_60.slots.default;
    (view.icon);
    var __VLS_60;
    var __VLS_56;
    if (!__VLS_ctx.isCollapsed) {
        const __VLS_61 = {}.VListItemTitle;
        /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({}));
        const __VLS_63 = __VLS_62({}, ...__VLS_functionalComponentArgsRest(__VLS_62));
        __VLS_64.slots.default;
        (view.name);
        var __VLS_64;
    }
    var __VLS_48;
}
var __VLS_44;
/** @type {[typeof NewViewDialog, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(NewViewDialog, new NewViewDialog({
    ...{ 'onCreate': {} },
    visible: (__VLS_ctx.dialogVisible),
}));
const __VLS_66 = __VLS_65({
    ...{ 'onCreate': {} },
    visible: (__VLS_ctx.dialogVisible),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
let __VLS_70;
const __VLS_71 = {
    onCreate: (__VLS_ctx.handleCreate)
};
var __VLS_67;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-lighten-5']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NewViewDialog: NewViewDialog,
            views: views,
            selectedView: selectedView,
            dialogVisible: dialogVisible,
            isCollapsed: isCollapsed,
            toggleCollapse: toggleCollapse,
            selectView: selectView,
            handleCreate: handleCreate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
