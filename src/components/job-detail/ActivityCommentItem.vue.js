export default (await import('vue')).defineComponent({
    name: "ActivityCommentItem",
    props: {
        comment: Object,
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "activity-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "avatar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "details" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.comment.user);
(__VLS_ctx.comment.action);
__VLS_asFunctionalElement(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({});
(__VLS_ctx.comment.date);
if (__VLS_ctx.comment.attachments?.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "comment-attachments" },
    });
    for (const [file, index] of __VLS_getVForSourceType((__VLS_ctx.comment.attachments))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (index),
            ...{ class: "attached-file" },
        });
        (file);
    }
}
/** @type {__VLS_StyleScopedClasses['activity-item']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['details']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-attachments']} */ ;
/** @type {__VLS_StyleScopedClasses['attached-file']} */ ;
var __VLS_dollars;
let __VLS_self;
