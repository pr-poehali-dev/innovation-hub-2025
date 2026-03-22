import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "С какого возраста принимаете детей?",
    answer:
      "Мы принимаем детей с 1,5 лет. Малышей адаптируем постепенно: первые дни мама может быть рядом. Наши воспитатели имеют опыт работы с самыми маленькими и знают, как сделать переход мягким и комфортным.",
  },
  {
    question: "Каков распорядок дня?",
    answer:
      "День начинается в 7:30 и завершается в 19:00. Утренняя зарядка, завтрак, развивающие занятия, прогулка, обед, дневной сон, полдник, творческие игры и вечерняя прогулка. Режим выстроен с учётом детской физиологии.",
  },
  {
    question: "Чем занимаются дети в течение дня?",
    answer:
      "Каждый день — это чтение, лепка, рисование, музыкальные занятия, подвижные игры и развивающие упражнения. Программа разработана методистом и адаптирована под возраст каждой группы.",
  },
  {
    question: "Как организовано питание?",
    answer:
      "Четырёхразовое домашнее питание: завтрак, обед, полдник и ужин. Меню составлено диетологом, блюда готовятся на месте из свежих продуктов. Учитываем индивидуальные особенности и аллергии.",
  },
  {
    question: "Как обеспечивается безопасность?",
    answer:
      "Видеонаблюдение по всей территории, закрытый периметр с кнопкой вызова, сопровождение ребёнка только авторизованными взрослыми. Родители получают доступ к онлайн-трансляции в любое время.",
  },
  {
    question: "Как записать ребёнка?",
    answer:
      "Оставьте заявку на сайте или позвоните нам. Мы пригласим вас на экскурсию по садику, познакомим с командой и ответим на все вопросы. После этого подпишем договор и согласуем дату начала.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}