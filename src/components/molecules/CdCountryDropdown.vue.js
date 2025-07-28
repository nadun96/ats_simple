import { computed, ref } from 'vue';
import { Country } from 'country-state-city';
const countries = Country.getAllCountries();
const countryData = computed(() => countries.map((country) => ({
    displayValue: country.name,
    value: country.isoCode
})));
const props = defineProps();
const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);
import { watch } from 'vue';
import { CdDropdown } from '../atoms';
watch(() => props.modelValue, (newVal) => {
    localValue.value = newVal;
});
watch(localValue, (newVal) => {
    emit('update:modelValue', newVal);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.CdDropdown;
/** @type {[typeof __VLS_components.CdDropdown, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    label: "Country",
    required: (true),
    modelValue: (__VLS_ctx.localValue),
    options: (__VLS_ctx.countryData),
}));
const __VLS_2 = __VLS_1({
    label: "Country",
    required: (true),
    modelValue: (__VLS_ctx.localValue),
    options: (__VLS_ctx.countryData),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            countryData: countryData,
            localValue: localValue,
            CdDropdown: CdDropdown,
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
