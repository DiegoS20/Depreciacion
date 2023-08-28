import { FormEvent, useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

interface DepreciationData {
  year: number;
  initialBookValue: number;
  accumulatedDepreciation: number;
  finalBookValue: number;
}

export default function LineaRecta() {
  const [assetPrice, setAssetPrice] = useState(0);
  const [residualValue, setResidualValue] = useState(0);
  const [years, setYears] = useState(0);
  const [depreciationData, setDepreciationData] = useState<DepreciationData[]>(
    []
  );
  const [annualDepreciation, setAnnualDepreciation] = useState(0);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const annualDepreciation = (assetPrice - residualValue) / years;
    const depreciations: DepreciationData[] = [];
    let accumulatedDepreciation = 0;

    for (let i = 0; i < years; i++) {
      accumulatedDepreciation = annualDepreciation * (i + 1);
      const initialBookValue =
        i == 0 ? assetPrice : depreciations[i - 1].finalBookValue;

      depreciations.push({
        year: i + 1,
        initialBookValue,
        accumulatedDepreciation,
        finalBookValue: initialBookValue - annualDepreciation,
      });
    }

    setDepreciationData(depreciations);
    setAnnualDepreciation(annualDepreciation);
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container className="mt-5">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="assetPrice">Precio del Activo:</Form.Label>
          <Form.Control
            type="number"
            id="assetPrice"
            required
            onChange={(e) => setAssetPrice(+e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="residualValue">Valor Residual:</Form.Label>
          <Form.Control
            type="number"
            id="residualValue"
            required
            onChange={(e) => setResidualValue(+e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="years">Años de Depreciación:</Form.Label>
          <Form.Control
            type="number"
            id="years"
            required
            onChange={(e) => setYears(+e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Calcular
        </Button>
      </Form>

      <h2 className="mt-4">Tabla de Depreciación</h2>
      <ul>
        <li>Depreciación anual: {annualDepreciation.toFixed(2)}</li>
      </ul>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Año</th>
            <th>Valor inicial en Libros de los Activos</th>
            <th>Depreciación Acumulada</th>
            <th>Valor final en Libros de los Activos</th>
          </tr>
        </thead>
        <tbody>
          {depreciationData.map((data) => (
            <tr key={data.year}>
              <td>{data.year}</td>
              <td>{currencyFormatter.format(data.initialBookValue)}</td>
              <td>{currencyFormatter.format(data.accumulatedDepreciation)}</td>
              <td>{currencyFormatter.format(data.finalBookValue)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
