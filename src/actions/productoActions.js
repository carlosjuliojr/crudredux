import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGA_PRODUCTOS,
	DESCARGA_PRODUCTOS_EXITO,
	DESCARGA_PRODUCTOS_ERROR,
	OBTENER_PRODUCTO_ELIMINAR,
	PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevo producto
export function crearNuevoProductoAction(producto) {
	return async (dispatch) => {
		dispatch(agregarProducto());

		try {
			//Insertaar en la api
			await clienteAxios.post('/productos', producto);
			//si todo sale bien actualizar el state
			dispatch(agregarProductoExito(producto));
			//Alerta
			Swal.fire('Correcto', 'El producto se agrego correctamente', 'success');
		} catch (error) {
			dispatch(agregarProductoError(true));
			//Alerta de error
			Swal.fire({
				icon: 'error',
				title: 'Hubo un error',
				text: 'Hubo un error intenta de nuevo'
			});
		}
	};
}

const agregarProducto = () => ({
	type: AGREGAR_PRODUCTO,
	payload: true
});

//Si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto
});

//si hubo un error
const agregarProductoError = (estado) => {
	return {
		type: AGREGAR_PRODUCTO_ERROR,
		payload: estado
	};
};

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
	return async (dispatch) => {
		dispatch(descargarProductos());

		try {
			const respuesta = await clienteAxios.get('/productos');
			dispatch(descargaProductosExitosa(respuesta.data));
		} catch (error) {
			dispatch(descargaProductosError());
		}
	};
}

const descargarProductos = () => ({
	type: COMENZAR_DESCARGA_PRODUCTOS,
	payload: true
});

const descargaProductosExitosa = (productos) => ({
	type: DESCARGA_PRODUCTOS_EXITO,
	payload: productos
});

const descargaProductosError = () => ({
	type: DESCARGA_PRODUCTOS_ERROR,
	payload: true
});

//Selecciona y elimina el producto

export function borrarProductoAction(id) {
	return async (dispatch) => {
		dispatch(obtenerProductoEliminar(id));
		try {
			await clienteAxios.delete(`/productos/${id}`);
			dispatch(eliminarProductoExito());
			Swal.fire('Eliminado!', 'El producto ha sido eliminado correctamente.', 'success');
		} catch (error) {
			console.log(error);
			dispatch(eliminarProductoError());
		}
	};
}

const obtenerProductoEliminar = (id) => ({
	type: OBTENER_PRODUCTO_ELIMINAR,
	payload: id
});

const eliminarProductoExito = () => ({
	type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
	type: PRODUCTO_ELIMINADO_ERROR,
	payload: true
});

//cOLOCAR PRODUCTO EN EDICION
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type : OBTENER_PRODUCTO_EDITAR,
    payload : producto
})

//EDITTA UN REGISTRO EN LA API Y STATE
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto));
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const editarProducto = () => ({
    type : COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type : PRODUCTO_EDITADO_EXITO,
    payload : producto
})

const editarProductoError = () => ({
    type : PRODUCTO_EDITADO_ERROR,
    payload : true
})