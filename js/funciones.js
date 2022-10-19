/*Juan Andres Macedo 290961*/
/*Joaquín Seoane 279793*/

window.addEventListener("load", inicio);

let sistema = new Sistema();

function inicio(){
    document.getElementById("btnAgregarEmpleado").addEventListener("click", agregarUnEmpleado);
    document.getElementById("btnAgregarRubro").addEventListener("click", agregarUnRubro);
    document.getElementById("btnAgregarOferta").addEventListener("click", agregarUnaOferta);
    document.getElementById("btnEliminarOferta").addEventListener("click", eliminarOferta);
    document.getElementById("btnConsultarOfertasRubro").addEventListener("click", cargarTablaRubros);
	
    document.getElementById("precioCreciente").addEventListener("click", cargarTablaRubros);
    document.getElementById("nombreDepartamentoCreciente").addEventListener("click", cargarTablaRubros);
}

function agregarUnEmpleado(){
    if (document.getElementById("formAltaDeEmpleado").reportValidity()){
		let nombre = document.getElementById("nombreEmpleado").value;
		let cedula = document.getElementById("cedulaEmpleado").value;
		let departamento = document.getElementById("departamentoEmpleado").value;
		let edad = document.getElementById("edadEmpleado").value;
		if (!sistema.existeCedula(cedula)){
			let empleado = new Empleados(nombre,cedula,departamento,edad);
			sistema.agregarEmpleado(empleado);
            cargarComboEmpleados();
			crearTablaEmpleados();
			document.getElementById("nombreEmpleado").value = "";
			document.getElementById("cedulaEmpleado").value = "";
			document.getElementById("departamentoEmpleado").value = "Artigas";
			document.getElementById("edadEmpleado").value = "";
		}
	}
}

function agregarUnRubro(){
    if (document.getElementById("formAltaDeRubro").reportValidity()){
		let nombreRubro = document.getElementById("nombreRubro").value;
		let descripcion = document.getElementById("descripcion").value;
		if (!sistema.existeRubro(nombreRubro)){
			let rubro = new Rubros(nombreRubro,descripcion);
			sistema.agregarRubro(rubro);
            cargarComboRubro("rubro");
            cargarComboRubro("rubroConsultas");
			cargarListas();
			document.getElementById("nombreRubro").value = "";
			document.getElementById("descripcion").value = "";
		}
	}
}

function agregarUnaOferta(){
    if (document.getElementById("formAltaDeOferta").reportValidity()){
		let empleadoOferta = document.getElementById("empleadoOferta").selectedIndex;//tomamos la posicion del empleado en el combo
		let rubro = document.getElementById("rubro").selectedIndex;//tomamos la posicion del rubro en el combo
        let detalle = document.getElementById("detalle").value;
		let precio = document.getElementById("precio").value;
		let objetoEmpleado = sistema.listaEmpleados[empleadoOferta];//le pasamos la posicion y nos devuelve el objeto empleado ya que en este caso particular coinciden
		let objetoRubro = sistema.listaRubros[rubro];//le pasamos la posicion y nos devuelve el objeto rubro ya que en este caso particular coinciden
		if(sistema.validarOferta(objetoEmpleado, objetoRubro, detalle)){
			let oferta = new Ofertas(objetoEmpleado,objetoRubro,detalle,precio);
			sistema.agregarOfertas(oferta);
			cargarComboOfertas();
			cargarListas();
			crearTablaEmpleados();
			document.getElementById("empleadoOferta").value = "";
			document.getElementById("rubro").value = "";
			document.getElementById("detalle").value = "";
			document.getElementById("precio").value = "";
		}
	}
}

function cargarComboEmpleados(){
	document.getElementById("empleadoOferta").innerHTML = "";
	let datos = sistema.devolverTodosEmpleados();
	for (let i=0; i<datos.length; i++) {
		let nodo = document.createElement("option");
		let nodoTexto = document.createTextNode(datos[i].nombre + " " + datos[i].cedula);
		nodo.appendChild(nodoTexto);
		document.getElementById("empleadoOferta").appendChild(nodo);
	}
}

function cargarComboRubro(idRubro){
	document.getElementById(idRubro).innerHTML = "";
	let datos = sistema.devolverTodosRubros();
	for (let i=0; i<datos.length; i++) {
		let nodo = document.createElement("option");
		let nodoTexto = document.createTextNode(datos[i].nombre);
		nodo.appendChild(nodoTexto);
		document.getElementById(idRubro).appendChild(nodo);
	}
}

