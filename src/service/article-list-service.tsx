const getArticles = async (offset: number, rejectWithValue: any) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles?offset=${offset}&&limit=5`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { articles: data.articles, articlesCount: data.articlesCount };
  } catch (error) {
    return rejectWithValue(error);
  }
};
export default getArticles;
