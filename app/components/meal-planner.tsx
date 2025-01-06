'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Utensils, ChevronRight } from 'lucide-react'

type Meal = {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

const mockMeals: Meal[] = [
  { id: 1, name: 'Grilled Chicken Salad', calories: 350, protein: 30, carbs: 15, fat: 20 },
  { id: 2, name: 'Vegetarian Stir Fry', calories: 400, protein: 15, carbs: 50, fat: 15 },
  { id: 3, name: 'Salmon with Quinoa', calories: 450, protein: 35, carbs: 30, fat: 25 },
  { id: 4, name: 'Greek Yogurt Parfait', calories: 300, protein: 20, carbs: 40, fat: 10 },
]

export default function MealPlanner() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Meal Planner & Recipes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Suggested Meals</h3>
          {mockMeals.map((meal, index) => (
            <motion.button
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedMeal(meal)}
              className="w-full text-left bg-gray-700 rounded-lg p-3 mb-2 hover:bg-gray-600 transition-colors flex items-center justify-between"
            >
              <span>{meal.name}</span>
              <ChevronRight size={20} />
            </motion.button>
          ))}
        </div>
        <div>
          {selectedMeal ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-700 rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold mb-3">{selectedMeal.name}</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Calories</p>
                  <p className="font-semibold">{selectedMeal.calories}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Protein</p>
                  <p className="font-semibold">{selectedMeal.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Carbs</p>
                  <p className="font-semibold">{selectedMeal.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Fat</p>
                  <p className="font-semibold">{selectedMeal.fat}g</p>
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors flex items-center justify-center">
                <Utensils size={20} className="mr-2" />
                View Recipe
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a meal to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

