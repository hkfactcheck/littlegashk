export const host = process.env.REACT_APP_API_HOST;
export const header = user => (user ? {
  headers: { Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}` },
} : {});
