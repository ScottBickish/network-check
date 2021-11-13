<template>
  <div class="row container-fluid">
    <div class="col-md-3 card elevation-2 rounded m-1">
      <img class="rounded mt-2" :src="profile.coverImg" />
      <hr />
      <!-- NOTE if time fix the layout -->
      <div class="text-center">
        <p>{{ profile.class }}</p>
      </div>
      <div>
        <img class="mt-1 pic" :src="profile.picture" />

        <h5 v-if="profile.graduated" class="mdi mdi-school"></h5>
        <h5 class="mdi mdi-bookopenvariant"></h5>
      </div>
      <span
        ><h6>{{ profile.name }}</h6></span
      >
      <p>Bio: {{ profile.bio }}</p>
      <p>Linkedin: {{ profile.linkedin }}</p>
      <p>Github: {{ profile.github }}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: { profile: { type: Object, required: true } },
  setup() {
    return {};
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