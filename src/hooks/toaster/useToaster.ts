import {create} from "zustand";

export interface Toast {
    id?: number;
    title: string;
    description: string;
    level?: 'Error' | 'Warn' | 'Info';
    isDismissable?: boolean;
}

export interface ToasterStore {
    toasts: Toast[];
    bake: (t: Toast) => void;
    dismiss: (id: number) => void;
}

let nextId = 0;

export const useToaster = create<ToasterStore>((set, get) => ({
    toasts: [],

    bake: (newToast: Toast) => {
        const id = nextId++;
        set((state: ToasterStore) => ({toasts: [...state.toasts, {...newToast, id}]}));

        setTimeout(() => {
            get().dismiss(id);
        }, 5000);
    },

    dismiss: (id: number) => {
        set((state) => ({
            toasts: state.toasts.filter((t: Toast) => t.id !== id),
        }));
    },
}));
