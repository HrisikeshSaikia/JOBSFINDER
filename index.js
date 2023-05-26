const express= require('express');
const app=express();
let mongoose=require('mongoose');
let path = require('path');
let methodOverride=require('method-override');

let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');
mongoose
.connect('mongodb+srv://hrisi:hrisi11@hirehubdb.2embyzv.mongodb.net/?retryWrites=true&w=majority ')
.then(function(){
    console.log('db working');
})
.catch(function(err) {
    console.log(err);
});

app.use(
	session({
		secret: 'SuperSecretPasswordForHireHub',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			expires: Date.now() + 1000 * 60 * 60 * 24,
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);

let User = require('./models/user-DB');

// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');


	
	next();
});

let jobRoutes = require('./routes/jobs.js');
let notifRoutes = require('./routes/notifications');
let authRoutes = require('./routes/auth');
let userRoutes = require('./routes/user');
let questionRoutes = require('./routes/questions');

app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(questionRoutes);

app.listen(4000, function(){
    console.log('server is running');
});