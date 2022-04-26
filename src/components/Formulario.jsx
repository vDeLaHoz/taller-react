import React from 'react'
import { firebase } from '../firebase'


const Formulario = () => {
    const [nombres, setNombres] = React.useState('')
    const [apellidos, setApellidos] = React.useState('')
    const [celular, setCelular] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [lista, setLista] = React.useState([])
    const [id, setId] = React.useState('')
    const [edicion, setEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('datos').get()
                const arrayData = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))

                setLista(arrayData)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos();
    })


    const guardar = async (e) => {
        e.preventDefault()

        if (!nombres.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!apellidos.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!celular.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!direccion.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!correo.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        try {
            const db = firebase.firestore()
            const newData = {
                name: nombres,
                lastName: apellidos,
                cel: celular,
                direction: direccion,
                email: correo
            }

            await db.collection('datos').add(newData)

            setLista([
                ...lista,
                {
                    name: nombres, lastName: apellidos, cel: celular, direction: direccion,
                    email: correo
                }
            ])

            e.target.reset()
            setNombres('')
            setApellidos('')
            setCelular('')
            setDireccion('')
            setCorreo('')
            setError(null)
        } catch (error) {
            console.log(error)
        }

    }

    const editar = item => {
        setNombres(item.name)
        setApellidos(item.lastName)
        setCelular(item.cel)
        setDireccion(item.direction)
        setCorreo(item.email)
        setId(item.id)
    }

    const editarDatos = async e => {
        e.preventDefault()

        if (!nombres.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!apellidos.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!celular.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!direccion.trim()) {
            setError('Ingrese todos los datos')
            return
        }

        if (!correo.trim()) {
            setError('Ingrese todos los datos')
            return
        }


        try {
            const db = firebase.firestore()
            await db.collection('datos').doc(id).update({
                name: nombres,
                lastName: apellidos,
                cel: celular,
                direction: direccion,
                email: correo
            })

            const arrayEditado = lista.map(
                item => item.id === id ? {
                    id: id, name: nombres, lastName: apellidos, cel: celular, direction: direccion,
                    email: correo
                } : item
            )

            setLista(arrayEditado)
            setNombres('')
            setApellidos('')
            setId('')
            setCelular('')
            setDireccion('')
            setCorreo('')
            setEdicion(false)
            setError(null)

        } catch (error) {
            console.log(error)
        }


    }

    const eliminar = async id => {
        try {
            const db = firebase.firestore()
            await db.collection('datos').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        } catch (error) {
            console.log(error)
        }


    }

    const cancelar = () => {
        setEdicion(false)
        setId('')
        setNombres('')
        setApellidos('')
        setCelular('')
        setCorreo('')
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                    <div class="card-center">
                        <h3 className="card-header bg-primary text-center text-white">{edicion ? 'Editar Información' : 'Agregar Información'}</h3>
                        <div class="card-body">
                            <form onSubmit={edicion ? editarDatos : guardar}>
                                <div className="row">
                                    <div className="col-6">
                                        <label>Nombres:</label>
                                        <input
                                            className='form-control mb-2'
                                            type="text"
                                            placeholder='Ingrese los nombres'
                                            onChange={(e) => setNombres(e.target.value)}
                                            value={nombres}
                                        />
                                    </div>
                                    <div className="col-6">
                                    <label>Apellidos:</label>
                                        <input
                                        className='form-control mb-2'
                                        placeholder='Ingrese los apellidos'
                                        type="text"
                                        onChange={(e) => setApellidos(e.target.value)}
                                        value={apellidos}
                                    /></div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                    <label>Dirección:</label>
                                        <input
                                            className='form-control mb-2'
                                            placeholder='Ingrese la direccion'
                                            type="text"
                                            onChange={(e) => setDireccion(e.target.value)}
                                            value={direccion}
                                        />
                                    </div>
                                    <div className="col-6">
                                    <label>Correo:</label>
                                        <input
                                            className='form-control mb-2'
                                            placeholder='Ingrese el Email'
                                            type="text"
                                            onChange={(e) => setCorreo(e.target.value)}
                                            value={correo}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><div className="col-12">
                                    <label>Celular:</label>
                                        <input 
                                        min={0}
                                        className='form-control mb-2'
                                        placeholder='Ingrese el numero de celular'
                                        type="number"
                                        onChange={(e) => setCelular(e.target.value)}
                                        value={celular}
                                        /></div></div>
                                </div>
                                {
                                    error ? <span className='text-danger'>{error}</span> : null
                                }
                                <br />
                                {
                                    edicion ?
                                        (
                                            <>
                                                <button
                                                    className='btn btn-success btn-block'
                                                    type='submit'
                                                >Editar</button>
                                                <button
                                                    className='btn btn-dark btn-block mx-2'
                                                    onClick={() => cancelar()}
                                                >Cancelar</button>
                                            </>
                                        )
                                        :
                                        
                                        <button
                                            className='btn btn-primary btn-block'
                                            type='submit'
                                        >Agregar</button>

                                }
                            </form>
                        </div>
                    </div>

                    <hr/><h4 className='text-center'>PERSONAS</h4>
                    <hr/><ul className='list-group'>
                        {
                            lista.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>
                                        <div className="row">
                                            <div className="col-6"><b>Nombres: </b>{item.name}</div>
                                            <div className="col-6"><b>Apellidos: </b>{item.lastName}</div>
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col-6"><b>Direccion: </b> {item.direction}</div>
                                            <div className="col-6"><b>Correo: </b> {item.email}</div>
                                        </div>
                                        <div className="row">
                                        <div className="col-4"><b>Celular: </b> {item.cel}</div>
                                        </div>
                                    </span><br/>
                                    <button className='btn btn-success btn-sm float-start' onClick={() => editar(item)}>
                                        Editar
                                    </button>
                                    <button className='btn btn-danger btn-sm float-start mx-2' onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    )
}


export default Formulario
