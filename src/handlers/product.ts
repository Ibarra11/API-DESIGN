import prisma from "../db";
// get all products
export const getProducts = async (req, res) => {
  const products = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.status(200).send({ data: products?.products });
};

// get one product
export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (e) {
    res.status(500).send({ message: "server could not make request" });
  }
};

export const createProduct = async (req, res, next) => {
  const { name } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        User: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id_userId: {
          id,
          userId: req.user.id,
        },
      },
      data: {
        name,
      },
    });
    res.json({ data: updatedProduct });
  } catch (e) {
    res.status(500).end();
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await prisma.product.delete({
    where: {
      id_userId: {
        id,
        userId: req.user.id,
      },
    },
  });
  const x = deletedProduct[0];
  res.json({ data: deletedProduct[0] });
};
