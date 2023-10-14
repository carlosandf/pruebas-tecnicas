import express from 'express'

export const app = express();

app.use(express.json());
app.disable('x-powered-by')

const items = [
  {
    id: 1,
    content: 'Item 1'
  }
]

app.get('/items', async (req, res) => {
  try {
    res.status(200).send(items)
  } catch (error) {
    res.status(500)
  }
})

app.get('/items/:id', async (req, res) => {
  const { id } = req.params
  try {
    const item = items.find(item => item.id === Number(id))
    if (!item) throw Error('No se encontró lo que buscaba');

    res.status(200).send(item)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.post('/items', async (req, res) => {
  const { content } = req.body;

  try {
    const newItem = {
      id: items.length + 1,
      content
    }
    items.push(newItem)
    res.status(200).send(newItem);
  } catch (error) {
    res.status(500)
  }
})

app.patch('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const itemIndex = items.findIndex(item => item.id === Number(id))
    if(itemIndex < 0) throw Error('No se encontró lo que buscaba');

    const updated = {
      ...items[itemIndex],
      content
    }
    items[itemIndex] = updated;

    res.status(200).send(updated)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const itemIndex = items.findIndex(item => item.id === Number(id))
    if(itemIndex < 0) throw Error('No se encontró lo que buscaba');

    items.splice(itemIndex, 1);

    res.status(200).send({message: 'Eliminado'});
  } catch (error) {
    res.status(404).send(error)
  }
})

const PORT = process.env.PORT ?? 3001

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})