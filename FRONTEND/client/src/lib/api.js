const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};

export const setAdminData = (admin) => {
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getAdminData = () => {
  const raw = localStorage.getItem("admin");
  return raw ? JSON.parse(raw) : null;
};

export const verifyToken = async () => {
  const token = getAuthToken();
  if (!token) return false;

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    removeAuthToken();
    return false;
  }

  return true;
};

export const registerAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const fetchLeads = async () => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch leads");
  }

  return response.json();
};

export const createLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      source: leadData.source,
      message: leadData.note,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create lead");
  }

  return data;
};

export const updateLeadStatus = async (leadId, status) => {
  const token = getAuthToken();

  const backendStatus =
    status === "New"
      ? "new"
      : status === "Contacted"
      ? "contacted"
      : "converted";

  const response = await fetch(`${API_BASE_URL}/leads/${leadId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: backendStatus }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
};

export const addLeadNote = async (leadId, text) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/leads/${leadId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add note");
  }

  return data;
};

export const deleteLead = async (leadId) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete lead");
  }

  return data;
};

/* email handler */
export const sendContactMessage = async (contactForm) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactForm),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message");
  }

  return data;
};