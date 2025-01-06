'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Calendar, Dumbbell, Clock, ChevronLeft, ChevronRight, Star, TrendingUp } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type Exercise = {
  id: string
  name: string
  sets: number
  reps: number
  weight: number
}

type Workout = {
  id: number
  title: string
  exercises: Exercise[]
  date: string
  rating: number
  duration: number
}

type WorkoutTemplate = {
  id: number
  title: string
  exercises: Exercise[]
}

type ProgressData = {
  date: string
  totalWeight: number
}

const exerciseLibrary: Exercise[] = [
  { id: 'squat', name: 'Squat', sets: 3, reps: 10, weight: 100 },
  { id: 'bench-press', name: 'Bench Press', sets: 3, reps: 8, weight: 135 },
  { id: 'deadlift', name: 'Deadlift', sets: 3, reps: 5, weight: 185 },
  { id: 'pull-up', name: 'Pull-up', sets: 3, reps: 8, weight: 0 },
  { id: 'shoulder-press', name: 'Shoulder Press', sets: 3, reps: 10, weight: 65 },
]

const workoutTemplates: WorkoutTemplate[] = [
  {
    id: 1,
    title: 'Full Body Workout',
    exercises: [
      { id: 'squat', name: 'Squat', sets: 3, reps: 10, weight: 100 },
      { id: 'bench-press', name: 'Bench Press', sets: 3, reps: 8, weight: 135 },
      { id: 'deadlift', name: 'Deadlift', sets: 3, reps: 5, weight: 185 },
    ],
  },
  {
    id: 2,
    title: 'Upper Body Focus',
    exercises: [
      { id: 'bench-press', name: 'Bench Press', sets: 4, reps: 8, weight: 135 },
      { id: 'pull-up', name: 'Pull-up', sets: 3, reps: 8, weight: 0 },
      { id: 'shoulder-press', name: 'Shoulder Press', sets: 3, reps: 10, weight: 65 },
    ],
  },
]

const WorkoutStatistics = ({ workouts }: { workouts: Workout[] }) => {
  const totalWorkouts = workouts.length
  const averageRating = workouts.reduce((sum, workout) => sum + workout.rating, 0) / totalWorkouts || 0
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
  const averageDuration = totalDuration / totalWorkouts || 0

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Workout Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Workouts</h3>
          <p className="text-3xl font-bold">{totalWorkouts}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
          <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Average Duration</h3>
          <p className="text-3xl font-bold">{averageDuration.toFixed(0)} min</p>
        </div>
      </div>
    </div>
  )
}

