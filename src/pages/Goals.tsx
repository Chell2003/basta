
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { FinancialGoalCard, FinancialGoalProps } from "@/components/goals/FinancialGoalCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Goals = () => {
  const [goals, setGoals] = useState<FinancialGoalProps[]>([
    {
      id: "1",
      name: "Vacation",
      targetAmount: 3000,
      currentAmount: 1250,
      targetDate: "2023-12-15",
      color: "#4f46e5"
    },
    {
      id: "2",
      name: "New Car",
      targetAmount: 25000,
      currentAmount: 8500,
      targetDate: "2024-06-30",
      color: "#f59e0b"
    },
    {
      id: "3",
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6500,
      targetDate: "2023-10-31",
      color: "#10b981"
    },
    {
      id: "4",
      name: "Home Down Payment",
      targetAmount: 50000,
      currentAmount: 15000,
      targetDate: "2025-01-15",
      color: "#8b5cf6"
    }
  ]);

  return (
    <>
      <Header title="Goals" showAddButton />
      <PageTransition>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Financial Goals</h2>
            <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Goal</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            {goals.map(goal => (
              <FinancialGoalCard key={goal.id} {...goal} />
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Goals;
