import { Spinner } from '@/components/ui/spinner';
import { useGetDailySales, useGetDashboardData } from '@/hooks/Admin/Admin.hook';
import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
const DashboardAnalytic = () => {
    const { data: summary, isLoading: summaryLoading } = useGetDashboardData();

  // Date range: last 7 days
  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6); // last 7 days
    end.setDate(end.getDate()+2)

    const toStr = (d) => d.toISOString().split("T")[0];

    return {
      startDate: toStr(start),
      endDate: toStr(end),
    };
  }, []);

  const { data: dailySales, isLoading: dailyLoading } = useGetDailySales(
    startDate,
    endDate
  );

  if (summaryLoading || dailyLoading) return <div className='h-screen w-screen flex items-center justify-center'><Spinner /></div>;

  return (
    <div className='w-[80%] h-screen'>
      <div className="p-6 space-y-6 ">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Users" value={summary?.users ?? 0} />
        <StatCard title="Products in Catalog" value={summary?.products ?? 0} />
        <StatCard title="Total Orders" value={summary?.totalSales ?? 0} />
        <StatCard
          title="Total Revenue"
          value={`$${summary?.totalRevenue?.toFixed(2) ?? "0.00"}`}
        />
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Daily Sales (Last 7 days)
        </h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                name="Sales"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    </div>
    
  )
}

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);
export default DashboardAnalytic