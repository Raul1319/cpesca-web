#CPESCA


#Descripción


Esta es una web ecomerce destinado a los amantes de la pesca deportiva, donde se comercia con todo tipo de articulos destinados a la pecsa deportiva y a la comunidad de pescadores deportivos.



#Backlog

-Carritos de compras.
-Pagina de CheckOut.
-Procesar Pagos.

Path	                 Components	           Permissions	                      Behavior
/	                     SplashPage            public <Route>                      Home page
/signup                SignupPage            anon only <AnonRoute>              Signup form, link to login, navigate to profile after signup
/login                 LoginPage             anon only <AnonRoute>              Login form, link to signup, navigate to profile after Login
/logout                  n/a                 user only <PrivateRoute>           Navigate to homepage after logout, expire session
/profileId/edit        ProfileEditPage       user only <PrivateRoute>           Edit form, navigate to profile after edit
/:productsId/list      ProductsPage          public <Route>                     Show allproducts by category
/createComments/:id    CommentCreatePage     user only <PrivateRoute>           Allows you to create comments about the products
/productId/comments    CommentEdirPage       user only <PrivateRoute>           Allows you to edit comments about products


#Components
  N/A






#Services
Auth Service

signupService(newUser)
loginService(user)
verifyService()

#Server / Backend

#Models

Comments

comments:{
          type: String,

        },


User

username: {
    
      type: String,
      trim: true,
      required: false,
      unique: true,



    },

    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },

    inCart:{
      type: Boolean,
      default: false,
    },
    
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      comments: [{
        type: Schema.Types.ObjectId,
        ref:"User"
      }],

      products: [{
        type: Schema.Types.ObjectId,
        ref:"User"
      }],

      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comments"
      }],

      cartname: [{
        type: Schema.Types.ObjectId,
        ref:"Cart"
      }],


Products

products:{
        name: String,
        description: String,
        category: {
          type: String,
          enum: ["cañas", "anzuelos", "carretes", "vestuario"],
        },
        comments: [{
          type: Schema.Types.ObjectId,
          ref:"Products"
        }],
        price:Number,
        image:String,
        inCart:{
          type: Boolean,
          default: false,
        },
        username: [{
          type: Schema.Types.ObjectId,
          ref:"User"
        }],

        cartname: [{
          type: Schema.Types.ObjectId,
          ref:"Cart"
        }],

##Rutas De Backend

HTTP                                                       Status             Error	            Description
Method	    URL	                   Request Body	           Success            Status	

POST      /auth/signup	            Saved session           202               404               Check if user is logged in and return profilpage
POST	    /auth/login            { username, email,         200               400               Check credentials in and return profile page
                                     password }
GET      /auth/verify                payload                200               N/A               Check token 
GET     /commens/productIdComments	  req.params            200               N/A               shows product comments
POST	 /createComments/:id           req.params.id
                                     req.body
                                     req.payload._id        200               400                  Allows you to create product reviews


PATCH  comments/:productId/comments   req.params
                                      req.body              201               400                  Allows you to edit product reviews

DELETE comments/:deleteCommentId/     req.params
                                      req.body              200               400                  Allows you to delete product reviews

POST products/:create/products        req.body              201               400                  Allows you to create products 
GET	 products/:productsId/list        req.params            200               400                  shows products by list
PATCH products/:edit                  req.params            200               400                  Allows you to edit product
DELETE	products/:deleteProductsId    req.params            202               400                  Allows you to delete product
GET profile/profile                      N/A                200               400                  shows profile to the client
PATCH profile/:profileId/edit        req.params             201               400                   Allows you to edit your profile
                                      req.body

DELETE profile//:userId/delete       req.params             202               400                   Allows you to delete your profile
                                  




 

API Endpoints (backend routes)

HTTP Method	URL	Request Body	Success status	Error Status	Description

GET	/auth/profile	Saved session	200	404	Check if user is logged in and return profile page
POST	/auth/signup	{name, email, password}	201	404	Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session
POST	/auth/login	{username, password}	200	401	Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session
POST	/auth/logout	(empty)	204	400	Logs out the user
POST	/search/add	{platform, title, type, id}		400	Add new backlog element and add to user
GET	/backlog/series			400	Show series elements
GET	/backlog/films				Show film elements
GET	/backlog/games				Show games elements
GET	/media/:id		201	400	Show specific element
PUT	/media/:id		200	400	edit element
DELETE	/media/:id		201	400	delete element
GET	/done/series			400	Show series elements
GET	/done/films				Show film elements
GET	/done/games				Show games elements