from pydantic import BaseModel
from datetime import datetime

class VendaBase(BaseModel):
    class Config:
        orm_mode = True

class VendaRequest(VendaBase):
    produto_id: int
    usuario_id: int
    quantidade: int
    
class VendaResponse(VendaBase):
    id: int
    produto_id: int
    usuario_id: int
    quantidade: int
    data_venda: datetime

class AtualizarVendaRequest(VendaBase):
    id: int
    produto_id: int
    usuario_id: int
    quantidade: int
    data_venda: datetime

class DeletarVendaResponse(VendaBase):
    id: int