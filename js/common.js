var config = {
    apiKey: "AIzaSyDtalNClrzYs-WSnQLejbMpHnOMzClnBdE",
    authDomain: "my-first-app-30b32.firebaseapp.com",
    databaseURL: "https://my-first-app-30b32.firebaseio.com",
    projectId: "my-first-app-30b32",
    storageBucket: "my-first-app-30b32.appspot.com",
    messagingSenderId: "980272674375"
  };
  firebase.initializeApp(config);

var infoPage =Vue.component ('info-page',{
  data () {
      return {
        items: [
          {
            src: 'https://img3.goodfon.ru/original/1920x1080/e/34/priroda-peyzazh-more-reka-voda.jpg'
          },
          {
            src: 'http://www.evangelisch-emmen.nl/cms/images/iacf1.jpg'
          },
          {
            src: 'http://nokiawallpapersfree.com/wp-content/uploads/2013/10/148485.jpg'
          }
        ]
      }
    },
  template: `
           <v-parallax height="800px" src="https://img3.goodfon.ru/wallpaper/big/e/ce/abstrakciya-tekstura-fon-krugi.jpg">
           <div style="text-align:center;margin:10px">
            <h1>Find your location </h1>
             <p>Build your application today! </p>
             </div>
             <v-carousel hide-controls style="width:800px;height:450px;margin:5px auto 30px">
                <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
              </v-carousel>
           </v-parallax>
    `
});

