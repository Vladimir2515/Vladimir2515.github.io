

var signUp =Vue.component('sign-up',{
  template: `
   <v-form v-model="valid" ref="form" lazy-validation>
       <h2 class="text-xs-center">Зарегистрироваться</h2>
      <v-text-field
        class="inside"
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
            name="input-10-2"
            label="Password"
            v-model="password"
            hint="At least 6 characters"   
            :append-icon="e3 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e3 = !e3)"
            class="inside"
            :type="e3 ? 'password' : 'text'"
            :rules="passwordRules"
             required
          ></v-text-field>
       <v-text-field
            name="input-10-2"
            label="Confirm Password"
            v-model="confirmPassword"
            hint="At least 6 characters"   
            :append-icon="e4 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e4 = !e4)"
            class="inside"
            :type="e4 ? 'password' : 'text'"
            :rules="confirmPasswordRules"
             required
          ></v-text-field>
      <p class="text-xs-center">
      <v-btn
        round large
        @click="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn round large @click="clear">clear</v-btn>
      </p>
    </v-form>
    `,
    data: () => ({
    valid: true,
    e3:true,
    e4:true,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters'
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      v => !!v || ' confirmPassword is required',
      v => (v && v.length >= 6) || 'Password must be more than 6 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          email: this.email,
          password: this.password,
          confirmPassword: this. confirmPassword,
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
  
})

/*<style>
.app{
  background:#00FA9A;
}
form{
  width:650px;
  height:320px;
  margin:20px auto;
  border:2px solid #000033;
  border-radius:30px;
  background:white;
}
.inside {
  margin:20px auto;
  width:80%;
}
</style>*/

