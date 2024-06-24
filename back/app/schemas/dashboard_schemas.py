from pydantic import BaseModel
from datetime import datetime

class DashboardBase(BaseModel):
    class Config:
        orm_mode = True

class HistoricoVendas(BaseModel):
    data_venda: datetime
    descricao: str
    usuario: str
    quantidade: int

class VendasCategoria(BaseModel):
    descricao: str
    total: int

class MaisVendidos(BaseModel):
    descricao: str
    quantidade: int

class DashboardResponse(DashboardBase):
    historico: list[HistoricoVendas]
    por_categoria: list[VendasCategoria]
    mais_vendidos: list[MaisVendidos]




