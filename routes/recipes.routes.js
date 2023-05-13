const router = require('express').Router()
const db = require('../database') // directory kita

// get all data
router.get('/recipes', async function (req, res) {
  try {
    // console.log(req.params); // url param
    let query
    const keyword = `%${req?.query?.keyword}%` //
    let sort = db`DESC`
    const isPaginate =
      req?.query?.page &&
      !isNaN(req?.query?.page) &&
      parseInt(req?.query?.page) >= 1

    // check if sort type exist and paginate exist
    if (req?.query?.sortType?.toLowerCase() === 'asc') {
      if (isPaginate) {
        sort = db`ASC LIMIT 10 OFFSET ${10 * (parseInt(req?.query?.page) - 1)}`
      } else {
        sort = db`ASC`
      }
    }

    // check if sort type not exist and paginate exist
    if (isPaginate && !req?.query?.sortType) {
      sort = db`DESC LIMIT 10 OFFSET ${10 * (parseInt(req?.query?.page) - 1)}`
    }

    if (req?.query?.keyword) {
      query =
        await db`SELECT *, count(*) OVER() AS full_count FROM recipes WHERE LOWER(recipes.name) LIKE LOWER(${keyword}) ORDER BY id ${sort}`
    } else {
      query =
        await db`SELECT *, count(*) OVER() AS full_count FROM recipes ORDER BY id ${sort}`
    }

    res.json({
      status: !!query?.length,
      message: query?.length ? 'Get data success' : 'Data not found',
      total: query?.length ?? 0,
      pages: isPaginate
        ? {
            current: parseInt(req?.query?.page),
            total: query?.[0]?.full_count
              ? Math.ceil(parseInt(query?.[0]?.full_count) / 10)
              : 0
          }
        : null,
      data: query?.map((item) => {
        delete item.full_count
        return item
      })
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error in server'
    })
  }
})

router.post('/recipes', async function (req, res) {
  try {
    // console.log(req.params); // url param

    for (let index = 0; index < 50; index++) {
      await db`INSERT INTO "public"."recipes" ("name", "photo", "ingridients", "description") VALUES ('TEST', 'https://img-global.cpcdn.com/recipes/f44fa3ff2c8debb9/400x400cq70/photo.jpg', 'Roti, sosis', 'Roti dikasih sosis')`
    }

    res.send('Insert success')
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: 'Error in server'
    })
  }
})

router.patch('recipes/photo/:id')

module.exports = router
