"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Professor of Biology",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "ExamEdge has transformed how I create practice exams for my students. The interface is intuitive, and the analytics help me identify areas where my students need additional support.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mark Williams",
    role: "High School Teacher",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I've tried several exam creation tools, but ExamEdge stands out for its ease of use and comprehensive feature set. My students love the interactive practice exams.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Corporate Trainer",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "ExamEdge has been instrumental in our certification program. The ability to create varied question types and track progress has improved our pass rates significantly.",
    rating: 4,
  },
  {
    id: 4,
    name: "Robert Chen",
    role: "University Administrator",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "We've implemented ExamEdge across our department, and the feedback from faculty has been overwhelmingly positive. The collaboration features are particularly valuable.",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Online Course Creator",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "As someone who creates online courses, ExamEdge has been a game-changer. The ability to embed practice exams directly into my course platform has enhanced the learning experience.",
    rating: 4,
  },
]

export default function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const visibleReviews = 3
  const totalReviews = reviews.length

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentIndex])

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(nextSlide, 5000)
  }

  const getVisibleReviews = () => {
    const result = []
    for (let i = 0; i < visibleReviews; i++) {
      const index = (currentIndex + i) % totalReviews
      result.push(reviews[index])
    }
    return result
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {Array.from({ length: totalReviews }).map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-4" : "bg-primary/30"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="h-8 w-8 rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="h-8 w-8 rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getVisibleReviews().map((review, index) => (
          <Card
            key={`${review.id}-${index}`}
            className={`transition-all duration-500 ${
              isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image src={review.avatar || "/placeholder.svg"} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

