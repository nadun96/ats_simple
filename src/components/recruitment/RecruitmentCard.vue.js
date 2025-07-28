import { ref } from 'vue';
const props = defineProps();
const isFavorite = ref(false);
const updateStatus = (status) => {
    console.log('Status changed to', status);
};
const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};
const handleAction = (action) => {
    console.log(`${action} clicked`);
};
const progressLabels = [
    'Nouveau',
    'CV sélectionné',
    'Evalué par téléphone',
    'Entretien passé',
    'Offre faite',
    'Embauché'
];
const onLabelClick = (label) => {
    console.log('Clicked label:', label);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['clickable-title']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "mb-4 pa-2" },
    variant: "outlined",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mb-4 pa-2" },
    variant: "outlined",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "justify-space-between align-center" },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "justify-space-between align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    cols: "auto",
    ...{ class: "d-flex align-center" },
}));
const __VLS_11 = __VLS_10({
    cols: "auto",
    ...{ class: "d-flex align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.VMenu;
/** @type {[typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
{
    const { activator: __VLS_thisSlot } = __VLS_16.slots;
    const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_17 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        ...(props),
        size: "small",
        color: "success",
        variant: "flat",
        ...{ class: "text-capitalize" },
    }));
    const __VLS_19 = __VLS_18({
        ...(props),
        size: "small",
        color: "success",
        variant: "flat",
        ...{ class: "text-capitalize" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    (__VLS_ctx.job.status);
    const __VLS_21 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        end: true,
    }));
    const __VLS_23 = __VLS_22({
        end: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    var __VLS_24;
    var __VLS_20;
}
const __VLS_25 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
const __VLS_29 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    ...{ 'onClick': {} },
}));
const __VLS_31 = __VLS_30({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onClick: (...[$event]) => {
        __VLS_ctx.updateStatus('Suspend');
    }
};
__VLS_32.slots.default;
const __VLS_37 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
__VLS_40.slots.default;
var __VLS_40;
var __VLS_32;
const __VLS_41 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    ...{ 'onClick': {} },
}));
const __VLS_43 = __VLS_42({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
let __VLS_45;
let __VLS_46;
let __VLS_47;
const __VLS_48 = {
    onClick: (...[$event]) => {
        __VLS_ctx.updateStatus('Archive');
    }
};
__VLS_44.slots.default;
const __VLS_49 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
var __VLS_52;
var __VLS_44;
var __VLS_28;
var __VLS_16;
const __VLS_53 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ 'onClick': {} },
    color: "warning",
    ...{ class: "ml-2 mr-2" },
    icon: (__VLS_ctx.isFavorite ? 'mdi-star' : 'mdi-star-outline'),
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
    color: "warning",
    ...{ class: "ml-2 mr-2" },
    icon: (__VLS_ctx.isFavorite ? 'mdi-star' : 'mdi-star-outline'),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
let __VLS_59;
const __VLS_60 = {
    onClick: (__VLS_ctx.toggleFavorite)
};
var __VLS_56;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_61 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    to: ({ name: 'job-detail', params: { id: __VLS_ctx.job.id } }),
    ...{ class: "font-weight-bold text-body-1 text-truncate job-title clickable-title" },
}));
const __VLS_63 = __VLS_62({
    to: ({ name: 'job-detail', params: { id: __VLS_ctx.job.id } }),
    ...{ class: "font-weight-bold text-body-1 text-truncate job-title clickable-title" },
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_64.slots.default;
(__VLS_ctx.job.title);
var __VLS_64;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption text-grey-darken-1" },
});
(__VLS_ctx.job.location);
var __VLS_12;
const __VLS_65 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    cols: "auto",
    ...{ class: "d-flex align-center" },
}));
const __VLS_67 = __VLS_66({
    cols: "auto",
    ...{ class: "d-flex align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
__VLS_68.slots.default;
const __VLS_69 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
    size: "small",
    variant: "text",
    icon: true,
}));
const __VLS_71 = __VLS_70({
    size: "small",
    variant: "text",
    icon: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
__VLS_72.slots.default;
const __VLS_73 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({}));
const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
__VLS_76.slots.default;
var __VLS_76;
var __VLS_72;
const __VLS_77 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    size: "small",
    variant: "outlined",
    ...{ class: "ml-1" },
}));
const __VLS_79 = __VLS_78({
    size: "small",
    variant: "outlined",
    ...{ class: "ml-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
__VLS_80.slots.default;
var __VLS_80;
const __VLS_81 = {}.VMenu;
/** @type {[typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, typeof __VLS_components.VMenu, typeof __VLS_components.vMenu, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    offsetY: true,
}));
const __VLS_83 = __VLS_82({
    offsetY: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
__VLS_84.slots.default;
{
    const { activator: __VLS_thisSlot } = __VLS_84.slots;
    const [{ props }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_85 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
        size: "small",
        variant: "text",
        icon: true,
        ...(props),
    }));
    const __VLS_87 = __VLS_86({
        size: "small",
        variant: "text",
        icon: true,
        ...(props),
    }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    __VLS_88.slots.default;
    const __VLS_89 = {}.VIcon;
    /** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({}));
    const __VLS_91 = __VLS_90({}, ...__VLS_functionalComponentArgsRest(__VLS_90));
    __VLS_92.slots.default;
    var __VLS_92;
    var __VLS_88;
}
const __VLS_93 = {}.VList;
/** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
    ...{ class: "px-1 py-0" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "px-1 py-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
__VLS_96.slots.default;
const __VLS_97 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}));
const __VLS_99 = __VLS_98({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_98));
let __VLS_101;
let __VLS_102;
let __VLS_103;
const __VLS_104 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleAction('edit');
    }
};
__VLS_100.slots.default;
const __VLS_105 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    start: true,
    size: "20",
}));
const __VLS_107 = __VLS_106({
    start: true,
    size: "20",
}, ...__VLS_functionalComponentArgsRest(__VLS_106));
__VLS_108.slots.default;
var __VLS_108;
const __VLS_109 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({}));
const __VLS_111 = __VLS_110({}, ...__VLS_functionalComponentArgsRest(__VLS_110));
__VLS_112.slots.default;
var __VLS_112;
var __VLS_100;
const __VLS_113 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}));
const __VLS_115 = __VLS_114({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_114));
let __VLS_117;
let __VLS_118;
let __VLS_119;
const __VLS_120 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleAction('duplicate');
    }
};
__VLS_116.slots.default;
const __VLS_121 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
    start: true,
    size: "20",
}));
const __VLS_123 = __VLS_122({
    start: true,
    size: "20",
}, ...__VLS_functionalComponentArgsRest(__VLS_122));
__VLS_124.slots.default;
var __VLS_124;
const __VLS_125 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
__VLS_128.slots.default;
var __VLS_128;
var __VLS_116;
const __VLS_129 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}));
const __VLS_131 = __VLS_130({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
let __VLS_133;
let __VLS_134;
let __VLS_135;
const __VLS_136 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleAction('view');
    }
};
__VLS_132.slots.default;
const __VLS_137 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
    start: true,
    size: "20",
}));
const __VLS_139 = __VLS_138({
    start: true,
    size: "20",
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
__VLS_140.slots.default;
var __VLS_140;
const __VLS_141 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({}));
const __VLS_143 = __VLS_142({}, ...__VLS_functionalComponentArgsRest(__VLS_142));
__VLS_144.slots.default;
var __VLS_144;
var __VLS_132;
const __VLS_145 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}));
const __VLS_147 = __VLS_146({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_146));
let __VLS_149;
let __VLS_150;
let __VLS_151;
const __VLS_152 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleAction('share');
    }
};
__VLS_148.slots.default;
const __VLS_153 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
    start: true,
    size: "20",
}));
const __VLS_155 = __VLS_154({
    start: true,
    size: "20",
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
__VLS_156.slots.default;
var __VLS_156;
const __VLS_157 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({}));
const __VLS_159 = __VLS_158({}, ...__VLS_functionalComponentArgsRest(__VLS_158));
__VLS_160.slots.default;
var __VLS_160;
var __VLS_148;
const __VLS_161 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}));
const __VLS_163 = __VLS_162({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
let __VLS_165;
let __VLS_166;
let __VLS_167;
const __VLS_168 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleAction('download');
    }
};
__VLS_164.slots.default;
const __VLS_169 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
    start: true,
    size: "20",
}));
const __VLS_171 = __VLS_170({
    start: true,
    size: "20",
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
__VLS_172.slots.default;
var __VLS_172;
const __VLS_173 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({}));
const __VLS_175 = __VLS_174({}, ...__VLS_functionalComponentArgsRest(__VLS_174));
__VLS_176.slots.default;
var __VLS_176;
var __VLS_164;
const __VLS_177 = {}.VListItem;
/** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
// @ts-ignore
const __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}));
const __VLS_179 = __VLS_178({
    ...{ 'onClick': {} },
    ...{ class: "menu-item" },
}, ...__VLS_functionalComponentArgsRest(__VLS_178));
let __VLS_181;
let __VLS_182;
let __VLS_183;
const __VLS_184 = {
    onClick: (...[$event]) => {
        __VLS_ctx.handleAction('invite');
    }
};
__VLS_180.slots.default;
const __VLS_185 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
    start: true,
    size: "20",
}));
const __VLS_187 = __VLS_186({
    start: true,
    size: "20",
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
__VLS_188.slots.default;
var __VLS_188;
const __VLS_189 = {}.VListItemTitle;
/** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
// @ts-ignore
const __VLS_190 = __VLS_asFunctionalComponent(__VLS_189, new __VLS_189({}));
const __VLS_191 = __VLS_190({}, ...__VLS_functionalComponentArgsRest(__VLS_190));
__VLS_192.slots.default;
var __VLS_192;
var __VLS_180;
var __VLS_96;
var __VLS_84;
var __VLS_68;
var __VLS_8;
const __VLS_193 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({
    ...{ class: "py-2 flex-nowrap overflow-x-auto no-gutters progress-labels" },
}));
const __VLS_195 = __VLS_194({
    ...{ class: "py-2 flex-nowrap overflow-x-auto no-gutters progress-labels" },
}, ...__VLS_functionalComponentArgsRest(__VLS_194));
__VLS_196.slots.default;
for (const [label, index] of __VLS_getVForSourceType((__VLS_ctx.progressLabels))) {
    const __VLS_197 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197({
        key: (index),
        cols: "auto",
        ...{ class: "d-flex justify-center" },
    }));
    const __VLS_199 = __VLS_198({
        key: (index),
        cols: "auto",
        ...{ class: "d-flex justify-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_198));
    __VLS_200.slots.default;
    const __VLS_201 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
        ...{ 'onClick': {} },
        size: "small",
        variant: "text",
        ...{ class: "text-capitalize px-2" },
    }));
    const __VLS_203 = __VLS_202({
        ...{ 'onClick': {} },
        size: "small",
        variant: "text",
        ...{ class: "text-capitalize px-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_202));
    let __VLS_205;
    let __VLS_206;
    let __VLS_207;
    const __VLS_208 = {
        onClick: (...[$event]) => {
            __VLS_ctx.onLabelClick(label);
        }
    };
    __VLS_204.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-subtitle-2 text-grey-darken-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption" },
    });
    (label);
    var __VLS_204;
    var __VLS_200;
}
var __VLS_196;
const __VLS_209 = {}.VCardSubtitle;
/** @type {[typeof __VLS_components.VCardSubtitle, typeof __VLS_components.vCardSubtitle, typeof __VLS_components.VCardSubtitle, typeof __VLS_components.vCardSubtitle, ]} */ ;
// @ts-ignore
const __VLS_210 = __VLS_asFunctionalComponent(__VLS_209, new __VLS_209({
    ...{ class: "text-caption text-grey px-4" },
}));
const __VLS_211 = __VLS_210({
    ...{ class: "text-caption text-grey px-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_210));
__VLS_212.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#",
    ...{ class: "ml-1 font-weight-medium" },
});
var __VLS_212;
const __VLS_213 = {}.VCardActions;
/** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
// @ts-ignore
const __VLS_214 = __VLS_asFunctionalComponent(__VLS_213, new __VLS_213({
    ...{ class: "px-4 pt-2 d-flex justify-space-between" },
}));
const __VLS_215 = __VLS_214({
    ...{ class: "px-4 pt-2 d-flex justify-space-between" },
}, ...__VLS_functionalComponentArgsRest(__VLS_214));
__VLS_216.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "d-flex align-center text-caption text-grey-darken-1" },
});
const __VLS_217 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({
    icon: true,
    size: "small",
    ...{ class: "mr-1" },
}));
const __VLS_219 = __VLS_218({
    icon: true,
    size: "small",
    ...{ class: "mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_218));
__VLS_220.slots.default;
const __VLS_221 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_222 = __VLS_asFunctionalComponent(__VLS_221, new __VLS_221({}));
const __VLS_223 = __VLS_222({}, ...__VLS_functionalComponentArgsRest(__VLS_222));
__VLS_224.slots.default;
var __VLS_224;
var __VLS_220;
const __VLS_225 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
const __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
    icon: true,
    size: "small",
    ...{ class: "ml-4 mr-1" },
}));
const __VLS_227 = __VLS_226({
    icon: true,
    size: "small",
    ...{ class: "ml-4 mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_226));
__VLS_228.slots.default;
const __VLS_229 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({}));
const __VLS_231 = __VLS_230({}, ...__VLS_functionalComponentArgsRest(__VLS_230));
__VLS_232.slots.default;
var __VLS_232;
var __VLS_228;
const __VLS_233 = {}.VIcon;
/** @type {[typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ]} */ ;
// @ts-ignore
const __VLS_234 = __VLS_asFunctionalComponent(__VLS_233, new __VLS_233({
    ...{ class: "ml-4 mr-1" },
    size: "18",
}));
const __VLS_235 = __VLS_234({
    ...{ class: "ml-4 mr-1" },
    size: "18",
}, ...__VLS_functionalComponentArgsRest(__VLS_234));
__VLS_236.slots.default;
var __VLS_236;
(__VLS_ctx.job.date);
var __VLS_216;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-2']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-capitalize']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-body-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['job-title']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey-darken-1']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['no-gutters']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-labels']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-capitalize']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey-darken-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-weight-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['text-grey-darken-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            isFavorite: isFavorite,
            updateStatus: updateStatus,
            toggleFavorite: toggleFavorite,
            handleAction: handleAction,
            progressLabels: progressLabels,
            onLabelClick: onLabelClick,
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
