
import { PlusCircle, ArrowLeftRight, Wallet, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      icon: PlusCircle,
      label: "Add Expense",
      color: "bg-blue-50 text-blue-600",
      onClick: () => navigate("/transactions/add")
    },
    {
      icon: ArrowLeftRight,
      label: "Transfer",
      color: "bg-purple-50 text-purple-600",
      onClick: () => navigate("/transfers")
    },
    {
      icon: Wallet,
      label: "Accounts",
      color: "bg-green-50 text-green-600",
      onClick: () => navigate("/accounts")
    },
    {
      icon: BarChart2,
      label: "Reports",
      color: "bg-amber-50 text-amber-600",
      onClick: () => navigate("/reports")
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="px-4 mb-6"
    >
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="flex flex-col items-center"
            onClick={action.onClick}
          >
            <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-2 card-hover`}>
              <action.icon size={20} />
            </div>
            <span className="text-xs font-medium text-gray-700">{action.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
