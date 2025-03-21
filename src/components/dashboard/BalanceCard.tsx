
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BalanceCardProps {
  totalBalance: number;
  currency?: string;
  percentChange?: number;
  periodLabel?: string;
}

export const BalanceCard = ({
  totalBalance,
  currency = "$",
  percentChange = 0,
  periodLabel = "This month"
}: BalanceCardProps) => {
  const isPositive = percentChange >= 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-xl p-5 mx-4 mb-6"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">Total Balance</p>
          <h2 className="text-3xl font-bold tracking-tight">
            {formatCurrency(totalBalance)}
          </h2>
        </div>
        
        <div className="flex items-center justify-between">
          <div 
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
              isPositive ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : 
                          "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{Math.abs(percentChange)}%</span>
          </div>
          <p className="text-sm text-muted-foreground">{periodLabel}</p>
        </div>
      </div>
    </motion.div>
  );
};
