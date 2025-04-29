import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chatme-theme") || "dark", //localStorage vich ja ke check kruga ke localstorage vich chatme-theme naam to ke pya aa je null hoya ta dark set kruga nahi ta jo value hoi save on wali

  setTheme: (theme) => {
    localStorage.setItem("chatme-theme", theme);
    set({ theme });
  },
}));
//*   || (Logical OR operator)
//    This is a JavaScript operator that returns the first "truthy" value it encounters
//    If the left side is falsy (null, undefined, false, 0, "", etc.), it evaluates and returns the right side
