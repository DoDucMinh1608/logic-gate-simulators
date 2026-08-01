import { create } from "zustand";

export const useModelsSlice = create((set, get) => ({
  MODELS: {},
  getAllModelNames() {
    const models = get().MODELS;
    return Object.keys(models);
  },
  addModel(modelId, modelData) {
    set(state => ({
      MODELS: {
        ...state.MODELS,
        [modelId]: modelData
      }
    }));
  },
  removeModel(modelId) {
    set(state => {
      const updatedModels = { ...state.MODELS };
      delete updatedModels[modelId];
      return { MODELS: updatedModels };
    });
  },
  updateModel(modelId, updatedData) {
    set(state => ({
      MODELS: {
        ...state.MODELS,
        [modelId]: {
          ...state.MODELS[modelId],
          ...updatedData
        }
      }
    }));
  },
  getModelById(modelId) {
    const models = get().MODELS;
    return models[modelId];
  }
}));