from fastapi import APIRouter, Depends, status
from services.dashboard_service import DashboardService
from schemas.dashboard_schemas import *

router = APIRouter()

@router.get("/", response_model=DashboardResponse, status_code=status.HTTP_200_OK)
def obterProduto(service: DashboardService = Depends(DashboardService)):
    return service.obterDadosDashboard()
