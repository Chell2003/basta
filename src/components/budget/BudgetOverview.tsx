
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
  comparisonPercentage?: number;
  categories: {
    name: string;
    spent: number;
    color: string;
  }[];
}

export const BudgetOverview = ({
  totalBudget,
  totalSpent,
  comparisonPercentage = 0,
  categories
}: BudgetOverviewProps) => {
  const remaining = totalBudget - totalSpent;
  const percentSpent = Math.round((totalSpent / totalBudget) * 100);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const data = [
    { name: "Spent", value: totalSpent, color: "#4f46e5" },
    { name: "Remaining", value: remaining, color: "#e5e7eb" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-5 mx-4 mb-6"
    >
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Monthly Budget</h3>
          <div 
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              comparisonPercentage >= 0 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
            }`}
          >
            {comparisonPercentage >= 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{Math.abs(comparisonPercentage)}%</span>
          </div>
        </div>
        
        <div className="flex">
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <h4 className="text-2xl font-bold">{formatCurrency(totalBudget)}</h4>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Spent</span>
                  <span className="font-medium">{formatCurrency(totalSpent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining</span>
                  <span className="font-medium">{formatCurrency(remaining)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xl font-bold"
                  fill="#1f2937"
                >
                  {percentSpent}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
