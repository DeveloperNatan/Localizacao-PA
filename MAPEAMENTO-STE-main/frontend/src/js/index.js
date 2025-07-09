const menucontainer = document.getElementById("menu-container");
const modaladd = document.getElementById("modal-add");
const buttonadd = document.getElementById("button-modal-add");
const buttonfechar = document.getElementById("buttton-modal-fechar");
const selectFilial = document.getElementById("cad-filial");
const selectEspinha = document.getElementById("cad-espinha");
const selectAndar = document.getElementById("cad-andar");
const selectpa = document.getElementById("cad-pa");
const localcompleto = document.getElementById("cad-localcompleto");
const ModalEditdiv = document.getElementById("ModalEdit");
const CloseModalButtion = document.getElementById("buttton-modal-fechar");
const ButtonEdit = document.getElementById("OpenModalEdit");
const StylesEdit = document.getElementById("styles-edit");
const InputBusca = document.getElementById("input-busca");
const ButtonBusca = document.getElementById("campo-busca");
let ArrayLocals = [];
let menutable = [];

function CreateItems(item) {
  const menuitems = document.createElement("div");
  const classeJ1 = document.getElementById("classe-J1");
  const classeJ0 = document.getElementById("classe-J0");
  const classeCWB = document.getElementById("classe-CWB");
  const classeSP = document.getElementById("classe-SP");

  ArrayLocals.push(item.RelacionamentoPA.LocalCompleto);

  menuitems.classList =
    "bg-white rounded-lg shadow p-1 mb-1 grid grid-cols-2 md:grid-cols-8 gap-2 items-center text-center";

  menuitems.innerHTML = `
  <span class="hidden md:inline-block">${item.filial}</span>
<span class="hidden md:inline-block">${item.Andar}</span>
<span class="hidden md:inline-block">${item.Espinha}</span>
<span class="hidden md:inline-block">${item.PA}</span>

<div class="col-span-1 md:col-span-1 text-left md:text-center">
    <strong class="md:hidden text-sm">Local: </strong>
    <span>${item.RelacionamentoPA.LocalCompleto}</span>

</div>
<div class="col-span-1 text-left md:text-center">
    <strong class="md:hidden text-sm">PC: </strong>
    <button onclick="HrefSnipePC('${item.RelacionamentoPA.PatrimonioPC}')"
        class="underline decoration-1 text-black rounded-sm p-1 w-1/2 cursor-pointer"><a
            class="flex justify-center">${item.RelacionamentoPA.PatrimonioPC}</a></button>
</div>
<div class="col-span-1 text-left md:text-center">
    <strong class="md:hidden text-sm">MNT: </strong>
    <span>Undefined</span>
</div>
<div class="col-span-1 flex  gap-2 ">
    <button class="bg-[#146c84] text-white rounded p-1 cursor-pointer mr-1 btn-edit" onclick="OpenModal(${item.id})"
        id="OpenModalEdit"><i class="bi bi-pencil-square"></i></button>
    <form method="post" action="/delete">
        <input type="hidden" name="id" value="${item.id}">
        <button type="submit" class="bg-red-500 text-white rounded cursor-pointer button-excluir p-1 ml-1">
            <i class="bi bi-trash"></i>
        </button>
    </form>
</div>
  `;

  switch (item.filial) {
    case "J0":
      classeJ0.appendChild(menuitems);
      break;
    case "J1":
      classeJ1.appendChild(menuitems);
      break;
    case "CWB":
      classeCWB.appendChild(menuitems);
      break;
    case "SP":
      classeSP.appendChild(menuitems);
      break;

  }
}

