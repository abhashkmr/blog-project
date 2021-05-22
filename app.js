const express =require('express');
const mongoose =require('mongoose');
const Blog =require('./models/blog');
const bodyParser =require('body-parser');

const app =express();

app.set('view engine','ejs');

//app.set('views','views1');

const dbURI = "mongodb+srv://abhash:Eureka123@@cluster0.xmccr.mongodb.net/blog-db?retryWrites=true&w=majority";

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
	.then((result)=>{
		app.listen(80);
		console.log("Connected to Mongo-DB database");
        })
	.catch((err)=>{
		console.log(err);
		});




app.use(express.static('public'));
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: true }));
app.get('/add-blog',(req,res)=>{
	const blog =new Blog({
		title:'New Blog',
		snippet:' about new blog',
		body:'This is the blog that I have created'
	});

	blog.save()
		.then((result)=>{
			res.send(result);
		})
		.catch((err)=>{
			console.log(err);
		})
})

app.post('/add-blog',(req,res)=>{
	console.log(req.body);
	res.send("Abhash");
})

app.get('/', (req,res)=>{
	res.redirect('/blogs');
	// res.render('index',{title: 'Home',blogs});
})

app.get('/blogs',(req,res)=>{
	Blog.find()
		.then((result)=>{
			res.render('index',{title:'All Blogs',blogs:result})
		})
		.catch((err)=>{
			console.log(err);
		})
})


app.get('/about', (req,res)=>{
	res.render('about',{title:'About'});
})

app.get('/blogs/create',(req,res)=>{
	res.render('create',{title:'Create'});
})

app.use((req,res)=>{
	res.status(404).render('error',{title:'Error Page'});
})