# Desafio

## Instalação

### Crie uma virtualenv dentro da pasta backend do projeto
```
mkvirtualenv nome_escolhido -p /usr/bin/python3
```

### Ative a virtualenv
```
workon "nome_escolhido"
```

### Gerando TMS a partir de um TIF, usando GDAL
#### Instalar gdal2tiles
```
sudo aptitude install gdal-bin
```
#### Gerando TMS com zoom de 1 a 15 - USANDO gdal2tiles
```
gdal2tiles.py --profile=mercator -z 1-15 data/bd74fcb4-3f4a-4769-bc8f-a9a5c6cc8893/true_color.tif outputfolder
```

## Rodando o servidor local
### Instalando dependências
```
pip install -r requirements.txt
```
### Rodando FLASK
```
FLASK_DEBUG=1 FLASK_APP=server.py flask run
```

### Rotas
#### rotas do TMS:
http://localhost:5000/tms/9/190/240.png

onde `9` é o `zoom`,  `190` é o `x`  e  `240` é o `y` .


### Gerando cálculo de NDVI e histograma
```
python ndvi.py
```
será gerado o arquivo `ndvi.tif` e uma imagem `histogram.png`

## Outras libs

### Instalar python3-tk

```
sudo aptitude install python3-tk
```

### Instalar GDAL

```
sudo aptitude install libgdal-dev
pip install gdal
```
