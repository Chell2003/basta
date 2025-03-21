
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { TransactionForm, TransactionFormData } from "@/components/transactions/TransactionForm";
import { toast } from "sonner";

const TransactionAdd = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: TransactionFormData) => {
    console.log("New transaction:", data);
    
    // In a real app, we'd save this to the database
    // For now, just show success and navigate back
    toast.success(`${data.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
    
    setTimeout(() => {
      navigate("/transactions");
    }, 500);
  };

  return (
    <>
      <Header showBackButton title={`New Transaction`} showNotification={false} />
      <PageTransition>
        <div className="py-4">
          <TransactionForm onSubmit={handleSubmit} />
        </div>
      </PageTransition>
    </>
  );
};

export default TransactionAdd;
