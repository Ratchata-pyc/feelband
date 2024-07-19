// สำหรับจัดการ API calls
export const fetchUsers = async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
};

export const fetchUserById = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};
