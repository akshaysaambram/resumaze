import { create } from "zustand";
import { Appearance, ColorSchemeName } from "react-native";
import { AppStore } from "~/types/Store";

export const useAppStore = create<AppStore>()((set) => ({
    app: {
        theme: Appearance.getColorScheme() || "light",
        menuOpen: false,
        info: {
            name: "Resumaze",
            version: "1.0.0",
        },
    },
    toggleMenu: () =>
        set((state) => ({
            app: {
                ...state.app,
                menuOpen: !state.app.menuOpen,
            },
        })),
    toggleTheme: () =>
        set((state) => {
            const theme = state.app.theme === "dark" ? "light" : "dark";
            Appearance.setColorScheme(theme);
            return {
                app: {
                    ...state.app,
                    theme,
                },
            };
        }),
    setTheme: (theme: ColorSchemeName) =>
        set((state) => {
            if (state.app.theme !== theme) {
                Appearance.setColorScheme(theme);
                return {
                    app: {
                        ...state.app,
                        theme,
                    },
                };
            }
            return state;
        }),
}));
