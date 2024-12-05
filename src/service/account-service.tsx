//  eslint-disable quote-props
//   eslint-disable key-spacing

export interface UserInfo {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  token: string;
}

interface UserResponse {
  user: {
    email: string;
    username: string;
    token: string;
  };
}

export const createAccount = async (
  userInfo: UserInfo,
  rejected: (error: Error) => void
): Promise<UserResponse | undefined> => {
  const user = {
    user: {
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
    },
  };

  try {
    const signUpRequest = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!signUpRequest.ok) {
      const errorData = await signUpRequest.json();
      throw new Error(`Error: ${signUpRequest.status} - ${errorData.message || 'Unknown error'}`);
    }

    const successRegistration: UserResponse = await signUpRequest.json();
    return successRegistration;
  } catch (error) {
    rejected(error as Error);
    return undefined;
  }
};

export const enterAccount = async (
  userInfo: Omit<UserInfo, 'username' | 'avatar'>,
  rejected: (error: Error) => void
): Promise<UserResponse | undefined> => {
  const user = { user: { email: userInfo.email, password: userInfo.password } };
  try {
    const signInRequest = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!signInRequest.ok) {
      throw new Error('error in signInRequest');
    }
    const successSignIn: UserResponse = await signInRequest.json();
    return successSignIn;
  } catch (error) {
    rejected(error as Error);
  }
};

export const editProfile = async (
  userInfo: UserInfo,
  rejected: (error: Error) => void
): Promise<UserResponse | undefined> => {
  try {
    const user = {
      user: {
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        image: userInfo.avatar,
      },
    };
    const editProfileRequest = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${userInfo.token}` },
      body: JSON.stringify(user),
    });
    if (!editProfileRequest.ok) {
      throw new Error('error in editProfileRequest');
    }
    const successEdition: UserResponse = await editProfileRequest.json();
    return successEdition;
  } catch (error) {
    rejected(error as Error);
  }
};
