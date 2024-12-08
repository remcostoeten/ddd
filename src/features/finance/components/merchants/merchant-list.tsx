'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatCurrency } from '../../utils/format';

type Merchant = {
  id: string;
  name: string;
  email: string;
  amount: number;
  avatarUrl?: string;
};

type MerchantListProps = {
  merchants: Merchant[];
};

export function MerchantList({ merchants }: MerchantListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-normal">Top merchants by payouts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  {merchant.avatarUrl && (
                    <AvatarImage src={merchant.avatarUrl} alt={merchant.name} />
                  )}
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {merchant.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{merchant.name}</p>
                  <p className="text-sm text-muted-foreground">{merchant.email}</p>
                </div>
              </div>
              <div className="text-sm font-medium">{formatCurrency(merchant.amount)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 