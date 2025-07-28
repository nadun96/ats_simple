import { ref, watch } from 'vue';
export default await (async () => {
    const props = defineProps();
    const emit = defineEmits(['update:visible', 'create']);
    const newName = ref('');
    const localVisible = ref(props.visible);
    watch(() => props.visible, val => localVisible.value = val);
    watch(localVisible, val => emit('update:visible', val));
    const cancel = () => {
        localVisible.value = false;
        newName.value = '';
    };
    const create = () => {
        if (newName.value.trim()) {
            emit('create', newName.value.trim());
            localVisible.value = false;
            newName.value = '';
        }
    };
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.VDialog;
    /** @type {[typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, typeof __VLS_components.VDialog, typeof __VLS_components.vDialog, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        modelValue: (__VLS_ctx.localVisible),
        maxWidth: "400",
    }));
    const __VLS_2 = __VLS_1({
        modelValue: (__VLS_ctx.localVisible),
        maxWidth: "400",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    __VLS_3.slots.default;
    const __VLS_5 = {}.VCard;
    /** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
    const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    const __VLS_9 = {}.VCardTitle;
    /** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        ...{ class: "text-h6 font-weight-bold" },
    }));
    const __VLS_11 = __VLS_10({
        ...{ class: "text-h6 font-weight-bold" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    __VLS_12.slots.default;
    var __VLS_12;
    const __VLS_13 = {}.VCardText;
    /** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_16.slots.default;
    const __VLS_17 = {}.VTextField;
    /** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        modelValue: (__VLS_ctx.newName),
        label: "Name",
        variant: "outlined",
        required: true,
    }));
    const __VLS_19 = __VLS_18({
        modelValue: (__VLS_ctx.newName),
        label: "Name",
        variant: "outlined",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    var __VLS_16;
    const __VLS_21 = {}.VCardActions;
    /** @type {[typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, typeof __VLS_components.VCardActions, typeof __VLS_components.vCardActions, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ class: "justify-end" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "justify-end" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    const __VLS_25 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ 'onClick': {} },
        variant: "text",
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onClick': {} },
        variant: "text",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_29;
    let __VLS_30;
    let __VLS_31;
    const __VLS_32 = {
        onClick: (__VLS_ctx.cancel)
    };
    __VLS_28.slots.default;
    var __VLS_28;
    const __VLS_33 = {}.VBtn;
    /** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        ...{ 'onClick': {} },
        color: "primary",
    }));
    const __VLS_35 = __VLS_34({
        ...{ 'onClick': {} },
        color: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    let __VLS_37;
    let __VLS_38;
    let __VLS_39;
    const __VLS_40 = {
        onClick: (__VLS_ctx.create)
    };
    __VLS_36.slots.default;
    var __VLS_36;
    var __VLS_24;
    var __VLS_8;
    var __VLS_3;
    /** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                newName: newName,
                localVisible: localVisible,
                cancel: cancel,
                create: create,
            };
        },
        emits: {},
        __typeProps: {},
        name: 'NewViewDialog'
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        emits: {},
        __typeProps: {},
        name: 'NewViewDialog'
    });
})(); /* PartiallyEnd: #4569/main.vue */
