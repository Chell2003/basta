
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Trash2 } from "lucide-react";
import { useState } from "react";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true
    },
    {
      id: "2",
      type: "mastercard",
      last4: "8888",
      expiry: "12/24",
      isDefault: false
    }
  ]);

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const getCardLogo = (type: string) => {
    switch (type) {
      case "visa": return "Visa";
      case "mastercard": return "MasterCard";
      case "amex": return "American Express";
      default: return "Card";
    }
  };

  return (
    <>
      <Header title="Payment Methods" showBackButton />
      <PageTransition>
        <div className="p-4 pb-20 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Your Cards</h2>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </Button>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                className="bg-card rounded-lg p-4 shadow-sm border border-border relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{getCardLogo(method.type)}</p>
                      <p className="text-sm text-muted-foreground">•••• {method.last4}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDelete(method.id)}
                      className="p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 text-sm">
                  <span className="text-muted-foreground">Expires: {method.expiry}</span>
                  {method.isDefault ? (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Default
                    </span>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleSetDefault(method.id)}
                      className="text-xs h-7"
                    >
                      Set as default
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default PaymentMethods;
