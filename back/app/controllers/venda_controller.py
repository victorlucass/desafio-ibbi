from fastapi import APIRouter, Depends, status, HTTPException
from services.venda_service import VendaService
from schemas.venda_schemas import *
from models.venda_model import *

router = APIRouter()

@router.get("/", response_model=list[VendaResponse], status_code=status.HTTP_200_OK)
def obterVendas(service: VendaService = Depends(VendaService)):
    return service.obterVendas()
    
@router.post("/", response_model=VendaResponse, status_code=status.HTTP_201_CREATED)
def inserirVenda(
    request: VendaRequest,
    service: VendaService = Depends(VendaService)
):
    req = VendaModel(**request.model_dump())
    return service.inserirVenda(req)

@router.get("/{id}", response_model=VendaResponse, status_code=status.HTTP_201_CREATED)
def obterVendaPorId(
    id: int,
    service: VendaService = Depends(VendaService)
):
    return service.obterVendaPorId(id)

@router.put("/", response_model=VendaResponse, status_code=status.HTTP_200_OK)
def atualizarVenda(
    request: AtualizarVendaRequest,
    service: VendaService = Depends(VendaService)
):
    req = VendaModel(**request.model_dump())
    return service.atualizarVenda(req)

@router.delete("/{id}", response_model=DeletarVendaResponse, status_code=status.HTTP_200_OK)
def deletarVendaPorId(
    id: int,
    service: VendaService = Depends(VendaService)
):
    return service.deletarVenda(id)
