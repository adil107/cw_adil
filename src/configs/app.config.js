const appConfig = {
  // apiPrefix: "https://cw-backend.minikubes.com/api/v1/",
  apiPrefix: process.env.REACT_APP_API_END_POINT,
  authenticatedEntryPath: "/merchant",
  unAuthenticatedEntryPath: "/sign-in",
  tourPath: "/",
  locale: "en",
  enableMock: true,
  project_key: "abcd12345"// Should include in .env

};

export default appConfig;
