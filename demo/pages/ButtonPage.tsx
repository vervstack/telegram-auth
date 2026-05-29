import { useState } from "react"
import { TelegramSignInButton } from "../../src/components/TelegramSignInButton"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { PropRow, Switch, ToggleGroup } from "../components/PropRow"

export function ButtonPage() {
    const [lang, setLang] = useState<"en" | "ru">("en")
    const [label, setLabel] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [fullSize, setFullSize] = useState(false)
    const { bake } = useToaster()

    function handleClick() {
        bake({ title: "Clicked", description: "TelegramSignInButton was clicked.", level: "Info" })
    }

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    <TelegramSignInButton
                        onClick={handleClick}
                        lang={lang}
                        label={label || undefined}
                        disabled={disabled}
                        fullSize={fullSize}
                    />
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading">Props</div>

                <PropRow label="lang">
                    <ToggleGroup
                        options={["en", "ru"]}
                        value={lang}
                        onChange={(v) => setLang(v as "en" | "ru")}
                    />
                </PropRow>

                <PropRow label="label">
                    <input
                        className="prop-input"
                        type="text"
                        placeholder="overrides lang label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </PropRow>

                <PropRow label="disabled">
                    <Switch checked={disabled} onChange={setDisabled} />
                </PropRow>

                <PropRow label="fullSize">
                    <Switch checked={fullSize} onChange={setFullSize} />
                </PropRow>
            </div>
        </div>
    )
}
