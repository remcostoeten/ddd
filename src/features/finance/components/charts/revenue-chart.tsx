'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatCurrency } from '../../utils/format';

type RevenueChartProps = {
  data: Array<{
    date: Date;
    revenue: number;
    transactions: number;
  }>;
  period?: string;
};

export function RevenueChart({ data, period = 'Last 7 days' }: RevenueChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: format(item.date, 'EEE dd'),
  }));

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Revenue growth</CardTitle>
        <div className="text-xs text-muted-foreground">{period}</div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3ECF8E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3ECF8E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2E2E2E" />
              <XAxis 
                dataKey="date" 
                stroke="#888888" 
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#2E2E2E' }}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#2E2E2E' }}
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const revenueValue = payload[0]?.value ?? 0;
                    const transactionsValue = payload[1]?.value ?? 0;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Revenue
                            </span>
                            <span className="font-bold text-green-500">
                              {formatCurrency(revenueValue as number)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Transactions
                            </span>
                            <span className="font-bold">
                              {transactionsValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3ECF8E"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="transactions"
                stroke="#888888"
                fillOpacity={0.2}
                fill="#888888"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 