const ProgressTracker = ({ workouts }: { workouts: Workout[] }) => {
  const progressData: ProgressData[] = workouts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(workout => ({
      date: workout.date,
      totalWeight: workout.exercises.reduce((sum, exercise) => sum + exercise.sets * exercise.reps * exercise.weight, 0)
    }))

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Progress Tracker</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalWeight" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function WorkoutPlanner() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newWorkout, setNewWorkout] = useState<Workout>({
    id: 0,
    title: '',
    exercises: [],
    date: new Date().toISOString().split('T')[0],
    rating: 0,
    duration: 0,
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState<'calendar' | 'list' | 'stats'>('calendar')

  useEffect(() => {
    const storedWorkouts = localStorage.getItem('workouts')
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts))
  }, [workouts])

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault()
    setWorkouts([...workouts, { ...newWorkout, id: Date.now() }])
    setNewWorkout({
      id: 0,
      title: '',
      exercises: [],
      date: new Date().toISOString().split('T')[0],
      rating: 0,
      duration: 0,
    })
    setShowForm(false)
  }

  const handleDeleteWorkout = (id: number) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  const handleAddExercise = (exercise: Exercise) => {
    setNewWorkout({
      ...newWorkout,
      exercises: [...newWorkout.exercises, { ...exercise, id: Date.now().toString() }],
    })
  }

  const handleRemoveExercise = (id: string) => {
    setNewWorkout({
      ...newWorkout,
      exercises: newWorkout.exercises.filter((exercise) => exercise.id !== id),
    })
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const exercises = Array.from(newWorkout.exercises)
    const [reorderedItem] = exercises.splice(result.source.index, 1)
    exercises.splice(result.destination.index, 0, reorderedItem)

    setNewWorkout({
      ...newWorkout,
      exercises,
    })
  }

  const handleApplyTemplate = (template: WorkoutTemplate) => {
    setNewWorkout({
      ...newWorkout,
      title: template.title,
      exercises: template.exercises.map(exercise => ({ ...exercise, id: Date.now().toString() })),
    })
  }

  const handleRateWorkout = (id: number, rating: number) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, rating } : workout
    ))
  }

  const renderCalendar = () => {
    const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
    const days = []

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const date = new Date(d)
      const dateString = date.toISOString().split('T')[0]
      const dayWorkouts = workouts.filter(workout => workout.date === dateString)

      days.push(
        <div key={dateString} className="border p-2 h-24 overflow-y-auto">
          <div className="font-bold">{date.getDate()}</div>
          {dayWorkouts.map(workout => (
            <div key={workout.id} className="text-xs bg-blue-500 text-white p-1 mb-1 rounded">
              {workout.title}
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-center">{day}</div>
        ))}
        {days}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Workout Planner
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-lg ${view === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          >
            <Calendar className="inline-block mr-2" size={20} />
            Calendar
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          >
            <Dumbbell className="inline-block mr-2" size={20} />
            Workouts
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-4 py-2 rounded-lg ${view === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}
          >
            <TrendingUp className="inline-block mr-2" size={20} />
            Stats
          </button>
        </div>
        {view === 'calendar' && (
          <div className="flex items-center space-x-2">
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
              <ChevronLeft size={24} />
            </button>
            <span className="text-lg font-semibold">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {view === 'calendar' && renderCalendar()}

      {view === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Your Workout Schedule</h2>
          {workouts.map((workout) => (
            <div key={workout.id} className="flex justify-between items-center mb-4 bg-gray-700 rounded-lg p-4">
              <div>
                <p className="font-semibold">{workout.title}</p>
                <p className="text-sm text-gray-400">
                  {workout.date} - {workout.exercises.length} exercises - {workout.duration} min
                </p>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`cursor-pointer ${star <= workout.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                      onClick={() => handleRateWorkout(workout.id, star)}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDeleteWorkout(workout.id)}
                className="p-2 rounded-full hover:bg-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {view === 'stats' && (
        <>
          <WorkoutStatistics workouts={workouts} />
          <ProgressTracker workouts={workouts} />
        </>
      )}

      {!showForm && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-500 text-white rounded-lg p-4 flex items-center justify-center"
        >
          <Plus size={24} className="mr-2" />
          Add New Workout
        </motion.button>
      )}

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleAddWorkout}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Add New Workout</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
              Workout Title
            </label>
            <input
              type="text"
              id="title"
              value={newWorkout.title}
              onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
              className="w-full bg-gray-700 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={newWorkout.date}
              onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
              className="w-full bg-gray-700 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-400 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={newWorkout.duration}
              onChange={(e) => setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })}
              className="w-full bg-gray-700 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Exercises</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="exercises">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {newWorkout.exercises.map((exercise, index) => (
                      <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-700 p-2 rounded-lg flex justify-between items-center"
                          >
                            <span>{exercise.name} - {exercise.sets} x {exercise.reps} @ {exercise.weight}lbs</span>
                            <button type="button" onClick={() => handleRemoveExercise(exercise.id)}>
                              <X size={16} />
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Exercise</h3>
            <div className="grid grid-cols-2 gap-2">
              {exerciseLibrary.map((exercise) => (
                <button
                  key={exercise.id}
                  type="button"
                  onClick={() => handleAddExercise(exercise)}
                  className="bg-gray-700 p-2 rounded-lg text-left hover:bg-gray-600 transition-colors"
                >
                  {exercise.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Apply Template</h3>
            <div className="grid grid-cols-2 gap-2">
              {workoutTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleApplyTemplate(template)}
                  className="bg-gray-700 p-2 rounded-lg text-left hover:bg-gray-600 transition-colors"
                >
                  {template.title}
                </button>
              ))}
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
              Add Workout
            </button>
          </div>
        </motion.form>
      )}
    </div>
  )
}

