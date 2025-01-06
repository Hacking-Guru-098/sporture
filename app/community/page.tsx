'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, MessageSquare, ThumbsUp, Share2, Search, Tag, Bell, Users } from 'lucide-react'

type Post = {
  id: number
  user: string
  avatar: string
  content: string
  type: 'achievement' | 'question'
  likes: number
  comments: Comment[]
  createdAt: string
  tags: string[]
}

type Comment = {
  id: number
  user: string
  avatar: string
  content: string
  createdAt: string
}

type Notification = {
  id: number
  content: string
  isRead: boolean
}

const initialPosts: Post[] = [
  {
    id: 1,
    user: 'Sarah Johnson',
    avatar: '/sarah-johnson.jpg',
    content: 'Just completed my first marathon! 🏃‍♀️🎉',
    type: 'achievement',
    likes: 24,
    comments: [
      { id: 1, user: 'Mike Chen', avatar: '/michael-chen.jpg', content: 'Congratulations! That\'s amazing!', createdAt: '1 hour ago' },
      { id: 2, user: 'Emma Rodriguez', avatar: '/emma-rodriguez.jpg', content: 'Well done! How was the experience?', createdAt: '30 minutes ago' },
    ],
    createdAt: '2 hours ago',
    tags: ['marathon', 'running', 'achievement']
  },
  {
    id: 2,
    user: 'Mike Chen',
    avatar: '/michael-chen.jpg',
    content: 'Any tips for improving my deadlift form?',
    type: 'question',
    likes: 3,
    comments: [
      { id: 3, user: 'Emma Rodriguez', avatar: '/emma-rodriguez.jpg', content: 'Make sure to keep your back straight and engage your core!', createdAt: '1 hour ago' },
    ],
    createdAt: '4 hours ago',
    tags: ['weightlifting', 'form', 'deadlift']
  },
  {
    id: 3,
    user: 'Emma Rodriguez',
    avatar: '/emma-rodriguez.jpg',
    content: 'Hit a new personal best in bench press today! 💪',
    type: 'achievement',
    likes: 18,
    comments: [],
    createdAt: '1 day ago',
    tags: ['weightlifting', 'benchpress', 'pb']
  }
]

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [postType, setPostType] = useState<'achievement' | 'question'>('achievement')
  const [searchTerm, setSearchTerm] = useState('')
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, content: 'Sarah Johnson liked your post', isRead: false },
    { id: 2, content: 'New comment on your question', isRead: false },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim() === '') return

    const post: Post = {
      id: Date.now(),
      user: 'Current User',
      avatar: '/placeholder.svg',
      content: newPost,
      type: postType,
      likes: 0,
      comments: [],
      createdAt: 'Just now',
      tags: []
    }

    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleComment = (postId: number, comment: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            user: 'Current User',
            avatar: '/placeholder.svg',
            content: comment,
            createdAt: 'Just now'
          }]
        }
      }
      return post
    }))
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    }))
  }

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(post => 
    selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag))
  )

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  useEffect(() => {
    // Simulating new notifications
    const interval = setInterval(() => {
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), content: 'New activity in the community', isRead: false }
      ])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Community
      </h1>

      <div className="flex mb-6 space-x-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts, users, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors relative"
          >
            <Bell size={20} />
            {notifications.some(n => !n.isRead) && (
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                {notifications.map(notification => (
                  <div key={notification.id} className="text-sm p-2 hover:bg-gray-700 rounded">
                    {notification.content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Filter by tags:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTags(prev => 
                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
              )}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-lg p-6 mb-8"
      >
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your achievement or ask a question..."
          className="w-full bg-gray-700 rounded-lg p-4 mb-4 text-white"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="postType"
                value="achievement"
                checked={postType === 'achievement'}
                onChange={() => setPostType('achievement')}
              />
              <span className="ml-2">Achievement</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-green-500"
                name="postType"
                value="question"
                checked={postType === 'question'}
                onChange={() => setPostType('question')}
              />
              <span className="ml-2">Question</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </div>
      </motion.form>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{post.user}</h3>
                <p className="text-sm text-gray-400">{post.createdAt}</p>
              </div>
              {post.type === 'achievement' && (
                <Award className="ml-auto text-yellow-500" size={24} />
              )}
              {post.type === 'question' && (
                <MessageSquare className="ml-auto text-blue-500" size={24} />
              )}
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center mr-4 hover:text-blue-400 transition-colors"
              >
                <ThumbsUp size={18} className="mr-1" />
                {post.likes}
              </button>
              <button className="flex items-center mr-4 hover:text-blue-400 transition-colors">
                <MessageSquare size={18} className="mr-1" />
                {post.comments.length}
              </button>
              <button className="flex items-center hover:text-blue-400 transition-colors">
                <Share2 size={18} className="mr-1" />
                Share
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full mr-2" />
                    <div>
                      <h4 className="font-semibold text-sm">{comment.user}</h4>
                      <p className="text-xs text-gray-400">{comment.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const comment = (e.target as HTMLFormElement).comment.value
                handleComment(post.id, comment)
                ;(e.target as HTMLFormElement).reset()
              }}
              className="mt-4 flex"
            >
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                className="flex-grow bg-gray-700 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                Comment
              </button>
            </form>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

