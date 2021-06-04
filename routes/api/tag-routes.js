const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags
router.get('/', async (req, data) => {
 try {
   const tags = await Tag.findAll(
     {include: [{ model: Product, as: "product_tags"}]}
   )
   data.status(200).json(tags)
 } catch (error) {
   data.status(500).json(error)
 }

});

// find a single tag by its `id`
router.get('/:id', async (req, data) => {
  try {
    const tags = await Tag.findByPk(req.params.id, { include: [{ model: Product, as: "product_tags"}]})
    data.status(200).json(tags)
  } catch (error) {
    data.status(500).json(error)
  }
});

// create a new tag
router.post('/', async (req, data) => {
  try {
    const tags = await Tag.create(req.body)
    data.status(200).json(tags)
  } catch (error) {
    data.status(500).json(error)
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, data) => {
  try {
    const tags = await Tag.update(req.body,
      {where: { id: req.params.id}}
      )
      data.status(200).json(tags)
  } catch (error) {
    data.status(500).json(error)
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, data) => {
  try {
    const tags = await Tag.destroy({where: { id: req.params.id}})
    data.status(200).json(tags)
  } catch (error) {
    data.status(500).json(error)
  }
});

module.exports = router;
