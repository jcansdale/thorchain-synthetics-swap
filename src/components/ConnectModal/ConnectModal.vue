<template>
  <b-modal id="modalWallet" size="xl" title="Wallet">
    <div class="bv-example-row" v-if="isWalletConnected">
      <button @click="getBalances">Refresh</button>
      <div v-if="userwallet.walletType === 'ADDON'">
        <p>You are connected via Keplr</p>

      </div>

      <div v-if="userwallet.walletType === 'KEYSTORE'">
        <p>You are connected via BIP39 Keystore</p>
      </div>

      <p>Address: {{userwallet.thorchainAddress}}</p>
      <h3>Assets</h3>
      <p>{{thorchainBalance}} RUNE</p>
      <p>{{binanceBalance}} BNB</p>



      <b-button v-on:click="disconnect">Disconnect</b-button>
    </div>
    <div class="modal-content" v-if="!isWalletConnected">

      <div class="half">

        <b-card v-if="localStorageKeystore !== null" class="section">
          <p>Log in with the stored Keystore.</p>
          <b-form-group label="Password:" label-cols-sm="4">
            <b-form-input type="password" v-model="localStoragePassword" />
          </b-form-group>
          <b-button v-on:click="connectWithLocalStorageKeystore(localStoragePassword)">Log In</b-button>
        </b-card>

        <b-card class="section">
          <p>Provide a keystore and use <a href="https://xchainjs.org">xchainjs</a> wallet.</p>

          <b-form-group label="Keystore:" label-cols-sm="4">
            <b-form-file v-model="file" id="keystore-file"></b-form-file>
          </b-form-group>
          <b-form-group label="Password:" label-cols-sm="4">
            <b-form-input type="password" v-model="password" />
          </b-form-group>

          <b-button v-on:click="connect(file, password)">Log In</b-button>
        </b-card>


        <b-card class="section">
          <p>Create a new BIP39 keystore</p>
          <b-form-group label="Password:" label-cols-sm="4">
            <b-form-input type="password" v-model="newPassword" />
          </b-form-group>
          <b-button v-on:click="generateKeystore(newPassword)">Generate</b-button>
        </b-card>

      </div>

      <div class="half">
        <b-card class="section">
          <div class="img-container"><img src="../../assets/images/keprl.png"></div>
          <b-button v-on:click="connectKeplr">Log In</b-button>
        </b-card>
      </div>

    </div>

    <!-- MODAL FOOTER -->
    <template #modal-footer>
      <b-button v-on:click="$bvModal.hide('modalWallet')">Hide</b-button>
    </template>
  </b-modal>
</template>

<script lang="ts" src="./connectModal.ts"></script>
<style scoped lang="scss" src="./connectModal.scss"></style>
