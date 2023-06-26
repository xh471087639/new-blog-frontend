<template>
    <div class="lottieAnimationItem" ref="animation" :style="{ width, height }"></div>
</template>

<script>

import { defineComponent, ref, onMounted, watch } from 'vue'

import lottie, { AnimationItem } from 'lottie-web'
import { changeLottieColor, LOTTIE_MAP } from "./const";
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
            type: [Number, null],
            default: null,
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
        let animation = ref(null);
        let lottieInstantiation = ref<AnimationItem>(null);

        const initLottieInstantiation = async () => {
            if (lottieInstantiation) lottieInstantiation.destroy();
            const sourceUrl = requireFile(LOTTIE_MAP[props.type], import.meta.url);
            const data = await request.get(sourceUrl);
            const handleData = props.color ? changeLottieColor(data, props.color) : data;
            lottieInstantiation = lottie.loadAnimation({
                container: animation.value,
                renderer: "svg",
                loop: props.loop,
                autoplay: props.autoplay,
                animationData: handleData,
            })
        }

        watch(props.type, initLottieInstantiation);
        watch(props.color, () => lottieInstantiation && changeLottieColor(lottieInstantiation, props.color));

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

