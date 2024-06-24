from pydantic import BaseModel

class ProdutoBase(BaseModel):
    class Config:
        orm_mode = True

class ProdutoRequest(ProdutoBase):
    id: int
    descricao: str
    valor: float
    quantidade: int
    categoria_id: int
    imagem: str


class ProdutoResponse(ProdutoBase):
    id: int
    descricao: str
    valor: float
    quantidade: int
    categoria_id: int
    imagem: str


class CadastrarProdutoResponse(ProdutoBase):
    id: int
    descricao: str
    valor: float
    quantidade: int
    categoria_id: int
    imagem: str


class CadastrarProdutoRequest(ProdutoBase):
    descricao: str
    valor: float
    quantidade: int
    imagem: str
    categoria_id: int


class DeletarProdutoResponse(ProdutoBase):
    id: int

class ProdutoDescricaoRequest(ProdutoBase):
    descricao: str
