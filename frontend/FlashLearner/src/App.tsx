import { motion } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import { Auth } from './components/Auth';
import { FlashcardCreate } from './components/FlashcardCreate';
import { FlashcardReview } from './components/FlashcardReview';
import { Toaster } from 'react-hot-toast';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function App() {
  const { user, logout } = useAuthStore();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  if (!user) {
    return (
      <>
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Auth />
        </motion.div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      
      <motion.nav 
        className="bg-white shadow-sm"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                FlashLearner
              </span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <Card className="bg-gray-50">
                <CardContent className="flex items-center space-x-4 py-2">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700">{user.email}</span>
                </CardContent>
              </Card>
              
              <Button 
                variant="destructive"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.main 
        className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-4 py-6 sm:px-0">
          <Tabs defaultValue="review" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="review">Review Flashcards</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
            </TabsList>
            
            <TabsContent value="review">
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <FlashcardReview />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="create">
              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <FlashcardCreate />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.main>
    </div>
  );
}

export default App;