'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Settings, Move } from 'lucide-react'

type Widget = {
  id: string
  title: string
  component: React.ReactNode
}

const WorkoutSummary = () => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-2">Today's Workout</h4>
    <ul className="list-disc list-inside">
      <li>30 min Cardio</li>
      <li>3 sets of Squats</li>
      <li>3 sets of Bench Press</li>
    </ul>
  </div>
)

const NutritionTracker = () => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-2">Nutrition Summary</h4>
    <div className="flex justify-between">
      <span>Calories:</span>
      <span>1800 / 2000</span>
    </div>
    <div className="flex justify-between">
      <span>Protein:</span>
      <span>120g / 150g</span>
    </div>
  </div>
)

const FitnessGoals = () => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-2">Fitness Goals</h4>
    <ul className="list-disc list-inside">
      <li>Lose 5 lbs</li>
      <li>Run 5k under 25 minutes</li>
      <li>Increase bench press by 10%</li>
    </ul>
  </div>
)

const ProgressCharts = () => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-2">Progress</h4>
    <div className="h-40 flex items-end justify-between">
      <div className="w-8 bg-blue-500 h-1/4"></div>
      <div className="w-8 bg-blue-500 h-2/4"></div>
      <div className="w-8 bg-blue-500 h-3/4"></div>
      <div className="w-8 bg-blue-500 h-full"></div>
    </div>
  </div>
)

export default function CustomizableDashboard() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'workout', title: 'Workout Summary', component: <WorkoutSummary /> },
    { id: 'nutrition', title: 'Nutrition Tracker', component: <NutritionTracker /> },
    { id: 'goals', title: 'Fitness Goals', component: <FitnessGoals /> },
    { id: 'progress', title: 'Progress Charts', component: <ProgressCharts /> },
  ])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setWidgets(items)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Customizable Dashboard
        </h2>
        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
          <Settings size={20} />
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{widget.title}</h3>
                        <div {...provided.dragHandleProps} className="cursor-move">
                          <Move size={20} />
                        </div>
                      </div>
                      {widget.component}
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

