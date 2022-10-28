import prisma from "../db";
export const getUpdates = async (req, res) => {
  const updates = await prisma.product.findFirst({
    where: {
      userId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  res.json({ data: updates?.updates });
};

export const getOneUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      userId: req.user.id,
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        },
      },
    },
  });
  // const update = await prisma.update.findUnique({
  //   where: {
  //     id: req.params.id,
  //   },
  // });

  // const product = await prisma.product.findUnique({
  //   where: {
  //     id_userId: {
  //       id: update.productId,
  //       userId: req.user.id,
  //     },
  //   },
  // });
  if (product?.updates.length === 0) {
    res.status(401).end();
    return;
  }
  res.json({ data: product?.updates });
};

export const createUpdate = async (req, res) => {
  const { productId } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: productId,
        userId: req.user.id,
      },
    },
  });
  if (!product) {
    res.status(401).end();
    return;
  }
  const newUpdate = await prisma.update.create({
    data: req.body,
  });
  res.json({ data: newUpdate });
};

export const updateAnUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      userId: req.user.id,
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        },
      },
    },
  });
  if (!product) {
    res.status(401).end();
    return;
  }
  const newUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: newUpdate });
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      userId: req.user.id,
    },
    include: {
      updates: {
        where: {
          id: req.params.id,
        },
      },
    },
  });
  if (!product) {
    res.status(401).end();
    return;
  }
  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};
