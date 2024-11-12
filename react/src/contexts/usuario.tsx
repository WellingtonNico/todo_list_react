import {
  createContext,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AuthApiService } from "../data/api/services/AuthApiService";

type UsuarioContextType = {
  usuario?: Usuario;
  setUsuario: React.Dispatch<SetStateAction<Usuario | undefined>>;
  carregandoUsuario: boolean;
};

export const UsuarioContext = createContext<UsuarioContextType>(
  {} as UsuarioContextType
);

export const UsuarioProvider = ({ children }: PropsWithChildren) => {
  const [usuario, setUsuario] = useState<Usuario | undefined>();
  const [carregandoUsuario, setCarregandoUsuario] = useState(false);

  function obterUsuarioLogado() {
    setCarregandoUsuario(true);
    AuthApiService.getUser()
      .then((d) => setUsuario(d))
      .finally(() => setCarregandoUsuario(false));
  }

  useEffect(obterUsuarioLogado, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, carregandoUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};
