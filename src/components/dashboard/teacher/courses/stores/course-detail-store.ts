import { create } from "zustand";

type ContentView =
  | "main"
  | "modules"
  | "assignment"
  | "lesson"
  | "quiz"
  | "activity";

interface CourseDetailState {
  activeTab: string;
  currentView: ContentView;
  setActiveTab: (tab: string) => void;
  setCurrentView: (view: ContentView) => void;
  resetView: () => void;
}

export const useCourseDetailStore = create<CourseDetailState>((set) => ({
  activeTab: "modules",
  currentView: "main",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCurrentView: (view) => set({ currentView: view }),
  resetView: () => set({ currentView: "main", activeTab: "modules" }),
}));
