import {createRoot} from "react-dom/client"
import {useState} from "react"
import {TelegramSignInButton} from "../src/components/TelegramSignInButton"
import "./demo.css"

function App() {
    const [lang, setLang] = useState<"en" | "ru">("en")

    return (
        <main className="page">
            <div className="card">
                <TelegramSignInButton
                    onClick={() => alert("Telegram login triggered")}
                    lang={lang}
                />
                <div className="lang-toggle">
                    <button
                        className={lang === "en" ? "active" : ""}
                        onClick={() => setLang("en")}
                    >
                        EN
                    </button>
                    <button
                        className={lang === "ru" ? "active" : ""}
                        onClick={() => setLang("ru")}
                    >
                        RU
                    </button>
                </div>
            </div>
        </main>
    )
}

createRoot(document.getElementById("root")!).render(<App />)
