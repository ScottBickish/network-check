<template>
  <!-- {{ profile }} -->
  <Profile :profile="profile" />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
export default {
  setup() {
    const route = useRoute();
    logger.log(route.params.id);
    onMounted(async () => {
      try {
        await profilesService.getProfile(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message);
      }
    });
    return {
      profile: computed(() => AppState.profile),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>