function cargarComboOfertas(){
	document.getElementById("oferta").innerHTML = "";
	let datos = sistema.devolverTodasOfertas();
	for (let i=0; i<datos.length; i++) {
		let nodo = document.createElement("option");
		let nodoTexto = document.createTextNode(datos[i].rubro.nombre + " " + datos[i].detalle + " $" + datos[i].precio + " " + datos[i].empleado.nombre);
		nodo.appendChild(nodoTexto);
		document.getElementById("oferta").appendChild(nodo);
	}
}

function eliminarOferta(){
	let elegido = document.getElementById("oferta").selectedIndex;
	sistema.eliminarOferta(elegido);
	cargarComboOfertas();
	cargarListas();
}

function cargarTablaRubros(){
	let datos;
    let rubroIndice = document.getElementById("rubroConsultas").selectedIndex;//tomamos la posicion del rubro en el combo
    //segun la opcion chequeada, la funcion que vamos a llamar
    if(document.getElementById("precioCreciente").checked){
        datos = sistema.devolverPrecioCreciente(rubroIndice);
    }else{
        datos = sistema.devolverNombreDepCreciente(rubroIndice);
    }

    let rubro = document.getElementById("rubroConsultas").value;
    document.getElementById("tituloRubroDatos").innerHTML = "Rubro: " + rubro;

    let promedio = sistema.devolverPromedioOfertas(datos,rubro);
    if(!Number.isNaN(promedio)){//si eliminamos las ofertas la variable promedio queda en NaN por lo que usamos esta funcion para que se actualice el promedio en la tabla
        document.getElementById("PromedioRubroDatos").innerHTML = "Promedio: " + promedio;
    }else{
		document.getElementById("PromedioRubroDatos").innerHTML = "Promedio: Sin datos";
	}
	
	let tabla = document.getElementById("tablaRubros");
	tabla.innerHTML = "";
	let precioTipo;
	for (let ofe of datos){
		let fila = tabla.insertRow();
		let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        let celda3 = fila.insertCell();
        let celda4 = fila.insertCell();
        let celda5 = fila.insertCell();
		celda1.innerHTML = ofe.empleado.nombre;
        celda2.innerHTML = ofe.empleado.departamento;
        celda3.innerHTML = ofe.detalle;
        celda4.innerHTML = ofe.precio;
		precioTipo = sistema.devolverTipoPrecio(rubro, ofe.precio);
		celda5.innerHTML = precioTipo;
	}
}

function crearLista(idLista, datos){//funcion generica que crea una lista con datos recibidos
    document.getElementById(idLista).innerHTML = "";
	for (let i=0; i<datos.length; i++) {
		let nodo = document.createElement("li");
		let nodoTexto = document.createTextNode(datos[i]);
		nodo.appendChild(nodoTexto);
		document.getElementById(idLista).appendChild(nodo);
	}
}

function crearListaVacia(idLista){//funcion generica que vuelve las listas al estado inicial si es necesario 
    document.getElementById(idLista).innerHTML = "";
    let nodo = document.createElement("li");
	let nodoTexto = document.createTextNode("Sin Datos");
	nodo.appendChild(nodoTexto);
	document.getElementById(idLista).appendChild(nodo);
}

function cargarListas(){//unica funcion para crear ambas listas
    let datos = sistema.devolverRubroConMaximaCantOfertas();
    if(datos.length>0){
	crearLista("ListaRubrosMaxCantidadOfertas", datos);
    }else{
        crearListaVacia("ListaRubrosMaxCantidadOfertas");
    }

    datos = sistema.devolverRubroSinOfertas();
    if(datos.length>0){
	crearLista("ListaRubrosSinOfertas", datos);
    }else{
        crearListaVacia("ListaRubrosSinOfertas");
    }
}

function crearTablaEmpleados(){
    let datos = sistema.devolverNombreEmpleadoAlfabeticamente();
	let tabla = document.getElementById("tablaEmpleados");
	tabla.innerHTML = "";
	for (let emp of datos){
		let fila = tabla.insertRow();
		let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        let celda3 = fila.insertCell();
        let celda4 = fila.insertCell();
        let celda5 = fila.insertCell();
		celda1.innerHTML = emp.nombre;
        celda2.innerHTML = emp.cedula;
        celda3.innerHTML = emp.departamento;
        celda4.innerHTML = emp.edad;
		let cantOfertas = sistema.devolverCantOfertasEmpleado(emp.cedula);
		celda5.innerHTML = cantOfertas;
	}
}