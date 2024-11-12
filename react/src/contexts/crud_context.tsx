import {
  Context,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IApiCrudService } from "../data/api/services/IApiService";

export type CrudContextType<Tipo extends TipoBase> = {
  items: Tipo[];
  setItems: (p: SetStateAction<Tipo[]>) => void;
  setModalFormShow: (p: SetStateAction<boolean>) => void;
  modalFormShow: boolean;
  setModalDeleteShow: (p: SetStateAction<boolean>) => void;
  modalDeleteShow: boolean;
  setModalItem: (p: SetStateAction<Tipo | undefined>) => void;
  modalItem?: Tipo;
  openModalForm: (todo?: Tipo) => void;
  openModalDelete: (todo: Tipo) => void;
  apiService: IApiCrudService<Tipo>;
  isLoading: boolean;
  handleDelete: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formData: Tipo;
  setFormData: (p: SetStateAction<Tipo>) => void;
  formErrors: FormErrors;
  setFormErrors: (p: SetStateAction<FormErrors>) => void;
};

type CrudContextProviderProps<Tipo extends TipoBase> = PropsWithChildren & {
  context: Context<CrudContextType<Tipo>>;
  apiService: IApiCrudService<Tipo>;
};

export function CrudContextProvider<Tipo extends TipoBase>({
  children,
  context,
  apiService,
}: CrudContextProviderProps<Tipo>) {
  const [items, setItems] = useState<Tipo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalFormShow, setModalFormShow] = useState(false);
  const [modalItem, setModalItem] = useState<Tipo | undefined>();
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [formData, setFormData] = useState<Tipo>({} as Tipo);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const openModalForm = useCallback((todo?: Tipo) => {
    setModalItem(todo);
    setModalFormShow(true);
  }, []);

  function openModalDelete(todo: Tipo) {
    setModalItem(todo);
    setModalDeleteShow(true);
  }

  function handleDelete() {
    apiService.delete(modalItem!.id!).then(() => {
      setItems((todos) => todos.filter((t) => t.id !== modalItem!.id));
      setModalDeleteShow(false);
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modalItem?.id) {
      apiService
        .update(modalItem.id!, formData)
        .then((response) => {
          setItems((prev) =>
            prev.map((t) => (t.id === response.id ? response : t))
          );
          setModalFormShow(false);
        })
        .catch((error) => setFormErrors(error.response?.data));
    } else {
      apiService
        .create(formData)
        .then((response) => {
          setItems((prev) => [...prev, response]);
          setModalFormShow(false);
        })
        .catch((error) => setFormErrors(error.response?.data));
    }
  }

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    apiService
      .getAll()
      .then((response) => setItems(response))
      .finally(() => setIsLoading(false));
  }, [apiService]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <context.Provider
      value={{
        items,
        setItems,
        setModalFormShow,
        modalFormShow,
        setModalDeleteShow,
        modalDeleteShow,
        setModalItem,
        modalItem,
        openModalForm,
        openModalDelete,
        apiService,
        isLoading,
        handleDelete,
        handleSubmit,
        formData,
        setFormData,
        formErrors,
        setFormErrors,
      }}
    >
      {children}
    </context.Provider>
  );
}
