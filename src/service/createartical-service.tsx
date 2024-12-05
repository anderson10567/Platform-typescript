interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

interface CreateArticleInfo {
  token: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

interface CreateArticleResponse {
  article: Article & { slug: string };
}

export const createArticle = async (
  articleInfo: CreateArticleInfo,
  rejected: (error: Error) => void
): Promise<CreateArticleResponse | void> => {
  try {
    const article = {
      article: {
        title: articleInfo.title,
        description: articleInfo.description,
        body: articleInfo.body,
        tagList: articleInfo.tagList,
      },
    };

    const createArticleRequest = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${articleInfo.token}` },
      body: JSON.stringify(article),
    });

    if (!createArticleRequest.ok) {
      throw new Error('error in createArticleRequest');
    }

    const successCreation: CreateArticleResponse = await createArticleRequest.json();
    return successCreation;
  } catch (error) {
    rejected(error as Error);
  }
};

interface EditArticleInfo extends CreateArticleInfo {
  slug: string;
}

interface EditArticleResponse {
  article: Article & { slug: string };
}

export const editArticle = async (
  updatedArticleInfo: EditArticleInfo,
  rejected: (error: Error) => void
): Promise<EditArticleResponse | void> => {
  try {
    const article = {
      article: {
        title: updatedArticleInfo.title,
        description: updatedArticleInfo.description,
        body: updatedArticleInfo.body,
        tagList: updatedArticleInfo.tagList,
      },
    };

    const editRequest = await fetch(`https://blog-platform.kata.academy/api/articles/${updatedArticleInfo.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${updatedArticleInfo.token}` },
      body: JSON.stringify(article),
    });

    if (!editRequest.ok) {
      throw new Error('error in editArticleRequest');
    }

    const successEdition: EditArticleResponse = await editRequest.json();
    return successEdition;
  } catch (error) {
    rejected(error as Error);
  }
};
