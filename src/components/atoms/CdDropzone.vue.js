import { onMounted } from 'vue';
import { Events, FileUploadWithPreview } from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/style.css';
import { CdLabel } from '.';
const props = defineProps();
onMounted(() => {
    new FileUploadWithPreview(props.dropzoneId);
});
window.addEventListener(Events.IMAGE_ADDED, (e) => {
    const { detail } = e;
    console.log('detail', detail);
});
window.addEventListener(Events.CLEAR_BUTTON_CLICKED, (e) => {
    const { detail } = e;
    console.log('Clear button clicked:', detail);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.label) {
    const __VLS_0 = {}.CdLabel;
    /** @type {[typeof __VLS_components.CdLabel, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        label: (__VLS_ctx.label),
        required: (__VLS_ctx.required),
    }));
    const __VLS_2 = __VLS_1({
        label: (__VLS_ctx.label),
        required: (__VLS_ctx.required),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "custom-file-container" },
    'data-upload-id': (__VLS_ctx.dropzoneId),
});
/** @type {__VLS_StyleScopedClasses['custom-file-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CdLabel: CdLabel,
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
