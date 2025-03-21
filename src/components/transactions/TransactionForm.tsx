
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  CalendarIcon, 
  ChevronDown, 
  Tag 
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TransactionFormData {
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "income" | "expense";
  note?: string;
}

interface TransactionFormProps {
  initialData?: Partial<TransactionFormData>;
  onSubmit: (data: TransactionFormData) => void;
  isEditing?: boolean;
}

export const TransactionForm = ({
  initialData = {},
  onSubmit,
  isEditing = false
}: TransactionFormProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<TransactionFormData>({
    title: initialData.title || "",
    amount: initialData.amount || 0,
    date: initialData.date || new Date().toISOString().split('T')[0],
    category: initialData.category || "Food",
    type: initialData.type || "expense",
    note: initialData.note || ""
  });

  const categories = [
    "Food", "Transport", "Shopping", "Entertainment", 
    "Healthcare", "Housing", "Utilities", "Education", 
    "Salary", "Gift", "Other"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-6 px-4"
    >
      <div className="flex rounded-lg overflow-hidden">
        <button
          type="button"
          className={cn(
            "flex-1 py-3 flex justify-center items-center gap-2 text-center font-medium transition-colors",
            data.type === "expense" 
              ? "bg-red-600 text-white" 
              : "bg-gray-200 text-gray-500"
          )}
          onClick={() => setData({ ...data, type: "expense" })}
        >
          <ArrowDownLeft className="h-4 w-4" />
          Expense
        </button>
        <button
          type="button"
          className={cn(
            "flex-1 py-3 flex justify-center items-center gap-2 text-center font-medium transition-colors",
            data.type === "income" 
              ? "bg-green-600 text-white" 
              : "bg-gray-200 text-gray-500"
          )}
          onClick={() => setData({ ...data, type: "income" })}
        >
          <ArrowUpRight className="h-4 w-4" />
          Income
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="block w-full rounded-lg border-gray-300 pl-8 py-3 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="E.g., Grocery shopping"
            className="block w-full rounded-lg border-gray-300 py-3 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-gray-500" />
            </div>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="block w-full rounded-lg border-gray-300 pl-10 py-3 shadow-sm focus:border-primary focus:ring-primary appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="block w-full rounded-lg border-gray-300 pl-10 py-3 shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            name="note"
            value={data.note}
            onChange={handleChange}
            placeholder="Add a note..."
            rows={3}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          className={cn(
            "w-full py-3 rounded-lg font-medium text-white transition-colors",
            data.type === "expense" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          )}
        >
          {isEditing ? "Update" : "Save"} {data.type === "expense" ? "Expense" : "Income"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
};
