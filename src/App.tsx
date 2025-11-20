
import './App.css'
import './index.css'


// src/App.tsx
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Tailwind Works!
        </h1>
        <p className="text-gray-700">
          If you see this styled card, your Tailwind setup is correct.
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Click Me
        </button>
      </div>
    </div>
  )
}


