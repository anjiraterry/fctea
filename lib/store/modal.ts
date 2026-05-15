import { create } from "zustand";

type ResourceType = "place" | "event" | "news" | "person" | "brand" | "blog";

interface ModalState {
  isOpen: boolean;
  resourceType: ResourceType | null;
  mode: "create" | "edit";
  initialData: any | null;
  openModal: (type: ResourceType, mode?: "create" | "edit", data?: any) => void;
  closeModal: () => void;
}

export const useResourceModal = create<ModalState>((set) => ({
  isOpen: false,
  resourceType: null,
  mode: "create",
  initialData: null,
  openModal: (type, mode = "create", data = null) => 
    set({ isOpen: true, resourceType: type, mode, initialData: data }),
  closeModal: () => set({ isOpen: false, resourceType: null, mode: "create", initialData: null }),
}));
