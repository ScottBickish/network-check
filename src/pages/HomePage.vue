// NOTE account is the logged in user

<template>
  <div class="d-flex justify-content-between">
    <div class="m-3">
      <Search />
    </div>
    <div class="text-end" v-if="account.id">
      <button
        class="mdi mdi-plus bg-success m-3"
        data-bs-toggle="modal"
        data-bs-target="#PostForm"
      ></button>
    </div>
  </div>

  <Modal id="PostForm">
    <template #modal-title> What's on your mind? </template>

    <template #modal-body> <PostForm /> </template>
  </Modal>
  <span>
    <span v-if="state.older">
      <button @click="getPage(state.older)" class="btn btn-warning ms-2">
        Older
      </button>
    </span>
    <span v-if="state.newer">
      <button @click="getNewer(state.newer)" class="btn btn-danger ms-2">
        Newer
      </button>
    </span>
  </span>

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
  <div>
    <div class="mt-2">
      <!--      
        class="btn me-1 text-white selectable"
        :class="{
          'btn-primary': page === totalPages,
          'btn-dark': page !== totalPages,
        }"
        :disabled="page === totalPages" -->
    </div>
  </div>
</template>





<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { extrasService } from "../services/ExtrasService";
import { accountService } from "../services/AccountService";
export default {
  name: "Home",
  setup() {
    const state = reactive({
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
    });
    onMounted(async () => {
      try {
        AppState.page = 1;
        await accountService.getAccount();
        await postsService.getAll();
        await extrasService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error with something...");
      }
    });

    return {
      state,
      posts: computed(() => AppState.posts),
      extras: computed(() => AppState.extras),
      account: computed(() => AppState.account),

      profile: computed(() => AppState.profiles),
      async getPage(url) {
        try {
          await postsService.getPage(url);
        } catch (error) {
          logger.error(error);
        }
      },
      async getNewer(url) {
        try {
          await postsService.getNewer(url);
        } catch (error) {
          logger.error(error);
        }
      },
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
