"# 50040-cuarta-entrega"

#### Nombre: César Aracena

#### Institucion: Coderhouse

#### Curso: Back End

#### Comision: 50040

#### Profesor: Rabindranath Ferreira Villamizar

#### Tutor: Allan Reynoso Naranjo

#### Entrega Numero: 4 (Primer Pre Entrega)

#### Este archivo tiene como proposito mostrar la creacion de endpoints de un carrito de compras

---

### Instrucciones

Una vez descargado / clonado este repositorio, inicializar el proyecto con **npm init**.

Luego ejecutar el siguiente comando desde la terminal: **npm start**

El servidor estará escuchando el puerto 8080, por lo que debe dirigirse a http://localhost:8080. Desde allí podrá acceder a los diferentes endpoints:

-   http://localhost:8080/api/products - Metodo POST Podra agregar un nuevo producto, enviando en el body la informacion. Puede utilizar el siguiente ejemplo (debera cambiar los datos, manteniendo la estructura):

```
{
    "title": "Test Product",
    "description": "Product for testing",
    "code": "test12312",
    "price": 9.99,
    "status": true,
    "stock": 4,
    "category": "Test Products",
    "thumbnails": ["img1.jpg", "img2.jpg"]
}
```

-   http://localhost:8080/api/products/:pid - Metodo PUT Podra editar un producto, utilizando el mismo codigo de arriba
-   http://localhost:8080/api/products/:pid - Metodo DELETE Podra eliminar un producto
-   http://localhost:8080/api/products - Metodo GET Podra obtener todos los producto
-   http://localhost:8080/api/products/:pid - Metodo GET Podra obtener 1 producto
-   http://localhost:8080/api/carts - Metodo POST Podra crear un nuevo carrito
-   http://localhost:8080/api/carts/:cid/product/:pid - MetodoPOST Podra agregar un nuevo producto a un carrito existente o actualizar la cantidad de un producto en un carrito, enviando el siguiente body:

```
{
    "product": 1,
    "quantity": 2
}
```

-   http://localhost:8080/api/carts/:cid - Metodo GET Podra obtener todos los productos agregados a un carrito
