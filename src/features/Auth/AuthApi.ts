
// Mock Auth API
export const signupUser = async (userData: any) => {
  return Promise.resolve({
    token: "mock-token-123",
    user: {
      id: "user-1", // Using existing user ID from users.ts if possible, or just mock
      ...userData
    }
  });
};

export const loginUser = async (loginData: any) => {
  // Simulate successful login for any credentials
  return Promise.resolve({
    token: "mock-token-123",
    user: {
      id: "user-1",
      email: loginData.email,
      name: "Tech Vision", // consistent with users.ts
    }
  });
};
