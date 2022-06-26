
//////
	////// Instrucciones para agregar un producto nuevo
//////

//////////////////////////////////////////////////////////////////
//////
//////	1. Agregar datos del producto al bloque de datos.
//////	2. Crear los botones o divs que se usarán para el
//////	producto y declararlos siendo estos:
//////		- botonProducto
//////		- divContadorProducto
//////		- divCostoProducto
//////		- compraProducto
//////	3. Hacer un update del display del producto nuevo
//////	y agregarlo a "updateDisplays()", además de agregar
//////	el nuevo updateDisplay al EventListener correspondiente.
//////	4. Crear una función que reinicie el contador y el costo.
//////	5. Crear dos EventListener para el producto, uno
//////	para agregar y otro para cancelar.
//////	6. Modificar la función "finOrden()" para agregar 
//////	el producto.
//////	7. Modificar la función "calcularTotal()" para agregar
//////	el costo del producto a la suma.
//////
//////////////////////////////////////////////////////////////////


//////
	////// Bloque de datos
//////


let papas = {
	contador: 0,
	costo: 0,
	precio: 14,
};

let refresco = {
	contador: 0,
	costo: 0,
	precio: 20,
};

let chocolate = {
	contador: 0,
	costo: 0,
	precio: 33,
};

//////
	////// Bloque de declaraciones
//////


let botonPapas = document.querySelector('#papas');
let divContadorPapas = document.querySelector('#contadorPapas');
let divCostoPapas = document.querySelector('#costoPapas');
let cancelarPapas = document.querySelector('#cancelarPapas');
let compraPapas = false;

let botonRefresco = document.querySelector('#refresco');
let divContadorRefresco = document.querySelector('#contadorRefresco');
let divCostoRefresco = document.querySelector('#costoRefresco');
let cancelarRefresco = document.querySelector('#cancelarRefresco');
let compraRefresco = false;

let botonChocolate = document.querySelector('#chocolate');
let divContadorChocolate = document.querySelector('#contadorChocolate');
let divCostoChocolate = document.querySelector('#costoChocolate');
let cancelarChocolate = document.querySelector('#cancelarChocolate');
let compraChocolate = false;

let total = document.querySelector('.total');
let cancelarOrden = document.querySelector('#cancelarOrden');
let costoTotal = 0;

let orden = document.querySelector('#orden');
let cantidadProductosDiferentes = 0;


let finOrden = document.querySelector('#finOrden');


//////
	////// Bloque de listeners
//////


updateDisplays();

botonPapas.addEventListener("click",()=>{
	papas.contador++;
	papas.costo = papas.contador * 14;
	compraPapas = true;
	updateDisplays();
});

botonRefresco.addEventListener("click",()=>{
	refresco.contador++;
	refresco.costo = refresco.contador * 20;
	compraRefresco = true;
	updateDisplays();
});

botonChocolate.addEventListener("click",()=>{
	chocolate.contador++;
	chocolate.costo = chocolate.contador * 20;
	compraChocolate = true;
	updateDisplays();
});

cancelarPapas.addEventListener("click",()=>{
	reiniciarPapas();
	updateDisplays();
});

cancelarRefresco.addEventListener("click",()=>{
	reiniciarRefresco();
	updateDisplays();
});

cancelarChocolate.addEventListener("click",()=>{
	reiniciarChocolate();
	updateDisplays();
});

cancelarOrden.addEventListener("click",()=>{
	reiniciarProductos();
	updateDisplays();
});

finOrden.addEventListener("click",()=>{
	if(compraPapas) cantidadProductosDiferentes++;
	if(compraRefresco) cantidadProductosDiferentes++;
	guardarPedido();
	updateDisplays();
});


//////
	////// Bloque de funciones
//////


////// Reiniciadores

function reiniciarProductos(){
	reiniciarPapas();
	reiniciarRefresco();
	reiniciarChocolate();
	costoTotal = 0;
}

function reiniciarPapas(){
	papas.contador = 0;
	papas.costo = 0;
	compraPapas = false;
}

function reiniciarRefresco(){
	refresco.contador = 0;
	refresco.costo = 0;
	compraRefresco = false;
}

function reiniciarChocolate(){
	chocolate.contador = 0;
	chocolate.costo = 0;
	compraChocolate = false;
}

////// Displays

function updateDisplays(){
	updateDisplayPapas();
	updateDisplayRefresco();
	updateDisplayChocolate();
	updateDisplayTotal();
}

function updateDisplayPapas(){
	divContadorPapas.innerHTML = papas.contador;
	divCostoPapas.innerHTML = "$" + papas.costo;
}

function updateDisplayRefresco(){
	divContadorRefresco.innerHTML = refresco.contador;
	divCostoRefresco.innerHTML = "$" + refresco.costo;
}

function updateDisplayChocolate(){
	divContadorChocolate.innerHTML = chocolate.contador;
	divCostoChocolate.innerHTML = "$" + chocolate.costo;
}

function calcularTotal(){
	costoTotal = papas.costo + refresco.costo + chocolate.costo;
}

function updateDisplayTotal(){
	calcularTotal();
	total.innerHTML = "Total = $" + costoTotal;
}

////// Otros

function guardarPedido(){
	let nombres = [];
	let contadores = [];
	let costos = [];
	let i = 0;
	let total = 0;

	if(compraPapas){
		contadores[i] = papas.contador;
		costos[i] = papas.costo;
		nombres[i] = "Papa";
		i++;
	}

	if(compraRefresco){
		contadores[i] = refresco.contador;
		costos[i] = refresco.costo;
		nombres[i] = "Refresco";
		i++;
	}

	if(compraChocolate){
		contadores[i] = chocolate.contador;
		costos[i] = chocolate.costo;
		nombres[i] = "Chocolate";
		i++;
	}
	
	let mensaje = '';

	for(let x = 0 ; x < nombres.length ; x++){
		total += costos[x];
		mensaje += `${contadores[x]} ${nombres[x]} por $${costos[x]} <br>`;
	}

	mensaje += `<br>Para un total de $${total}`;
	orden.innerHTML = mensaje;

	if(nombres.length == 0){
		orden.innerHTML = "Orden";
	}
}