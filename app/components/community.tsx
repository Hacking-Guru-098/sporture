import { motion } from 'framer-motion'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Professional Runner',
    image: '/sarah-johnson.jpg',
    quote: 'FutureFit has revolutionized my training. The personalized plans and analytics have taken my performance to new heights.',
  },
  {
    name: 'Michael Chen',
    role: 'CrossFit Athlete',
    image: '/michael-chen.jpg',
    quote: 'The community support and advanced features of FutureFit have been instrumental in achieving my fitness goals.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Yoga Instructor',
    image: '/emma-rodriguez.jpg',
    quote: 'FutureFit\'s holistic approach to wellness has helped me maintain balance and improve my overall health.',
  },
]

export default function Community() {
  return (
    <section id="community" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Community
        </h2>
        <div className="flex flex-wrap -mx-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full md:w-1/3 px-4 mb-8"
            >
              <div className="bg-gray-800 rounded-lg p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-blue-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 flex-grow">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

