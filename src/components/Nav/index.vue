<template>
    <div class="nav">
        <div class="options">
            <div class="more iconfont icon-category" />
            <div class="search">
                <van-search
                    v-model="searchContent"
                    left-icon=""
                    placeholder="请输入搜索关键词"
                    shape="round"
                    background="transparent"
                    clearable
                />
            </div>
        </div>
        <div slot="search-result" />
        <div class="fold-option">
            <i class="iconfont icon-down" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import { ISuggestItem } from "@/components/Nav/const";

const props = defineProps({
    canFold: {
        type: Boolean,
        default: false
    },
    suggest: {
        type: Array,
        default: () => [] as ISuggestItem[]
    }
})

const emit = defineEmits(['search', 'more', 'fold', 'spread']);

const foldStatus = ref(false);
const searchContent = ref('');

</script>

<style scoped lang="less">
.nav {
    display: flex;
    background-color: rgba(37, 38, 45, 1);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    flex-direction: column;
    padding: 6px 12px 8px;

    .options {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .more {
            display: inline-flex;
            font-size: 12px;
            padding: 4px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: rgba(255,255,255, 0.6);
        }

        .search {
            display: inline-flex;
        }
    }

    .fold-option {
        display: inline-flex;
        justify-content: center;
        flex-direction: row;
    }

}
</style>
