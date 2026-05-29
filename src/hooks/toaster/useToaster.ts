import {create} from "zustand";

export interface Toast {
    title: string;
    description: string;
    level?: 'Error' | 'Warn' | 'Info';
    isDismissable?: boolean;
}

export interface ToasterStore {
    toasts: Toast[];
    bake: (t: Toast) => void;
    dismiss: (title: string) => void;
}

export const useToaster = create<ToasterStore>((set, get) => ({
    toasts: [],

    bake: (newToast: Toast) => {
        const existing = get().toasts.find((t: Toast) => t.title === newToast.title);
        if (existing) {
            console.error(`Toast with title "${newToast.title}" already exists`);
            return;
        }
        set((state: ToasterStore) => ({toasts: [...state.toasts, newToast]}));

        setTimeout(() => {
            get().dismiss(newToast.title);
        }, 5000);
    },

    dismiss: (title: string) => {
        set((state) => ({
            toasts: state.toasts.filter((t: Toast) => t.title !== title),
        }));
    },
}));
