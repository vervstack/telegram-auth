export type TelegramAuthData = {
    id_token: string
}

export type TelegramLoginWindow = Window & {
    Telegram?: {
        Login: {
            init: (
                options: {client_id: string; redirect_uri?: string},
                callback: (data: TelegramAuthData) => void,
            ) => void
            auth: (
                options: {client_id: string; redirect_uri?: string; request_access: string},
                callback: (data: TelegramAuthData) => void,
            ) => void
        }
    }
}
