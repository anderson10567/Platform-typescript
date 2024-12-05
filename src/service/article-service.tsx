interface Article {
  id: number;
  title: string;
  content: string;
  slug: string;
}

interface RejectedValue {
  message: string;
  stack?: string | undefined;
}

const getSingleArticle = async (
  slug: string,
  rejectedWithValue: (error: RejectedValue) => unknown
): Promise<Article | void> => {
  try {
    const articleResponse = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);

    if (!articleResponse.ok) {
      throw new Error('ошибка запроса статьи');
    }

    const article: Article = await articleResponse.json();
    return article;
  } catch (error) {
    if ((error as Response).status === 404) {
      console.log('repeat fetch');
      return getSingleArticle(slug, rejectedWithValue);
    }

    rejectedWithValue({
      message: error instanceof Error ? error.message : 'Неизвестная ошибка',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};

export default getSingleArticle;
