'use client';

import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatCurrency } from '../../utils/format';

type StatCard = {
  title: string;
  value: number;
  change: number;
  period: string;
};

type OverviewStatsProps = {
  stats: StatCard[];
};

export function OverviewStats({ stats }: OverviewStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal">{stat.title}</CardTitle>
            <div className={`rounded-full p-2 ${
              stat.change > 0 ? 'bg-green-500/10' : stat.change < 0 ? 'bg-red-500/10' : 'bg-blue-500/10'
            }`}>
              {stat.change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : stat.change < 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : (
                <DollarSign className="h-4 w-4 text-blue-500" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stat.value)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={`mr-1 ${
                stat.change > 0 ? 'text-green-500' : stat.change < 0 ? 'text-red-500' : ''
              }`}>
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </span>
              <span>from {stat.period}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 