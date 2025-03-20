<script setup lang="ts">
  import { fetchPosts, truncateContent } from '~/utils/js/utils'

  const itemsPost = await fetchPosts()
</script>

<template>
  <section class="py-10 text-white bg-black">
    <div class="container flex flex-col">
      <h2
        class="max-w-3xl pb-4 uppercase text-[32px] font-extrabold font-shoulders"
      >
        Blog
      </h2>

      <div
        class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
      >
        <div
          v-for="post in itemsPost"
          :key="post.slug"
          class="page-information-content__blog-content__gBox__iTextBox"
        >
          <NuxtLink
            class="blog-box__link-box__Nuxtlink"
            :to="`/posts/${post.slug}`"
          >
            <NuxtImg
              height="100%"
              loading="lazy"
              class="page-information-content__blog-content__gBox__iTextBox__img"
              :src="`${$config.public.apiBaseUrl}/storage/${post.image}`"
              alt="{{ post.title }}"
            />
            <div
              class="page-information-content__blog-content__gBox__iTextBox__tBox"
            >
              <h4
                class="page-information-content__blog-content__gBox__iTextBox__tBox__h4 text-2xl text-white uppercase font-teko"
              >
                {{ post.title }}
              </h4>
              <p
                class="page-information-content__blog-content__gBox__iTextBox__tBox__p"
                v-html="truncateContent(post.body, 230)"
              ></p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
