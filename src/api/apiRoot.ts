import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './buildClient';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// const getProject = () => {
//   return apiRoot.get().execute();
// };

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

export default apiRoot;