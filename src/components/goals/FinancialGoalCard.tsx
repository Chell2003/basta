
import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FinancialGoalProps {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  color?: string;
}

export const FinancialGoalCard = ({
  id,
  name,
  targetAmount,
  currentAmount,
  targetDate,
  color = "#4f46e5"
}: FinancialGoalProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const progressPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const remainingAmount = targetAmount - currentAmount;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const today = new Date();
  const endDate = new Date(targetDate);
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="bg-card rounded-lg p-4 shadow-sm mb-3 card-hover dark:shadow-none"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${color}20` }}
            >
              <PiggyBank className="h-5 w-5" style={{ color }} />
            </div>
            <h3 className="font-medium text-foreground">{name}</h3>
          </div>
          <button 
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent"
            onClick={e => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Goal</span>
            <span className="font-medium text-foreground">{formatCurrency(targetAmount)}</span>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ width: `${progressPercentage}%`, backgroundColor: color }} 
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{progressPercentage}% saved</span>
            <span className="text-muted-foreground">{formatCurrency(currentAmount)} of {formatCurrency(targetAmount)}</span>
          </div>
        </div>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-border mt-2"
          >
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target date</span>
                <span className="font-medium text-foreground">{formatDate(targetDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-foreground">{formatCurrency(remainingAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days left</span>
                <span className={cn(
                  "font-medium",
                  daysRemaining < 30 ? "text-destructive" : "text-foreground"
                )}>
                  {daysRemaining}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
