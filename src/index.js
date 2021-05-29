const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const passportMiddleware= require('./middlewares/passport.middleware')
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');
const cors = require('cors');

// inicio
const storage= multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename:(req , file, cb)=>{
        cb(null,  uuidv4() + path.extname(file.originalname));
    }
})

const app =express();
app.use(cors())

//configuracion
app.set('port',process.env.PORT || 5000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    //helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');


//MIDDELWARE - pre-peticiones

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));


//variables globales
app.use((req,res,next) =>{
    next();
});

// public - navegador puede acceder
//app.use(express.static(path.join(__dirname, 'public')))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(multer({
    storage,
    dest: path.join(__dirname,'public/uploads'),
    fileFilter: (req, file, cb)=>{
        const filetypes =/jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype);
        const extname =filetypes.test(path.extname(file.originalname));
        if (mimetype && extname){
            return cb(null, true)
        }
        cb(console.log("Formato no válido"))        
    }
}).single('imageMulter'))

passport.use(passportMiddleware);

//Rutas
// app.use(require('./routes'));
// app.use(require('./routes/authentication'));

//Rutas api
app.use('/api/noticias',require('./routes/api/noticia'))
app.use('/api/users',require('./routes/api/user'))
app.use('/api/products',require('./routes/api/products'))

//rutas para parcial
app.use('/api/carservices',require('./routes/api/carservices'))


app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));    
});