import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';

function DashboardCard({ title, value, subtitle, onClick, className = '' }) {
  return (
    <Card
      className={`rounded-xl bg-white border shadow-sm transition-shadow ${className}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm text-amber-400 font-bold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold py-1">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
