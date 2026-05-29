import { useState } from "react"
import { useToaster } from "../../src/hooks/toaster/useToaster"
import { PropRow, Switch } from "../components/PropRow"

type Level = "Info" | "Warn" | "Error"

export function ToasterPage() {
    const [title, setTitle] = useState("Info")
    const [description, setDescription] = useState("This is a toast notification.")
    const [level, setLevel] = useState<Level>("Info")
    const [isDismissable, setIsDismissable] = useState(false)
    const { bake } = useToaster()

    function handleFire() {
        bake({ title, description, level, isDismissable })
    }

    return (
        <div className="playground">
            <div className="playground-preview">
                <div className="preview-card">
                    <span className="preview-label">Preview</span>
                    <button className="fire-btn" onClick={handleFire}>
                        Fire Toast
                    </button>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textAlign: "center" }}>
                        Toast appears in the top-right corner
                    </p>
                </div>
            </div>

            <div className="playground-controls">
                <div className="controls-heading">Props</div>

                <PropRow label="title">
                    <input
                        className="prop-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </PropRow>

                <PropRow label="description">
                    <input
                        className="prop-input"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </PropRow>

                <PropRow label="level">
                    <select
                        className="prop-select"
                        value={level}
                        onChange={(e) => setLevel(e.target.value as Level)}
                    >
                        <option value="Info">Info</option>
                        <option value="Warn">Warn</option>
                        <option value="Error">Error</option>
                    </select>
                </PropRow>

                <PropRow label="isDismissable">
                    <Switch checked={isDismissable} onChange={setIsDismissable} />
                </PropRow>
            </div>
        </div>
    )
}
