const URL = "https://productapi.cphmk.dk/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  // Check if the response has content
  if (
    res.status === 204 ||
    res.status === 205 ||
    res.headers.get("Content-Length") === "0"
  ) {
    return Promise.resolve(); // No content, resolve without parsing
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => localStorage.setItem("jwtToken", token);
  const getToken = () => localStorage.getItem("jwtToken");
  const logout = () => localStorage.removeItem("jwtToken");
  const loggedIn = () => getToken() != null;

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = getToken().split(".")[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      const roles = decodedClaims.roles;
      return roles;
    } else return "";
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(",");
    return loggedIn && roles.includes(neededRole);
  };

  const login = (username, password) => {
    const options = makeOptions("POST", false, { username, password }); // Adjust if backend expects different keys
    return fetch(`${URL}/auth/login`, options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const fetchData = (endpoint, method = "GET", body = null) => {
    const options = makeOptions(method, true, body);
    return fetch(`${URL}/${endpoint}`, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    const opts = {
      method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    login,
    logout,
    fetchData,
    loggedIn,
    getToken,
    setToken,
    hasUserAccess,
  };
}

const facade = apiFacade();
export default facade;
