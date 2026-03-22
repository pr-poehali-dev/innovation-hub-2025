import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Группа «Солнышко»",
    category: "Младшая группа",
    location: "Возраст: 1.5–3 года",
    year: "12 мест",
    image: "/images/hously-1.png",
  },
  {
    id: 2,
    title: "Группа «Радуга»",
    category: "Средняя группа",
    location: "Возраст: 3–5 лет",
    year: "15 мест",
    image: "https://cdn.poehali.dev/projects/794f222f-10b5-4f5e-bc99-bd4533b8c410/files/dea967d2-4d31-47cc-b3c7-1834a471e784.jpg",
  },
  {
    id: 3,
    title: "Творческая мастерская",
    category: "Дополнительные занятия",
    location: "Рисование, лепка, музыка",
    year: "Все группы",
    image: "https://cdn.poehali.dev/projects/794f222f-10b5-4f5e-bc99-bd4533b8c410/files/f7f2cafb-97b0-4fe0-b7a3-10deb0330b2e.jpg",
  },
  {
    id: 4,
    title: "Прогулочный дворик",
    category: "Территория",
    location: "Безопасная игровая зона",
    year: "500 м²",
    image: "https://cdn.poehali.dev/projects/794f222f-10b5-4f5e-bc99-bd4533b8c410/files/6954ef71-3556-450f-96e4-685697645bdb.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши группы и пространства</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Жизнь в садике</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Записать ребёнка
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}