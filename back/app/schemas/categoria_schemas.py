from pydantic import BaseModel

class CategoriaBase(BaseModel):
    class Config:
        orm_mode = True

class CategoriaRequest(CategoriaBase):
    id: int
    descricao: str

class CategoriaResponse(CategoriaBase):
    id: int
    descricao: str

class CadastrarCategoriaRequest(CategoriaBase):
    descricao: str

class CadastrarCategoriaResponse(CategoriaBase):
    id: int

class DeletarCategoriaResponse(CategoriaBase):
    id: int

