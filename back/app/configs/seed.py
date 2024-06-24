from models.seed_model import SeedModel
from models.usuario_model import UsuarioModel
from models.produto_model import ProdutoModel
from models.categoria_model import CategoriaModel
from models.venda_model import VendaModel
import bcrypt


def seed(db):
    try:
        seeded = db.query(SeedModel).first()
        if seeded is None:
            db.add(SeedModel(seeded=True))
            usuarios = [
                UsuarioModel(usuario="admin", senha=bcrypt.hashpw("admin".encode("utf-8"), bcrypt.gensalt())),
                UsuarioModel(usuario="user", senha=bcrypt.hashpw("user".encode("utf-8"), bcrypt.gensalt())),
                UsuarioModel(usuario="oppenheimer", senha=bcrypt.hashpw("oppenheimer".encode("utf-8"), bcrypt.gensalt())),
                UsuarioModel(usuario="barbie", senha=bcrypt.hashpw("barbie".encode("utf-8"), bcrypt.gensalt())),
                UsuarioModel(usuario="oppenbarbie", senha=bcrypt.hashpw("oppenbarbie".encode("utf-8"), bcrypt.gensalt())),       
            ]
            db.add_all(usuarios)

            categorias = [
                CategoriaModel(id=1, descricao="Brinquedos e Jogos"),
                CategoriaModel(id=2, descricao="Livros e Mídias"),
                CategoriaModel(id=3, descricao="Casa e Decoração"),
                CategoriaModel(id=4, descricao="Games"),
                CategoriaModel(id=5, descricao="Cosméticos e Perfumaria"),
                CategoriaModel(id=6, descricao="Pets")

            ]
            db.add_all(categorias)

            produtos = [
                ProdutoModel(descricao="Detetive", valor=83.99, quantidade=30, imagem="https://m.media-amazon.com/images/I/61d3ovlzqoL._AC_SL1000_.jpg", categoria_id=1),
                ProdutoModel(descricao="War - Special Edition", valor=115.30, quantidade=50, imagem="https://m.media-amazon.com/images/I/61b7dfGwn-L._AC_SX679_.jpg", categoria_id=1),
                ProdutoModel(descricao="Uno", valor=21.99, quantidade=10, imagem="https://m.media-amazon.com/images/I/61wiRgoUD3L._AC_SX679_.jpg", categoria_id=1),
                ProdutoModel(descricao="Bird Box - Josh Malerman", valor=19.99, quantidade=5, imagem="https://m.media-amazon.com/images/I/41p4DHosvDL._SY344_BO1,204,203,200_QL70_ML2_.jpg", categoria_id=2),
                ProdutoModel(descricao="O cemitério - Stephen King", valor=32.90, quantidade=15, imagem="https://m.media-amazon.com/images/I/41McBAhN-VL._SY344_BO1,204,203,200_QL70_ML2_.jpg", categoria_id=2),
                ProdutoModel(descricao="O Silmarillion - J.R.R.Tolkien", valor=36.50, quantidade=12, imagem="https://m.media-amazon.com/images/I/51EZZWkTECL._SY344_BO1,204,203,200_QL70_ML2_.jpg", categoria_id=2),
                ProdutoModel(descricao="Porta-Retratos 20x25cm", valor=45.50, quantidade=40, imagem="https://m.media-amazon.com/images/I/71AlKtgE73L._AC_SY741_.jpg", categoria_id=3),
                ProdutoModel(descricao="Espelho redondo", valor=123.50, quantidade=5, imagem="https://m.media-amazon.com/images/I/71tlfoMWe3L._AC_SY879_.jpg", categoria_id=3),
                ProdutoModel(descricao="Persiana", valor=192.99, quantidade=2, imagem="https://m.media-amazon.com/images/I/61W0sPYn4SL._AC_SX569_.jpg", categoria_id=3),
                ProdutoModel(descricao="Console Playstation 5", valor=4299.99, quantidade=50, imagem="https://m.media-amazon.com/images/I/51+qnZm7V7L._AC_SX522_.jpg", categoria_id=4),
                ProdutoModel(descricao="Perfume Ferrari Black", valor=149.99, quantidade=30, imagem="https://m.media-amazon.com/images/I/41czzc+YnKL._AC_SY300_SX300_.jpg", categoria_id=5),
                ProdutoModel(descricao="Chuveiro Elétrico", valor=519.99, quantidade=0, imagem="https://m.media-amazon.com/images/I/51idVhnZeWL._AC_SX522_.jpg", categoria_id=3),
                ProdutoModel(descricao="Guia/Coleira Peitoral para Pets", valor=49.99, quantidade=2, imagem="https://m.media-amazon.com/images/I/41EYmaDwgnL._AC_.jpg", categoria_id=6),
                ProdutoModel(descricao="Biscoito Pedigree Biscrok Para Cães", valor=29.99, quantidade=200, imagem="https://m.media-amazon.com/images/I/81qOI7KD2FL._AC_SX522_.jpg", categoria_id=6)
            ]
            db.add_all(produtos)
            vendas = [
                VendaModel(produto_id=1, quantidade=1, usuario_id=1, data_venda="2024-06-22T13:50:54"),
                VendaModel(produto_id=3, quantidade=10, usuario_id=2, data_venda="2024-06-22T13:50:54"),
                VendaModel(produto_id=5, quantidade=5, usuario_id=3, data_venda="2024-06-22T13:50:54"),
                VendaModel(produto_id=6, quantidade=3, usuario_id=4, data_venda="2024-06-22T13:50:54"),
                VendaModel(produto_id=8, quantidade=2, usuario_id=5, data_venda="2024-06-22T13:50:54"),
            ]
            db.add_all(vendas)
            db.commit()
            print("Seed efetuado")
        else:
            print("Seed ignorado")
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()
