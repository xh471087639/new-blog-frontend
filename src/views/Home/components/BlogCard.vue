<template>
    <div class="nav">
        <div class="options">
            <div class="more iconfont icon-all" :onclick="toAppList"/>
            <div class="search" :class="isFocus?'expend-width':''">
                <van-search
                    v-model="searchContent"
                    left-icon=""
                    placeholder="请输入搜索关键词"
                    shape="round"
                    background="transparent"
                    clearable
                    :onFocus="()=>changeFocusStatus(true)"
                    :onBlur="()=>changeFocusStatus(false)"
                    :onUpdate-modelValue="searchInput"
                />
            </div>
        </div>
        <transition name="expend">
            <div class="search-loading" v-show="isFocus">
                <Lottie class="lottie-loading" :type="lottieType" width="100%" height="80px" color="#fff" />
            </div>
        </transition>
        <transition name="expend">
            <van-swipe ref="swipe" :initial-swipe="Number(hasExtraContent)" v-show="!foldStatus" class="my-swipe" :autoplay="0" indicator-color="transparent">
                <van-swipe-item>
                    <ApplicationList />
                </van-swipe-item>
                <van-swipe-item v-if="hasExtraContent">
                    <div slot="extra-content" />
                </van-swipe-item>
            </van-swipe>
        </transition>
        <div class="fold-option" v-if="hasExtraContent || displayAppList" :onclick="()=>changeFoldStatus(!foldStatus)">
            <i class="iconfont icon-down" :class="foldStatus ? '':'trans180Deg'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, useSlots, computed } from 'vue';
import type { ISuggestItem } from "@/components/Nav/const";
import Lottie from "@/components/Lottie/index.vue";
import ApplicationList from "@/components/ApplicationList/index.vue";
import { ELottieType } from "@/components/Lottie/const";
import { SwipeInstance } from "vant";

const slot = useSlots();

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

let swipe = ref<SwipeInstance>();

const foldStatus = ref(false);
const searchContent = ref('');
const isFocus = ref(false);
const lottieType = ref(ELottieType.loading);
const displayAppList = ref(false);

const hasExtraContent = computed(() => Boolean(slot['extra-content']));

const changeFocusStatus = (value: boolean) => {
    isFocus.value = value;
};
const toAppList = () => {
    if (!swipe.value) return;
    swipe.value?.swipeTo(0);
};
const changeFoldStatus = (value: boolean) => {
    foldStatus.value = value;
};


const searchInput = () => {
    console.log('3333');
}


</script>

<style scoped lang="less">
.nav {
    display: flex;
    background-color: rgba(37, 38, 45, 1);
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    flex-direction: column;
    padding: 6px 12px 8px;

    .options {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .more {
            display: inline-flex;
            font-size: 28px;
            color: white;
            margin-right: 16px;
        }

        .search {
            display: inline-flex;
            justify-content: flex-end;
            transition: width ease 0.3s;
            width: 200px;

            &.expend-width {
                width: calc(100% - 40px);
            }

            /deep/ .van-search {
                width: 100%;

                .van-search__content {
                    border: 1px solid white;
                    background-color: transparent;

                    .van-field__control {
                        color: white;
                    }
                }
            }
        }
    }

    .search-loading {
        display: inline-flex;
        justify-content: center;
        position: relative;
        height: 24px;
        margin-top: 8px;
        overflow: hidden;

        .lottie-loading {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
        }
    }
    .app-shell{
        margin-top: 8px;
    }

    .fold-option {
        //.topHalfLine();
        margin-top: 12px;
        display: inline-flex;
        justify-content: center;
        flex-direction: row;
        color: white;

        &.trans180Deg {
            transform: rotate(180deg);
        }
    }

}


.expend-enter-active,
.expend-leave-active {
    transition: height ease 0.3s;
}

.expend-enter,
.expend-leave-to {
    height: 0;
}

.expend-enter-to,
.expend-leave {
    height: 164px;
}
</style>
