<template>
  <center>
    <div class="text center">
      <h1>Welcome to {{ profile.name }}'s profile page!</h1>
    </div>
  </center>

  <div class="d-flex justify-content-between">
    <div class="col-md-4 card elevation-2 rounded m-1">
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

    <div class="col-md-3">
      <div v-for="e in extras" :key="e.title">
        <Extras :extra="e" />
      </div>
    </div>
  </div>
  <div class="row container-fluid">
    <div v-for="p in propost.posts" :key="p.id" class="col-md-9">
      <Post :post="p" />
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
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
    return {
      extras: computed(() => AppState.extras),
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
</style>