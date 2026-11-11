import { FormEvent, useRef, useState } from "react";

const A = `${import.meta.env.BASE_URL}assets`;

const assets = {
  logo: `${A}/bf338.svg`,
  detailLogo: `${A}/8bbf1.svg`,
  heroEye: `${A}/585e3.svg`,
  whatsappHeader: `${A}/096cf.svg`,
  whatsappButton: `${A}/ef7b5.svg`,
  whatsappLarge: `${A}/63bf3.svg`,
  arrowWhite: `${A}/3747d.svg`,
  arrowDark: `${A}/02d27.svg`,
  arrowRed: `${A}/01963.svg`,
  arrowGreen: `${A}/86249.svg`,
  upload: `${A}/49cdb.svg`,
  search: `${A}/1f852.svg`,
  shield: `${A}/e5cea.svg`,
  shieldDark: `${A}/57b62.svg`,
  dropdown: `${A}/66673.svg`,
  uploadWhite: `${A}/b658e.svg`,
  detailShield: `${A}/d7fe7.svg`,
};

const locations = ["Antonio Nariño", "Bosa", "Ciudad Bolívar", "Kennedy", "Suba", "Usaquén"];

function Icon({ src, alt = "" }: { src: string; alt?: string }) {
  return <img className="asset-icon" src={src} alt={alt} />;
}

function Logo({ detail = false }: { detail?: boolean }) {
  return (
    <button
      className={detail ? "detail-logo" : "brand"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className={detail ? "detail-eye" : "brand-eye"}>
        <Icon src={detail ? assets.detailLogo : assets.logo} />
      </span>
      <span className="brand-copy">
        <strong>Gonoveeduría</strong>
        {!detail && <small>Bogotá vigila</small>}
      </span>
    </button>
  );
}

function ActionButton({
  children,
  tone = "dark",
  icon,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  tone?: "dark" | "green" | "yellow";
  icon?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className={`action action-${tone}`} onClick={onClick}>
      <span>{children}</span>
      {icon && <Icon src={icon} />}
    </button>
  );
}

function Header({ onReport }: { onReport: () => void }) {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav aria-label="Navegación principal">
          <button onClick={() => scroll("proceso")}>Cómo funciona</button>
          <button onClick={onReport}>Reportar</button>
          <button onClick={() => scroll("resultados")}>Resultados</button>
        </nav>
        <a className="header-whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer">
          <Icon src={assets.whatsappHeader} />
          WhatsApp
        </a>
      </div>
    </header>
  );
}

