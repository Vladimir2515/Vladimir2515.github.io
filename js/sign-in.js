
const { required,email } = validators
const validationMixin = vuelidate.validationMixin

Vue.use(vuelidate.default)

var signIn =Vue.component('sign-in',{
  template: `
    <form>
       <h2 class="text-xs-center">Войти на сайт </h2>
      <v-text-field
        class="inside"
        label="E-mail"
        v-model="email"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        required
      ></v-text-field>
        <v-text-field
        class="inside"
        label="Password"
        v-model="password"
        required
      ></v-text-field>
      <p class="text-xs-center"><v-btn round large @click="submit">submit</v-btn></p>
    </form>
    `,
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },

  data: () => ({
    email: '',
    password: '',
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
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












