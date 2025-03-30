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
  
  interface Homework {
    id: string
    title: string
    description: string
    unitId: string
    topicId: string
    dueDate: string
    createdAt: string
  }
  
  interface ScanSubmission {
    id: string
    title: string
    description?: string
    unitId: string
    submissionType: "text" | "image" | "pdf"
    content: string
    fileUrl?: string
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
  
  const homeworks: Homework[] = [
    {
      id: "hw-1",
      title: "Cell Structure Worksheet",
      description: "Complete the worksheet on cell structures and functions.",
      unitId: "unit-1",
      topicId: "0", // Cell Theory
      dueDate: "2023-02-01T00:00:00.000Z",
      createdAt: "2023-01-20T00:00:00.000Z",
    },
    {
      id: "hw-2",
      title: "Cell Comparison Assignment",
      description: "Compare and contrast prokaryotic and eukaryotic cells.",
      unitId: "unit-1",
      topicId: "1", // Prokaryotic vs Eukaryotic Cells
      dueDate: "2023-02-08T00:00:00.000Z",
      createdAt: "2023-01-25T00:00:00.000Z",
    },
    {
      id: "hw-3",
      title: "Membrane Transport Lab",
      description: "Complete the lab report on membrane transport mechanisms.",
      unitId: "unit-1",
      topicId: "2", // Cell Membrane
      dueDate: "2023-02-15T00:00:00.000Z",
      createdAt: "2023-02-01T00:00:00.000Z",
    },
    {
      id: "hw-4",
      title: "Organelle Functions Quiz",
      description: "Prepare for the quiz on organelle functions.",
      unitId: "unit-1",
      topicId: "3", // Organelles
      dueDate: "2023-02-22T00:00:00.000Z",
      createdAt: "2023-02-08T00:00:00.000Z",
    },
    {
      id: "hw-5",
      title: "DNA Model Project",
      description: "Build a 3D model of DNA structure.",
      unitId: "unit-2",
      topicId: "0", // DNA Structure
      dueDate: "2023-03-01T00:00:00.000Z",
      createdAt: "2023-02-15T00:00:00.000Z",
    },
    {
      id: "hw-6",
      title: "Replication Process Essay",
      description: "Write a 500-word essay explaining the DNA replication process.",
      unitId: "unit-2",
      topicId: "1", // Replication
      dueDate: "2023-03-08T00:00:00.000Z",
      createdAt: "2023-02-22T00:00:00.000Z",
    },
    {
      id: "hw-7",
      title: "Transcription Worksheet",
      description: "Complete the worksheet on transcription.",
      unitId: "unit-2",
      topicId: "2", // Transcription
      dueDate: "2023-03-15T00:00:00.000Z",
      createdAt: "2023-03-01T00:00:00.000Z",
    },
    {
      id: "hw-8",
      title: "Translation Exercise",
      description: "Complete the exercises on protein synthesis and translation.",
      unitId: "unit-2",
      topicId: "3", // Translation
      dueDate: "2023-03-22T00:00:00.000Z",
      createdAt: "2023-03-08T00:00:00.000Z",
    },
  ]
  
  const scanSubmissions: ScanSubmission[] = [
    {
      id: "scan-1",
      title: "Cell Structure Notes",
      description: "Lecture notes on cell structures",
      unitId: "unit-1",
      submissionType: "text",
      content: "The cell is the basic structural and functional unit of all living organisms...",
      createdAt: "2023-01-18T00:00:00.000Z",
    },
    {
      id: "scan-2",
      title: "Cell Diagram",
      description: "Detailed diagram of an animal cell",
      unitId: "unit-1",
      submissionType: "image",
      content: "",
      fileUrl: "/placeholder.svg?height=400&width=600",
      createdAt: "2023-01-22T00:00:00.000Z",
    },
    {
      id: "scan-3",
      title: "DNA Structure Research Paper",
      description: "Published research on DNA structure",
      unitId: "unit-2",
      submissionType: "pdf",
      content: "",
      fileUrl: "/sample.pdf",
      createdAt: "2023-02-18T00:00:00.000Z",
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
  
  export function getHomeworksByTopicId(unitId: string, topicId: string): Homework[] {
    return homeworks
      .filter((hw) => hw.unitId === unitId && hw.topicId === topicId)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }
  
  export function getScanSubmissionsByUnitId(unitId: string): ScanSubmission[] {
    return scanSubmissions
      .filter((submission) => submission.unitId === unitId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  
  export function getAllScanSubmissions(): ScanSubmission[] {
    return scanSubmissions
  }
  
  