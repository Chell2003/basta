
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown } from "lucide-react";
import { toast } from "sonner";

const accounts = [
  { id: "1", name: "Checking Account", balance: 2540.75 },
  { id: "2", name: "Savings Account", balance: 12350.42 },
  { id: "3", name: "Investment Account", balance: 5680.33 }
];

const Transfer = () => {
  const navigate = useNavigate();
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (fromAccount === toAccount) {
      toast.error("Cannot transfer to the same account");
      return;
    }

    toast.success("Transfer completed successfully!");
    
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Header title="Transfer Money" showBackButton />
      <PageTransition>
        <div className="p-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="fromAccount">From Account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="fromAccount" className="w-full">
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex justify-between w-full">
                        <span>{account.name}</span>
                        <span className="text-gray-500">${account.balance.toFixed(2)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-center">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <ArrowDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="toAccount">To Account</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger id="toAccount" className="w-full">
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex justify-between w-full">
                        <span>{account.name}</span>
                        <span className="text-gray-500">${account.balance.toFixed(2)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-7" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input 
                id="note" 
                placeholder="What's this transfer for?" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleTransfer} 
            className="w-full"
            size="lg"
          >
            Transfer Money
          </Button>
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Transfer;
