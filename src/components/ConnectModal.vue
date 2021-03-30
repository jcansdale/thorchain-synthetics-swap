<template>
  <b-modal id="modalConnect" size="xl" title="Connect Wallet">
    <b-container class="bv-example-row" v-if="isWalletConnected">
      <b-row>
        <b-col />
        <b-col>
          <b-card
              title="Wallet"
              tag="article"
              style="max-width: 200rem;"
              class="mb-2"
          >
            <div v-if="connected">
              {{ buf2hex(userwallet.pubkey) }}

            </div>
            <button v-on:click="disconnect">Disconnect</button>
          </b-card>
        </b-col>
        <b-col />
      </b-row>
    </b-container>
    <b-container class="bv-example-row" v-if="!isWalletConnected">
      <b-row>
        <b-col>
            <b-card-text>
              <b-form-group label="Keystore:" label-cols-sm="5">
                <b-form-file v-model="file" id="keystore-file"></b-form-file>
              </b-form-group>
              <b-form-group label="Password:" label-cols-sm="5">
                <b-form-input id="password" type="password" v-model="password" />
              </b-form-group>
            </b-card-text>
          <b-button v-on:click="generateKeystore(password)">Generate Keystore</b-button>
        </b-col>
      </b-row>
    </b-container>


    <!-- MODAL FOOTER -->
    <template #modal-footer>
      <b-button v-on:click="$bvModal.hide('modalConnect')">Cancel</b-button>
      <b-button v-on:click="connect(file, password)">Connect</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Wallet from "@/mixins/Wallet";

@Component({
  components: {
  },
  computed: mapGetters({
    userwallet : 'getUserwallet',
  })
})

export default class Home extends Mixins(Wallet) {
  password: string = "";
  file: File| null = null;
}
</script>

<style scoped>

</style>
