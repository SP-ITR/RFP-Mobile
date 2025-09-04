const BASE_URL = "https://rfp-api.itrtechsystems.com/api/v1";

export async function login({ email, contact, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contact, password }),
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch (_e) {
    throw new Error(`Unexpected response: ${text?.slice(0, 200)}`);
  }

  if (!res.ok) {
    const msg = data?.message || res.statusText || "Login error";
    throw new Error(`${res.status} ${msg}`);
  }
  return data;
}

export async function register({
  firstName,
  lastName,
  contactNumber,
  email,
  password,
  confirmPassword,
}) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      contactNumber,
      email,
      password,
      confirmPassword,
    }),
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_e) {
    throw new Error(`Unexpected response: ${text?.slice(0, 200)}`);
  }

  if (!res.ok) {
    const msg = data?.message || res.statusText || "Register error";
    throw new Error(`${res.status} ${msg}`);
  }

  return data;
}