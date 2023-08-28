const url = 'https://dummyjson.com'
const urlTodos = 'products'
const urlCategorias = 'products/category'
const espacioSection = document.querySelector('#idSection')
const fragment = document.createDocumentFragment('#idSection')
const espacioCategoria = document.querySelector('#idCatElegida')




document.addEventListener('change', (ev) => {

    if (ev.target.className = "claseCategoria"){
        espacioCategoria.innerHTML = ""
        pintarCategoria()
    }

})


const consulta = async (urlPeticion) => {

    try {
        const fetchApi = await fetch(`${url}/${urlPeticion}`)

        if (fetchApi.ok) {

            const datos = await fetchApi.json()

            return {
                ok: true,
                datos
            }


        } else {

            throw ('existe un error')

        }

    } catch (error) {
        return {
            ok: false,
            datos: error
        }

    }

}


const pintarTodos = async () => {
    const llamada = await consulta(urlTodos)
    const datosLlamada = llamada.datos.products

    datosLlamada.forEach(item => {

        const espacioFigure = document.createElement('FIGURE')
        espacioFigure.classList.add('figureElementos')

        const espacioTitulo = document.createElement('H2')
        espacioTitulo.textContent = item.title

        const espacioImagen = document.createElement('IMG')
        espacioImagen.classList.add('imgElementos')
        espacioImagen.src = item.images[0]

        const espacioPrecio = document.createElement('P')
        espacioPrecio.textContent = `Precio: ${item.price} €`

        const espacioBoton = document.createElement('BUTTON')
        espacioBoton.textContent = 'Añadir'

        espacioFigure.append(espacioTitulo, espacioImagen, espacioPrecio, espacioBoton)

        fragment.append(espacioFigure)

    });

    espacioSection.append(fragment)


}


const pintarCategoria = async () => {

    const categoriaElegida = document.querySelector('#categoria').value
    console.log(categoriaElegida);

    const llamada = await consulta(`${urlCategorias}/${categoriaElegida}`)
    const datosLlamada = llamada.datos.products
    console.log(datosLlamada);

    datosLlamada.forEach(item => {

        const espacioFigure = document.createElement('FIGURE')
        espacioFigure.classList.add('figurePorCategorias')

        const espacioTitulo = document.createElement('H2')
        espacioTitulo.textContent = item.title

        const espacioImagen = document.createElement('IMG')
        espacioImagen.src = item.images[0]

        const espacioPrecio = document.createElement('P')
        espacioPrecio.textContent = `Precio: ${item.price} €`

        const espacioBoton = document.createElement('BUTTON')
        espacioBoton.textContent = 'Añadir'

        espacioFigure.append(espacioTitulo, espacioImagen, espacioPrecio, espacioBoton)

        espacioCategoria.append(espacioFigure)

    });

}

pintarTodos()
