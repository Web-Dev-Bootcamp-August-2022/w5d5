const router = require("express").Router();
const Movie = require('../models/Movie')
const uploader = require('../config/cloudinary')

/* GET home page */
router.get("/", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('index', { movies })
    })
    .catch(err => {
      next(err)
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add')
});

// the argument for the uploader is the value of the name attribute
// in the form
router.post('/movies', uploader.single('poster'), (req, res, next) => {
  // this is where express / multer adds the info about the uploaded file
  console.log(req.file)
  const { title, description } = req.body
  const imgName = req.file.originalname
  const imgPath = req.file.path
  Movie.create({ title, description, imgName, imgPath })
    .then(movie => {
      console.log(movie)
      res.redirect('/')
    })
    .catch(err => next(err))
});

router.get('/movie/delete/:id', (req, res, next) => {
});


module.exports = router;
