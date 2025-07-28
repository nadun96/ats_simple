import { City } from 'country-state-city';
import { computed } from 'vue';
import { CdDropdown } from '../atoms';
const props = defineProps();
const emit = defineEmits();
const localValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
});
// Generate city data dynamically based on country
const cityData = computed(() => {
    const cities = City.getCitiesOfCountry(props.selectedCountryCode) || [];
    return cities.map((city) => ({
        value: city.name,
        displayValue: city.name,
    }));
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CdDropdown;
/** @type {[typeof __VLS_components.CdDropdown, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    label: (__VLS_ctx.label),
    required: (__VLS_ctx.required),
    modelValue: (__VLS_ctx.localValue),
    options: (__VLS_ctx.cityData),
    disabled: (props.disabled),
}));
const __VLS_2 = __VLS_1({
    label: (__VLS_ctx.label),
    required: (__VLS_ctx.required),
    modelValue: (__VLS_ctx.localValue),
    options: (__VLS_ctx.cityData),
    disabled: (props.disabled),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CdDropdown: CdDropdown,
            localValue: localValue,
            cityData: cityData,
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
