<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/block42_logo.png" />
    <HelloWorld msg="Welcome to block42s frontend boilerplate" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
