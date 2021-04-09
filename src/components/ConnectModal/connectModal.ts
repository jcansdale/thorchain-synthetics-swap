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