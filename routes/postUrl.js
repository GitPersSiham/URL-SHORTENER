
const express =require('express')
const config = require('config')
const createHttpError = require('http-errors')
let ids = require('short-id');
const axios = require('axios')
const validUrl = require('valid-url');
const ShortUrl = require('../models/url.model')

const router = express.Router();

//@route POST 
// @desc Create Short URL
router.post('/', async (req, res, next) => {
if(req.body.url){

  try {
    let url = await ShortUrl.findOne({ originalUrl: req.body.url }).exec();

    if (url) {
      res.render("index",{ short_url: `${process.env.BASE_URL}/${url.shortId}`, status: 200 });
    } else {
      // make a request with Axios
      const response = await axios.get(req.body.url.toString(), {
        validateStatus: (status) => {
          return status < 500;
        },
      });

      if (response.status != 404) {
        let newUrl;
        while (true) {
          let short = ids.generate()
          let checkedSlug = await ShortUrl.findOne({ shortId : short}).exec();
          if (!checkedSlug) {
            newUrl = await ShortUrl.create({
              originalUrl: req.body.url,
              shortId: short,
            });
            break;
          }
        }

        /*res.json({
          short: `${process.env.URL}/${newUrl.slug}`,
          status: response.status,
        });*/
        res.render('index', {short_url:`${process.env.BASE_URL}/${newUrl.shortId}` })
      } else {
        res.json({
          message: response.statusText,
          status: response.status,
        });
      }
    }
  } catch (err) {
    next(err);
  }
} else {
  res.status(400);
  const error = new Error("URL is required");
  next(error);
}




  
    
  })

  module.exports = router;
