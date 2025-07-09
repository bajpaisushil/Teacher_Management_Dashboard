"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Teacher } from "@/types/teacher"
import { EditTeacherDialog } from "@/components/edit-teacher-dialog"
import { TeacherProfileDialog } from "@/components/teacher-profile-dialog"

interface TeacherCardProps {
  teacher: Teacher
  onUpdate: (teacher: Teacher) => void
  onDelete: (teacherId: string) => void
}

export function TeacherCard({ teacher, onUpdate, onDelete }: TeacherCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
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
    <>
      <Card className="hover:shadow-lg transition-all duration-200 bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {getInitials(teacher.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground">{teacher.department}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(teacher.id)} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(teacher.status)}>
              {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">{teacher.experience} years exp.</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{teacher.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="truncate">{teacher.address}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex flex-wrap gap-1">
              {teacher.subjects.slice(0, 2).map((subject) => (
                <Badge key={subject} variant="outline" className="text-xs">
                  {subject}
                </Badge>
              ))}
              {teacher.subjects.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{teacher.subjects.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditTeacherDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        teacher={teacher}
        onUpdate={onUpdate}
      />

      <TeacherProfileDialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen} teacher={teacher} />
    </>
  )
}
