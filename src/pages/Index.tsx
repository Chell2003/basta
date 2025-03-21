
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ExpenseSummary } from "@/components/dashboard/ExpenseSummary";
import { RecentTransactions, Transaction } from "@/components/dashboard/RecentTransactions";

const Index = () => {
  const [loading, setLoading] = useState(true);

  // Mock data
  const expenseData = [
    { name: "Food", value: 350, color: "#4f46e5" },
    { name: "Transport", value: 120, color: "#f59e0b" },
    { name: "Shopping", value: 200, color: "#10b981" },
    { name: "Entertainment", value: 150, color: "#ef4444" },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Grocery Shopping",
      amount: 45.99,
      date: "2023-07-12",
      category: "Food",
      type: "expense"
    },
    {
      id: "2",
      title: "Salary",
      amount: 2500,
      date: "2023-07-10",
      category: "Income",
      type: "income"
    },
    {
      id: "3",
      title: "Restaurant",
      amount: 65.50,
      date: "2023-07-08",
      category: "Food",
      type: "expense"
    },
    {
      id: "4",
      title: "Uber Ride",
      amount: 12.99,
      date: "2023-07-07",
      category: "Transport",
      type: "expense"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <PageTransition>
        <div className="space-y-2 pt-4">
          <BalanceCard 
            totalBalance={5243} 
            percentChange={2.5} 
          />
          <QuickActions />
          <ExpenseSummary 
            data={expenseData} 
            totalSpent={820} 
          />
          <RecentTransactions transactions={transactions} />
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Index;
