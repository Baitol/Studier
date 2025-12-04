import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
export default function ProtectedRoute() {
  const [user, setUser] = useState(undefined); // undefined = ще грузимо

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const token = storedUser ? JSON.parse(storedUser).token : null;
    console.log(token);
    async function fetchUser() {
      const fetchedUser = await getUser(token);
      setUser(fetchedUser); // або null, або юзер
    }
    console.log(user);
    fetchUser();
  }, []);

  // Поки грузиться (undefined) — нічого не показуємо
  if (user === undefined) return null;

  // Якщо null → редірект
  return user ?
    <AppLayout>
      <Outlet />
    </AppLayout>
    : <Navigate to="/signin" replace />;
}

async function getUser(token: string) {
  const url = "http://127.0.0.1:8000/api/getUser";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
}
