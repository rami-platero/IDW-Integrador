const PRUEBAS = [
  {
    DNI: 44674731,
    solicitudID: 888,
    pruebaID: 1,
    resultado: "Fallo",
    fecha: new Date("June 01, 2024 16:30:00"),
    tecnico: "Tecnico 1",
  },
  {
    DNI: 44674731,
    solicitudID: 888,
    pruebaID: 2,
    resultado: "Fallo",
    fecha: new Date("June 03, 2024 15:00:00"),
    tecnico: "Tecnico 1",
  },
  {
    DNI: 44674731,
    solicitudID: 888,
    pruebaID: 3,
    resultado: "Éxito",
    fecha: new Date("June 07, 2024 18:00:00"),
    tecnico: "Tecnico 1",
  },
  {
    DNI: 44674733,
    solicitudID: 855,
    pruebaID: 1,
    resultado: "Éxito",
    fecha: new Date("May 08, 2024 16:30:00"),
    tecnico: "Tecnico 1",
  },
  {
    DNI: 46179676,
    solicitudID: 555,
    pruebaID: 1,
    resultado: "Éxito",
    fecha: new Date("May 10, 2024 16:30:00"),
    tecnico: "Tecnico 3",
  },
];

const $miSolicitudFiltrosForm = document.getElementById("miSolicitudFiltros");

const renderNotFound = () => {
    const $table = document.getElementById("pruebas-table");
    const $container = document.getElementById("pruebas-list")
    if($table){
       $table.remove() 
    }
    $container.innerHTML = `<p id="not-found">No se encontraron resultados</p>`
};

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const renderTable = () => {
  const $tableTemplate = document.getElementById("table-template").content;
  const $trTemplate = document.getElementById("tr-template").content;
  const $fragment = document.createDocumentFragment();

  PRUEBAS.forEach((_p, index) => {
    let $clone = document.importNode($trTemplate, true);

    Object.entries(PRUEBAS[index]).forEach(([name, value]) => {
      if (name === "fecha") {
        const formattedDate = formatDate(value)
        return $clone.querySelector(`[data-td=${name}]`).textContent = formattedDate
      }
      $clone.querySelector(`[data-td=${name}]`).textContent = value;
    });

    $fragment.appendChild($clone);
  });

  let $clonedTable = document.importNode($tableTemplate, true);
  $clonedTable.querySelector("tbody").appendChild($fragment);
  const $container = document.getElementById("pruebas-list");
  $container.appendChild($clonedTable);
};

const validateDNI = (DNI) => {
    if (DNI.length > 8 || DNI.length < 7) {
      alert("El DNI ingresado no es válido.");
      return false;
    }
    return true
};

const renderValues = ($template, p) => {
    let $clone = document.importNode($template, true);

    Object.entries(p).forEach(([name, value]) => {
      if (name === "fecha") {
        const formattedDate = formatDate(value)
        return $clone.querySelector(`[data-td=${name}]`).textContent = formattedDate
      }
      $clone.querySelector(`[data-td=${name}]`).textContent = value;
    });

    return $clone
}

const renderResults = (found) => {
    const $table = document.getElementById("pruebas-table");
    const $fragment = document.createDocumentFragment();
    const $trTemplate = document.getElementById("tr-template").content;
    const $notFound =  document.getElementById("not-found")
    if($notFound){
        $notFound.remove()
    }

    found.forEach((p)=>{
        const $clone = renderValues($trTemplate, p)
        $fragment.appendChild($clone)
    })

    if($table){
        $table.querySelector("tbody").innerHTML = ""
        $table.querySelector("tbody").appendChild($fragment)
    } else {
        const $tableTemplate = document.getElementById("table-template").content
        $tableTemplate.querySelector("tbody").appendChild($fragment);
        const $container = document.getElementById("pruebas-list")
        $container.appendChild($tableTemplate)
    }
}

const search = () => {
  const formData = new FormData($miSolicitudFiltrosForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const {DNI} = data

  if (!validateDNI(DNI)) return;

  const found = PRUEBAS.filter((p) => {
    return p.DNI === parseInt(DNI);
  });

  if (!found.length) {
    renderNotFound();
  } else {
    renderResults(found);
  }
};

if ($miSolicitudFiltrosForm) {
  $miSolicitudFiltrosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    search();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
});
