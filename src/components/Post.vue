<template>
  <div class="post-component">
    <div class="card elevation-2 rounded m-2">
      <!-- FIXME this need to be converted to something more readable -->
      <span class="mx-2">{{ post.creator.createdAt }}</span>
      <p class="mx-2">
        <span><img class="pic" :src="post.creator.picture" alt="" /> </span>
        {{ post.creator.name }}
        <span v-if="post.creator.graduated"
          ><span class="mdi mdi-school"></span
        ></span>
      </p>
      <div v-if="post.imgUrl">
        <center>
          <img class="postpic" :src="post.imgUrl" alt="" />
        </center>
      </div>
      <p class="mx-2">
        {{ post.body }}
      </p>
      <span class="mx-2 mdi mdi-heart"
        >Like Count: {{ post.likes.length }}</span
      >
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup() {},
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
</style>