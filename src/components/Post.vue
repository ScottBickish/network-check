<template>
  <div class="post-component">
    <div class="card elevation-2 rounded m-2">
      <!-- FIXME this need to be converted to something more readable -->
      <div class="d-flex justify-content-between">
        <span class="mx-2">{{ post.creator.createdAt }}</span>
        <div v-if="account.id == post.creatorId">
          <span @click="remove(post.id)" class="mdi mdi-delete"></span>
        </div>
      </div>

      <p class="mx-2">
        <router-link :to="{ name: 'Profile', params: { id: post.creatorId } }">
          <span><img class="pic" :src="post.creator.picture" alt="" /> </span
        ></router-link>
        {{ post.creator.name }}
        <span v-if="post.creator.graduated"
          ><span class="mdi mdi-school"></span
        ></span>
      </p>
      <div v-if="post.imgUrl">
        <center>
          <img class="postpic my-2" :src="post.imgUrl" alt="" />
        </center>
      </div>
      <p class="mx-2">
        {{ post.body }}
      </p>
      <!-- <span v-if="account.id == profile.id"> -->
      <span>
        <div class="inline" v-if="account.id">
          <a @click="like(post.id)" class="mx-2 mdi mdi-heart selectable"></a>
        </div>
        Like Count: {{ post.likes.length }}</span
      >
      <!-- </span> -->
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import { useRouter } from "vue-router";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    return {
      async like(id) {
        try {
          await postsService.like(id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "the like function is broken...");
        }
      },
      async remove(id) {
        try {
          await postsService.remove(id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "Something went wrong...");
        }
      },
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.pic {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
}
.postpic {
  height: 300px;
  width: 300px;
  object-fit: cover;
}
.inline {
  display: inline;
}
</style>