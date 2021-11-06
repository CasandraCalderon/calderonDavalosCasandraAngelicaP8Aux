import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ventas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

const url = "http://localhost:3006/peliculas";
class Ventas extends Component {
  //Almacenar estado
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: "",
      NombrePelicula: "",
      AñoEstreno: "",
      Director: "",
      Precio: "",
    },
  };
  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.id;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = () => {
    axios
      .put(`${url}/${this.state.form.id}`, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      });
  };

  peticionDelete = () => {
    axios.delete(`${url}/${this.state.form.id}`).then((response) => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    });
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarPelicula = (pelicula) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: pelicula.id,
        NombrePelicula: pelicula.NombrePelicula,
        AñoEstreno: pelicula.AñoEstreno,
        Director: pelicula.Director,
        Precio: pelicula.Precio,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.peticionGet();
  }
  
  render() {
    const { form } = this.state;
    return (
      <div>
        <br />
        <div className="text-left container">
          <button
            className="btn btn-dark"
            onClick={() => {
              this.setState({ form: null, tipoModal: "insertar" });
              this.modalInsertar();
            }}
          >
            Agregar Pelicula
          </button>
        </div>
        <br />
        <table className="table table-fixed text-center container">
          <thead className="row">
            <tr>
              <th className="Primero">ID</th>
              <th className="Primero">Nombre</th>
              <th className="Primero">Año de estreno</th>
              <th className="Primero">Director</th>
              <th className="Primero">Precio (Bs)</th>
              <th className="Primero">Acciones</th>
            </tr>
          </thead>
          <tbody className="row">
            {this.state.data.map((peliculas) => {
              return (
                <tr key={peliculas.id}>
                  <td className="Segundo">{peliculas.id}</td>
                  <td className="Segundo">{peliculas.NombrePelicula}</td>
                  <td className="Segundo">{peliculas.AñoEstreno}</td>
                  <td className="Segundo">{peliculas.Director}</td>
                  <td className="Segundo">{peliculas.Precio}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        this.seleccionarPelicula(peliculas);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarPelicula(peliculas);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span
              style={{ float: "right" }}
              onClick={() => this.modalInsertar()}
            >
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : this.state.data.length + 1}
              />
              <br />
              <label htmlFor="NombrePelicula">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="NombrePelicula"
                id="NombrePelicula"
                onChange={this.handleChange}
                value={form ? form.NombrePelicula : ""}
              />
              <br />
              <label htmlFor="AñoEstreno">Año de estreno</label>
              <input
                className="form-control"
                type="text"
                name="AñoEstreno"
                id="AñoEstreno"
                onChange={this.handleChange}
                value={form ? form.AñoEstreno : ""}
              />
              <br />
              <label htmlFor="Director">Director</label>
              <input
                className="form-control"
                type="text"
                name="Director"
                id="Director"
                onChange={this.handleChange}
                value={form ? form.Director : ""}
              />
              <br />
              <label htmlFor="Precio">Precio</label>
              <input
                className="form-control"
                type="number"
                name="Precio"
                id="Precio"
                onChange={this.handleChange}
                value={form ? form.Precio : ""}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === "insertar" ? (
              <button
                className="btn btn-dark"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar esta Pelicula?{" "}
            {form && form.NombrePelicula}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default Ventas;
