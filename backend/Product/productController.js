const Product = require("./productModel");

const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const { sort, name, numericFilters, category, newest } = req.query;
  const queryObject = {};

  newest ? (queryObject.newest = true) : false;

  if (name) {
    // Finds title by case insensitive
    queryObject.title = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<=": "$lte",
      "<": "$lt",
    };

    // regex matches any operator
    const regEx = /\b(<|<=|=|>=|>)\b/g;

    // Replaces every operator with Mongoose operator.
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price"];
    // Destructure query into 3 variables. -> price, $gt, 50
    filters = filters.split(",").map((item) => {
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        // Appends a query object to QueryObject
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  if (category) {
    queryObject.categories = {
      $in: category,
    };
  }

  // console.log(queryObject);

  let result = Product.find(queryObject);

  // Sort functionality
  if (sort) {
    //  Splits query params by , and joins them back with spaces.
    const sortedList = sort.split(",").join(" ");

    // Returns query params with spaces to result.
    result = result.sort(sortedList);
  } else {
    result = result.sort("-createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // console.log(req.query);
  result = result.skip(skip).limit(limit);

  try {
    const products = await result;
    // res.status(StatusCodes.OK).json(products);
    res.status(StatusCodes.OK).json({ products, numHits: products.length });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(StatusCodes.CREATED).json({ savedProduct });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ updatedProduct });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ msg: "Product has ben deleted..." });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
