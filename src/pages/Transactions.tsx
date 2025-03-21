
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { RecentTransactions, Transaction } from "@/components/dashboard/RecentTransactions";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([
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
    },
    {
      id: "5",
      title: "Freelance Work",
      amount: 350,
      date: "2023-07-05",
      category: "Income",
      type: "income"
    },
    {
      id: "6",
      title: "Amazon Purchase",
      amount: 35.97,
      date: "2023-07-03",
      category: "Shopping",
      type: "expense"
    },
    {
      id: "7",
      title: "Movie Tickets",
      amount: 24.50,
      date: "2023-07-01",
      category: "Entertainment",
      type: "expense"
    }
  ]);

  return (
    <>
      <Header 
        title="Transactions" 
        showAddButton 
        onAddClick={() => navigate("/transactions/add")} 
      />
      <PageTransition>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          <RecentTransactions transactions={transactions} />
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Transactions;
