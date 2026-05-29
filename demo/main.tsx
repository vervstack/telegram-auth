import {createRoot} from "react-dom/client"
import {useState} from "react"
import {TelegramSignInButton} from "../src/components/TelegramSignInButton"
import Toaster from "../src/components/notifications/Toaster"
import {useToaster} from "../src/hooks/toaster/useToaster"
import "./demo.css"

function App() {
    const [lang, setLang] = useState<"en" | "ru">("en")
    const {bake} = useToaster()

    return (
        <main className="page">
            <Toaster/>
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
                <div className="lang-toggle">
                    <button onClick={() => bake({title: "Info", description: "This is an info toast.", level: "Info"})}>
                        Info Toast
                    </button>
                    <button onClick={() => bake({title: "Warn", description: "Something looks off.", level: "Warn"})}>
                        Warn Toast
                    </button>
                    <button onClick={() => bake({title: "Error", description: "Something went wrong.", level: "Error", isDismissable: true})}>
                        Error Toast
                    </button>
                </div>
            </div>
        </main>
    )
}

createRoot(document.getElementById("root")!).render(<App />)
