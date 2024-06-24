from fastapi import APIRouter, Depends, status, HTTPException
from services.categoria_service import CategoriaService
from schemas.categoria_schemas import *
from models.categoria_model import *

router = APIRouter()

@router.get("/", response_model=list[CategoriaResponse], status_code=status.HTTP_200_OK)
def obterCategoria(service: CategoriaService = Depends(CategoriaService)):
    return service.obterCategorias()

@router.post("/", response_model=CadastrarCategoriaResponse, status_code=status.HTTP_201_CREATED)
def inserirCategoria(
    request: CadastrarCategoriaRequest,
    service: CategoriaService = Depends(CategoriaService)
):
    req = CategoriaModel(**request.model_dump())
    return service.inserirCategoria(req)

@router.get("/{id}", response_model=CategoriaResponse, status_code=status.HTTP_201_CREATED)
def obterCategoriaPorId(
    id: int,
    service: CategoriaService = Depends(CategoriaService)
):
    return service.obterCategoriaPorId(id)
    
@router.put("/", response_model=CategoriaResponse, status_code=status.HTTP_200_OK)
def atualizarCategoria(
    request: CategoriaRequest,
    service: CategoriaService = Depends(CategoriaService)
):
    req = CategoriaModel(**request.model_dump())
    return service.atualizarCategoria(req)
    
@router.delete("/{id}", response_model=DeletarCategoriaResponse, status_code=status.HTTP_200_OK)
def deletarCategoriaPorId(
    id: int,
    service: CategoriaService = Depends(CategoriaService)
):
    return service.deletarCategoria(id)
