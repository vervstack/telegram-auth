import type {ReactNode} from "react"
import type {TelegramAuthData} from "../types"
import {useTelegramLogin} from "../hooks/useTelegramLogin"

export type TelegramAuthProps = {
    botId: string
    onSuccess: (data: TelegramAuthData) => void
    title?: string
    redirectUri?: string
    requestAccess?: string
    children?: (props: {login: () => void; isReady: boolean}) => ReactNode
    className?: string
}

export function TelegramAuth({
    botId,
    onSuccess,
    title = "Sign in with Telegram",
    redirectUri,
    requestAccess,
    children,
    className,
}: TelegramAuthProps) {
    const {login, isReady} = useTelegramLogin({botId, onSuccess, redirectUri, requestAccess})

    if (children) {
        return <>{children({login, isReady})}</>
    }

    return (
        <button className={className} onClick={login} disabled={!isReady}>
            {title}
        </button>
    )
}
