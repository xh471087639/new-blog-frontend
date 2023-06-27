<template>
    <div class="home">
        <div class="homeNav">
            <Nav class="navBody" />
        </div>
        <div class="blogList">
            <van-pull-refresh class="van-pull-refresh" v-model="loading" :onRefresh="()=>initBlogPageInfo(true)">
                <div class="blogListContent">
                    <BlogCard v-for="(item) in blogCardList" :blogInfo="item" />
                    <div class="noMore">没有更多了</div>
                </div>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup lang="ts">
import Nav from '@/components/Nav/index.vue';
import { onMounted, ref } from "vue";
import { getBlogListInfo, IBlogItem } from "./const";
import BlogCard from "./components/BlogCard.vue";


const blogCardList = ref<IBlogItem[]>([]);
const currentPage = ref(1);
const loading = ref(false);

const initBlogPageInfo = async (reset?: boolean) => {
    if (reset){
        currentPage.value = 1;
        blogCardList.value = [];
    }
    loading.value = true;
    const res = await getBlogListInfo(currentPage.value);
    loading.value = false;
    blogCardList.value = [...blogCardList.value, ...res.data];
}

onMounted(() => {
    initBlogPageInfo();
})

</script>

<style scoped lang="less">
.home{
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    flex-direction: column;
    .homeNav,
    .navBody{
        display: inline-flex;
        width: 100%;
    }
    .blogList{
        display: inline-flex;
        flex: 1;
        flex-direction: column;
    }
    .van-pull-refresh{
        height: 100%;
    }
    .blogListContent{
        display: inline-flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        .noMore{
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            font-size: 14px;
            color: #969799;
        }
    }
}

</style>
