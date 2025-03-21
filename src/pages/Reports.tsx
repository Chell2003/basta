
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, AreaChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, Area } from "recharts";
import { CalendarIcon, Download } from "lucide-react";
import { motion } from "framer-motion";

const monthlyData = [
  { name: 'Jan', income: 2400, expenses: 1800 },
  { name: 'Feb', income: 2100, expenses: 1600 },
  { name: 'Mar', income: 2700, expenses: 2000 },
  { name: 'Apr', income: 2900, expenses: 2200 },
  { name: 'May', income: 2500, expenses: 1900 },
  { name: 'Jun', income: 3000, expenses: 2100 },
];

const categoryData = [
  { name: 'Food', value: 35 },
  { name: 'Transport', value: 15 },
  { name: 'Bills', value: 25 },
  { name: 'Shopping', value: 15 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#4f46e5', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

const Reports = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Header title="Reports" showBackButton />
      <PageTransition>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Financial Reports</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Period</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-medium mb-3">Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4f46e5" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-medium mb-3">Expense Breakdown</h3>
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="income" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-medium mb-3">Monthly Income</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="income" stroke="#4f46e5" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="expenses" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-medium mb-3">Expense Categories</h3>
                <div className="flex justify-center">
                  <ResponsiveContainer width={300} height={200}>
                    <BarChart layout="vertical" data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
      <BottomNavigation />
    </>
  );
};

export default Reports;
