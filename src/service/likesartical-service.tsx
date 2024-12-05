interface LikeArticleParams {
  token: string;
  slug: string;
  favorited: boolean;
}

export const likeArticle = async ({ token, slug, favorited }: LikeArticleParams): Promise<any> => {
  console.log(token, slug, favorited);

  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
    method: favorited ? 'DELETE' : 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: null,
  });

  if (!response.ok) {
    throw new Error('Failed to favorite the article');
  }

  return response.json();
};

export default likeArticle;
