// Mock data for the dashboard
// In a real application, this would be fetched from an API

interface Topic {
    id: string
    name: string
  }
  
  interface Unit {
    id: string
    name: string
    description: string
    topics: string[]
    exams: string[]
  }
  
  interface Class {
    id: string
    name: string
    description: string
    units: Unit[]
    totalExams: number
    createdAt: string
  }
  
  const classes: Class[] = [
    {
      id: "class-1",
      name: "Biology 101",
      description: "An introduction to the principles of biology, including cell structure, genetics, and evolution.",
      units: [
        {
          id: "unit-1",
          name: "Cell Structure and Function",
          description: "Study of the basic unit of life, including cell organelles and their functions.",
          topics: ["Cell Theory", "Prokaryotic vs Eukaryotic Cells", "Cell Membrane", "Organelles"],
          exams: ["exam-1"],
        },
        {
          id: "unit-2",
          name: "Genetics",
          description: "The study of heredity and the variation of inherited characteristics.",
          topics: ["DNA Structure", "Replication", "Transcription", "Translation"],
          exams: ["exam-2"],
        },
      ],
      totalExams: 2,
      createdAt: "2023-01-15T00:00:00.000Z",
    },
    {
      id: "class-2",
      name: "Chemistry 201",
      description: "Advanced concepts in chemistry, including organic chemistry and biochemistry.",
      units: [
        {
          id: "unit-3",
          name: "Organic Chemistry Basics",
          description: "Introduction to carbon compounds and their properties.",
          topics: ["Hydrocarbons", "Functional Groups", "Isomerism"],
          exams: ["exam-3"],
        },
      ],
      totalExams: 1,
      createdAt: "2023-02-10T00:00:00.000Z",
    },
    {
      id: "class-3",
      name: "Physics 101",
      description: "Fundamental principles of physics, including mechanics, thermodynamics, and electromagnetism.",
      units: [
        {
          id: "unit-4",
          name: "Mechanics",
          description: "The study of motion and forces.",
          topics: ["Newton's Laws", "Kinematics", "Work and Energy"],
          exams: ["exam-4", "exam-5"],
        },
        {
          id: "unit-5",
          name: "Thermodynamics",
          description: "The study of heat, temperature, and energy transfer.",
          topics: ["Laws of Thermodynamics", "Heat Transfer", "Entropy"],
          exams: ["exam-6"],
        },
      ],
      totalExams: 3,
      createdAt: "2023-03-05T00:00:00.000Z",
    },
  ]
  
  export function getClasses(): Class[] {
    return classes
  }
  
  export function getClassById(id: string): Class | undefined {
    return classes.find((c) => c.id === id)
  }
  
  export function getUnitsByClassId(classId: string): Unit[] {
    const classData = getClassById(classId)
    return classData ? classData.units : []
  }
  
  export function getUnitById(unitId: string): Unit | undefined {
    for (const classData of classes) {
      const unit = classData.units.find((u) => u.id === unitId)
      if (unit) return unit
    }
    return undefined
  }
  
  