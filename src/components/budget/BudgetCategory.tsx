
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BudgetCategoryProps {
  id: string;
  name: string;
  spent: number;
  limit: number;
  color: string;
}

export const BudgetCategory = ({
  id,
  name,
  spent,
  limit,
  color
}: BudgetCategoryProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const percentage = Math.min(Math.round((spent / limit) * 100), 100);
  const remaining = limit - spent;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="bg-card rounded-lg p-4 shadow-sm mb-3 card-hover border border-border"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{name}</h3>
          <span className={cn(
            "text-sm font-semibold",
            percentage >= 100 ? "text-red-600 dark:text-red-400" : 
            percentage >= 80 ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"
          )}>
            {formatCurrency(spent)} / {formatCurrency(limit)}
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: percentage >= 100 ? '#ef4444' : 
                                  percentage >= 80 ? '#f59e0b' : color
              }} 
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentage}% spent</span>
            <span>{formatCurrency(remaining)} left</span>
          </div>
        </div>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t mt-2 border-border"
          >
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily budget</span>
                <span className="font-medium">{formatCurrency(limit / 30)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Spent today</span>
                <span className="font-medium">{formatCurrency(spent / 30)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
