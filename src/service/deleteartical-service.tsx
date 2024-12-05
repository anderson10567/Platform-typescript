interface RejectedValue {
  message: string;
  stack?: string | undefined;
}

export const deleteArticle = async (
  slug: string,
  token: string,
  rejected: (error: RejectedValue) => unknown
): Promise<any | void> => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    return await response.json();
  } catch (error) {
    return rejected({
      message: error instanceof Error ? error.message : 'Неизвестная ошибка',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};
