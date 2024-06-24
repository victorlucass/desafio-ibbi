from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from configs.database import engine, Base, get_db
from configs.seed import seed
from controllers import categoria_controller
from controllers import produto_controller
from controllers import usuario_controller
from controllers import venda_controller
from controllers import dashboard_controller

app = FastAPI(title="Controle de estoque")

Base.metadata.create_all(bind=engine)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categoria_controller.router, prefix="/v1/categorias")
app.include_router(produto_controller.router, prefix="/v1/produtos")
app.include_router(usuario_controller.router, prefix="/v1/usuarios")
app.include_router(venda_controller.router, prefix="/v1/vendas")
app.include_router(dashboard_controller.router, prefix="/v1/dashboard")

# data seed
@app.on_event("startup")
async def startup_event():
    seed(next(get_db()))