
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { state: 'CA', value: 2847, color: '#00D4FF' },
  { state: 'TX', value: 2634, color: '#00FFB3' },
  { state: 'FL', value: 2156, color: '#39FF14' },
  { state: 'NY', value: 1892, color: '#00D4FF' },
  { state: 'IL', value: 1654, color: '#00FFB3' },
  { state: 'PA', value: 1487, color: '#39FF14' },
  { state: 'OH', value: 1298, color: '#00D4FF' },
  { state: 'GA', value: 1187, color: '#00FFB3' },
];

const StatePerformanceChart = () => {
  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold gradient-text">Top Performing States</CardTitle>
        <p className="text-gray-400">Real-time policy volume by state</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="state" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-lg bg-dark-surface/50">
            <div className="text-2xl font-bold text-electric-blue">$127M</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-dark-surface/50">
            <div className="text-2xl font-bold text-electric-teal">+23%</div>
            <div className="text-sm text-gray-400">Month Growth</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatePerformanceChart;
