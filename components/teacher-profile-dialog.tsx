"use client"

import { Mail, Phone, MapPin, BookOpen, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import type { Teacher } from "@/types/teacher"

interface TeacherProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teacher: Teacher | null
}

export function TeacherProfileDialog({ open, onOpenChange, teacher }: TeacherProfileDialogProps) {
  if (!teacher) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Teacher Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
              <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                {getInitials(teacher.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-lg text-muted-foreground">{teacher.department}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(teacher.status)}>
                  {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {teacher.experience} years experience
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{teacher.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{teacher.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:col-span-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{teacher.address}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subjects Taught
            </h3>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="text-black">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bio */}
          {teacher.bio && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Biography</h3>
                <p className="text-foreground leading-relaxed">{teacher.bio}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
