<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
    <div class="col-md-4">
      <Extras />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { extrasService } from "../services/ExtrasService";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error with something...");
      }
    });
    onMounted(async () => {
      try {
        await extrasService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "something went wrong...");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      extras: computed(() => AppState.extras),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
