// src/hooks/useGetDashboardData.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const dashboardApi = async () => {
  const res = await axios.get(`${baseURL}/analytic/getData`, {
    withCredentials: true,
  });
  return res.data; // { users, products, totalSales, totalRevenue }
};

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardApi,
  });
};




const dailySalesApi = async (startDate, endDate) => {
  const res = await axios.get(`${baseURL}/analytic/dailySales`, {
    params: { startDate, endDate },
    withCredentials: true,
  });
  return res.data; // [{ date, sales, revenue }]
};

export const useGetDailySales = (startDate, endDate) => {
  return useQuery({
    queryKey: ["daily-sales", startDate, endDate],
    queryFn: () => dailySalesApi(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};
