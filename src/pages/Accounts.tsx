
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronRight, Wallet, CreditCard, LineChart } from "lucide-react";
import { motion } from "framer-motion";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  icon: React.ElementType;
  color: string;
}

const accounts: Account[] = [
  {
    id: "1",
    name: "Checking Account",
    type: "Bank Account",
    balance: 2540.75,
    icon: Wallet,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300"
  },
  {
    id: "2",
    name: "Savings Account",
    type: "Bank Account",
    balance: 12350.42,
    icon: Wallet,
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300"
  },
  {
    id: "3",
    name: "Credit Card",
    type: "Credit",
    balance: -450.33,
    icon: CreditCard, 
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300"
  },
  {
    id: "4",
    name: "Investment Portfolio",
    type: "Investment",
    balance: 5680.33,
    icon: LineChart,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300"
  }
];

const Accounts = () => {
  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0);
  
  return (
    <>
      <Header title="Accounts" showBackButton showAddButton />
      <PageTransition>
        <div className="p-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary/10 rounded-xl p-5 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
            <h2 className="text-3xl font-bold text-primary">${totalBalance.toFixed(2)}</h2>
          </motion.div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Your Accounts</h3>
              <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>Add</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-lg overflow-hidden shadow-sm border border-border"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${account.color} flex items-center justify-center`}>
                        <account.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-xs text-muted-foreground">{account.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${account.balance < 0 ? 'text-red-500 dark:text-red-400' : ''}`}>
                        ${Math.abs(account.balance).toFixed(2)}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Accounts;
