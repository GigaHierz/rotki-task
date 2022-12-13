import fetch from "isomorphic-unfetch";

function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "content-type": "application/json" };
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(`http://localhost:3000/${endpoint}`, config).then(async (r) => {
    if (r.status === 401) {
      return;
    }
    const data = await r.json();
    if (r.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
