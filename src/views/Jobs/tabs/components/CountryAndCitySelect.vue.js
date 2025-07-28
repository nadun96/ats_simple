import { CdCityDropdown, CdCountryDropdown } from '@/components/molecules';
import { ref, watch } from 'vue';
// Country & city model values
const selectedCountryCode = ref('IN'); // Default: India
const selectedCity = ref('');
const isRemote = ref(false);
watch([selectedCountryCode, selectedCity], ([newCountry, newCity]) => {
    console.log('Selected Country Code:', newCountry);
    console.log('Selected City:', newCity);
});
watch(isRemote, (newVal) => {
    if (newVal) {
        selectedCity.value = '';
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    cols: "5",
}));
const __VLS_7 = __VLS_6({
    cols: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.CdCountryDropdown;
/** @type {[typeof __VLS_components.CdCountryDropdown, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    label: "Country",
    required: (true),
    modelValue: (__VLS_ctx.selectedCountryCode),
}));
const __VLS_11 = __VLS_10({
    label: "Country",
    required: (true),
    modelValue: (__VLS_ctx.selectedCountryCode),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
var __VLS_8;
const __VLS_13 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    cols: "5",
}));
const __VLS_15 = __VLS_14({
    cols: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.CdCityDropdown;
/** @type {[typeof __VLS_components.CdCityDropdown, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    label: "City",
    required: (true),
    selectedCountryCode: (__VLS_ctx.selectedCountryCode),
    modelValue: (__VLS_ctx.selectedCity),
    disabled: (__VLS_ctx.isRemote),
}));
const __VLS_19 = __VLS_18({
    label: "City",
    required: (true),
    selectedCountryCode: (__VLS_ctx.selectedCountryCode),
    modelValue: (__VLS_ctx.selectedCity),
    disabled: (__VLS_ctx.isRemote),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
var __VLS_16;
const __VLS_21 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    cols: "2",
    ...{ class: "pt-8 px-0" },
}));
const __VLS_23 = __VLS_22({
    cols: "2",
    ...{ class: "pt-8 px-0" },
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
__VLS_24.slots.default;
const __VLS_25 = {}.VCheckbox;
/** @type {[typeof __VLS_components.VCheckbox, typeof __VLS_components.vCheckbox, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    label: "Remote",
    modelValue: (__VLS_ctx.isRemote),
}));
const __VLS_27 = __VLS_26({
    label: "Remote",
    modelValue: (__VLS_ctx.isRemote),
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_24;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CdCityDropdown: CdCityDropdown,
            CdCountryDropdown: CdCountryDropdown,
            selectedCountryCode: selectedCountryCode,
            selectedCity: selectedCity,
            isRemote: isRemote,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
