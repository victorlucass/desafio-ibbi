FROM python:3.12
ENV db_name=estoque
ENV db_user=root
ENV db_password=root
ENV db_host=teste_db
ENV db_port=3306
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app
WORKDIR /code/app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]