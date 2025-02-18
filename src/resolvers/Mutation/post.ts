export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    // console.log(post);
    // console.log(userInfo, "userInfo");

    if (!userInfo) {
      return {
        errorMessage: "Unauthorized",
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: userInfo.userId,
      },
    });

    return {
      post: newPost,
    };
  },

  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log(args, "args");
    // console.log(userInfo, "userInfo");

    if (!userInfo) {
      return {
        errorMessage: "Unauthorized",
      };
    }

    const isPostExist = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });

    if (!isPostExist) {
      return {
        errorMessage: "Post not found",
      };
    }

    if (isPostExist.authorId !== userInfo.userId) {
      return {
        errorMessage: "User not authorized to update this post",
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        title: args.post.title,
        content: args.post.content,
      },
    });

    return {
      post: updatedPost,
    };
  },

  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log(args, "args");
    // console.log(userInfo, "userInfo");

    if (!userInfo) {
      return {
        errorMessage: "Unauthorized",
      };
    }

    const isPostExist = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });

    if (!isPostExist) {
      return {
        errorMessage: "Post not found",
      };
    }

    if (isPostExist.authorId !== userInfo.userId) {
      return {
        errorMessage: "User not authorized to delete this post",
      };
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(args.postId),
      },
    });

    return {
      post: deletedPost,
    };
  },

  updatePublishStatus: async (parent: any, args: any, { prisma, userInfo }: any) => {
    // console.log(args, "args");
    // console.log(userInfo, "userInfo");

    if (!userInfo) {
      return {
        errorMessage: "Unauthorized",
      };
    }

    const isPostExist = await prisma.post.findUnique({
      where: {
        id: Number(args.postId),
      },
    });

    if (!isPostExist) {
      return {
        errorMessage: "Post not found",
      };
    }

    if (isPostExist.authorId !== userInfo.userId) {
      return {
        errorMessage: "User not authorized to update this post",
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args.postId),
      },
      data: {
        published: args.published,
      },
    });

    return {
      post: updatedPost,
    };
  }
};
