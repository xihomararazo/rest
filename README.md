# rest
Este repositorio cuenta con un breve ejercicio de creación de API utilizando node.js y Docker </br> 

Para inicializar el documento es necesario:</br>

Inicilizar e instalar todas las dependencias de node.</br>
    `npm init`</br>
    `npm install`   </br>

Crear un contenedor de Docker con MongoDB y lo haremos que tenga persistencia.</br>
    `docker run --name mongdb-container --hostname mongodb-container -d -p 27017:27017 -v`</br> `rest-volume:/data/db mongo`</br>

Crearemos una conección en este caso utilizamos **'mongodb://localhost:27017/'**</br>
Crearemos una base de datos llamada **'my-test-db'** y una coleccion llamada 'patients'</br>
 
Ejectuamos</br>
    `docker build . -t xihomararazo/node-api`</br>
    `docker run -p 8080:8080 -d xihomararazo/node-api`</br>
    `node server.js`</br>

En el archivo server.js podemos encontrar una API relacionada con Pacientes, 
los datos que contiene cada documento son String name, int age, double height, double weight</br>

```
{name:'Xihomara', age:20, height:1.65, weight:65}
```

Al inicializar el documento se ejecuta un Insert de documentos a base de datos con documentos iniciales si la base de datos esta vacía.</br>

y podemos consultar </br>

	get  '/docs/all'  --> proporciona todos los documentos de la colección 

	get  '/query' --> proporciona todos los documentos de la colección que correspondan al query({name:""})

	put  '/query' --> actualiza el primer elemento que corresponda al query ({name:'', age:0, height:0, weight:0}), de no encontrar alguno crea un documento con las características del query

	delete  '/query' --> elimina el o los documentos que correspondan al query ({name:""})