import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Забота и тепло",
    description:
      "Каждый ребёнок — личность. Мы создаём атмосферу принятия, где малыш чувствует себя любимым, в безопасности и готов открывать мир.",
  },
  {
    title: "Развитие через игру",
    description:
      "Игра — главный язык детства. Наши программы построены так, чтобы знания приходили естественно, через творчество, движение и любопытство.",
  },
  {
    title: "Партнёрство с родителями",
    description:
      "Мы работаем в тесном контакте с семьями. Открытое общение, еженедельные отчёты и прозрачность — основа нашего доверия.",
  },
  {
    title: "Безопасная среда",
    description: "Уютные, продуманные пространства с безопасным оборудованием и бережным персоналом. Ваш ребёнок под заботливым присмотром каждую минуту.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наша философия</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Воспитание с
              <br />
              <HighlightedText>душой</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/794f222f-10b5-4f5e-bc99-bd4533b8c410/files/dea967d2-4d31-47cc-b3c7-1834a471e784.jpg"
                alt="Уютная группа детского сада"
                className="opacity-90 relative z-10 w-auto rounded-lg"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Детский сад — это больше, чем присмотр. Это первые шаги в большой мир. Мы создаём среду, где каждый ребёнок раскрывает свой потенциал.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}