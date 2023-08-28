import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import useInfo from "../stores/useInfo";

import logo from "../assets/images/logo.jpeg";

export default function Index() {
  const { setInfo } = useInfo();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    assetName: "",
    assetDescription: "",
    modelSeries: "",
    unitOfUse: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInfo({
      name: formValues.assetName,
      description: formValues.assetDescription,
      serie: formValues.modelSeries,
      unitOfUse: formValues.unitOfUse,
    });
    navigate("/depreciaciones");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logo} width={300} height={300} />
      <Form onSubmit={handleSubmit} style={{ width: "35vw" }}>
        <h1 style={{ textAlign: "center", fontSize: "75px" }}>
          Información de la empresa
        </h1>
        <Form.Group controlId="assetName">
          <Form.Label>Nombre del activo</Form.Label>
          <Form.Control
            type="text"
            name="assetName"
            value={formValues.assetName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="assetDescription">
          <Form.Label>Descripción del activo</Form.Label>
          <Form.Control
            as="textarea"
            name="assetDescription"
            value={formValues.assetDescription}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="modelSeries">
          <Form.Label>Model-Serie</Form.Label>
          <Form.Control
            type="text"
            name="modelSeries"
            value={formValues.modelSeries}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="modelSeries">
          <Form.Label>Unidad de uso</Form.Label>
          <Form.Control
            type="text"
            name="unitOfUse"
            placeholder="km, cm, impresiones, ensambles, etc."
            value={formValues.unitOfUse}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" style={{ marginTop: "25px" }}>
          Enviar
        </Button>
      </Form>
    </div>
  );
}

type FormValues = {
  assetName: string;
  assetDescription: string;
  modelSeries: string;
  unitOfUse: string;
};
