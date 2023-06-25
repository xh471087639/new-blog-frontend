<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="app-shell">
        <RouterView />
        <div class="iconfont-load"/>
    </div>
</template>

<style lang="less" scoped>
.app-shell{
    width: 100vw;
    overflow: hidden;
}
</style>
