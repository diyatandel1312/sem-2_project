const BookList = require('../models/bookScheme')

// fetch all books
const getAllBooks = async (req, res) => {
  const result = await BookList.find({})

  res
    .status(StatusCodes.OK)
    .json({ success: true, totalHits: result.length, data: result })
}

// add new book
const postBook = async (req, res) => {
  // ---------------------------MULTER---CREATING----NEW----BOOK-------------------

  const image = req.file.path
  const { title, description, language, author, category } = req.body

  let featured
  if (req.body.featured === 'true') {
    featured = true
  } else {
    featured = false
  }

  let available
  if (req.body.available === 'true') {
    available = true
  } else {
    available = false
  }

  // console.log(req.body)
  // console.log(req.file.path)
  const result = await BookList.create({
    title,
    description,
    language,
    author,
    category,
    featured,
    available,
    image,
  })

  res.status(StatusCodes.CREATED).json({ success: true, data: result })
}

// fetch single book by ID
const getSingleBook = async (req, res) => {
  const { id: bookID } = req.params
  const result = await BookList.findById({ _id: bookID })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(StatusCodes.OK).json({ success: true, data: result })
}

// update single book detail
const patchBook = async (req, res) => {
  const { id: bookID } = req.params

  const result = await BookList.findByIdAndUpdate({ _id: bookID }, req.body, {
    // Instant Update or else 1step delay output hunxa + rechecking the validation for updated Values
    new: true,
    runValidators: true,
  })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(StatusCodes.OK).json({ success: true, data: result })
}

// delete single book by id
const deleteBook = async (req, res) => {
  const { id: bookID } = req.params
  const result = await BookList.findByIdAndDelete({ _id: bookID })

  if (!result) {
    return res.status(400).json({
      status: 'fail',
      message: `book with id ${bookID} doesn't exists`,
    })
  }

  res.status(StatusCodes.OK).json({ status: 'success', data: null })
}

module.exports = {
  getAllBooks,
  postBook,
  getSingleBook,
  patchBook,
  deleteBook,
}
