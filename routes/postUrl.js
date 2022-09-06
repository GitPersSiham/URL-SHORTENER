const express =require('express')
const config = require('config')
const createHttpError = require('http-errors')

var ids = require('short-id');

const ShortUrl = require('../models/url.model')

const router = express.Router();

//@route POST 
// @desc Create Short URL
router.post('/', async (req, res, next) => {
    try {
      const { url } = req.body
      if (!url) {
        throw createHttpError.BadRequest('Oups something went wrong')
      }
      const urlExists = await ShortUrl.findOne({ url })
      if (urlExists) {
        res.render('index', {
          short_url: `${process.env.BASE_URL}/${urlExists.shortId}`,
        })
        return
      }
      const shortUrl = new ShortUrl({ url: url, shortId: ids.generate() })
      const result = await shortUrl.save()
      res.render('index', {
        short_url: `${process.env.BASE_URL}/${result.shortId}`,
      })
    } catch (error) {
      next(error)
    }
  })

  module.exports = router;
