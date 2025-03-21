
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  ChevronRight 
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpSupport = () => {
  const faqItems = [
    {
      question: "How do I add a new transaction?",
      answer: "You can add a new transaction by going to the Transactions tab and tapping on the '+' button in the top right corner."
    },
    {
      question: "How do I create a budget?",
      answer: "Navigate to the Budget section from the bottom navigation bar, then tap 'Create Budget' to set up a new budget category."
    },
    {
      question: "Can I export my financial data?",
      answer: "Yes, you can export your data in CSV or PDF format from the Reports section. Look for the download icon in the top right corner."
    },
    {
      question: "How do I change my password?",
      answer: "Go to Settings > Security, and you'll find the option to change your password under the Security section."
    },
    {
      question: "How do I link my bank account?",
      answer: "Go to Accounts tab, tap 'Add Account', and follow the prompts to securely link your bank account."
    }
  ];
  
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: () => console.log("Open live chat")
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Call our support line",
      action: () => console.log("Call support")
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      action: () => console.log("Send email")
    },
    {
      icon: FileText,
      title: "Help Center",
      description: "Browse our help articles",
      action: () => console.log("Open help center")
    }
  ];

  return (
    <>
      <Header title="Help & Support" showBackButton />
      <PageTransition>
        <div className="p-4 pb-20 space-y-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Contact Us</h3>
            </div>
            
            <div>
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                  onClick={method.action}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{method.title}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-medium">Frequently Asked Questions</h3>
            </div>
            
            <div className="p-4">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default HelpSupport;
