import { useAuthStore } from './store/authStore';
import { Auth } from './components/Auth';
import { FlashcardCreate } from './components/FlashcardCreate';
import { FlashcardReview } from './components/FlashcardReview';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <>
        <Toaster position="top-right" />
        <Auth />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">FlashLearner</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <FlashcardReview />
          <FlashcardCreate />
        </div>
      </main>
    </div>
  );
}

export default App;