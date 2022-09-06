
const express = require('express')
const createHttpError = require('http-errors')

const ShortUrl = require('../models/url.model')

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.render('index')
  })

 // @routes GET /:shortId
// @desc Redirect to long/oginal url
  router.get('/:shortId', async (req, res, next) => {
    try {
      const { shortId } = req.params
      const result = await ShortUrl.findOne({ shortId })
      if (!result) {
        throw createHttpError.NotFound('Short url does not exist')
      }
      res.redirect(result.url)
    } catch (error) {
      next(error)
    }
  })

  module.exports = router;