function Hero({ onReport }: { onReport: () => void }) {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <div className="dual-label">
            <span>Bogotá D.C.</span>
            <span>Ciudadanía en acción</span>
          </div>
          <h1>
            Si es público,
            <em>lo vigilamos.</em>
          </h1>
          <p>
            Reporta problemas con recursos, servicios y entidades de la ciudad. Investigamos,
            hacemos seguimiento y exigimos respuestas.
          </p>
          <div className="button-row">
            <ActionButton tone="dark" icon={assets.arrowWhite} onClick={onReport}>
              Reportar caso
            </ActionButton>
            <ActionButton
              tone="green"
              icon={assets.whatsappButton}
              onClick={() => window.open("https://wa.me/", "_blank")}
            >
              WhatsApp
            </ActionButton>
          </div>
        </div>
        <div className="impact-card">
          <span className="tape">Datos abiertos</span>
          <span className="impact-eye">
            <Icon src={assets.heroEye} />
          </span>
          <strong>1.284</strong>
          <p>casos ciudadanos acompañados</p>
          <div className="impact-meta">
            <span>20 localidades</span>
            <span>78% con respuesta</span>
          </div>
          <span className="active-stamp">
            Activo<small>Oct. 2026</small>
          </span>
        </div>
      </div>
      <div className="ticker" aria-label="Localidades atendidas">
        {["Kennedy", "Suba", "Bosa", "Engativá", "Ciudad Bolívar", "Usaquén"].map((place) => (
          <span key={place}>
            {place}
            <b>◆</b>
          </span>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    n: "01",
    tag: "Cuenta",
    title: "Sube tu caso",
    copy: "Dinos qué pasó y adjunta fotos, documentos o respuestas oficiales.",
    color: "yellow",
    icon: assets.upload,
  },
  {
    n: "02",
    tag: "Verifica",
    title: "Investigamos",
    copy: "Contrastamos la evidencia y pedimos cuentas a la entidad responsable.",
    color: "orange",
    icon: assets.search,
  },
  {
    n: "03",
    tag: "Exige",
    title: "Hacemos veeduría",
    copy: "Seguimos el caso hasta obtener una respuesta clara y comprobable.",
    color: "red",
    icon: assets.shield,
  },
];

function Process() {
  return (
    <section className="paper-section" id="proceso">
      <div className="shell">
        <div className="section-intro">
          <span className="eyebrow">01 / El proceso</span>
          <h2>
            Tres pasos.
            <br />
            Cero vueltas.
          </h2>
          <p>
            No necesitas saber de leyes. Tú pones la voz y la evidencia; nosotros ponemos el método.
          </p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className={`step-card ${step.color}`} key={step.n}>
              <div className="step-top">
                <strong>{step.n}</strong>
                <span className="step-icon">
                  <Icon src={step.icon} />
                </span>
              </div>
              <div className="step-body">
                <span>{step.tag}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    setStatus("success");
  }

  return (
    <section className="report-section" id="reportar">
      <div className="shell report-layout">
        <div className="report-copy">
          <span className="eyebrow yellow-text">02 / Tu reporte</span>
          <h2>Que no se quede en la queja.</h2>
          <p>
            Registra tu caso. Cada dato ayuda a construir una denuncia más sólida y una respuesta
            más rápida.
          </p>
          <div className="privacy-note">
            <Icon src={assets.shieldDark} />
            <div>
              <strong>Tu información está protegida</strong>
              <small>Nunca publicamos tus datos sin permiso.</small>
            </div>
          </div>
        </div>
        <form className="report-form" ref={formRef} onSubmit={submit}>
          <div className="form-head">
            <span>Formulario / 001</span>
            <h3>Reportar un caso</h3>
            <b>Canal activo</b>
          </div>
          {status === "success" ? (
            <div className="form-success" role="status">
              <span>Reporte recibido</span>
              <h3>Tu caso ya está en movimiento.</h3>
              <p>
                Registramos la información. Nuestro equipo revisará la evidencia y te contactará
                para confirmar los siguientes pasos.
              </p>
              <ActionButton
                tone="yellow"
                onClick={() => {
                  setStatus("idle");
                  formRef.current?.reset();
                  setFileName("");
                }}
              >
                Enviar otro reporte
              </ActionButton>
            </div>
          ) : (
            <div className="form-content">
              <div className="field-grid">
                <label>
                  Nombre completo
                  <input required name="name" placeholder="Escribe tu nombre" />
                </label>
                <label>
                  Localidad
                  <select
                    required
                    name="location"
                    defaultValue=""
                    style={{ backgroundImage: `url(${assets.dropdown})` }}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {locations.map((location) => (
                      <option key={location}>{location}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                ¿Qué pasó?
                <textarea
                  required
                  name="story"
                  placeholder="Cuéntanos qué ocurrió, dónde y cuándo..."
                />
                <small>No incluyas contraseñas ni información bancaria.</small>
              </label>
              <label>
                Pruebas y documentos
                <span className="file-drop">
                  <span className="file-icon">
                    <Icon src={assets.uploadWhite} />
                  </span>
                  <span>
                    <strong>{fileName || "Arrastra los archivos aquí"}</strong>
                    <small>PDF, JPG o PNG · Máximo 10 MB</small>
                  </span>
                  <span className="file-button">Elegir archivos</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
                  />
                </span>
              </label>
              <ActionButton type="submit" tone="green" icon={assets.arrowWhite}>
                Enviar reporte
              </ActionButton>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

const cases = [
  {
    n: "01",
    place: "Kennedy",
    stat: "$8,4 M",
    statLabel: "devueltos a la comunidad",
    category: "Servicios públicos",
    title: "24 hogares recuperaron cobros duplicados",
    color: "yellow",
  },
  {
    n: "02",
    place: "Suba",
    stat: "600",
    statLabel: "estudiantes protegidos",
    category: "Movilidad",
    title: "Ruta escolar ahora cuenta con cruces seguros",
    color: "red",
    detail: true,
  },
  {
    n: "03",
    place: "Bosa",
    stat: "37",
    statLabel: "tratamientos garantizados",
    category: "Salud",
    title: "Medicamentos esenciales entregados a tiempo",
    color: "green",
  },
];

function Results({ onOpenCase }: { onOpenCase: () => void }) {
  return (
    <section className="paper-section results-section" id="resultados">
      <div className="shell">
        <div className="section-intro results-intro">
          <span className="eyebrow">03 / Resultados</span>
          <h2>La ciudad responde cuando nos movemos.</h2>
          <p>Casos reales, evidencia pública y cambios que se pueden comprobar.</p>
        </div>
        <div className="case-grid">
          {cases.map((item) => (
            <article className={`case-card ${item.color}`} key={item.n}>
              <div className="case-head">
                <strong>{item.n}</strong>
                <span>{item.place}</span>
              </div>
              <div className="case-stat">
                <strong>{item.stat}</strong>
                <span>{item.statLabel}</span>
              </div>
              <div className="case-story">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <button onClick={item.detail ? onOpenCase : undefined}>
                  Ver el caso{" "}
                  <Icon src={item.color === "yellow" ? assets.arrowDark : assets.arrowRed} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppCta() {
  return (
    <section className="whatsapp-section">
      <div className="shell whatsapp-card">
        <span className="whatsapp-icon">
          <Icon src={assets.whatsappLarge} />
        </span>
        <div>
          <span>¿Necesitas orientación?</span>
          <h2>Hablemos por WhatsApp.</h2>
          <p>Lunes a viernes · 8:00 a.m. — 6:00 p.m.</p>
        </div>
        <ActionButton
          tone="yellow"
          icon={assets.arrowGreen}
          onClick={() => window.open("https://wa.me/", "_blank")}
        >
          Abrir conversación
        </ActionButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <Logo />
        <p>Participación ciudadana con método.</p>
        <nav>
          <button>Privacidad</button>
          <button>Prensa</button>
          <button>Contacto</button>
        </nav>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Gonoveeduría</span>
        <span>Bogotá D.C., Colombia</span>
      </div>
    </footer>
  );
}

function Detail({ onClose, onReport }: { onClose: () => void; onReport: () => void }) {
  const weeks = [
    ["Semana 01", "Recibimos el reporte", "Organizamos los documentos y confirmamos los hechos."],
    [
      "Semana 02",
      "Radicamos la solicitud",
      "La entidad recibió preguntas y evidencia consolidada.",
    ],
    [
      "Semana 04",
      "Verificamos la solución",
      "La comunidad confirmó que la medida fue implementada.",
    ],
  ];
  return (
    <main className="detail-page">
      <article className="detail-shell">
        <header className="detail-header">
          <Logo detail />
          <button className="close-button" onClick={onClose}>
            <span>×</span> Cerrar
          </button>
        </header>
        <section className="detail-hero">
          <div>
            <span className="case-label">Caso resuelto / Suba</span>
            <h1>Ruta escolar ahora cuenta con cruces seguros</h1>
            <p>
              Familias y docentes documentaron los riesgos viales alrededor de un colegio durante
              cuatro meses y presentaron una solicitud conjunta.
            </p>
          </div>
          <aside>
            <span>Resultado</span>
            <strong>600</strong>
            <b>estudiantes protegidos</b>
          </aside>
        </section>
        <div className="detail-meta">
          <span>Publicado: 16 oct. 2026</span>
          <span>Movilidad</span>
          <span>Lectura: 4 min</span>
        </div>
        <section className="detail-story">
          <div className="story-copy">
            <span className="eyebrow">01 / El caso</span>
            <h2>De una alerta barrial a una respuesta concreta.</h2>
            <p>
              El reporte llegó a Gonoveeduría a través de un grupo de ciudadanos de Suba. Nuestro
              equipo organizó la información, verificó fechas y comparó los documentos con los
              registros públicos disponibles.
            </p>
            <p>
              Con la evidencia consolidada, se presentó una solicitud formal ante la entidad
              responsable. Cada respuesta fue compartida y revisada con la comunidad antes de
              definir el siguiente paso.
            </p>
            <blockquote>
              “Cuando la evidencia está organizada, una queja deja de ser fácil de ignorar.”
            </blockquote>
          </div>
          <aside className="detail-sidebar">
            <div>
              <span>Evidencia revisada</span>
              <strong>86 fotografías, 2 aforos ciudadanos y 412 firmas</strong>
            </div>
            <div>
              <span>Resultado verificado</span>
              <p>
                El Distrito instaló cruces señalizados, reductores de velocidad e iluminación nueva
                en los dos accesos principales.
              </p>
              <b>
                <Icon src={assets.detailShield} /> Verificado por Gonoveeduría
              </b>
            </div>
          </aside>
        </section>
        <section className="timeline">
          <span className="eyebrow">02 / Cronología</span>
          <div>
            {weeks.map(([week, title, copy]) => (
              <article key={week}>
                <span>{week}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <footer className="detail-footer">
          <div>
            <span>¿Tienes un caso parecido?</span>
            <strong>Tu evidencia también puede mover la ciudad.</strong>
          </div>
          <ActionButton tone="dark" icon={assets.arrowWhite} onClick={onReport}>
            Reportar caso
          </ActionButton>
        </footer>
      </article>
    </main>
  );
}

export default function App() {
  const [detail, setDetail] = useState(false);
  const report = () => {
    if (detail) setDetail(false);
    window.setTimeout(
      () => document.getElementById("reportar")?.scrollIntoView({ behavior: "smooth" }),
      20,
    );
  };
  if (detail) return <Detail onClose={() => setDetail(false)} onReport={report} />;
  return (
    <>
      <Header onReport={report} />
      <main>
        <Hero onReport={report} />
        <Process />
        <ReportSection />
        <Results
          onOpenCase={() => {
            setDetail(true);
            window.scrollTo(0, 0);
          }}
        />
        <WhatsAppCta />
      </main>
      <Footer />
    </>
  );
}
