"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, Grid, List, Users, GraduationCap, BookOpen, Award } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TeacherCard } from "@/components/teacher-card"
import { TeacherList } from "@/components/teacher-list"
import { AddTeacherDialog } from "@/components/add-teacher-dialog"
import { FilterDialog } from "@/components/filter-dialog"
import type { Teacher } from "@/types/teacher"
import { mockTeachers } from "@/data/mock-teachers"
import { Header } from "@/components/header"

export function TeacherDashboard() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    department: "",
    status: "",
    experience: "",
  })

  useEffect(() => {
    // Simulate API call
    setTeachers(mockTeachers)
    setFilteredTeachers(mockTeachers)
  }, [])

  useEffect(() => {
    let filtered = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.department.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (filters.department) {
      filtered = filtered.filter((teacher) => teacher.department === filters.department)
    }
    if (filters.status) {
      filtered = filtered.filter((teacher) => teacher.status === filters.status)
    }
    if (filters.experience) {
      const exp = Number.parseInt(filters.experience)
      filtered = filtered.filter((teacher) => teacher.experience >= exp)
    }

    setFilteredTeachers(filtered)
  }, [searchQuery, teachers, filters])

  const stats = {
    total: teachers.length,
    active: teachers.filter((t) => t.status === "active").length,
    departments: new Set(teachers.map((t) => t.department)).size,
    avgExperience: Math.round(teachers.reduce((acc, t) => acc + t.experience, 0) / teachers.length),
  }

  const handleAddTeacher = (newTeacher: Omit<Teacher, "id">) => {
    const teacher: Teacher = {
      ...newTeacher,
      id: Date.now().toString(),
    }
    setTeachers((prev) => [...prev, teacher])
    setIsAddDialogOpen(false)
  }

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)))
  }

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId))
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Teacher Management</h1>
            <p className="text-muted-foreground mt-1">Manage your educational staff efficiently</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-muted-foreground">{Math.round((stats.active / stats.total) * 100)}% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.departments}</div>
              <p className="text-xs text-muted-foreground">Across all faculties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgExperience} years</div>
              <p className="text-xs text-muted-foreground">Institutional average</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsFilterDialogOpen(true)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {(filters.department || filters.status || filters.experience) && (
                <Badge variant="secondary" className="ml-1">
                  {Object.values(filters).filter(Boolean).length}
                </Badge>
              )}
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Teachers Display */}
        {filteredTeachers.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No teachers found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onUpdate={handleUpdateTeacher}
                onDelete={handleDeleteTeacher}
              />
            ))}
          </div>
        ) : (
          <TeacherList teachers={filteredTeachers} onUpdate={handleUpdateTeacher} onDelete={handleDeleteTeacher} />
        )}

        {/* Dialogs */}
        <AddTeacherDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddTeacher} />
        <FilterDialog
          open={isFilterDialogOpen}
          onOpenChange={setIsFilterDialogOpen}
          filters={filters}
          onFiltersChange={setFilters}
          teachers={teachers}
        />
      </div>
    </>
  )
}
