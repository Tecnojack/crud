import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";


const data = [
  { id: 1, telefono: 'Galaxy note 20 Ultra', almacenamiento: '512gb', ram: '16gb', precio: 1500 },
  { id: 2, telefono: 'Galaxy s20 Ultra', almacenamiento: '512gb', ram: '12gb', precio: 1300 },
  { id: 3, telefono: 'Galaxy s21 Ultra', almacenamiento: '512gb', ram: '16gb', precio: 1600 },
  { id: 4, telefono: 'IPhone 12 pro max', almacenamiento: '512gb', ram: '12gb', precio: 1700 },
]
class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: '',
      telefono: '',
      almacenamiento: '',
      ram: '',
      precio: ''
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].almacenmaiento = dato.almacenmaiento;
        arreglo[contador].ram = dato.ram;
        arreglo[contador].precio = dato.precio;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>TELEFONO</th>
                <th>ALMACENAMIENTO</th>
                <th>RAM</th>
                <th>PRECIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.almacenamiento}</td>
                  <td>{dato.ram}</td>
                  <td>{dato.precio}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label> telefono: </label>
              <input className="form-control" name="telefono" type="text" onChange={this.handleChange} value={this.state.form.telefono} />
            </FormGroup>

            <FormGroup>
              <label>   almacenmaiento: </label>
              <input className="form-control" name="almacenamiento" type="text" onChange={this.handleChange} value={this.state.form.almacenamiento} />
            </FormGroup>
            <FormGroup>
              <label>   ram: </label>
              <input className="form-control" name="ram" type="text" onChange={this.handleChange} value={this.state.form.ram} />
            </FormGroup>
            <FormGroup>
              <label>   precio: </label>
              <input className="form-control" name="precio" type="number" onChange={this.handleChange} value={this.state.form.precio} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}> Editar </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}> Cancelar </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar telefono</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id: </label>
              <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>telefono:</label>
              <input className="form-control" name="telefono" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>almacenmaiento:</label>
              <input className="form-control" name="almacenmaiento" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>ram:</label>
              <input className="form-control" name="ram" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>precio:</label>
              <input className="form-control" name="precio" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
            <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()} > Cancelar </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
