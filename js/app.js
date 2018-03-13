
var signIn =Vue.component ('sign-in',{
  data: function () {
    return {
      show:true,
      user:{
        email:'',
        password:'',
      }
    }
  },
  methods:{
    enterUser(){
        firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password)
       .then( response =>{
        console.log(response);
        const sett={
          email:response.email,
          uid: response.uid,
          mainPage:true,
          signComplete:true
        }
        this.$emit('addUser',sett);
        this.show = false;
        this.signSuccess=true;
       })
       .catch(error=>{
           this.signError= true;
       })
    }
  },
  template: `
     <div>
     <form class="mt-5" @submit.prevent="enterUser" v-if="show"> 
     <div class="form-group"> 
      <label for="email">Ваш email:</label>
      <input type="email" class="form-control" id="email" placeholder="Введите ваш email" required v-model="user.email">
     </div>
     <div class="form-group"> 
      <label for="password">Ваш пароль:</label>
      <input type="password" class="form-control" id="password" placeholder="Введите ваш password" required v-model="user.password">
     </div>
     <button type="submit" class="btn btn-primary">Войти</button> 
    </form>
    </div>
    `
});
var signUp =Vue.component ('sign-up',{
  data: function () {
    return {
      show:true,
      signSuccess:false,
      signError:false,
      user:{
        email:'',
        password:'',
        confirmPassword:''
      },
      errorConfirm:false,
      errorSmall:false
    }
  },
  template: `
         <div>
         <form class="mt-5" @click.prevent="registerUser" v-if="show"> 
         <div class="form-group"> 
          <label for="email">Ваш email:</label>
          <input type="email" class="form-control" id="email" placeholder="Введите ваш email" required v-model="user.email">
         </div>
         <div class="form-group"> 
          <label for="password">Ваш пароль:</label>
          <input type="password" class="form-control" id="password" placeholder="Введите ваш password" required v-model="user.password">
         </div>
         <div class="form-group"> 
          <label for="password2">Повторите пароль:</label>
          <input type="password" class="form-control" id="password2" placeholder="Повторите ваш password" required v-model="user.confirmPassword">
         </div>
         <div class="alert alert-danger" role="alert" v-if="errorConfirm"> 
            <strong>Opps</strong>Пароли не совпадают
         </div>
          <div class="alert alert-danger" role="alert" v-if="errorSmall"> 
            <strong>Opps</strong>Пароли должен быть больше 6 символов
         </div>
         <button type="submit" class="btn btn-primary">Зарегистироваться</button> 
     </form>
     <div class="alert alert-success mt-5" role="alert"  v-if="signSuccess">
     <strong> Ура!</strong> Вы зарегистировались
    </div>
    <div class="alert alert-danger mt-5" role="alert" v-if="signError">
     <strong> Opps!</strong> Что-то не так
    </div>
     </div>
     `,
  methods:{
    registerUser(){
      this.errorConfirm=false;
      this.errorSmall=false;
       if(this.user.password !== this.user.confirmPassword){
             this.errorConfirm = true;
       } else if(this.user.password.length<6){
            this.errorSmall=true;       
       } else{
        firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password)
        .then(() =>{
          this.$emit('regSucces','sign-in');
          this.show=false;
          this.signSuccess=true;
        })
        .catch(error=>{
           this.signError= true;
        })
       }
      }
    }
});
var mainPage =Vue.component ('main-page',{
  props:['uid'],
  data: function () {
    return{

    }
  },
  template: `
          <div>Привет Мир </div>
    `
});

 routes=[
  { path: '/main-page', component:mainPage},
  { path: '/sign-in', component: signIn },
  { path: '/sign-up', component: signUp },
        ]

const router = new VueRouter({
   routes
})

var theApp = new Vue({
  el:'#app',
  router,
  data(){
    return{
     sign:'sign-in',
     isMainPage:false,
     signComplete:false,
     email:'',
     uid:''
    }
  },
   template: `
  <div>
      <div class="container-fluid navbar-inverse bg-inverse"> 
         <div class="row"> 
            <div class="col"> 
                <nav class="navbar">
                   <form class="form-inline d-flex justify-content-end"> 
                      <div v-if="!signComplete"> 
                       <router-link to="/sign-in">
                        <button class="btn btn-outline-success mr-3" type="button" @click="switchSign('sign-in')">Войти</button>
                       </router-link>
                       <router-link to="/sign-up">
                        <button class="btn btn-outline-success" type="button"@click="switchSign('sign-up')">Регистрация</button>
                       </router-link>
                      </div>
              <div v-else>
               <router-link to="/main-page">
                <button class="btn btn-outline-success" type="button">Войти в main</button>
                </router-link>
                <span style="color:red">{{email}}</span>
             </div>
                   </form>
                </nav>
            </div>
         </div>       
      </div>
      <div class="container">
        <div class="row"> 
            <div class="col">
            <router-view @addUser="email=$event.email,signComplete=$event.complete,userUid=$event.uid" :uid="userUid"> </router-view>
            </div>
        </div>
      </div>
    </div>
          `,
  components: {
    signIn,
    signUp,
    mainPage
  },
  methods:{
    switchSign(currentSign){
        this.sign=currentSign
    }
  }
})


