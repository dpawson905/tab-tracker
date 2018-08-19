<template>
  <v-container>
    <v-form>
      <v-layout>
        <v-flex xs8 offset-xs2>
          <panel title="Login">
            <div class="pl-4 pr-4 pt-2 pb-2">
              <v-text-field
                name="email"
                label="Email address"
                v-model="email"
                >
              </v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show3 ? 'visibility_off' : 'visibility'"
                :rules="[rules.required, rules.min, rules.max]"
                :type="show3 ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                @click:append="show3 = !show3">
              </v-text-field>        
              <div class="error-msg" v-html="error" />
              <v-btn class="indigo" dark @click="login">Login</v-btn>
            </div>
          </panel>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Panel from "@/components/Panel";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      show3: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters.",
        max: v => v.length <= 30 || "Max 30 characters"
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "../../node_modules/vuetify/dist/vuetify.min.js"
    );
    plugin.async = true;
    document.body.appendChild(plugin);
  },
  components: {
    Panel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-msg {
  color: red;
}
</style>