var signIn =Vue.component('sign-in',{
  template: `
   <v-parallax height="800px" src="https://cdn-images-1.medium.com/max/1200/1*l3wujEgEKOecwVzf_dqVrQ.jpeg">
   <v-form v-model="valid" ref="form" lazy-validation  v-if="show">
       <h2 class="text-xs-center">Войти на сайт </h2>
      <v-text-field
        class="inside"
        label="E-mail"
        v-model="user.email"
        :rules="user.emailRules"
        required
      ></v-text-field>
      <v-text-field
            class="inside"
            name="input-10-2"
            label="Password"
            v-model="user.password"
            hint="At least 6 characters"   
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            :rules="user.passwordRules"
             required
      ></v-text-field>
      <p class="text-xs-center"><v-btn round large @click="submit"  :disabled="!valid">submit</v-btn></p>
    </v-form>
   </v-parallax>
    `,
  data: () => ({
       alert:true,
       e1:true,
       signSuccess:false,
       valid:true,
       show:true,
       user:{
        email: '',
       emailRules: [
      v => !!v || 'E-mail is required',
     v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
       password: '',
       passwordRules: [
      v => !!v || 'Name is required'
    ]
       }
  }),
  methods: {
    submit () {
    this.$refs.form.validate()
      firebase.auth().signInWithEmailAndPassword(this.user.email,this.user.password) 
        .then( response =>{
        const sett={
          email:response.email,
          uid: response.uid,
          mainPage:true,
          complete:true
        }
        this.$emit('addUser',sett);
        this.$router.push('/main-page');
        this.show = false;
       })
    }
  }
});
var signUp =Vue.component('sign-up',{
  template: `
    <v-parallax height="800px" src="https://image.freepik.com/foto-gratis/bloc-de-notas-y-smartphone-sobre-fondo-azul-y-naranja_23-2147633365.jpg">
   <v-form  v-model="valid" ref="form" lazy-validation v-if="show">
       <h2 class="text-xs-center">Зарегистрироваться</h2>
      <v-text-field
        class="inside"
        label="E-mail"
        v-model="user.email"
        :rules="user.emailRules"
        required
      ></v-text-field>
      <v-text-field
            name="input-10-2"
            label="Password"
            v-model="user.password"
            hint="At least 6 characters"   
            :append-icon="e3 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e3 = !e3)"
            class="inside"
            :type="e3 ? 'password' : 'text'"
            :rules="user.passwordRules"
             required
          ></v-text-field>
       <v-text-field
            name="input-10-2"
            label="Confirm Password"
            v-model="user.confirmPassword"
            hint="At least 6 characters"   
            :append-icon="e4 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e4 = !e4)"
            class="inside"
            :type="e4 ? 'password' : 'text'"
            :rules="user.confirmPasswordRules"
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
    </v-parallax>
    `,
    data: () => ({
    alert:true,
    show:true,
    valid: true,
    e3:true,
    e4:true,
    user:{
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
      }
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
       firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password)
       .then(() =>{
          this.show=false;
          this.$router.push('/sign-in');
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
});

var mainPage =Vue.component ('main-page',{
  data: function () {
    return{
      error: '',
      data:{
        lat:'',
        lon:'',
      },
    url:'http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png', 
    }
  },
  template: `
          <v-parallax height="800px" src="https://img3.goodfon.ru/wallpaper/big/e/ce/abstrakciya-tekstura-fon-krugi.jpg">
            <div class="apps">
              <h1 class="grey--text">A super-simple geolocatio&#8203;n app</h1>
              <img style="height:150px" :src="url" />
              <br>
               <div class="text-xs-center">
                  <v-btn @click="myFunction" round color="primary" dark>Get my location</v-btn>
              </div>
              <br>
              <p class="grey--text">Your coordinates Lat = {{data.lat}} Lon ={{data.lon}}</p>
              <p class="grey--text">{{error}}</p>
                <div style="margin:0 auto" id="map"></div>
            </div>
          </v-parallax>
    `,
  methods:{
    myFunction: function () {   
   if(navigator.geolocation){
   navigator.geolocation.watchPosition(this.showPosition);
   }else{
   this.error = "Geolocation is not supported."; 
     
   }
    },
  showPosition:function (position) {  
    this.data.lat = position.coords.latitude;
    this.data.lon = position.coords.longitude;
    var latlon =new google.maps.LatLng(this.data.lat,this.data.lon);
    var map = document.getElementById('map');
    map.style.height = '250px';
    map.style.width = '500px';

    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 14,center: latlon});
    marker.setMap(map);
  }
  }



});
var signOut =Vue.component ('sign-out',{
  data: function () {
       return{
        
       }
  },
  template:`
    <v-btn color="warning" fab dark @click="signOut">
  `,
  methods:{
         signOut:function(){
    firebase.auth().signOut().then(()=>{ 
        this.$router.push('/sign-in');
        const sett={
          mainPage:false,
          complete:false
        }
        this.$emit('addUser',sett);
    });
   }
  }
});


routes=[
  { path: '/main-page', component:mainPage},
  { path: '/info-page', component:infoPage},
  { path: '/sign-out', component:signOut},
  { path: '/sign-in', component: signIn },
  { path: '/sign-up', component: signUp },
      ]

const router = new VueRouter({
   routes
})



var theApp = new Vue({
  el:'#app',
  router,
   template: `
   <div>
    <v-app id="inspire">
      <div v-if="!signComplete">
        <v-tabs icons-and-text centered dark color="cyan">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab exact to="/info-page">
                Info
            <v-icon large>info</v-icon>
          </v-tab>
          <v-tab exact to="/sign-in">
                Sign in
            <v-icon>account_box</v-icon>
          </v-tab>
          <v-tab exact to="/sign-up">
                Sign up
            <v-icon large>widgets</v-icon>
          </v-tab>
          <v-tab-item
              v-for="i in 3"
              :key="i"
              :id="'tab-' + i"
            >
            <v-card flat> 
            </v-card>
          </v-tab-item>
          </v-tabs>
          </div>
        <div v-else>
          <v-tabs icons-and-text centered dark color="cyan">
            <v-tabs-slider color="yellow"></v-tabs-slider>
             <v-tab exact to="/sign-out">
                App for admin
                <v-icon large>present_to_all</v-icon>
             </v-tab>
              <v-tab  exact to="/main-page">
                App for user 
                <v-icon large>call_split</v-icon>
             </v-tab>
              <v-btn color="warning" fab dark @click="signOut">Sign UP</v-btn>
               <div class="text--center" style="margin:12px 10px">
                    <v-badge left color="orange lighten-1" overlap>
                      <v-icon slot="badge" dark small>done</v-icon>
                      <v-icon
                        large
                        color="grey lighten-1"
                      >
                        account_circle
                      </v-icon>
                       <span class="white--text">Hello,{{email}}</span>
                    </v-badge>
                </div>
            <v-tab-item
                v-for="i in 2"
                :key="i"
                :id="'tab-' + i"
              >
              <v-card flat> 
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      <router-view @addUser="email=$event.email,signComplete=$event.complete"> </router-view>
    </v-app>
    </div>

          `,
  components: {
  },
  methods:{
     signOut:function(){
        this.$router.push({path: '/sign-in'});
          this.mainPage=false,
          this.signComplete=false
      
}
},
  data(){
      return{
     mainPage:false,
     signComplete:false,
     email:'',
     uid:''
    }
    }

})