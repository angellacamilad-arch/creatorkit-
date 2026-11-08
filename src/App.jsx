import { useEffect, useState } from 'react'

const HISTORY_LIMIT = 100
const monthKey = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

function useHistorial(clave) {
  const [estado, setEstado] = useState(() => {
    try {
      const saved = window.localStorage.getItem(clave)
      const parsed = saved ? JSON.parse(saved) : []
      return {
        entradas: Array.isArray(parsed) ? parsed.slice(0, HISTORY_LIMIT) : [],
        error: '',
      }
    } catch {
      return {
        entradas: [],
        error: 'No se pudo acceder al almacenamiento local de este navegador.',
      }
    }
  })

  function guardar(nextEntries) {
    try {
      window.localStorage.setItem(clave, JSON.stringify(nextEntries))
      setEstado({ entradas: nextEntries, error: '' })
    } catch {
      setEstado({
        entradas: nextEntries,
        error: 'No se pudo acceder al almacenamiento local de este navegador.',
      })
    }
  }

  function agregar(entrada) {
    guardar([entrada, ...estado.entradas].slice(0, HISTORY_LIMIT))
  }

  function eliminar(id) {
    guardar(estado.entradas.filter((entrada) => entrada.id !== id))
  }

  function borrar() {
    guardar([])
  }

  return { entradas: estado.entradas, agregar, eliminar, borrar, error: estado.error }
}

const iconPaths = {
  idea: (
    <>
      <path d="M9 18h6M10 22h4M8.2 14.5A6 6 0 1 1 15.8 14.5c-.9.7-1.3 1.5-1.5 2.5h-4.6c-.2-1-.6-1.8-1.5-2.5Z" />
      <path d="M12 2v1M4.9 4.9l.7.7m13.5-.7-.7.7M3 12h1m16 0h1" />
    </>
  ),
  script: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18M8 15h.01M12 15h.01M16 15h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18M7 14l4-4 4 3 6-7" />
      <path d="M16 6h5v5" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.7-3.1 1.8 1.8 0 0 1 1.5-2.8H18a3 3 0 0 0 3-3c0-5-4-9.1-9-9.1Z" />
      <path d="M7.5 12h.01M10 7.5h.01M15 8.5h.01" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m18 6-12 12M6 6l12 12" />,
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  text: (
    <>
      <path d="M4 6V4h16v2M12 4v16M8 20h8" />
    </>
  ),
  hash: <path d="M5 9h14M4 15h14M10 3 8 21m8-18-2 18" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
    </>
  ),
}

function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {iconPaths[name]}
    </svg>
  )
}

const features = [
  {
    icon: 'idea',
    title: 'Generador de ideas',
    description:
      'Encuentra nuevos enfoques para tus videos, reels y publicaciones sin empezar desde cero.',
    accent: 'bg-beige/60 text-oliva',
  },
  {
    icon: 'script',
    title: 'Plantillas de guiones',
    description:
      'Dale estructura a tus ideas con formatos listos para captar atención y contar mejor.',
    accent: 'bg-beige/60 text-oliva',
  },
  {
    icon: 'calendar',
    title: 'Calendario de contenido',
    description:
      'Organiza publicaciones, borradores y fechas para crear con una cadencia constante.',
    accent: 'bg-beige/60 text-oliva',
  },
  {
    icon: 'palette',
    title: 'Paleta de colores',
    description:
      'Mantén una identidad visual reconocible con colores y referencias en un solo lugar.',
    accent: 'bg-beige/60 text-oliva',
  },
]

const plans = [
  {
    name: 'Gratis',
    description: 'Una forma sencilla de empezar a crear.',
    price: '0',
    features: ['10 ideas al mes', '3 plantillas de guion', 'Calendario básico', '1 kit de marca'],
  },
  {
    name: 'Pro',
    description: 'Todo lo que necesitas para publicar mejor.',
    price: '19',
    features: [
      'Ideas y guiones ilimitados',
      'Calendario completo',
      'Paletas de marca ilimitadas',
      'Exportaciones sin marca de agua',
    ],
    featured: true,
  },
  {
    name: 'Agencia',
    description: 'Un espacio compartido para equipos en crecimiento.',
    price: '49',
    features: [
      'Todo lo incluido en Pro',
      'Hasta 5 miembros del equipo',
      'Múltiples cuentas de marca',
      'Espacios de trabajo compartidos',
      'Soporte prioritario',
    ],
  },
]

