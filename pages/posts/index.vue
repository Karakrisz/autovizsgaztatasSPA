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
          <div class="blog-container">
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

<style scoped>
.blog-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.blog-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.blog-container__Nuxtlink {
  display: block;
  text-decoration: none;
  color: inherit;
}

.blog-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-card__image {
  transform: scale(1.05);
}

.blog-card__title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.blog-card__description {
  padding: 0 1rem 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

/* Tablet styles */
@media (max-width: 768px) {
  .blog-container {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    padding: 0.5rem;
  }
  
  .blog-card__image {
    height: 180px;
  }
  
  .blog-card__title {
    font-size: 1.1rem;
  }
  
  .blog-card__description {
    font-size: 0.85rem;
  }
}

/* Mobile styles */
@media (max-width: 480px) {
  .blog-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.5rem;
  }
  
  .blog-card__image {
    height: 160px;
  }
  
  .blog-card__title {
    font-size: 1rem;
    margin: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .blog-card__description {
    padding: 0 0.75rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .sales-content__elem__h5 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

/* Extra small screens */
@media (max-width: 320px) {
  .blog-container {
    padding: 0.25rem;
  }
  
  .blog-card__image {
    height: 140px;
  }
  
  .blog-card__title {
    font-size: 0.95rem;
  }
  
  .blog-card__description {
    font-size: 0.75rem;
  }
}
</style>