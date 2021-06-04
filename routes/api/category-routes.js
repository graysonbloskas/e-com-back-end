const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
router.get('/', async (req, data) => {
  try {
    const catData = await Category.findAll({
      include: [Product]
    })
    data.status(200).json(catData);
  } catch (error) {
    data.status(500).json(error);
  }

});

// find one category by its `id` value
router.get('/:id', async (req, data) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, { include: [Product]});
    data.status(200).json(categoryData);
  } catch (error) {
    data.status(500).json(error);
  }
});

// create a new category
router.post('/', async (req, data) => {
  try {
    const categoryData = await Category.create(req.body);
    data.status(200).json(categoryData)
  } catch (error) {
    data.status(500).json(error)
  }
});

// update a category by its `id` value
router.put('/:id', async (req, data) => {
  try {
    const categoryData = await Category.update(
      
      {category_name: req.body.category_name}, {where: { id: req.params.id}}
    )
    data.status(200).json(categoryData)
  } catch (error) {
    data.status(500).json(error)
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, data) => {
  try {
    const categoryData = await Category.destroy({where: { id: req.params.id}})
    data.status(200).json(categoryData)
  } catch (error) {
    data.status(500).json(error)
  }
});

module.exports = router;
