import { useState } from "react";
import axios from "axios";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import { data } from "react-router-dom";
import Swal from "sweetalert2";

const useEntrada = () => {
    const [entrada, setEntrada] = useState([])
    const [nombre, setNombre] = useState('')
    const [dni, setDni] = useState('')
    const [direccion, setDireccion] = useState('')
    const [email, setEmail] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operacion, setOperacion] = useState('')
    const url = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado'

    const getEmpleados = async () => {
        const response = await axios.get(url)
        setEntrada(response.data)

    }
    const openModal = (operation, entrada) => {
        setNombre('')
        setDni('')
        setDireccion('')
        setEmail('')
        if (operation === 1) {
            setTitleModal('Registrar Empleado')

        }
        setOperacion(operacion)

    }
    const enviarSolicitud = async (urlApi, metodo, parametros = {}) => {
        let obj = {
            method: metodo,
            url: urlApi,
            data: parametros,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        await axios(obj).then(() => {
            let mensaje = ''
            if (metodo === 'POST') {
                mensaje = 'Se guardo el empleado'
            } else if (metodo === 'DELETE') {
                mensaje = 'Se elimino el empleado'
            }
            alertaSuccess(mensaje)
            document.getElementById('btnCerrarModal').click()
            getEmpleados()
        }).catch((error) => {
            alertaError(error.response.data.message)

        })
    }
    const guardarEditarEmpleado = () => {
        let payload, metodo, urlAxios
        if (nombre === '') {
            alertaWarning('Nombre del empleado en Blanco', nombre)
        } else if (dni === '') {
            alertaWarning('DNI del empleado en Blanco', dni)
        } else if (direccion === '') {
            alertaWarning('Direccion del empleado en Blanco', direccion)
        } else if (email === '') {
            alertaWarning('Email del empleado en Blanco', email)
        } else {
            payload = {
                nombre: nombre,
                dni: dni,
                direccion: direccion,
                email: email
            }
            if (operacion === 1) {
                metodo = 'POST'
                urlAxios = url
            }
            enviarSolicitud(urlAxios, metodo, payload)

        }
        console.log("Enviando:", payload);
    }
    const deleteEmpleado = (id) => {
        Swal.fire({
            title: 'Esta seguro de eliminar empleado?',
            icon: 'question',
            text: 'No hay retorno',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'

        }).then((result) => {
            if (result.isConfirmed) {
                setNombre(nombre)
                enviarSolicitud(`${url}/${id}`, 'DELETE')
            }
        }).catch((error) => {
            alertaError(error)
        })

    }

    return {
        entrada, getEmpleados, openModal, nombre, setNombre, dni, setDni, direccion, setDireccion, email, setEmail, titleModal,
        guardarEditarEmpleado,
        deleteEmpleado

    }

}

export default useEntrada