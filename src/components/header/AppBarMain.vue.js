import { ref, onMounted, onUnmounted } from 'vue';
import CreateButton from '@/components/header/CreateButton.vue';
import NavigationItems from '@/components/header/NavigationItems.vue';
import RightSideicons from '@/components/header/HeaderRightSideIcons.vue';
import ToolBarTitle from '@/components/header/ToolBarTitle.vue';
import MobileMenu from '@/components/header/MobileMenu.vue';
import { defineComponent } from 'vue';
export default await (async () => {
    const emit = defineEmits();
    // Reactive variable to track screen size
    const isDesktop = ref(false);
    // Function to check if screen is desktop size
    const checkScreenSize = () => {
        isDesktop.value = window.innerWidth >= 1024; // Desktop breakpoint
    };
    // Set up screen size tracking
    onMounted(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', checkScreenSize);
    });
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    const __VLS_componentsOption = {
        CreateButton,
        NavigationItems,
        RightSideicons,
        ToolBarTitle,
        MobileMenu
    };
    let __VLS_components;
    let __VLS_directives;
    const __VLS_0 = {}.VAppBar;
    /** @type {[typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, typeof __VLS_components.VAppBar, typeof __VLS_components.vAppBar, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        color: "primary",
        dark: true,
        elevation: "2",
        height: "56",
        app: true,
    }));
    const __VLS_2 = __VLS_1({
        color: "primary",
        dark: true,
        elevation: "2",
        height: "56",
        app: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    __VLS_3.slots.default;
    const __VLS_5 = {}.VContainer;
    /** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        fluid: true,
        ...{ class: "d-flex align-center px-2 px-md-4" },
    }));
    const __VLS_7 = __VLS_6({
        fluid: true,
        ...{ class: "d-flex align-center px-2 px-md-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    /** @type {[typeof MobileMenu, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(MobileMenu, new MobileMenu({
        ...{ 'onToggleDrawer': {} },
        ...{ class: "d-flex d-md-none mr-2" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onToggleDrawer': {} },
        ...{ class: "d-flex d-md-none mr-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onToggleDrawer: (...[$event]) => {
            __VLS_ctx.$emit('toggle-drawer');
        }
    };
    var __VLS_11;
    /** @type {[typeof ToolBarTitle, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(ToolBarTitle, new ToolBarTitle({
        ...{ class: "mr-2 mr-md-4" },
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "mr-2 mr-md-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    if (__VLS_ctx.isDesktop) {
        /** @type {[typeof CreateButton, ]} */ ;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(CreateButton, new CreateButton({
            ...{ class: "mr-2" },
        }));
        const __VLS_20 = __VLS_19({
            ...{ class: "mr-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    }
    /** @type {[typeof NavigationItems, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(NavigationItems, new NavigationItems({
        ...{ class: "d-none d-md-flex" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "d-none d-md-flex" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    const __VLS_25 = {}.VSpacer;
    /** @type {[typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, typeof __VLS_components.VSpacer, typeof __VLS_components.vSpacer, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    /** @type {[typeof RightSideicons, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(RightSideicons, new RightSideicons({
        ...{ class: "d-none d-sm-flex" },
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "d-none d-sm-flex" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    var __VLS_8;
    var __VLS_3;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-md-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-md-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-md-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-md-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['d-sm-flex']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                CreateButton: CreateButton,
                NavigationItems: NavigationItems,
                RightSideicons: RightSideicons,
                ToolBarTitle: ToolBarTitle,
                MobileMenu: MobileMenu,
                isDesktop: isDesktop,
            };
        },
        __typeEmits: {},
        name: 'AppBarMain',
        components: {
            CreateButton,
            NavigationItems,
            RightSideicons,
            ToolBarTitle,
            MobileMenu
        }
    });
    return defineComponent({
        setup() {
            return {};
        },
        __typeEmits: {},
        name: 'AppBarMain',
        components: {
            CreateButton,
            NavigationItems,
            RightSideicons,
            ToolBarTitle,
            MobileMenu
        }
    });
})(); /* PartiallyEnd: #4569/main.vue */
