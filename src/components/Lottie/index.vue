<template>
    <div class="lottieAnimationItem" ref="animation" :style="{ width, height }"></div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, watch } from 'vue'

import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'
import { changeLottieColor, ELottieType, LOTTIE_MAP } from "./const";
import { requireFile } from "@/utils/files";
import request from "@/api/request";

export default defineComponent({
    name: 'Lottie',
    props: {
        width: {
            type: String,
            default: '100px',
        },
        height: {
            type: String,
            default: '100px',
        },
        type: {
            type: Number,
        },
        color: {
            type: String,
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
        loop: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        let animation = ref<Element | null>(null);
        let lottieInstantiation = ref<AnimationItem | null>(null);

        const initLottieInstantiation = async () => {
            if (!animation.value || !props.type || !LOTTIE_MAP[props.type as ELottieType]) return;
            if (lottieInstantiation) lottieInstantiation.value?.destroy();
            const sourceUrl = requireFile(LOTTIE_MAP[props.type as ELottieType], import.meta.url);
            const data = await request.get(sourceUrl);
            const handleData = props.color ? changeLottieColor(data, props.color) : data;
            lottieInstantiation.value = lottie.loadAnimation({
                container: animation.value as Element,
                renderer: "svg",
                loop: props.loop,
                autoplay: props.autoplay,
                animationData: handleData,
            })
        }

        watch(() => props.type, initLottieInstantiation);
        watch(() => props.color, initLottieInstantiation);

        onMounted(() => animation.value && initLottieInstantiation());

        return {
            animation
        }
    }
})


</script>

<style lang="less" scoped>
.lottieAnimationItem {
}
</style>

