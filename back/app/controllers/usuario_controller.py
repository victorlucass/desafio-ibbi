from fastapi import APIRouter, Depends, status, HTTPException
from services.usuario_service import UsuarioService
from schemas.usuario_schemas import *
from models.usuario_model import *

router = APIRouter()

@router.get("/", response_model=list[UsuarioResponse], status_code=status.HTTP_200_OK)
def obterUsuarios(service: UsuarioService = Depends(UsuarioService)):
    return service.obterUsuarios()

@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def inserirUsuario(
    request: UsuarioRequest,
    service: UsuarioService = Depends(UsuarioService)
):
    req = UsuarioModel(**request.model_dump())
    return service.inserirUsuario(req)

@router.get("/{id}", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def obterUsuarioPorId(
    id: int,
    service: UsuarioService = Depends(UsuarioService)
):
    return service.obterUsuarioPorId(id)

@router.put("/", response_model=UsuarioResponse, status_code=status.HTTP_200_OK)
def atualizarUsuario(
    request: AtualizarUsuarioRequest,
    service: UsuarioService = Depends(UsuarioService)
):
    req = UsuarioModel(**request.model_dump())
    return service.atualizarUsuario(req)

@router.delete("/{id}", response_model=UsuarioResponse, status_code=status.HTTP_200_OK)
def deletarUsuarioPorId(
    id: int,
    service: UsuarioService = Depends(UsuarioService)
):
    return service.deletarUsuario(id)

@router.post("/login", response_model=UsuarioResponse, status_code=status.HTTP_200_OK)
def login(
    request: UsuarioRequest,
    service: UsuarioService = Depends(UsuarioService)
):
    req = UsuarioModel(**request.model_dump())
    return service.login(req)
