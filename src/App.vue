<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/connect">Connect Wallet</router-link>
    </div>
    <router-view id="view" />
  </div>
</template>

<style lang="scss">

html, body{
  height: 100%;
}

#view{
  height: calc(100% - 55px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-color;
  font-size: 1.4em;
  background-color: #212529;
  height: 100%;
}

a {
  color: $secondary-color;
}

#nav {
  height: 50px;
  padding: 5px;

  a {
    font-weight: bold;
    color: $primary-color;

    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
}
</style>
