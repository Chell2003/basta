
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { BudgetOverview } from "@/components/budget/BudgetOverview";
import { BudgetCategory, BudgetCategoryProps } from "@/components/budget/BudgetCategory";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Budget = () => {
  const [categories, setCategories] = useState<BudgetCategoryProps[]>([
    {
      id: "1",
      name: "Food & Dining",
      spent: 350,
      limit: 500,
      color: "#4f46e5"
    },
    {
      id: "2",
      name: "Transportation",
      spent: 120,
      limit: 200,
      color: "#f59e0b"
    },
    {
      id: "3",
      name: "Entertainment",
      spent: 180,
      limit: 150,
      color: "#10b981"
    },
    {
      id: "4",
      name: "Shopping",
      spent: 250,
      limit: 300,
      color: "#ef4444"
    },
    {
      id: "5",
      name: "Utilities",
      spent: 130,
      limit: 150,
      color: "#8b5cf6"
    }
  ]);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  
  const categoryData = categories.map(cat => ({
    name: cat.name,
    spent: cat.spent,
    color: cat.color
  }));

  return (
    <>
      <Header title="Budget" showAddButton />
      <PageTransition>
        <div className="space-y-2 pt-4">
          <BudgetOverview 
            totalBudget={totalBudget}
            totalSpent={totalSpent}
            comparisonPercentage={-5}
            categories={categoryData}
          />
          
          <div className="px-4 space-y-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Categories</h3>
              <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add</span>
              </Button>
            </div>
            
            {categories.map(category => (
              <BudgetCategory key={category.id} {...category} />
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Budget;
