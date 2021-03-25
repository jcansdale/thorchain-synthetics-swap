<template>
  <div class="home">
    <b-container class="bv-example-row" v-if="connected">
      <b-row>
        <b-col />
        <b-col>
          <b-card
              title="Wallet"
              tag="article"
              style="max-width: 200rem;"
              class="mb-2"
          >
            {{ buf2hex(this.userwallet.pubkey) }}
            <button v-on:click="disconnect">Disconnect</button>
          </b-card>
        </b-col>
        <b-col />
      </b-row>
    </b-container>
    <b-container class="bv-example-row" v-if="!connected">
      <b-row>
        <b-col />
        <b-col>
          <b-card
              title="Connect Wallet"
              tag="article"
              style="max-width: 200rem;"
              class="mb-2"
          >
            <b-card-text>
              <b-form-group label="Keystore:" label-cols-sm="5">
                <b-form-file v-model="file" id="keystore-file"></b-form-file>
              </b-form-group>
              <b-form-group label="Password:" label-cols-sm="5">
                <b-form-input id="password" type="password" v-model="password" />
              </b-form-group>
            </b-card-text>
            <button v-on:click="connect(file, password)">Connect</button>
            <button v-on:click="generateKeystore(password)">Generate Keystore</button>
          </b-card>
        </b-col>
        <b-col />
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">

import {Component, Mixins} from "vue-property-decorator";
import Wallet from "@/mixins/Wallet"
import {mapGetters} from "vuex";

@Component({
  components: {},
  computed: mapGetters({
    userwallet : 'getUserwallet',
  })
})
export default class Connect extends Mixins(Wallet) {

  password: string = "";
  file: any = undefined;

  data() {
    return {
      password: "",
      file: undefined
    }
  }

};



</script>
