<script setup lang="ts">
import { fetchPosts, truncateContent } from '~/utils/js/utils'

const itemsPost = await fetchPosts()
</script>

<template>
  <section>
    <div class="sales-content">
      <div class="sales-content__elem sales-content__elem--margin-0 text-center position-relative bg-color-w">
        <h5 class="sales-content__elem__h5 f-700">BLOG</h5>
        <div class="sales-content__elem__linkBox bg-color-w">
          <!-- Blog container -->
          <div class="blog-container d-flex">
            <div v-for="post in itemsPost" :key="post.slug" class="blog-card">
              <NuxtLink
                class="blog-container__Nuxtlink"
                :to="`/posts/${post.slug}`"
              >
                <NuxtImg
                  :src="`${$config.public.apiBaseUrl}/public/storage/${post.image}`"
                  :alt="post.title"
                  class="blog-card__image"
                />
                <h6 class="blog-card__title text-color">{{ post.title }}</h6>
                <p
                  class="blog-card__description text-color"
                  v-html="truncateContent(post.body, 100)"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
