const express = require('express');
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    isnull: (value) => {
        return value !== null;
    },
    isempty: (value) => {
        return value.length !== 0;
    }
  }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'RecipeShare',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1200000 }
  })
);


app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/logout', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});

app.use('/recipe-form', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});

app.use('/profile', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});


app.use('/post', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});

app.use('/new-like', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});

app.use('/dislike', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});

app.use('/new-comment', (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    next();
  }
});



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});