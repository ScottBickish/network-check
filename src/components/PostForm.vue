<template>
  <div class="post a post component row container-fluid">
    <form @submit.prevent="create()">
      <div class="col">
        <!-- <label for="text">Text Area</label> -->
        <textarea
          name="post-body"
          id=""
          cols="40"
          rows="5"
          placeholder="Text Here..."
          required
          v-model="post.body"
        ></textarea>
      </div>
      <div class="col">
        <!-- <label for="imgUrl" class="form-label"> Image URL</label> -->
        <input type="url" name:="imgUrl" placeholder="Image Url Here"
        v-model="post.imgUrl" />
        <span>
          <button type="submit" class="bg-success ms-2">POST</button></span
        >
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
export default {
  setup() {
    const post = ref({});
    return {
      post,
      async create() {
        // debugger;
        try {
          await postsService.create(post.value);
          Modal.getOrCreateInstance(document.getElementById("PostForm")).hide();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "Something went wrong...");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>