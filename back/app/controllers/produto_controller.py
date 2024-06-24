from fastapi import APIRouter, Depends, status, HTTPException
from services.produto_service import ProdutoService
from schemas.produto_schemas import *
from models.produto_model import *

router = APIRouter()

@router.get("/", response_model=list[ProdutoResponse], status_code=status.HTTP_200_OK)
def obterProduto(service: ProdutoService = Depends(ProdutoService)):
    return service.obterProdutos()
    
@router.post("/", response_model=CadastrarProdutoResponse, status_code=status.HTTP_201_CREATED)
def inserirProduto(
    request: CadastrarProdutoRequest,
    service: ProdutoService = Depends(ProdutoService)
):
    req = ProdutoModel(**request.model_dump())
    return service.inserirProduto(req)
    

@router.get("/{id}", response_model=ProdutoResponse, status_code=status.HTTP_201_CREATED)
def obterProdutoPorId(
    id: int,
    service: ProdutoService = Depends(ProdutoService)
):
    return service.obterProdutoPorId(id)

@router.get("/categoria/{id}", response_model=list[ProdutoResponse], status_code=status.HTTP_201_CREATED)
def obterProdutoPorCategoriaId(
    id: int,
    service: ProdutoService = Depends(ProdutoService)
):
    return service.obterProdutoPorCategoriaId(id)

@router.post("/filtro/descricao", response_model=list[ProdutoResponse], status_code=status.HTTP_201_CREATED)
def obterProdutoPorDescricao(
    request: ProdutoDescricaoRequest,
    service: ProdutoService = Depends(ProdutoService)
):
    req = ProdutoModel(**request.model_dump())
    return service.obterProdutoPorDescricao(req)

@router.put("/", response_model=ProdutoResponse, status_code=status.HTTP_200_OK)
def atualizarProduto(
    request: ProdutoRequest,
    service: ProdutoService = Depends(ProdutoService)
):
    req = ProdutoModel(**request.model_dump())
    return service.atualizarProduto(req)

@router.delete("/{id}", response_model=DeletarProdutoResponse, status_code=status.HTTP_200_OK)
def deletarProdutoPorId(
    id: int,
    service: ProdutoService = Depends(ProdutoService)
):
    return service.deletarProduto(id)
    