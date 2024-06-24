from pydantic import BaseModel

class UsuarioBase(BaseModel):
    class Config:
        orm_mode = True

class UsuarioRequest(UsuarioBase):
    usuario: str
    senha: str

class AtualizarUsuarioRequest(UsuarioBase):
    id: int
    usuario: str
    senha: str

class UsuarioResponse(UsuarioBase):
    id: int
    usuario: str
