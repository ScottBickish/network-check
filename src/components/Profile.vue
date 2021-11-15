<template>
  <Modal id="ProfileForm">
    <template #modal-title> Create or Edit your profile here! </template>

    <template #modal-body> <ProfileForm /> </template>
  </Modal>
  <div class="text-end" v-if="account.id === profile.id">
    <center>
      <button
        title="update profile"
        class="mdi mdi-plus bg-primary m-3"
        data-bs-toggle="modal"
        data-bs-target="#ProfileForm"
      ></button>
      <button
        class="mdi mdi-plus bg-success m-3"
        data-bs-toggle="modal"
        data-bs-target="#PostForm"
        title="make a post"
      ></button>

      <Modal id="PostForm">
        <template #modal-title> What's on your mind? </template>

        <template #modal-body> <PostForm /> </template>
      </Modal>
    </center>
  </div>
  <center>
    <div class="text center">
      <h1>Welcome to {{ profile.name }}'s profile page!</h1>
    </div>
  </center>
  <span>
    <span v-if="state.older">
      <button @click="getPage(state.older)" class="btn btn-warning m-3">
        Older
      </button>
    </span>
    <span v-if="state.newer">
      <button @click="getNewer(state.newer)" class="btn btn-danger m-3">
        Newer
      </button>
    </span>
  </span>

  <div class="d-flex justify-content-between">
    <div class="col-md-3 card elevation-2 rounded m-1 height">
      <img class="rounded mt-2" :src="profile.coverImg" />
      <hr />
      <!-- NOTE if time fix the layout -->
      <div class="text-center">
        <p>{{ profile.class }}</p>
      </div>
      <div>
        <img class="mt-1 pic ms-2" :src="profile.picture" />

        <h5 v-if="profile.graduated" class="mdi mdi-school ms-2"></h5>

        <!-- <h5 v-else class="mdi mdi-BookOpenVariant"></h5> -->
      </div>
      <span
        ><h6 class="ms-2">{{ profile.name }}</h6></span
      >
      <p class="ms-2">Bio: {{ profile.bio }}</p>
      <p class="ms-2">Linkedin: {{ profile.linkedin }}</p>
      <p class="ms-2">Github: {{ profile.github }}</p>
    </div>
    <div class="col-md-6">
      <div v-for="p in propost.posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
    <div class="col-md-2">
      <div v-for="e in extras" :key="e.title">
        <Extras :extra="e" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, reactive } from "@vue/reactivity";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
    propost: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const state = reactive({
      newer: computed(() => AppState.newer),
      older: computed(() => AppState.older),
    });

    return {
      state,
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
      post: computed(() => AppState.posts),

      extras: computed(() => AppState.extras),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.pic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.fit {
  display: inline;
}
.height {
  height: 135vh;
}
</style>