async function fetchApitable() {
  try {
    const url = "http://localhost:9001/api/relacao";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed, status: ${response.status}`);
    }

    menutable = await response.json();


    menutable.sort((a, b) =>
      a.RelacionamentoPA.LocalCompleto.localeCompare(b.RelacionamentoPA.LocalCompleto)
    );
    menutable.forEach((item) => {
      CreateItems(item);
    })
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
}

//Pesquisa de busca por local, filial, espinha
ButtonBusca.addEventListener("click", () => {
  const termoBusca = InputBusca.value.trim().toLowerCase();

  // Limpa os containers de exibição
  document.getElementById("classe-J0").innerHTML = "";
  document.getElementById("classe-J1").innerHTML = "";
  document.getElementById("classe-CWB").innerHTML = "";
  document.getElementById("classe-SP").innerHTML = "";

  // Filtra os dados com base no termo
  const result = menutable.filter((item) => {
    const local = item.RelacionamentoPA.LocalCompleto.toLowerCase();
    const patrimonioPC = item.RelacionamentoPA.PatrimonioPC?.toLowerCase();
    console.log(local, patrimonioPC);

    return (
      local.includes(termoBusca) ||
      patrimonioPC.includes(termoBusca)
    );
  })
  console.log(result);

  // Renderiza os itens filtrados
  //utiliza funcao ja existente para cirar os itens
  result.forEach(item => CreateItems(item));
});

InputBusca.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    ButtonBusca.click();
  }
});

//limpar campos
InputBusca.addEventListener("input", () => {
  const ValueBusca = InputBusca.value.trim().toLowerCase();

  if (ValueBusca === "") {
    document.getElementById("classe-J0").innerHTML = "";
    document.getElementById("classe-J1").innerHTML = "";
    document.getElementById("classe-CWB").innerHTML = "";
    document.getElementById("classe-SP").innerHTML = "";

    menutable.forEach(item => CreateItems(item));
  }

})

async function ModalEdit(id) {
  try {
    const url = `http://localhost:9001/api/relacao/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed, status:${response.status}`);
    }

    const menu = await response.json();

    const ModalEdit = document.getElementById("ModalEdit");


    ModalEdit.innerHTML = `
    <div class="fixed inset-0 bg-gray-300/90 flex items-center justify-center" id="styles-edit">
        <div class="bg-white border border-gray-400 p-6 rounded-lg shadow-lg w-full max-w-lg text-gray-900">
          <h1 class="text-2xl font-bold mb-6 text-center">Editar Computador</h1>
          <form action="/update" method="post" class="grid grid-cols-1 gap-4">
            <div>
              <label for="cad-patrimonio" class="block text-sm font-medium">Patrimônio</label>
              <input type="text" name="patrimonioPC" id="cad-patrimonio-pc" value="${menu.RelacionamentoPA.PatrimonioPC}"
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
              <input type="hidden" name="id" value="${menu.id}">
            </div>
            <div>
              <label for="cad-patrimonio" class="block text-sm font-medium">Patrimônio</label>
              <input type="text" name="patrimonioMNT" id="cad-patrimonio-mnt" value="${menu.RelacionamentoPA.PatrimonioMNT}"
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
            </div>
            <div>
              <label for="cad-filial" class="block text-sm font-medium">Filial</label>
              <select name="filial" id="cad-filial"
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
                <option value="J0">Joinville Matriz (J0)</option>
                <option value="J1">Joinville Site (J1)</option>
                <option value="CWB">Curitiba (CWB)</option>
                <option value="SP">São Paulo (SP)</option>
              </select>
            </div>
            
            <div>
              <label for="cad-andar" class="block text-sm font-medium">Andar</label>
              <input type="text" name="andar" id="cad-andar" value="${menu.Andar}"
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
            </div>
            
            <div>
              <label for="cad-espinha" class="block text-sm font-medium">Espinha</label>
              <input type="text" name="espinha" id="cad-espinha" value="${menu.Espinha}"
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
            </div>
            
            <div>
              <label for="cad-pa" class="block text-sm font-medium">PA</label>
              <input type="text" name="pa" id="cad-pa" value="${menu.PA}"
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
            </div>
            
            <div>
              <label for="cad-carteira" class="block text-sm font-medium">Carteira</label>
              <select name="carteira" id="cad-carteira" 
                class="mt-1 block p-2 w-full rounded-md border border-gray-400 bg-gray-100 text-gray-900">
                <option value="${menu.Carteira}">${menu.Carteira}</option>
                <option value="BV WO">BV</option>
                <option value="PAN">PAN</option>
                <option value="SANTANDER">SANTANDER</option>
                <option value="BRADESCO">BRADESCO</option>
                <option value="STELLANTIS">STELLANTIS</option>
                <option value="UNCICRED">UNICRED</option>
                <option value="DAYCOVAL">DAYCOVAL</option>
              </select>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-4">
              <button type="submit" class="w-full bg-[#1a8caa] text-white py-2 px-4 rounded-md shadow">
                Salvar Alterações
              </button>
              <button type="button" onclick="CloseModal()" class="w-full bg-[#146c84] text-white py-2 px-4 rounded-md shadow">
                Fechar
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
  }
}

function OpenModal(id) {
  ModalEditdiv.classList.remove("hidden");
  ModalEdit(id);
}

function CloseModal() {
  ModalEditdiv.classList.add("hidden");
}

if (selectEspinha) {
  for (let i = 1; i <= 37; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectEspinha.appendChild(option);
  }
}

if (selectAndar) {
  for (let i = 0; i <= 8; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectAndar.appendChild(option);
  }
}

if (selectpa) {
  ''
  for (let i = 1; i <= 18; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    selectpa.appendChild(option);
  }
}

buttonadd.addEventListener("click", () => {
  modaladd.classList.remove("invisible", "opacity-0");
  modaladd.classList.add("visible", "opacity-400");
  modaladd.querySelector("div").classList.remove("scale-90");
  modaladd.querySelector("div").classList.add("scale-100");
});

buttonfechar.addEventListener("click", function (e) {
  if (e.target === buttonfechar) {
    modaladd.classList.remove("visible", "opacity-400");
    modaladd.classList.add("invisible", "opacity-0");
    modaladd.querySelector("div").classList.remove("scale-100");
    modaladd.querySelector("div").classList.add("scale-90");
  }
});



function HrefSnipePC(item) {
  window.open(`https://snipe.schulze.com.br/hardware?page=1&size=20&order=asc&sort=name&search=${item}`, '_blank');
}

function HrefSnipeMNT(item) {
  window.open(`https://snipe.schulze.com.br/hardware?page=1&size=20&order=asc&sort=name&search=${item}`, '_blank');
}

fetchApitable();