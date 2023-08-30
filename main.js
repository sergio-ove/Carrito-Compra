const url = 'https://dummyjson.com'
const urlTodos = 'products'
const urlCategorias = 'products/category'
const espacioSection = document.querySelector('#idSection')
const fragment = document.createDocumentFragment('#idSection')
const espacioCategoria = document.querySelector('#idCatElegida')
const divTituloCategoria = document.querySelector('#idTituloCategoria')
const datosLocal = JSON.parse(localStorage.getItem('lista')) || [];
const espacioBoton = document.querySelector('.btnEliminar')
const botonSumar = document.querySelector('.botonSumaLocal')
const h2TituloObjeto = document.querySelector('.h2Titulo')




document.addEventListener('change', (ev) => {

    if (ev.target.className = "claseCategoria") {
        espacioCategoria.innerHTML = ""
        divTituloCategoria.innerHTML = ""
        pintarCategoria()
        espacioBoton.style.display = 'block'
    }

})


espacioBoton.addEventListener('click', () => {
    borrarBusqueda()
})


document.addEventListener('click', (ev) => {
    if (ev.target.className == 'btnSumaCarro') {
        let espacioH2 = ev.target.querySelector('H2')
        const valorH2 = espacioH2.innerHTML
        console.log(valorH2);
        guardarLocal(valorH2)
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
        espacioTitulo.classList.add('h2Titulo')
        espacioTitulo.textContent = item.title

        const espacioImagen = document.createElement('IMG')
        espacioImagen.classList.add('imgElementos')
        espacioImagen.src = item.images[0]

        const espacioPrecio = document.createElement('P')
        espacioPrecio.textContent = `Precio: ${item.price} €`

        const espacioBoton = document.createElement('BUTTON')
        espacioBoton.classList.add('btnSumaCarro')
        espacioBoton.textContent = 'Añadir'

        espacioBoton.append(espacioTitulo, espacioImagen, espacioPrecio)

        espacioFigure.append(espacioBoton)

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

    const tituloCategoria = document.createElement('P')
    tituloCategoria.textContent = `Resultados encontrados por ${categoriaElegida} :`
    divTituloCategoria.append(tituloCategoria)

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
        espacioBoton.classList.add('botonSumaLocal')
        espacioBoton.textContent = 'Añadir'

        espacioFigure.append(espacioTitulo, espacioImagen, espacioPrecio, espacioBoton)

        espacioCategoria.append(espacioFigure)

    });



}


const borrarBusqueda = () => {
    espacioBoton.style.display = 'none'
    espacioCategoria.innerHTML = ""
    divTituloCategoria.innerHTML = ""
}


const guardarLocal = (objeto) => {

    console.log(objeto);

    const coincidenciaLocal = datosLocal.find((item) => objeto == item.nombre)

    console.log(coincidenciaLocal);

    if (!coincidenciaLocal) {
        datosLocal.push({ nombre: objeto, count: 1 })
        localStorage.setItem('lista', JSON.stringify(datosLocal))
    } else {
        coincidenciaLocal.count++
        localStorage.setItem('lista', JSON.stringify(datosLocal))
    }

    // datosLocal.push(objeto)
    // localStorage.setItem('lista', JSON.stringify(datosLocal))
}

pintarTodos()
