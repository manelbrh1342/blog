import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  trend: 'up' | 'down' | 'neutral';
}

const StatCard = ({ title, value, percentage, trend }: StatCardProps) => {
  let trendColor = 'text-gray-500';
  let Icon = Minus;

  if (trend === 'up') {
    trendColor = 'text-green-700';
    Icon = TrendingUp;
  } else if (trend === 'down') {
    trendColor = 'text-red-500';
    Icon = TrendingDown;
  }

  return (
    <div className="bg-[#8FB3E6] bg-opacity-20 p-4 rounded-xl flex flex-col justify-between h-24">
      <div>
        <h3 className="text-xs font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-xl font-bold text-[#004DA6]">{value}</p>
      </div>
      <div className={`flex items-center text-[10px] font-medium ${trendColor}`}>
        <span>{percentage}</span>
        <Icon className="w-3 h-3 ml-1" />
      </div>
    </div>
  );
};

export default function StatsHighlights() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Generate a random user ID for simulation
    const userId = Math.floor(Math.random() * 1000);
    fetch(`http://127.0.0.1:5000/api/stats?userId=${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load stats. Ensure backend is running.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading stats...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!data) return null;

  const { activityData, categoryData, statusData, summaryCards } = data;

  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-[#004DA6]">Stats & Highlights</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card: StatCardProps, index: number) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        {/* Activity Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#004DA6]">Activity</h2>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#004DA6] mr-2"></span>
                <span className="text-gray-600">This year</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-200 mr-2"></span>
                <span className="text-gray-600">Last year</span>
              </div>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="thisYear" stroke="#004DA6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="lastYear" stroke="#BFDBFE" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Articles by Category */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-[#004DA6] mb-4">Articles by Category</h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} barSize={15}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="count" radius={[4, 4, 4, 4]}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {categoryData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.name === 'Tech' ? '#60A5FA' :
                          entry.name === 'Health' ? '#6EE7B7' :
                            entry.name === 'Sport' ? '#86EFAC' :
                              entry.name === 'Game' ? '#000000' :
                                entry.name === 'Lifestyle' ? '#93C5FD' : '#C4B5FD'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Articles Distribution */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-[#004DA6] mb-4">Articles Distribution by Status</h2>
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {statusData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ fontSize: '10px' }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value, entry: any) => (
                      <span className="text-xs text-gray-600 ml-2">{value} <span className="ml-2 font-semibold">{entry.payload.value}%</span></span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
