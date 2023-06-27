<template>
    <div class="applicationList">
        <div
            v-for="(item) in handleAppListInfo"
            :key="item.path"
            class="appItem"
            :style="item.customStyle"
            :onClick="()=>toApp(item)"
        >
            {{ item.title }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, useSlots, computed, CSSProperties } from 'vue';
import { APP_LIST_INFO, IAppItemInfo } from "./const";
import { useRouter } from "vue-router";

const slot = useSlots();

const props = defineProps({
    canFold: {
        type: Boolean,
        default: false
    },
})

const appListInfo = ref<IAppItemInfo[]>(APP_LIST_INFO);
const router = useRouter();

const handleAppListInfo = computed<(IAppItemInfo & {customStyle: CSSProperties})[]>(() => {
    const nowRouterPath = router.currentRoute.value.name.toString();
    return appListInfo.value.map((item) => {
        const isActive = nowRouterPath.includes(item.path);
        return {
            ...item,
            active: isActive,
            customStyle: {
                backgroundColor: isActive ? 'transparent' :item.bgColor,
                border: isActive ? `1px solid ${item.activeColor}` : undefined,
                color: isActive ? item.activeColor : undefined
            }
        }
    })
})

const toApp = (item: IAppItemInfo) => {
    router.push(`/${item.path}`);
}


</script>

<style scoped lang="less">
.applicationList {
    display: flex;
    flex-direction: row;
    //border: 1px solid;
    //border-image: -webkit-linear-gradient(right, white, rgba(255, 255, 255, 0.4));
    //border-image-slice: 10;
    //border-image-width: 1;
    justify-content: space-between;
    padding: 6px;
    border-radius: 8px;
    overflow: hidden;

    .appItem {
        display: inline-flex;
        border-radius: 4px;
        height: 46px;
        align-items: center;
        font-size: 12px;
        padding: 0 6px;
        flex: 1;
        margin-right: 12px;
        color: white;

        &:last-child {
            margin-right: 0;
        }

        &.active {

        }
    }
}
</style>
