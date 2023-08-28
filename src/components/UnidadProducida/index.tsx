import { FormEvent, useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

interface DepreciationData {
  year: number;
  initialBookValue: number;
  accumulatedDepreciation: number;
  finalBookValue: number;
}

type UnidadProducidaProps = {
  unitOfMeasurement: string;
};
export default function UnidadProducida({
  unitOfMeasurement,
}: UnidadProducidaProps) {
  const [assetPrice, setAssetPrice] = useState(0);
  const [residualValue, setResidualValue] = useState(0);
  const [unitsPerYear, setUnitsPerYear] = useState(0);
  const [years, setYears] = useState(0);
  const [depreciationData, setDepreciationData] = useState<DepreciationData[]>(
    []
  );
  const [depreciationRate, setDepreciationRate] = useState(0);
  const [costPerYear, setCostPerYear] = useState(0);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalUnits = unitsPerYear * years;
    const depreciationRate = (assetPrice - residualValue) / totalUnits;
    const anualDepreciation = unitsPerYear * depreciationRate;
    const depreciations: DepreciationData[] = [];

    let accumulatedDepreciation = 0;

    for (let i = 0; i < years; i++) {
      const initialBookValue =
        i == 0 ? assetPrice : depreciations[i - 1].finalBookValue;
      accumulatedDepreciation += anualDepreciation;
      depreciations.push({
        year: i + 1,
        initialBookValue,
        accumulatedDepreciation,
        finalBookValue: initialBookValue - anualDepreciation,
      });
    }

    setDepreciationRate(depreciationRate);
    setCostPerYear(anualDepreciation);
    setDepreciationData(depreciations);
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
          <Form.Label htmlFor="unitsPerYear">
            {unitOfMeasurement} por año:
          </Form.Label>
          <Form.Control
            type="number"
            id="unitsPerYear"
            required
            onChange={(e) => setUnitsPerYear(+e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="years">Años:</Form.Label>
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
        <li>
          Costo de depreciación por {unitOfMeasurement}:{" "}
          {currencyFormatter.format(depreciationRate)}
        </li>
        <li>
          Gasto por cada {unitsPerYear} {unitOfMeasurement.toLowerCase()}:{" "}
          {currencyFormatter.format(costPerYear)}
        </li>
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
