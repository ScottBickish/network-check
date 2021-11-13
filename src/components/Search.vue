<template>
  <div class="search-component">
    <form @submit.prevent="search" class="bg-white rounded elevation-1">
      <div class="form-group d-flex align-items-center">
        <label for="search"></label>
        <input
          v-model="query"
          type="text"
          name="search"
          required
          class="form-control bg-white border-0"
          placeholder="search"
        />
        <button class="btn px-2 py-0" type="submit">
          <i class="mdi mdi-magnify f-18"></i>
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const query = ref("");
    return {
      query,
      posts: computed(() => AppState.posts),
      async search() {
        try {
          await postsService.search(query.value);
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>