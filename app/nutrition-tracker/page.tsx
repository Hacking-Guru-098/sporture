'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const initialMeals = [
  { id: 1, name: 'Breakfast', calories: 400, protein: 20, carbs: 50, fat: 15 },
  { id: 2, name: 'Lunch', calories: 600, protein: 30, carbs: 70, fat: 20 },
  { id: 3, name: 'Dinner', calories: 500, protein: 25, carbs: 60, fat: 18 },
]

export default function NutritionTracker() {
  const [meals, setMeals] = useState(initialMeals)
  const [showForm, setShowForm] = useState(false)
  const [newMeal, setNewMeal] = useState({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault()
    setMeals([...meals, { ...newMeal, id: Date.now() }])
    setNewMeal({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0 })
    setShowForm(false)
  }

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const totalNutrients = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const macroData = [
    { name: 'Protein', value: totalNutrients.protein },
    { name: 'Carbs', value: totalNutrients.carbs },
    { name: 'Fat', value: totalNutrients.fat },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Nutrition Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Daily Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Total Calories</p>
              <p className="text-2xl font-semibold">{totalNutrients.calories} kcal</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Protein</p>
              <p className="text-xl">{totalNutrients.protein}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Carbs</p>
              <p className="text-xl">{totalNutrients.carbs}g</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Fat</p>
              <p className="text-xl">{totalNutrients.fat}g</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Macronutrient Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Meals</h2>
        {meals.map((meal) => (
          <div key={meal.id} className="flex justify-between items-center mb-4 bg-gray-700 rounded-lg p-4">
            <div>
              <p className="font-semibold">{meal.name}</p>
              <p className="text-sm text-gray-400">
                {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
              </p>
            </div>
            <button
              onClick={() => handleDeleteMeal(meal.id)}
              className="p-2 rounded-full hover:bg-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </motion.div>

      {!showForm && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-500 text-white rounded-lg p-4 flex items-center justify-center"
        >
          <Plus size={24} className="mr-2" />
          Add New Meal
        </motion.button>
      )}

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleAddMeal}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Add New Meal</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Meal Name
            </label>
            <input
              type="text"
              id="name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="w-full bg-gray-700 rounded-lg p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-gray-400 mb-2">
                Calories
              </label>
              <input
                type="number"
                id="calories"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="protein" className="block text-sm font-medium text-gray-400 mb-2">
                Protein (g)
              </label>
              <input
                type="number"
                id="protein"
                value={newMeal.protein}
                onChange={(e) => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="carbs" className="block text-sm font-medium text-gray-400 mb-2">
                Carbs (g)
              </label>
              <input
                type="number"
                id="carbs"
                value={newMeal.carbs}
                onChange={(e) => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="fat" className="block text-sm font-medium text-gray-400 mb-2">
                Fat (g)
              </label>
              <input
                type="number"
                id="fat"
                value={newMeal.fat}
                onChange={(e) => setNewMeal({ ...newMeal, fat: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-lg p-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mr-4 px-4 py-2 bg-gray-700 rounded-full text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 rounded-full text-sm">
              Add Meal
            </button>
          </div>
        </motion.form>
      )}
    </div>
  )
}

