
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const navigate = useNavigate();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="px-4 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button 
          className="text-sm text-primary font-medium story-link"
          onClick={() => navigate("/transactions")}
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="bg-card rounded-lg p-3.5 shadow-sm border border-border flex items-center justify-between card-hover"
            onClick={() => navigate(`/transactions/${transaction.id}`)}
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' : 
                                               'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownLeft className="h-5 w-5" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.title}</p>
                <p className="text-xs text-muted-foreground">{transaction.category} • {formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 
                                               'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
              </p>
              <button className="ml-2 h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}

        {transactions.length === 0 && (
          <div className="bg-muted rounded-lg p-6 text-center">
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
