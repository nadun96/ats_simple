import { ref } from 'vue';
import ActivityCommentItem from './ActivityCommentItem.vue';
defineOptions({ name: 'ActivitiesTab' }); // Optional but good for debugging
// Reactive state
const commentText = ref('');
const attachedFiles = ref([]);
const fileInput = ref(null);
const activityList = ref([
    {
        user: 'Shamika',
        action: 'joined recruiting',
        date: 'Jul 12, 2025',
    },
    {
        user: 'Nadun',
        action: 'created the recruitment',
        date: 'Jul 12, 2025',
    },
]);
// Methods
const triggerFileUpload = () => {
    fileInput.value.click();
};
const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    attachedFiles.value.push(...files);
    event.target.value = null; // Reset file input
};
const removeAttachment = (index) => {
    attachedFiles.value.splice(index, 1);
};
const triggerEmojiPicker = () => {
    alert('Emoji picker not implemented.');
};
const submitComment = () => {
    if (!commentText.value.trim())
        return;
    const newComment = {
        user: 'You',
        action: commentText.value,
        date: new Date().toDateString(),
        attachments: attachedFiles.value.map((f) => f.name),
    };
    activityList.value.unshift(newComment);
    commentText.value = '';
    attachedFiles.value = [];
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['file-tag']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "activities-tab" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "activity-input-box" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({
    value: (__VLS_ctx.commentText),
    placeholder: "Write a comment...",
    rows: "3",
    ...{ class: "activity-textarea" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "attachments" },
});
for (const [file, index] of __VLS_getVForSourceType((__VLS_ctx.attachedFiles))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "file-tag" },
    });
    (file.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removeAttachment(index);
            } },
        ...{ class: "remove" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.triggerFileUpload) },
    ...{ class: "icon-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.triggerEmojiPicker) },
    ...{ class: "icon-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.triggerFileUpload) },
    ...{ class: "icon-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (__VLS_ctx.handleFileChange) },
    type: "file",
    ref: "fileInput",
    multiple: true,
    ...{ style: {} },
});
/** @type {typeof __VLS_ctx.fileInput} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.submitComment) },
    ...{ class: "send-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "activity-feed" },
});
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.activityList))) {
    /** @type {[typeof ActivityCommentItem, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ActivityCommentItem, new ActivityCommentItem({
        key: (index),
        comment: (item),
    }));
    const __VLS_1 = __VLS_0({
        key: (index),
        comment: (item),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {__VLS_StyleScopedClasses['activities-tab']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-input-box']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-textarea']} */ ;
/** @type {__VLS_StyleScopedClasses['attachments']} */ ;
/** @type {__VLS_StyleScopedClasses['file-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['remove']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['icon-button']} */ ;
/** @type {__VLS_StyleScopedClasses['send-button']} */ ;
/** @type {__VLS_StyleScopedClasses['activity-feed']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ActivityCommentItem: ActivityCommentItem,
            commentText: commentText,
            attachedFiles: attachedFiles,
            fileInput: fileInput,
            activityList: activityList,
            triggerFileUpload: triggerFileUpload,
            handleFileChange: handleFileChange,
            removeAttachment: removeAttachment,
            triggerEmojiPicker: triggerEmojiPicker,
            submitComment: submitComment,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
