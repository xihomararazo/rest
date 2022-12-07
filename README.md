# rest
Este repositorio cuenta con un breve ejercicio de creación de API utilizando node.js y Docker  

Para inicializar el documento es necesario:

Inicilizar e instalar todas las dependencias de node.
npm init
npm install

Crear un contenedor de Docker con MongoDB y lo haremos que tenga persistencia.
    docker run --name mongdb-container --hostname mongodb-container -d -p 27017:27017 -v rest-volume:/data/db mongo

Crearemos una conección en este caso utilizamos 'mongodb://localhost:27017/'
Crearemos una base de datos llamada 'my-test-db' y una coleccion llamada 'patients'

Ejectuamos
    docker build . -t xihomararazo/node-api
    docker run -p 8080:8080 -d xihomararazo/node-api
    node server.js

En el archivo server.js podemos encontrar una API relacionada con Pacientes, 
los datos que contiene cada documento son String name, int age, double height, double weight

ejemplo:{name:'Xihomara', age:20, height:1.65, weight:65},

Al inicializar el documento se ejecuta
Insert de documentos a base de datos con documentos iniciales si la base de datos esta vacía.

y podemos consultar 
	get  '/docs/all'  --> proporciona todos los documentos de la colección 

	get  '/query' --> proporciona todos los documentos de la colección que correspondan al query({name:""})

	put  '/query' --> actualiza el primer elemento que corresponda al query ({name:'', age:0, height:0, weight:0}), de no encontrar alguno crea un documento con las características del query

	delete  '/query' --> elimina el o los documentos que correspondan al query ({name:""})