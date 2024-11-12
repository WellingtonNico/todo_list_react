import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [] as Todo[],
    modalFormShow: false,
    modalDeleteShow: false,
    modalItem: undefined as Todo | undefined,
    isLoading: false,
    formData: {} as Todo,
    formErrors: {} as FormErrors,
  },
  reducers: {
    setItems(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
    updateItem(state, action: PayloadAction<Todo>) {
      state.items = state.items.map((i) =>
        i.id == action.payload.id ? action.payload : i
      );
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id != action.payload);
    },
    addItem(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },
    setFormModalShow(state, action: PayloadAction<boolean>) {
      state.modalFormShow = action.payload;
    },
    setDeleteModalShow(state, action: PayloadAction<boolean>) {
      state.modalDeleteShow = action.payload;
    },
    setFormData(state, action: PayloadAction<Todo>) {
      state.formData = action.payload;
    },
    setFormErrors(state, action: PayloadAction<FormErrors>) {
      state.formErrors = action.payload;
    },
    openFormModal(state, action: PayloadAction<Todo | undefined>) {
      state.formData = action.payload ?? ({} as Todo);
      state.modalFormShow = true;
    },
    openDeleteModal(state, action: PayloadAction<Todo | undefined>) {
      state.modalItem = action.payload;
      state.modalDeleteShow = true;
    },
  },
});

export const {
  setItems,
  setIsLoading,
  updateItem,
  removeItem,
  addItem,
  setFormModalShow,
  setDeleteModalShow,
  setFormData,
  setFormErrors,
  openFormModal,
  openDeleteModal,
} = TodoSlice.actions;