function PaymentModal({ planKey, onClose }) {
  const plan = plans.find((item) => item.name.toLowerCase() === planKey)
  const [values, setValues] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  if (!plan) return null

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setMessage('')
  }

  function startCheckout() {
    // TODO: Conectar aquí Stripe Checkout cuando exista una integración configurada.
    setMessage('Esta es una demostración. No se realizará ningún cargo.')
  }

  function submitPayment(event) {
    event.preventDefault()
    const nextErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const cardDigits = values.cardNumber.replace(/\D/g, '')
    const expiryMatch = values.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
    const cvcDigits = values.cvc.replace(/\D/g, '')

    if (!values.name.trim()) nextErrors.name = 'Ingresa tu nombre completo.'
    if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Ingresa un correo electrónico válido.'
    if (cardDigits.length !== 16) nextErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos.'
    if (!expiryMatch) {
      nextErrors.expiry = 'Usa el formato MM/AA y una fecha válida.'
    } else {
      const month = Number(expiryMatch[1])
      const year = 2000 + Number(expiryMatch[2])
      const now = new Date()
      if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
        nextErrors.expiry = 'La fecha de vencimiento no puede estar vencida.'
      }
    }
    if (!/^\d{3,4}$/.test(cvcDigits)) nextErrors.cvc = 'El CVC debe tener 3 o 4 dígitos.'

    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length > 0) return

    startCheckout()
    setValues((current) => ({ ...current, cardNumber: '', expiry: '', cvc: '' }))
  }

  const inputClass = 'w-full rounded-lg border border-beige bg-tarjeta px-3 py-2.5 text-sm text-texto outline-none focus:border-durazno focus:ring-2 focus:ring-beige'

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-texto/40 px-4 py-6 backdrop-blur-sm sm:grid sm:place-items-center" role="presentation">
      <section
        aria-labelledby="payment-title"
        aria-modal="true"
        className="mx-auto w-full max-w-3xl rounded-2xl border border-beige bg-tarjeta shadow-soft"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-beige p-5 sm:p-7">
          <div>
            <p className="text-sm font-semibold text-oliva">Pago de demostración</p>
            <h2 className="mt-1 text-2xl font-bold text-texto" id="payment-title">Elegiste el plan {plan.name}</h2>
          </div>
          <button aria-label="Cerrar pantalla de pago" className="rounded-lg border border-beige px-3 py-2 text-sm font-semibold text-vino transition hover:bg-crema" onClick={onClose} type="button">
            Cerrar
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="h-fit rounded-xl border border-beige bg-crema p-5">
            <p className="text-sm font-semibold text-vino">Resumen del plan</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-texto">${plan.price}</span>
              <span className="text-sm text-vino/80">/ mes</span>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li className="flex items-start gap-2 text-sm leading-5 text-vino/80" key={feature}>
                  <Icon className="mt-0.5 h-4 w-4 text-oliva" name="check" />
                  {feature}
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <p className="rounded-lg border border-beige bg-crema px-3 py-2.5 text-xs leading-5 text-vino">
              Modo demostración · la integración con Stripe no está conectada
            </p>
            <form autoComplete="off" className="mt-4 flex flex-col gap-3" noValidate onSubmit={submitPayment}>
              {[
                ['name', 'Nombre completo', 'text', 'Tu nombre'],
                ['email', 'Correo electrónico', 'email', 'nombre@ejemplo.com'],
                ['cardNumber', 'Número de tarjeta', 'text', '16 dígitos'],
                ['expiry', 'Fecha de vencimiento', 'text', 'MM/AA'],
                ['cvc', 'CVC', 'text', '3 o 4 dígitos'],
              ].map(([field, label, type, placeholder]) => (
                <label className="flex flex-col gap-1.5 text-sm font-medium text-texto" key={field}>
                  {label}
                  <input
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                    aria-invalid={Boolean(errors[field])}
                    autoComplete="off"
                    className={`${inputClass} ${errors[field] ? 'border-vino' : ''}`}
                    inputMode={['cardNumber', 'expiry', 'cvc'].includes(field) ? 'numeric' : undefined}
                    maxLength={field === 'cardNumber' ? 16 : field === 'expiry' ? 5 : field === 'cvc' ? 4 : undefined}
                    onChange={(event) => {
                      let value = event.target.value
                      if (field === 'cardNumber' || field === 'cvc') value = value.replace(/\D/g, '')
                      if (field === 'expiry') {
                        const digits = value.replace(/\D/g, '').slice(0, 4)
                        value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
                      }
                      updateField(field, value)
                    }}
                    placeholder={placeholder}
                    type={type}
                    value={values[field]}
                  />
                  {errors[field] && <span className="text-xs text-vino" id={`${field}-error`}>{errors[field]}</span>}
                </label>
              ))}
              <button className="mt-1 min-h-11 rounded-lg bg-durazno px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95" type="submit">
                Pagar
              </button>
              {message && <p aria-live="polite" className="rounded-lg bg-beige/60 px-3 py-2.5 text-sm font-medium text-vino">{message}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

const ideasByNiche = {
  Moda: [
    'Muestra tres combinaciones con prendas básicas que ya tienes.',
    'Cuenta cómo elegir un conjunto para una ocasión especial.',
    'Enseña una prenda de tres maneras distintas.',
    'Compara una tendencia con una alternativa atemporal.',
    'Crea una guía rápida para combinar colores en tu ropa.',
    'Comparte cómo adaptar un look del día a la noche.',
  ],
  Fitness: [
    'Comparte una rutina breve que se pueda hacer en casa.',
    'Explica un error común al empezar a entrenar.',
    'Muestra un calentamiento sencillo antes de moverte.',
    'Enseña una forma simple de mejorar tu técnica.',
    'Comparte una rutina corta para un día con poco tiempo.',
    'Desmiente un mito común sobre el entrenamiento.',
  ],
  Tecnología: [
    'Presenta una herramienta que te ahorra tiempo cada semana.',
    'Explica una función útil que muchas personas pasan por alto.',
    'Compara dos formas de resolver una tarea cotidiana.',
    'Muestra un atajo que simplifica una tarea digital.',
    'Explica una función nueva con un ejemplo práctico.',
    'Compara una herramienta gratuita con una opción conocida.',
  ],
  Comida: [
    'Prepara una receta sencilla con pocos ingredientes.',
    'Muestra cómo transformar sobras en una comida nueva.',
    'Comparte un truco para preparar comidas con anticipación.',
    'Compara dos formas de cocinar el mismo ingrediente.',
    'Enseña una versión rápida de un plato clásico.',
    'Explica cómo elegir ingredientes de temporada.',
  ],
  Finanzas: [
    'Explica un método sencillo para organizar gastos semanales.',
    'Comparte una forma práctica de empezar un presupuesto.',
    'Aclara un concepto financiero con un ejemplo cotidiano.',
    'Muestra cómo preparar una meta de ahorro alcanzable.',
    'Compara dos hábitos que ayudan a cuidar el presupuesto.',
    'Crea una lista de preguntas antes de una compra importante.',
  ],
  Educación: [
    'Explica un concepto complejo con una comparación sencilla.',
    'Comparte una técnica breve para recordar lo que estudias.',
    'Resuelve una duda frecuente paso a paso.',
    'Muestra cómo organizar una sesión de estudio enfocada.',
    'Resume tres ideas clave de un tema que enseñas.',
    'Convierte un error habitual en una oportunidad para aprender.',
  ],
}

const trialTools = [
  {
    id: 'ideas',
    icon: 'idea',
    title: 'Generador de ideas',
    description: 'Encuentra ideas para tu nicho y plataforma.',
  },
  {
    id: 'titles',
    icon: 'text',
    title: 'Optimizador de títulos',
    description: 'Cuenta caracteres y explora alternativas.',
  },
  {
    id: 'scripts',
    icon: 'script',
    title: 'Generador de guiones',
    description: 'Estructura un video a partir de un tema.',
  },
  {
    id: 'calendar',
    icon: 'calendar',
    title: 'Calendario de contenido',
    description: 'Organiza publicaciones, fechas y estados.',
  },
  {
    id: 'palettes',
    icon: 'palette',
    title: 'Generador de paletas de colores',
    description: 'Explora combinaciones de cinco colores.',
  },
  {
    id: 'captions',
    icon: 'text',
    title: 'Generador de captions',
    description: 'Prepara una descripción para tu publicación.',
  },
  {
    id: 'hooks',
    icon: 'video',
    title: 'Generador de hooks',
    description: 'Prueba frases iniciales para tus videos.',
  },
  {
    id: 'hashtags',
    icon: 'hash',
    title: 'Generador de hashtags',
    description: 'Crea una lista de etiquetas desde un tema.',
  },
  {
    id: 'brand',
    icon: 'palette',
    title: 'Kit de marca',
    description: 'Define el nombre y la identidad de tu marca.',
  },
]

const brandPalette = ['#F7F2EA', '#E8DCCF', '#D9A18F', '#A3A17A', '#754E50']

function createPalette() {
  const baseHue = Math.floor(Math.random() * 360)
  const offsets = [0, 22, -22, 180, 202]
  const lightness = [88, 78, 68, 58, 48]
  const saturation = [34, 30, 36, 28, 32]

  return offsets.map((offset, index) => {
    const hue = (baseHue + offset + 360) % 360
    const sat = saturation[index] / 100
    const light = lightness[index] / 100
    const chroma = (1 - Math.abs(2 * light - 1)) * sat
    const segment = hue / 60
    const secondary = chroma * (1 - Math.abs((segment % 2) - 1))
    const [red, green, blue] = segment < 1
      ? [chroma, secondary, 0]
      : segment < 2
        ? [secondary, chroma, 0]
        : segment < 3
          ? [0, chroma, secondary]
          : segment < 4
            ? [0, secondary, chroma]
            : segment < 5
              ? [secondary, 0, chroma]
              : [chroma, 0, secondary]
    const match = light - chroma / 2
    const toHex = (value) => Math.round((value + match) * 255).toString(16).padStart(2, '0')

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`.toUpperCase()
  })
}

const faqs = [
  [
    '¿Qué pasa después de los 14 días de prueba?',
    'Al terminar la prueba, puedes elegir un plan Pro para continuar. Si no eliges un plan, no se realiza ningún cobro automático.',
  ],
  [
    '¿Necesito una tarjeta de crédito?',
    'No. Puedes comenzar la prueba gratis sin ingresar los datos de una tarjeta.',
  ],
  [
    '¿Puedo cancelar cuando quiera?',
    'Sí. Puedes gestionar tu plan y cancelar cuando quieras desde la configuración de tu cuenta.',
  ],
]

function Dashboard({ onLogout, activePlan, onOpenPayment }) {
  const [niche, setNiche] = useState('Moda')
  const [platform, setPlatform] = useState('Instagram')
  const [ideaIndex, setIdeaIndex] = useState(-1)
  const [ideaOutput, setIdeaOutput] = useState([])
  const [ideaUsage, setIdeaUsage] = useState(0)
  const [ideaUsageMonth, setIdeaUsageMonth] = useState(monthKey)
  const [title, setTitle] = useState('')
  const [titleAlternatives, setTitleAlternatives] = useState([])
  const [copyMessage, setCopyMessage] = useState('')
  const [scriptType, setScriptType] = useState('Tutorial')
  const [scriptDuration, setScriptDuration] = useState('30')
  const [scriptTopic, setScriptTopic] = useState('')
  const [scriptOutput, setScriptOutput] = useState('')
  const [postText, setPostText] = useState('')
  const [postDate, setPostDate] = useState('')
  const [postPlatform, setPostPlatform] = useState('Instagram')
  const [postStatus, setPostStatus] = useState('Idea')
  const [calendarPosts, setCalendarPosts] = useState([])
  const [calendarMode, setCalendarMode] = useState('list')
  const [paletteColors, setPaletteColors] = useState(brandPalette)
  const [paletteMessage, setPaletteMessage] = useState('')
  const [captionTopic, setCaptionTopic] = useState('')
  const [captionOutput, setCaptionOutput] = useState('')
  const [hookTopic, setHookTopic] = useState('')
  const [hookOutput, setHookOutput] = useState([])
  const [hashtagTopic, setHashtagTopic] = useState('')
  const [hashtagOutput, setHashtagOutput] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brandColor, setBrandColor] = useState('#754E50')
  const [brandVoice, setBrandVoice] = useState('')
  const [selectedTool, setSelectedTool] = useState(null)
  const { entradas, agregar, eliminar, borrar, error: historyError } = useHistorial('creatorkit:history:v1')
  const remainingCharacters = 60 - title.length
  const nicheIdeas = ideasByNiche[niche]
  const activeTool = trialTools.find((tool) => tool.id === selectedTool)
  const isFreePlan = activePlan === 'gratis'
  const [calendar] = useState(() => {
    const now = new Date()
    return {
      now,
      daysCount: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
      startOffset: new Date(now.getFullYear(), now.getMonth(), 1).getDay(),
    }
  })
  const [currentMonth, setCurrentMonth] = useState(monthKey)
  const calendarNow = calendar.now
  const calendarDaysCount = calendar.daysCount
  const calendarStartOffset = calendar.startOffset
  const ideasUsedThisMonth = ideaUsageMonth === currentMonth ? ideaUsage : 0
  const lockedFreeTools = ['palettes', 'captions', 'hooks', 'hashtags']
  const planNames = { gratis: 'Gratis', pro: 'Pro', agencia: 'Agencia' }

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentMonth(monthKey()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  function requestProUpgrade() {
    onOpenPayment('pro')
  }

  function recordGeneration(tool, input, result) {
    if (isFreePlan) return
    agregar({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      tool,
      input,
      result,
      date: new Date().toISOString(),
      plan: activePlan,
    })
  }

  function generateIdea(event) {
    event.preventDefault()
    if (isFreePlan && ideasUsedThisMonth >= 10) {
      return
    }
    const nextIndex = (ideaIndex + 1) % nicheIdeas.length
    const ideas = Array.from({ length: 3 }, (_, offset) => {
      const idea = nicheIdeas[(nextIndex + offset) % nicheIdeas.length]
      return `${idea} Formato sugerido para ${platform}.`
    })
    setIdeaIndex(nextIndex)
    setIdeaOutput(ideas)
    recordGeneration('Generador de ideas', `${niche} · ${platform}`, ideas.join('\n'))
    if (isFreePlan) {
      setIdeaUsageMonth(currentMonth)
      setIdeaUsage((current) => (ideaUsageMonth === currentMonth ? current : 0) + 1)
    }
  }

  function generateTitleAlternatives(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) {
      setTitleAlternatives([])
      return
    }
    const alternatives = [
      `Una guía rápida: ${cleanTitle}`,
      `Lo que debes saber sobre ${cleanTitle}`,
      `3 ideas para ${cleanTitle}`,
    ]
    setTitleAlternatives(alternatives)
    recordGeneration('Optimizador de títulos', cleanTitle, alternatives.join('\n'))
  }

  function generateScript(event) {
    event.preventDefault()
    const cleanTopic = scriptTopic.trim()
    if (!cleanTopic) {
      setScriptOutput('')
      return
    }
    const development = scriptType === 'Historia'
      ? [
          `Presenta el contexto de ${cleanTopic} y por qué te importaba.`,
          'Cuenta el reto o momento clave con un detalle concreto.',
          'Explica qué aprendiste y cómo cambió tu perspectiva.',
        ]
      : scriptType === 'Lista'
        ? [
            `Primer punto clave sobre ${cleanTopic}.`,
            'Segundo punto con un ejemplo práctico.',
            'Tercer punto y una recomendación fácil de probar.',
          ]
        : [
            `Presenta el primer paso para trabajar ${cleanTopic}.`,
            'Explica el proceso con un ejemplo breve.',
            'Muestra el resultado y un consejo para aplicarlo.',
          ]
    const result = `HOOK\nAbre con una pregunta concreta sobre ${cleanTopic}.\n\nDESARROLLO (${scriptDuration} segundos)\n1. ${development[0]}\n2. ${development[1]}\n3. ${development[2]}\n\nCTA\nInvita a guardar el video y compartir su experiencia en los comentarios.`
    setScriptOutput(result)
    recordGeneration('Generador de guiones', `${scriptType} · ${scriptDuration} segundos · ${cleanTopic}`, result)
  }

  function addCalendarPost(event) {
    event.preventDefault()
    if (!postText.trim() || !postDate) return
    setCalendarPosts((posts) => [
      ...posts,
      {
        id: `${Date.now()}-${posts.length}`,
        text: postText.trim(),
        date: postDate,
        platform: postPlatform,
        status: postStatus,
      },
    ].sort((a, b) => a.date.localeCompare(b.date)))
    setPostText('')
  }

  function removeCalendarPost(postId) {
    setCalendarPosts((posts) => posts.filter((post) => post.id !== postId))
  }

  async function copyPalette(colors) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('El portapapeles no está disponible en este navegador.')
      }
      await navigator.clipboard.writeText(colors.join(' '))
      setPaletteMessage(
        colors.length === 1
          ? `${colors[0]} copiado al portapapeles.`
          : 'Códigos HEX copiados al portapapeles.',
      )
    } catch (error) {
      setPaletteMessage(
        error instanceof Error
          ? `${error.message} Puedes seleccionar y copiar los códigos manualmente.`
          : 'No se pudieron copiar los códigos. Puedes copiarlos manualmente.',
      )
    }
  }

  async function copyText(text) {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('El portapapeles no está disponible en este navegador.')
      }
      await navigator.clipboard.writeText(text)
      setCopyMessage('Texto copiado al portapapeles.')
    } catch (error) {
      setCopyMessage(
        error instanceof Error
          ? `${error.message} Puedes seleccionar y copiar el texto manualmente.`
          : 'No se pudo copiar. Puedes seleccionar el texto manualmente.',
      )
    }
  }

  function generatePalette() {
    const colors = createPalette()
    setPaletteColors(colors)
    setPaletteMessage('')
    recordGeneration('Generador de paletas de colores', 'Generar paleta', colors.join(' '))
  }

  function generateCaption(event) {
    event.preventDefault()
    const cleanTopic = captionTopic.trim()
    if (!cleanTopic) {
      setCaptionOutput('')
      return
    }
    const caption = `Una idea para hoy: ${cleanTopic}.\n\nA veces, un pequeño cambio de perspectiva es todo lo que hace falta para dar el siguiente paso. ¿Qué experiencia tienes con este tema?\n\nGuarda esta publicación para volver a ella cuando la necesites.`
    setCaptionOutput(caption)
    recordGeneration('Generador de captions', cleanTopic, caption)
  }

  function generateHooks(event) {
    event.preventDefault()
    const cleanTopic = hookTopic.trim()
    if (!cleanTopic) {
      setHookOutput([])
      return
    }
    const hooks = [
      `¿Y si estás enfocando ${cleanTopic} de la forma equivocada?`,
      `Tres cosas que me habría gustado saber sobre ${cleanTopic}.`,
      `Antes de probar ${cleanTopic}, mira esto.`,
      `El cambio más sencillo para mejorar ${cleanTopic} empieza aquí.`,
      `Si te interesa ${cleanTopic}, guarda este consejo para después.`,
    ]
    setHookOutput(hooks)
    recordGeneration('Generador de hooks', cleanTopic, hooks.join('\n'))
  }

  function generateHashtags(event) {
    event.preventDefault()
    const terms = hashtagTopic
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
    if (terms.length === 0) {
      setHashtagOutput('')
      return
    }
    const topicTag = terms.join('')
    const relatedTags = [
      `#${topicTag}`,
      `#${terms[0]}tips`,
      `#aprende${terms[0]}`,
      '#creaciondecontenido',
      '#creadoresdigitales',
      '#ideasdeldia',
      '#contenidocreativo',
      '#inspiraciondiaria',
    ]
    const result = [...new Set(relatedTags)].join(' ')
    setHashtagOutput(result)
    recordGeneration('Generador de hashtags', hashtagTopic.trim(), result)
  }

  return (
    <main className="min-h-screen bg-crema px-5 py-6 text-texto sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 border-b border-beige pb-5 sm:flex-row sm:items-center">
          <a className="text-xl font-bold tracking-tight" href="#panel">CreatorKit</a>
          <button
            className="self-start rounded-lg border border-beige bg-tarjeta px-4 py-2.5 text-sm font-medium text-texto shadow-soft transition hover:bg-beige sm:self-auto"
            onClick={onLogout}
            type="button"
          >
            Cerrar sesión de prueba
          </button>
        </header>

        <div className="mt-6 rounded-xl border border-beige bg-tarjeta px-4 py-3 text-sm font-medium text-vino shadow-soft">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {activePlan === 'gratis'
                ? 'Plan Gratis · 10 ideas al mes'
                : activePlan === 'agencia'
                  ? 'Plan Agencia · espacio compartido'
                  : 'Prueba Pro · quedan 14 días'}
            </span>
            {isFreePlan && (
              <span className="text-xs font-semibold">
                Ideas usadas: {ideasUsedThisMonth}/10 · restantes: {Math.max(0, 10 - ideasUsedThisMonth)}
              </span>
            )}
          </div>
        </div>

        <section className="py-10 sm:py-14" id="panel">
          <p className="text-sm font-semibold text-vino/80">TU ESPACIO DE TRABAJO</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Bienvenido a CreatorKit.</h1>
          <p className="mt-3 max-w-2xl text-vino/80">
            Una mesa de trabajo sencilla para pensar, escribir y preparar tu próximo contenido.
          </p>

          <div className="mt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Tus herramientas</h2>
                <p className="mt-1 text-sm text-vino/80">Elige una para abrir su espacio de trabajo.</p>
              </div>
              <button
                aria-pressed={selectedTool === 'history'}
                className={`self-start rounded-lg border px-4 py-2 text-sm font-semibold transition sm:self-auto ${
                  selectedTool === 'history'
                    ? 'border-durazno bg-durazno text-white'
                    : 'border-beige bg-tarjeta text-vino hover:bg-crema'
                }`}
                onClick={() => {
                  setSelectedTool('history')
                }}
                type="button"
              >
                Historial
              </button>
            </div>

            <p className="mt-4 rounded-lg bg-crema px-3 py-2 text-xs leading-5 text-vino/80">
              {isFreePlan
                ? 'Plan Gratis · las generaciones no se guardan. Tu historial está disponible en Pro.'
                : 'Tu historial se guarda en este dispositivo. No se sincroniza entre dispositivos ni se envía a un servidor.'}
            </p>
            <p className="mt-2 text-xs text-vino/80">Modo local · resultados generados con reglas, sin conexión a IA.</p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trialTools.map((tool, index) => {
                const isLocked = isFreePlan && lockedFreeTools.includes(tool.id)
                return (
                <button
                  aria-pressed={selectedTool === tool.id}
                  className={`relative flex h-full flex-col items-start gap-3 rounded-2xl border bg-tarjeta p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-md ${
                    selectedTool === tool.id
                      ? 'border-durazno ring-2 ring-beige'
                      : 'border-beige hover:border-durazno'
                  }`}
                  key={tool.id}
                  onClick={() => {
                    setSelectedTool(tool.id)
                  }}
                  type="button"
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-lg ${
                    index % 2 === 0
                      ? 'bg-beige/60 text-oliva'
                      : 'bg-beige/60 text-oliva'
                  }`}>
                    <Icon name={isLocked ? 'lock' : tool.icon} />
                  </span>
                  <span className="text-sm font-semibold">{tool.title}</span>
                  <span className="text-xs leading-5 text-vino/80">{tool.description}</span>
                  {isLocked && <span className="text-xs font-semibold text-vino">🔒 Requiere Pro</span>}
                </button>
                )
              })}
            </div>

            {selectedTool === 'history' ? (
              <section className="mt-6 rounded-2xl border border-beige bg-tarjeta p-5 shadow-soft sm:p-7">
                <div className="flex flex-col justify-between gap-4 border-b border-beige pb-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-vino/80">Tu actividad</p>
                    <h2 className="mt-1 text-xl font-semibold">Historial de generaciones</h2>
                  </div>
                  {!isFreePlan && entradas.length > 0 && (
                    <button
                      className="self-start rounded-lg border border-beige px-3 py-2 text-sm font-medium text-vino transition hover:bg-crema sm:self-auto"
                      onClick={() => {
                        if (window.confirm('¿Borrar todo el historial de este dispositivo?')) borrar()
                      }}
                      type="button"
                    >
                      Borrar historial
                    </button>
                  )}
                </div>
                {isFreePlan ? (
                  <div className="mt-5 rounded-xl bg-crema p-4 text-sm leading-6 text-vino/80">
                    El historial persistente está disponible en Pro. Las generaciones del plan Gratis no se guardan.
                    <button className="ml-1 font-semibold text-oliva underline" onClick={requestProUpgrade} type="button">Mejorar a Pro</button>
                  </div>
                ) : (
                  <div className="mt-5 flex flex-col gap-3">
                    {historyError && <p className="rounded-lg bg-crema p-3 text-sm text-vino" role="status">{historyError}</p>}
                    {entradas.length === 0 ? (
                      <p className="rounded-lg bg-crema p-4 text-sm text-vino/80">Todavía no hay generaciones guardadas en este dispositivo.</p>
                    ) : entradas.map((entry) => (
                      <article className="flex flex-col gap-3 rounded-xl border border-beige bg-tarjeta p-4 sm:flex-row sm:items-start sm:justify-between" key={entry.id}>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-sm font-semibold">{entry.tool}</h3>
                            <time className="text-xs text-vino/80" dateTime={entry.date}>{new Date(entry.date).toLocaleString('es')}</time>
                          </div>
                          <p className="mt-1 text-xs text-vino/80">{entry.input} · Plan {planNames[entry.plan] || entry.plan}</p>
                          <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-6 text-texto">{entry.result}</pre>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button className="rounded-lg border border-beige px-3 py-2 text-xs font-semibold text-vino hover:bg-crema" onClick={() => copyText(entry.result)} type="button">Copiar</button>
                          <button aria-label={`Eliminar ${entry.tool}`} className="rounded-lg border border-beige px-3 py-2 text-xs font-semibold text-vino hover:bg-crema" onClick={() => eliminar(entry.id)} type="button">Eliminar</button>
                        </div>
                      </article>
                    ))}
                    {copyMessage && <p aria-live="polite" className="text-xs text-vino/80">{copyMessage}</p>}
                  </div>
                )}
              </section>
            ) : activeTool ? (
              <section className="mt-6 rounded-2xl border border-beige bg-tarjeta p-5 shadow-soft sm:p-7">
                <div className="flex flex-col justify-between gap-4 border-b border-beige pb-5 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-beige/60 text-oliva">
                      <Icon name={activeTool.icon} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-vino/80">Espacio de trabajo</p>
                      <h2 className="mt-1 text-xl font-semibold">{activeTool.title}</h2>
                    </div>
                  </div>
                  <button
                    className="self-start rounded-lg border border-beige px-3 py-2 text-sm font-medium text-vino/80 transition hover:bg-beige"
                    onClick={() => setSelectedTool(null)}
                    type="button"
                  >
                    Volver a herramientas
                  </button>
                </div>

                {isFreePlan && lockedFreeTools.includes(selectedTool) ? (
                  <div className="mt-5 rounded-xl bg-crema p-5">
                    <div className="flex items-center gap-2 font-semibold text-vino"><Icon name="lock" /> Esta herramienta está bloqueada en el Plan Gratis.</div>
                    <p className="mt-2 text-sm leading-6 text-vino/80">Mejora a Pro para desbloquear esta herramienta y guardar tu historial de generaciones.</p>
                    <button className="mt-4 rounded-lg bg-durazno px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-vino" onClick={requestProUpgrade} type="button">Mejorar a Pro</button>
                  </div>
                ) : (
                  <>

                {selectedTool === 'ideas' && (
                  <form className="mt-5 flex flex-col gap-4" onSubmit={generateIdea}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Nicho
                        <select
                          className="w-full rounded-lg border border-beige bg-tarjeta px-3 py-2.5 text-texto outline-none focus:border-durazno focus:ring-2 focus:ring-beige"
                          onChange={(event) => {
                            setNiche(event.target.value)
                            setIdeaIndex(-1)
                            setIdeaOutput([])
                          }}
                          value={niche}
                        >
                          {Object.keys(ideasByNiche).map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Plataforma
                        <select
                          className="w-full rounded-lg border border-beige bg-tarjeta px-3 py-2.5 text-texto outline-none focus:border-durazno focus:ring-2 focus:ring-beige"
                          onChange={(event) => setPlatform(event.target.value)}
                          value={platform}
                        >
                          {['Instagram', 'TikTok', 'YouTube', 'LinkedIn'].map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={isFreePlan && ideasUsedThisMonth >= 10} type="submit">
                      Generar 3 ideas
                    </button>
                    {isFreePlan && ideasUsedThisMonth >= 10 && (
                      <p className="rounded-lg border border-beige bg-crema p-3 text-sm text-vino" role="status">
                        Alcanzaste el límite de 10 generaciones de ideas de este mes. Podrás volver a generar el próximo mes.
                      </p>
                    )}
                    {ideaOutput.length > 0 && (
                      <ol aria-live="polite" className="flex flex-col gap-3">
                        {ideaOutput.map((idea, index) => (
                          <li className="rounded-xl bg-crema p-4 text-sm leading-6" key={`${ideaIndex}-${index}`}>{idea}</li>
                        ))}
                      </ol>
                    )}
                  </form>
                )}

                {selectedTool === 'titles' && (
                  <form className="mt-5 flex flex-col gap-4" onSubmit={generateTitleAlternatives}>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Escribe tu título
                      <input
                        className="w-full rounded-lg border border-beige bg-tarjeta px-4 py-3 text-sm text-texto outline-none placeholder:text-vino/60 focus:border-oliva focus:ring-2 focus:ring-beige"
                        onChange={(event) => {
                          setTitle(event.target.value)
                          setTitleAlternatives([])
                          setCopyMessage('')
                        }}
                        placeholder="Ej. Cómo mejorar tus videos..."
                        type="text"
                        value={title}
                      />
                    </label>
                    <div aria-live="polite" className="rounded-lg bg-crema p-3 text-sm">
                      <p className="text-vino/80">Caracteres: <span className="font-semibold text-texto">{title.length}</span> / 60</p>
                      <p className={`mt-1 text-xs font-medium ${remainingCharacters < 0 ? 'text-vino' : 'text-oliva'}`}>
                        {title.length === 0
                          ? 'Empieza a escribir para revisar tu título.'
                          : remainingCharacters < 0
                            ? `El título supera el límite recomendado por ${Math.abs(remainingCharacters)} caracteres.`
                            : 'Longitud adecuada para títulos en pantallas móviles.'}
                      </p>
                    </div>
                    <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={!title.trim()} type="submit">
                      Proponer alternativas
                    </button>
                    {titleAlternatives.length > 0 && (
                      <div aria-live="polite" className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">Alternativas basadas en plantillas</h3>
                        {titleAlternatives.map((alternative) => (
                          <div className="flex flex-col gap-3 rounded-lg bg-crema p-3 sm:flex-row sm:items-center sm:justify-between" key={alternative}>
                            <p className="text-sm">{alternative}</p>
                            <button className="self-start text-xs font-semibold text-oliva hover:underline sm:self-auto" onClick={() => copyText(alternative)} type="button">Copiar</button>
                          </div>
                        ))}
                        {copyMessage && <p aria-live="polite" className="text-xs text-vino/80">{copyMessage}</p>}
                      </div>
                    )}
                  </form>
                )}

                {selectedTool === 'scripts' && (
                  <form className="mt-5 flex flex-col gap-4" onSubmit={generateScript}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Tipo de video
                        <select className="rounded-lg border border-beige bg-tarjeta px-3 py-2.5 outline-none focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setScriptType(event.target.value)} value={scriptType}>
                          {(isFreePlan
                            ? ['Tutorial', 'Historia', 'Lista']
                            : ['Tutorial', 'Historia', 'Lista', 'Entrevista', 'Antes y después', 'Reseña']
                          ).map((type) => <option key={type}>{type}</option>)}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Duración
                        <select className="rounded-lg border border-beige bg-tarjeta px-3 py-2.5 outline-none focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setScriptDuration(event.target.value)} value={scriptDuration}>
                          <option value="15">15 segundos</option>
                          <option value="30">30 segundos</option>
                          <option value="60">60 segundos</option>
                        </select>
                      </label>
                    </div>
                    {isFreePlan && (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {['Entrevista', 'Antes y después', 'Reseña'].map((template) => (
                          <button
                            className="flex items-center justify-between gap-2 rounded-lg border border-beige bg-crema px-3 py-2 text-left text-xs text-vino/80"
                            key={template}
                            onClick={requestProUpgrade}
                            type="button"
                          >
                            <span>{template}</span><Icon className="h-4 w-4" name="lock" />
                          </button>
                        ))}
                      </div>
                    )}
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Tema del video
                      <input className="rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setScriptTopic(event.target.value)} placeholder="Ej. Ideas para organizar mi semana" value={scriptTopic} />
                    </label>
                    <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={!scriptTopic.trim()} type="submit">
                      Crear estructura de guion
                    </button>
                    {scriptOutput && <pre aria-live="polite" className="whitespace-pre-wrap rounded-xl bg-crema p-4 font-sans text-sm leading-6">{scriptOutput}</pre>}
                  </form>
                )}

                {selectedTool === 'calendar' && (
                  <>
                  {!isFreePlan && (
                    <button className="mt-5 rounded-lg border border-beige bg-tarjeta px-3 py-2 text-sm font-semibold text-vino hover:bg-crema" onClick={() => setCalendarMode((mode) => mode === 'list' ? 'month' : 'list')} type="button">
                      {calendarMode === 'month' ? 'Vista de lista' : 'Vista mensual'}
                    </button>
                  )}
                  <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <form className="flex flex-col gap-4" onSubmit={addCalendarPost}>
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Publicación
                        <input className="rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setPostText(event.target.value)} placeholder="Título o idea del post" value={postText} />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Fecha
                        <input className="rounded-lg border border-beige px-3 py-2.5 text-sm outline-none focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setPostDate(event.target.value)} type="date" value={postDate} />
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm font-medium">
                          Plataforma
                          <select className="rounded-lg border border-beige bg-tarjeta px-3 py-2.5 text-sm outline-none focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setPostPlatform(event.target.value)} value={postPlatform}>
                            {['Instagram', 'TikTok', 'YouTube', 'LinkedIn'].map((option) => <option key={option}>{option}</option>)}
                          </select>
                        </label>
                        <label className="flex flex-col gap-2 text-sm font-medium">
                          Estado
                          <select className="rounded-lg border border-beige bg-tarjeta px-3 py-2.5 text-sm outline-none focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setPostStatus(event.target.value)} value={postStatus}>
                            {['Idea', 'En edición', 'Programado', 'Publicado'].map((option) => <option key={option}>{option}</option>)}
                          </select>
                        </label>
                      </div>
                      <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={!postText.trim() || !postDate} type="submit">
                        Agregar al calendario
                      </button>
                    </form>
                    {(calendarMode === 'list' || isFreePlan) && <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-semibold">Publicaciones planificadas · Solo esta sesión</h3>
                      {calendarPosts.length === 0 ? (
                        <p className="rounded-lg bg-crema p-4 text-sm leading-6 text-vino/80">Todavía no hay publicaciones. Agrega una con su fecha, plataforma y estado.</p>
                      ) : calendarPosts.map((post) => (
                        <article className="flex flex-col justify-between gap-3 rounded-lg border border-beige bg-crema p-3 sm:flex-row sm:items-center" key={post.id}>
                          <div>
                            <p className="text-sm font-medium">{post.text}</p>
                            <p className="mt-1 text-xs text-vino/80">{post.date} · {post.platform} · {post.status}</p>
                          </div>
                          <button className="self-start text-xs font-medium text-oliva hover:underline sm:self-auto" onClick={() => removeCalendarPost(post.id)} type="button">Quitar</button>
                        </article>
                      ))}
                    </div>}
                    {!isFreePlan && calendarMode === 'month' && (
                      <section className="flex flex-col gap-3 rounded-xl border border-beige bg-crema p-4 lg:col-span-2">
                        <h3 className="font-semibold">
                          Vista mensual · {calendarNow.toLocaleDateString('es', { month: 'long', year: 'numeric' })}
                        </h3>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-vino/80 sm:gap-2">
                          {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'].map((day) => <span key={day}>{day}</span>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                          {Array.from({ length: calendarStartOffset }, (_, index) => (
                            <span aria-hidden="true" className="min-h-12" key={`empty-${index}`} />
                          ))}
                          {Array.from({ length: calendarDaysCount }, (_, index) => {
                            const day = index + 1
                            const date = `${calendarNow.getFullYear()}-${String(calendarNow.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                            const postsOnDay = calendarPosts.filter((post) => post.date === date)
                            return (
                              <div className="min-h-12 rounded-lg border border-beige bg-tarjeta p-1.5 text-xs" key={date}>
                                <span className="font-medium">{day}</span>
                                {postsOnDay.length > 0 && <span className="mt-1 block truncate text-oliva">{postsOnDay.length} post</span>}
                              </div>
                            )
                          })}
                        </div>
                      </section>
                    )}
                  </div>
                  </>
                )}

                {selectedTool === 'palettes' && (
                  <div className="mt-5 flex flex-col gap-5">
                    <p className="text-sm leading-6 text-vino/80">Combinaciones armónicas generadas localmente. Copia los códigos HEX para usarlos en tu proyecto.</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                      {paletteColors.map((color) => (
                        <button aria-label={`Copiar ${color}`} className="flex items-center gap-3 rounded-lg border border-beige p-2 text-left transition hover:bg-crema sm:flex-col sm:items-stretch" key={color} onClick={() => copyPalette([color])} title={`Copiar ${color}`} type="button">
                          <span className="h-10 w-10 shrink-0 rounded-md border border-beige sm:h-16 sm:w-full" style={{ backgroundColor: color }} />
                          <span className="text-sm font-medium">{color}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" onClick={generatePalette} type="button">
                        Generar otra paleta
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg border border-beige bg-tarjeta px-4 py-3 text-sm font-medium hover:bg-crema" onClick={() => copyPalette(paletteColors)} type="button">
                        <Icon className="h-4 w-4" name="copy" />
                        Copiar los cinco HEX
                      </button>
                    </div>
                    {paletteMessage && <p aria-live="polite" className="text-sm text-vino/80">{paletteMessage}</p>}
                  </div>
                )}

                {selectedTool === 'captions' && (
                  <form className="mt-5 flex flex-col gap-4" onSubmit={generateCaption}>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Tema de la publicación
                      <input className="rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setCaptionTopic(event.target.value)} placeholder="Ej. Mi rutina para planificar contenido" value={captionTopic} />
                    </label>
                    <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={!captionTopic.trim()} type="submit">Crear caption</button>
                    {captionOutput && <p aria-live="polite" className="whitespace-pre-wrap rounded-xl bg-crema p-4 text-sm leading-6">{captionOutput}</p>}
                  </form>
                )}

                {selectedTool === 'hooks' && (
                  <form className="mt-5 flex flex-col gap-4" onSubmit={generateHooks}>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Tema del video
                      <input className="rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => {
                        setHookTopic(event.target.value)
                        setHookOutput([])
                      }} placeholder="Ej. Cómo cuidar plantas en casa" value={hookTopic} />
                    </label>
                    <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={!hookTopic.trim()} type="submit">Generar hooks</button>
                    {hookOutput.length > 0 && (
                      <ol aria-live="polite" className="flex list-decimal flex-col gap-2 pl-5">
                        {hookOutput.map((hook) => <li className="rounded-lg bg-crema p-3 text-sm leading-6" key={hook}>{hook}</li>)}
                      </ol>
                    )}
                  </form>
                )}

                {selectedTool === 'hashtags' && (
                  <form className="mt-5 flex flex-col gap-4" onSubmit={generateHashtags}>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Tema de tu publicación
                      <input className="rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => {
                        setHashtagTopic(event.target.value)
                        setHashtagOutput('')
                      }} placeholder="Ej. fotografía de viajes" value={hashtagTopic} />
                    </label>
                    <button className="self-start rounded-lg bg-durazno px-5 py-3 font-medium text-white transition hover:bg-vino" disabled={!hashtagTopic.trim()} type="submit">Generar hashtags</button>
                    {hashtagOutput && <p aria-live="polite" className="rounded-xl bg-crema p-4 text-sm leading-7 text-oliva">{hashtagOutput}</p>}
                  </form>
                )}
                {selectedTool === 'brand' && (
                  <div className="mt-5 flex flex-col gap-4">
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Nombre de marca
                      <input className="rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setBrandName(event.target.value)} placeholder="Ej. Mi marca creativa" value={brandName} />
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium">
                      Color principal
                      <input aria-label="Color principal de marca" className="h-10 w-14 rounded border border-beige p-1" onChange={(event) => setBrandColor(event.target.value)} type="color" value={brandColor} />
                      <span className="font-mono text-xs text-vino/80">{brandColor.toUpperCase()}</span>
                    </label>
                    {!isFreePlan && (
                      <label className="flex flex-col gap-2 text-sm font-medium">
                        Tono de voz
                        <textarea className="min-h-24 rounded-lg border border-beige px-4 py-3 text-sm outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige" onChange={(event) => setBrandVoice(event.target.value)} placeholder="Describe cómo se expresa tu marca..." value={brandVoice} />
                      </label>
                    )}
                    {brandName && <p className="rounded-lg bg-crema p-3 text-sm">Vista previa: <span className="font-semibold">{brandName}</span></p>}
                    <p className="rounded-lg bg-crema p-3 text-sm text-vino/80">
                      {isFreePlan ? 'Las exportaciones del Plan Gratis incluyen marca de agua.' : 'Exportaciones sin marca de agua incluidas en tu plan.'}
                    </p>
                    {!isFreePlan && <p className="text-xs text-vino/80">Kit de marca completo con tono de voz. El historial está disponible en la pestaña Historial.</p>}
                  </div>
                )}
                  </>
                )}
              </section>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-beige bg-tarjeta/70 p-5 text-sm text-vino/80">
                Selecciona una tarjeta para abrir la herramienta. El calendario se mantiene solo durante esta sesión.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function App() {
  const [isTrialActive, setIsTrialActive] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [paymentPlan, setPaymentPlan] = useState(null)
  const [email, setEmail] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [faqSearch, setFaqSearch] = useState('')
  const normalizedFaqSearch = faqSearch
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  const filteredFaqs = faqs.filter(([question, answer]) => (
    `${question} ${answer}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(normalizedFaqSearch)
  ))

  function enterTrial(plan) {
    if (isTrialActive) return
    setSelectedPlan(plan.toLowerCase())
    setIsTrialActive(true)
    setIsMobileMenuOpen(false)
  }

  function startTrial(event) {
    event.preventDefault()
    enterTrial('Pro')
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  if (isTrialActive) {
    return (
      <>
        <Dashboard
          activePlan={selectedPlan}
          onLogout={() => setIsTrialActive(false)}
          onOpenPayment={setPaymentPlan}
        />
        {paymentPlan && <PaymentModal onClose={() => setPaymentPlan(null)} planKey={paymentPlan} />}
      </>
    )
  }

  const navLinks = [
    ['Inicio', '#inicio'],
    ['Herramientas', '#herramientas'],
    ['Precios', '#precios'],
    ['Contacto', '#contacto'],
  ]

  return (
    <div className="min-h-screen bg-crema font-sans text-texto selection:bg-beige selection:text-vino">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-beige bg-tarjeta/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8 lg:px-12">
          <a aria-label="CreatorKit, inicio" className="text-xl font-bold tracking-tight text-texto" href="#inicio">
            CreatorKit
          </a>
          <nav aria-label="Navegación principal" className="hidden items-center gap-8 text-sm font-medium text-vino/80 md:flex">
            {navLinks.map(([label, href]) => (
              <a className="transition hover:text-oliva" href={href} key={label}>{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a className="hidden rounded-lg bg-durazno px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-vino sm:inline-flex" href="#registro">
              Empieza gratis
            </a>
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="grid h-10 w-10 place-items-center rounded-lg border border-beige text-texto md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              type="button"
            >
              <Icon className="h-5 w-5" name={isMobileMenuOpen ? 'close' : 'menu'} />
            </button>
          </div>
          {isMobileMenuOpen && (
            <nav aria-label="Navegación móvil" className="flex w-full flex-col gap-1 border-t border-beige pt-3 md:hidden">
              {navLinks.map(([label, href]) => (
                <a
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-vino/80 hover:bg-crema hover:text-oliva"
                  href={href}
                  key={label}
                  onClick={closeMobileMenu}
                >
                  {label}
                </a>
              ))}
              <a className="mt-1 rounded-lg bg-durazno px-3 py-2.5 text-center text-sm font-semibold text-white" href="#registro" onClick={closeMobileMenu}>
                Empieza gratis
              </a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-beige bg-tarjeta px-4 py-2 text-sm font-medium text-oliva shadow-soft">
                <span className="h-2 w-2 rounded-full bg-oliva" />
                El espacio de trabajo para creadores
              </span>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-texto sm:text-5xl">
                Crea contenido que conecta.
                <span className="mt-1 block text-vino">
                  Menos fricción, más impacto.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-vino/80">
                Planifica, escribe y organiza tus videos, reels y posts desde una plataforma clara. Más tiempo para tus ideas y menos para ordenar el proceso.
              </p>
              <form className="flex flex-col gap-3 sm:flex-row" id="registro" onSubmit={startTrial}>
                <label className="w-full sm:max-w-xs">
                  <span className="sr-only">Correo electrónico</span>
                  <input
                    autoComplete="email"
                    className="w-full rounded-lg border border-beige bg-tarjeta px-4 py-3 text-texto outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Tu correo electrónico"
                    required
                    type="email"
                    value={email}
                  />
                </label>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-durazno px-5 py-3 text-sm font-semibold text-white shadow-md shadow-soft transition hover:brightness-105" type="submit">
                  Comenzar gratis
                  <Icon className="h-4 w-4" name="arrow" />
                </button>
              </form>
              <p className="text-xs text-vino/80">Sin tarjeta de crédito · 14 días de prueba</p>
            </div>

            <div aria-label="Vista previa del panel CreatorKit" className="flex flex-col gap-4 rounded-2xl border border-beige bg-tarjeta p-4 shadow-soft sm:p-6">
              <div className="flex flex-col justify-between gap-3 border-b border-beige pb-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-beige/60 text-oliva"><Icon name="idea" /></span>
                  <div>
                    <p className="text-xs font-medium text-vino/80">CREATORKIT WORKSPACE</p>
                    <h2 className="mt-0.5 text-sm font-semibold">Tu semana creativa</h2>
                  </div>
                </div>
                <span className="self-start rounded-md bg-crema px-3 py-1.5 text-xs font-medium text-vino/80 sm:self-auto">21 — 27 oct</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-crema p-3.5">
                  <p className="text-xs text-vino/80">Ideas guardadas</p>
                  <p className="mt-1 text-2xl font-bold">24</p>
                  <p className="mt-1 text-xs text-oliva">+6 esta semana</p>
                </div>
                <div className="rounded-xl bg-crema p-3.5">
                  <p className="text-xs text-vino/80">En calendario</p>
                  <p className="mt-1 text-2xl font-bold">08</p>
                  <p className="mt-1 text-xs text-vino/80">3 formatos</p>
                </div>
                <div className="rounded-xl bg-crema p-3.5">
                  <p className="text-xs text-vino/80">Ritmo semanal</p>
                  <p className="mt-1 text-2xl font-bold">4 / 5</p>
                  <p className="mt-1 text-xs text-vino/80">Publicaciones planeadas</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-beige p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold">Ideas para esta semana</h3>
                  <span className="text-xs text-oliva">Ver calendario</span>
                </div>
                {[
                  ['Reel', '3 errores comunes al empezar', 'bg-durazno'],
                  ['Carrusel', 'Una guía breve para tu audiencia', 'bg-oliva'],
                  ['Post', 'Lo que aprendí creando cada día', 'bg-vino/50'],
                ].map(([format, title, marker]) => (
                  <div className="flex items-center gap-3 rounded-lg bg-crema px-3 py-2.5" key={title}>
                    <span className={`h-8 w-1 rounded-full ${marker}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{title}</p>
                      <p className="mt-0.5 text-xs text-vino/80">{format}</p>
                    </div>
                    <span className="text-xs text-vino/80">Borrador</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-vino p-4 text-white sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold">Próxima publicación</span>
                <span className="text-sm text-beige">Reel · Miércoles, 17:30</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-beige bg-tarjeta px-5 py-16 sm:px-8 lg:px-12 lg:py-20" id="herramientas">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-oliva">Herramientas</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tu proceso creativo, en un solo lugar.</h2>
              <p className="mt-4 leading-7 text-vino/80">Todo lo esencial para convertir tus ideas en contenido coherente, sin complicar tu flujo.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article className="group flex flex-col gap-4 rounded-2xl border border-beige bg-tarjeta p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-durazno hover:shadow-md" key={feature.title}>
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${feature.accent}`}>
                    <Icon name={feature.icon} />
                  </span>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="text-sm leading-6 text-vino/80">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20" id="funcionalidades">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-oliva">Cómo funciona</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">De la primera idea al siguiente post.</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                ['01', 'Elige tu enfoque', 'Selecciona el tema, la audiencia y el formato que quieres crear.'],
                ['02', 'Desarrolla la idea', 'Convierte el concepto en un guion claro, listo para llevar a la práctica.'],
                ['03', 'Organiza y publica', 'Añade tu contenido al calendario y prepara cada publicación a tu ritmo.'],
              ].map(([number, title, description]) => (
                <article className="rounded-2xl border border-beige bg-tarjeta p-6 shadow-soft" key={number}>
                  <span className="text-sm font-bold tabular-nums text-oliva">{number}</span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-vino/80">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-beige bg-tarjeta px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-crema p-5 text-center">
                <p className="text-3xl font-bold">+50k</p><p className="mt-1 text-sm text-vino/80">Creadores</p>
              </div>
              <div className="rounded-2xl bg-crema p-5 text-center">
                <p className="text-3xl font-bold">4.9<span className="text-lg text-oliva">/5</span></p><p className="mt-1 text-sm text-vino/80">Calificación</p>
              </div>
              <div className="rounded-2xl bg-crema p-5 text-center">
                <p className="text-3xl font-bold">+2M</p><p className="mt-1 text-sm text-vino/80">Posts creados</p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                ['LM', 'Lucía M.', 'Creadora de contenido', '“Ahora tengo un proceso claro para pasar de una idea a una semana completa de publicaciones.”'],
                ['DR', 'Diego R.', 'Educador digital', '“Las plantillas me ayudan a ordenar lo que quiero decir sin quitarle personalidad a mis videos.”'],
                ['SC', 'Sofía C.', 'Fundadora y creadora', '“Puedo mantener una estética consistente y dejar de buscar mis notas por todas partes.”'],
              ].map(([initials, name, role, quote]) => (
                <figure className="flex flex-col gap-5 rounded-2xl border border-beige bg-tarjeta p-6 shadow-soft" key={name}>
                  <blockquote className="text-sm leading-7 text-texto">{quote}</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-beige pt-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-beige/60 text-xs font-semibold text-oliva">{initials}</span>
                    <span><span className="block text-sm font-semibold">{name}</span><span className="mt-0.5 block text-xs text-vino/80">{role}</span></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20" id="precios">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-oliva">Precios claros</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Un plan para cada etapa.</h2>
              <p className="mt-4 text-vino/80">Empieza gratis y amplía tu flujo cuando estés listo.</p>
            </div>
            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article className={`flex h-full flex-col rounded-2xl bg-tarjeta p-6 shadow-soft ${plan.featured ? 'border border-durazno' : 'border border-beige'}`} key={plan.name}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.featured && <span className="rounded-full bg-beige/60 px-3 py-1 text-xs font-semibold text-oliva">Más popular</span>}
                  </div>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-vino/80">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-sm text-vino/80">$</span>
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-vino/80">/ mes</span>
                  </div>
                  <button
                    className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95 ${
                      plan.featured ? 'bg-durazno' : plan.name === 'Gratis' ? 'bg-oliva' : 'bg-vino'
                    }`}
                    onClick={() => {
                      if (plan.name === 'Agencia') {
                        setPaymentPlan('agencia')
                      } else if (plan.name === 'Pro') {
                        setPaymentPlan('pro')
                      } else {
                        enterTrial(plan.name)
                      }
                    }}
                    type="button"
                  >
                    {plan.featured ? 'Comenzar 14 días gratis' : plan.name === 'Gratis' ? 'Empezar gratis' : 'Contactar al equipo'}
                  </button>
                  <div className="my-6 h-px bg-beige" />
                  <p className="text-sm font-semibold">Incluye:</p>
                  <ul className="mt-4 flex flex-1 flex-col gap-3">
                    {plan.features.map((item) => (
                      <li className="flex items-start gap-2.5 text-sm text-vino/80" key={item}>
                        <Icon className="mt-0.5 h-4 w-4 text-oliva" name="check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-beige bg-tarjeta px-5 py-16 sm:px-8 lg:px-12 lg:py-20" id="faq">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-oliva">Preguntas frecuentes</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">¿Tienes dudas?</h2>
              <p className="mt-4 text-sm leading-6 text-vino/80">Escríbenos y te ayudamos a encontrar una respuesta.</p>
            </div>
            <div className="flex flex-col divide-y divide-beige border-y border-beige">
              <label className="flex flex-col gap-2 border-b border-beige py-4 text-sm font-medium">
                Buscar preguntas frecuentes
                <input
                  className="w-full rounded-lg border border-beige bg-tarjeta px-4 py-3 text-sm font-normal text-texto outline-none placeholder:text-vino/60 focus:border-durazno focus:ring-2 focus:ring-beige"
                  onChange={(event) => setFaqSearch(event.target.value)}
                  placeholder="Escribe una pregunta o palabra clave"
                  type="search"
                  value={faqSearch}
                />
              </label>
              {filteredFaqs.length > 0 ? filteredFaqs.map(([question, answer]) => (
                <details className="group py-5" key={question}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-texto marker:content-none">
                    {question}
                    <span className="text-lg text-oliva transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pt-3 text-sm leading-6 text-vino/80">{answer}</p>
                </details>
              )) : (
                <p className="py-5 text-sm text-vino/80">
                  No encontramos coincidencias. Escríbenos a <a className="font-semibold text-oliva underline" href="mailto:hola@creatorkit.com">hola@creatorkit.com</a>.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-crema px-5 py-10 sm:px-8 lg:px-12" id="contacto">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 border-b border-beige pb-8 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <a className="text-xl font-bold text-texto" href="#inicio">CreatorKit</a>
              <p className="mt-3 max-w-xs text-sm leading-6 text-vino/80">Un espacio de trabajo para que tus ideas lleguen más lejos.</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-vino/80">Producto</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-vino/80">
                <li><a className="hover:text-oliva" href="#inicio">Inicio</a></li>
                <li><a className="hover:text-oliva" href="#herramientas">Herramientas</a></li>
                <li><a className="hover:text-oliva" href="#precios">Precios</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-vino/80">Información</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-vino/80">
                <li><a className="hover:text-oliva" href="#faq">Preguntas frecuentes</a></li>
                <li><a className="hover:text-oliva" href="mailto:hola@creatorkit.com?subject=T%C3%A9rminos">Términos y condiciones</a></li>
                <li><a className="hover:text-oliva" href="mailto:hola@creatorkit.com?subject=Privacidad">Política de privacidad</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-vino/80">Contacto</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-vino/80">
                <li><a className="hover:text-oliva" href="mailto:hola@creatorkit.com">hola@creatorkit.com</a></li>
                <li><a className="hover:text-oliva" href="https://instagram.com">Instagram ↗</a></li>
                <li><a className="hover:text-oliva" href="https://youtube.com">YouTube ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 pt-5 text-xs text-vino/80 sm:flex-row">
            <p>© 2026 CreatorKit. Todos los derechos reservados.</p>
            <p>Diseñado para crear con intención.</p>
          </div>
        </div>
      </footer>
      {paymentPlan && <PaymentModal onClose={() => setPaymentPlan(null)} planKey={paymentPlan} />}
    </div>
  )
}

export default App
