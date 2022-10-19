/*Juan Andres Macedo 290961*/
/*Joaquín Seoane 279793*/

class Empleados{
    constructor(nombre,cedula,departamento,edad){
        this.nombre = nombre;
        this.cedula = cedula;
        this.departamento = departamento;
        this.edad = edad;
    }

    toString(){
        return this.nombre + ' ' + this.cedula + ' ' + this.departamento + ' ' + this.edad;
    }
}

class Rubros{
    constructor(nombre,descripcion){
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    toString(){
        return this.nombre + ' ' + this.descripcion;
    }
}

class Ofertas{
    constructor(empleado,rubro,detalle,precio){
        this.empleado = empleado;
        this.rubro = rubro;
        this.detalle = detalle;
        this.precio = precio;
    }

    toString(){
        return this.empleado + ' ' + this.rubro + ' ' + this.detalle + ' ' + this.precio;
    }
}

class Sistema{
    constructor(){
        this.listaEmpleados = [];
        this.listaRubros = [];
        this.listaOfertas = [];
    }

    agregarEmpleado(empleado){
        this.listaEmpleados.push(empleado);
    }

    agregarRubro(rubro){
        this.listaRubros.push(rubro);
    }

    agregarOfertas(oferta){
        this.listaOfertas.push(oferta);
    }

    devolverTodosEmpleados(){
		return this.listaEmpleados;
	}

    devolverTodosRubros(){
		return this.listaRubros;
	}

    devolverTodasOfertas(){
        return this.listaOfertas;
    }

    eliminarOferta(posicion){
		this.listaOfertas.splice(posicion,1);
	}

    existeCedula(cedula){
		let existe = false;
		for (let empl of this.listaEmpleados){
			if (empl.cedula == cedula){
				existe = true;
			}
		}
		return existe;
	}

    existeRubro(rubro){
		let existe = false;
		for (let rub of this.listaRubros){
			if (rub.nombre == rubro){
				existe = true;
			}
		}
		return existe;
	}


    devolverPrecioCreciente(rubro){
        let resultado = [];
        for(let ofe of this.listaOfertas){
            if(ofe.rubro == this.listaRubros[rubro]){
                resultado.push(ofe);
            }
        }
        return resultado.sort(function(a,b){
            return a.precio - b.precio;
        });
		
	}

    devolverNombreDepCreciente(rubro){
        let resultado = [];
        for(let ofe of this.listaOfertas){
            if(ofe.rubro == this.listaRubros[rubro]){
                resultado.push(ofe);
            }
        }
        return resultado.sort(function (a,b) {
            return a.empleado.departamento.localeCompare(b.empleado.departamento);
        });
	}

    devolverNombreDepCreciente(rubro){
        let resultado = [];
        for(let ofe of this.listaOfertas){
            if(ofe.rubro == this.listaRubros[rubro]){
                resultado.push(ofe);
            }
        }
        return resultado.sort(function (a,b) {
            return a.empleado.departamento.localeCompare(b.empleado.departamento);
        });
	}

    devolverPromedioOfertas(listaPromedio, rubro){
        let suma = 0;
        for(let ofe of listaPromedio){
            if(ofe.rubro.nombre == rubro){
                suma += parseInt(ofe.precio);
            }
        }
        return Math.trunc(suma/listaPromedio.length);
    }

    devolverRubroConMaximaCantOfertas(){
        let resultado = [];
        let max = 0;
        for(let rub of this.listaRubros){
            let cantidad = 0;
            for(let ofe of this.listaOfertas){
                if(rub == ofe.rubro){
                    cantidad++;
                }
            }
            if(cantidad > max){
                max = cantidad;
                resultado = [rub];
            }else{
                if(cantidad == max && max != 0){
                    resultado.push(rub);
                }
            }
        }
        return resultado;
    }

    devolverRubroSinOfertas(){
        let resultado = [];
        for(let rub of this.listaRubros){
            let cantidad = 0;
            for(let ofe of this.listaOfertas){
                if(rub == ofe.rubro){
                    cantidad++;
                }
            }
            if(cantidad == 0){
                resultado.push(rub);
            }
        }
    
        return resultado;
    }

    devolverRango(rubro){
        let rango = 0;
        let precioMin = Number.MAX_VALUE;
        let precioMax = Number.MIN_VALUE;
        for(let ofe of this.listaOfertas){
            if(ofe.rubro.nombre == rubro){    
                if(parseInt(ofe.precio) <= precioMin){
                    precioMin = parseInt(ofe.precio);
                }   
                if(parseInt(ofe.precio) > precioMax){
                    precioMax = parseInt(ofe.precio);
                }
            }
        }
        rango = precioMax - precioMin;
        return [rango,precioMin];
    }
    
    devolverTipoPrecio(rubro,precio){
        let rango = this.devolverRango(rubro)[0];
        let precioMin = this.devolverRango(rubro)[1];
        let resultado = "";
        let porcentaje75 = (rango * 75)/100;
        let porcentaje50 = (rango * 50)/100;
        let porcentaje25 = (rango * 25)/100;
        if(rango == 0){
            resultado = "-";
        }else{
            porcentaje75 += precioMin;
            porcentaje50 += precioMin;
            porcentaje25 += precioMin;
            if(parseInt(precio) > porcentaje75){
                resultado = "$$$$";
            }else{
                if(parseInt(precio) <= porcentaje75 && parseInt(precio) > porcentaje50){
                    resultado = "$$$";
                }else{
                    if(parseInt(precio) <= porcentaje50 && parseInt(precio) > porcentaje25){
                        resultado = "$$";
                    }else{
                        resultado = "$";
                    }
                }
            }
        }
        return resultado;
    }

    devolverNombreEmpleadoAlfabeticamente(){
        let resultado = this.listaEmpleados;

        return resultado.sort(function (a,b) {
            return a.nombre.localeCompare(b.nombre);
        });
	}

    devolverCantOfertasEmpleado(cedulaEmp){
        let cant = 0;
        for(let ofe of this.listaOfertas){
            if(ofe.empleado.cedula == cedulaEmp){
                cant++;
            }
        }
        return cant;
    }

    validarOferta(empleado,rubro,detalle){
        let resultado = true;

        for(let ofe of this.listaOfertas){
            if(ofe.empleado == empleado && ofe.rubro == rubro && ofe.detalle == detalle){
                resultado = false;
            }else{
                resultado = true;
            }
        }
        return resultado;
    }
}