import Campo from "./Campo"
import useEntrada from "../hooks/useEntrada"
import { useEffect } from "react"
const Entrada = () => {
    const {
        entrada,getEmpleados,openModal,nombre, setNombre,dni, setDni,direccion, setDireccion,email, setEmail,titleModal,
        guardarEditarEmpleado,
        deleteEmpleado
    } = useEntrada();
    useEffect(() => {
        getEmpleados()
    }, [])

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalProducto" onClick={()=>openModal(1)}>
                            <i className="fa solid fa-circle-plus" /> Crear Producto
                        </button>
                    </div>
                </div>

            </div>
            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>DNI</th>
                                    <th>Direccion</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {entrada.map((item, i) => (
                                    <tr key={item.id}>
                                        <td>{i + 1}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.dni}</td>
                                        <td>{item.direccion}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">
                                                <i className="fa-solid fa-edit" />
                                            </button>
                                            <button className="btn btn-danger"onClick={deleteEmpleado(entrada.nombre)}>
                                                <i className="fa-solid fa-trash" />
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id='modalProducto' className="modal fade" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titleModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close" />
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id='id' />
                            <Campo idCampo='nombre' iconName='fa-solid fa-signature' placeholderName="Ingrese el Nombre" tipoCampo="text"  />
                            <Campo idCampo='dni' iconName='fa-solid fa-id-card-clip' placeholderName="Ingrese DNI" tipoCampo="text" />
                            <Campo idCampo='direccion' iconName='fa-solid fa-route' placeholderName="Ingrese Direccion" tipoCampo="text" />
                            <Campo idCampo='email' iconName='fa-solid fa-envelope' placeholderName="Ingrese Email" tipoCampo="number" />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success">
                                <i className="fa-solid fa-floppy-disk" /> Guardar
                            </button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Entrada