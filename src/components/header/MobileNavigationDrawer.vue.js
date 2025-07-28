import { computed } from 'vue';
const props = defineProps();
const emit = defineEmits();
const drawer = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VNavigationDrawer;
/** @type {[typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, typeof __VLS_components.VNavigationDrawer, typeof __VLS_components.vNavigationDrawer, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.drawer),
    temporary: true,
    location: "left",
    width: "280",
    ...{ class: "d-flex d-md-none" },
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.drawer),
    temporary: true,
    location: "left",
    width: "280",
    ...{ class: "d-flex d-md-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    ...{ class: "px-4 py-3" },
}));
const __VLS_11 = __VLS_10({
    ...{ class: "px-4 py-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "text-h6 font-weight-bold text-primary" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "text-h6 font-weight-bold text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
var __VLS_16;
var __VLS_12;
const __VLS_17 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const __VLS_21 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ class: "px-4 py-2" },
}));
const __VLS_23 = __VLS_22({
    ...{ class: "px-4 py-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.VMenu;
/** @type {[typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    offsetY: true,
}));
const __VLS_27 = __VLS_26({
    offsetY: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
{
    const { activator: __VLS_thisSlot } = __VLS_28.slots;
    const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_29 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        color: "success",
        variant: "elevated",
        prependIcon: "mdi-plus",
        appendIcon: "mdi-chevron-down",
        block: true,
        ...{ class: "text-none" },
        ...(props),
    }));
    const __VLS_31 = __VLS_30({
        color: "success",
        variant: "elevated",
        prependIcon: "mdi-plus",
        appendIcon: "mdi-chevron-down",
        block: true,
        ...{ class: "text-none" },
        ...(props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_32.slots.default;
    var __VLS_32;
}
const __VLS_33 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    density: "compact",
}));
const __VLS_35 = __VLS_34({
    density: "compact",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
__VLS_36.slots.default;
const __VLS_37 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    link: true,
}));
const __VLS_39 = __VLS_38({
    link: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_40.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_40.slots;
    const __VLS_41 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
    const __VLS_43 = __VLS_42({}, ...__VLS_functionalComponentArgsRest(__VLS_42));
    __VLS_44.slots.default;
    var __VLS_44;
}
const __VLS_45 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
__VLS_48.slots.default;
var __VLS_48;
var __VLS_40;
const __VLS_49 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    link: true,
}));
const __VLS_51 = __VLS_50({
    link: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_52.slots;
    const __VLS_53 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({}));
    const __VLS_55 = __VLS_54({}, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_56.slots.default;
    var __VLS_56;
}
const __VLS_57 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
__VLS_60.slots.default;
var __VLS_60;
var __VLS_52;
const __VLS_61 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    link: true,
}));
const __VLS_63 = __VLS_62({
    link: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_64.slots;
    const __VLS_65 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({}));
    const __VLS_67 = __VLS_66({}, ...__VLS_functionalComponentArgsRest(__VLS_66));
    __VLS_68.slots.default;
    var __VLS_68;
}
const __VLS_69 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({}));
const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
__VLS_72.slots.default;
var __VLS_72;
var __VLS_64;
var __VLS_36;
var __VLS_28;
var __VLS_24;
const __VLS_73 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ class: "my-2" },
}));
const __VLS_75 = __VLS_74({
    ...{ class: "my-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
const __VLS_77 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    link: true,
    ...{ class: "my-1" },
}));
const __VLS_79 = __VLS_78({
    link: true,
    ...{ class: "my-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
__VLS_80.slots.default;
const __VLS_81 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({}));
const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
__VLS_84.slots.default;
const __VLS_85 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    ...{ class: "mr-3" },
}));
const __VLS_87 = __VLS_86({
    ...{ class: "mr-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
__VLS_88.slots.default;
var __VLS_88;
var __VLS_84;
var __VLS_80;
const __VLS_89 = {}.VListGroup;
/** @type {[typeof __VLS_components.VListGroup, typeof __VLS_components.vListGroup, typeof __VLS_components.VListGroup, typeof __VLS_components.vListGroup, ]} */ ;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
    value: "recruitment",
}));
const __VLS_91 = __VLS_90({
    value: "recruitment",
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
__VLS_92.slots.default;
{
    const { activator: __VLS_thisSlot } = __VLS_92.slots;
    const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_93 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        ...(props),
        ...{ class: "my-1" },
    }));
    const __VLS_95 = __VLS_94({
        ...(props),
        ...{ class: "my-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    __VLS_96.slots.default;
    const __VLS_97 = {}.VListItemTitle;
    /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({}));
    const __VLS_99 = __VLS_98({}, ...__VLS_functionalComponentArgsRest(__VLS_98));
    __VLS_100.slots.default;
    const __VLS_101 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        ...{ class: "mr-3" },
    }));
    const __VLS_103 = __VLS_102({
        ...{ class: "mr-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    __VLS_104.slots.default;
    var __VLS_104;
    var __VLS_100;
    var __VLS_96;
}
const __VLS_105 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    link: true,
    ...{ class: "pl-12" },
}));
const __VLS_107 = __VLS_106({
    link: true,
    ...{ class: "pl-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
__VLS_108.slots.default;
const __VLS_109 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({}));
const __VLS_111 = __VLS_110({}, ...__VLS_functionalComponentArgsRest(__VLS_110));
__VLS_112.slots.default;
var __VLS_112;
var __VLS_108;
const __VLS_113 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    link: true,
    ...{ class: "pl-12" },
}));
const __VLS_115 = __VLS_114({
    link: true,
    ...{ class: "pl-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
__VLS_116.slots.default;
const __VLS_117 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({}));
const __VLS_119 = __VLS_118({}, ...__VLS_functionalComponentArgsRest(__VLS_118));
__VLS_120.slots.default;
var __VLS_120;
var __VLS_116;
const __VLS_121 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    link: true,
    ...{ class: "pl-12" },
}));
const __VLS_123 = __VLS_122({
    link: true,
    ...{ class: "pl-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
__VLS_124.slots.default;
const __VLS_125 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_128.slots.default;
var __VLS_128;
var __VLS_124;
var __VLS_92;
const __VLS_129 = {}.VListGroup;
/** @type {[typeof __VLS_components.VListGroup, typeof __VLS_components.vListGroup, typeof __VLS_components.VListGroup, typeof __VLS_components.vListGroup, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    value: "cv-library",
}));
const __VLS_131 = __VLS_130({
    value: "cv-library",
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
__VLS_132.slots.default;
{
    const { activator: __VLS_thisSlot } = __VLS_132.slots;
    const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_133 = {}.VListItem;
    /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({
        ...(props),
        ...{ class: "my-1" },
    }));
    const __VLS_135 = __VLS_134({
        ...(props),
        ...{ class: "my-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_134));
    __VLS_136.slots.default;
    const __VLS_137 = {}.VListItemTitle;
    /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({}));
    const __VLS_139 = __VLS_138({}, ...__VLS_functionalComponentArgsRest(__VLS_138));
    __VLS_140.slots.default;
    const __VLS_141 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
        ...{ class: "mr-3" },
    }));
    const __VLS_143 = __VLS_142({
        ...{ class: "mr-3" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    __VLS_144.slots.default;
    var __VLS_144;
    var __VLS_140;
    var __VLS_136;
}
const __VLS_145 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
    link: true,
    ...{ class: "pl-12" },
}));
const __VLS_147 = __VLS_146({
    link: true,
    ...{ class: "pl-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
__VLS_148.slots.default;
const __VLS_149 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({}));
const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
__VLS_152.slots.default;
var __VLS_152;
var __VLS_148;
const __VLS_153 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
    link: true,
    ...{ class: "pl-12" },
}));
const __VLS_155 = __VLS_154({
    link: true,
    ...{ class: "pl-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
__VLS_156.slots.default;
const __VLS_157 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({}));
const __VLS_159 = __VLS_158({}, ...__VLS_functionalComponentArgsRest(__VLS_158));
__VLS_160.slots.default;
var __VLS_160;
var __VLS_156;
const __VLS_161 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    link: true,
    ...{ class: "pl-12" },
}));
const __VLS_163 = __VLS_162({
    link: true,
    ...{ class: "pl-12" },
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
__VLS_164.slots.default;
const __VLS_165 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({}));
const __VLS_167 = __VLS_166({}, ...__VLS_functionalComponentArgsRest(__VLS_166));
__VLS_168.slots.default;
var __VLS_168;
var __VLS_164;
var __VLS_132;
const __VLS_169 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
    link: true,
    ...{ class: "my-1" },
}));
const __VLS_171 = __VLS_170({
    link: true,
    ...{ class: "my-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
__VLS_172.slots.default;
const __VLS_173 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({}));
const __VLS_175 = __VLS_174({}, ...__VLS_functionalComponentArgsRest(__VLS_174));
__VLS_176.slots.default;
const __VLS_177 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
    ...{ class: "mr-3" },
}));
const __VLS_179 = __VLS_178({
    ...{ class: "mr-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_178));
__VLS_180.slots.default;
var __VLS_180;
var __VLS_176;
var __VLS_172;
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['d-md-none']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-none']} */ ;
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
/** @type {__VLS_StyleScopedClasses['my-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['my-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['my-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['my-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            drawer: drawer,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
