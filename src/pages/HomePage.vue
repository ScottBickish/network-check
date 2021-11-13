<template>
  <div class="text-end">
    <!-- v-if="account.id === profile.id" -->
    <button
      class="mdi mdi-plus bg-success m-3"
      data-bs-toggle="modal"
      data-bs-target="#PostForm"
    ></button>
  </div>

  <Modal id="PostForm">
    <template #modal-title> What's on your mind? </template>

    <template #modal-body> <PostForm /> </template>
  </Modal>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-for="p in posts" :key="p.id">
          <Post :post="p" />
        </div>
      </div>
      <div class="col-md-4">
        <div v-for="e in extras" :key="e.title">
          <Extras :extra="e" />
        </div>
      </div>
    </div>
  </div>
</template>
// TODO get posts to work almost there!!
// TODO get likes to work
// NOTE check out arts service for profile get..

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
        await extrasService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error with something...");
      }
    });
    // onMounted(async () => {
    //   try {

    //   } catch (error) {
    //     logger.error(error);
    //     Pop.toast(error.message, "something went wrong...");
    //   }
    // });
    return {
      posts: computed(() => AppState.posts),
      extras: computed(() => AppState.extras),
      account: computed(() => AppState.account),
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
