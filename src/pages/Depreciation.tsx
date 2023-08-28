import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Restore, Favorite, LocationOn } from "@mui/icons-material";
import AceleradaDecreciente from "../components/AceleradaDecreciente";
import LineaRecta from "../components/LineaRecta";
import UnidadProducida from "../components/UnidadProducida";
import useInfo from "../stores/useInfo";
import { Container } from "react-bootstrap";

import logo from "../assets/images/logo.jpeg";

type NavValues = "decreciente" | "linea" | "uso";
function Depreciation() {
  const { name, description, serie, unitOfUse } = useInfo();
  const [navValue, setNavValue] = useState<NavValues>("decreciente");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Container>
        <img src={logo} width={150} height={150} />
        <h1>Cálculo de depreciación para activos de la empresa {name}</h1>
        <div># de serie: {serie}</div>
        <div>{description}</div>
      </Container>
      <div style={{ flex: "1" }}>
        {navValue == "decreciente" && <AceleradaDecreciente />}
        {navValue == "linea" && <LineaRecta />}
        {navValue == "uso" && (
          <UnidadProducida unitOfMeasurement={unitOfUse!} />
        )}
      </div>
      <BottomNavigation
        showLabels
        value={navValue}
        onChange={(_, nv) => setNavValue(nv)}
      >
        <BottomNavigationAction
          label="Acelerada decreciente"
          value="decreciente"
          icon={<Restore />}
        />
        <BottomNavigationAction
          label="Línea recta"
          value="linea"
          icon={<Favorite />}
        />
        <BottomNavigationAction
          label="Por uso"
          value="uso"
          icon={<LocationOn />}
        />
      </BottomNavigation>
    </div>
  );
}

export default Depreciation;
