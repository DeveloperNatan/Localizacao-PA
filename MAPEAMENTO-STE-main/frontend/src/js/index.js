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

  menutable.sort((a, b) =>
    a.RelacionamentoPA.LocalCompleto.localeCompare(b.RelacionamentoPA.LocalCompleto)
  );

  ArrayLocals.push(item.RelacionamentoPA.LocalCompleto);
  menuitems.classList =
    "grid grid-cols-8 w-full bg-[#1d242a] border-b border-gray-600 p-2 text-center text-white";

  menuitems.innerHTML = `
      <span class="p-1">${item.filial}</span>
      <span class="p-1">${item.Andar}</span>
      <span class="p-1">${item.Espinha}</span>
      <span class="p-1">${item.PA}</span>
      <span class="p-1">${item.RelacionamentoPA.LocalCompleto}</span>
      <div class="flex justify-center">
       <button onclick="HrefSnipePC('${item.RelacionamentoPA.PatrimonioPC}')" class="underline decoration-1 text-white rounded-sm p-1 w-1/2 cursor-pointer"><a class="flex justify-center">${item.RelacionamentoPA.PatrimonioPC}</a></button>
      </div>
      <div class="flex justify-center">
       <button onclick="HrefSnipeMNT('${item.RelacionamentoPA.PatrimonioMNT}')"  class="underline decoration-1 text-white rounded-sm p-1 w-1/2 cursor-pointer"><a class="flex justify-center">${item.RelacionamentoPA.PatrimonioMNT}</a></button>
      </div>
      <div class="flex justify-center">
        <button class="bg-[#146c84] text-white rounded-sm p-1 cursor-pointer mr-1 btn-edit" onclick="OpenModal(${item.id})" id="OpenModalEdit">Editar</button>
        <form method="post" action="/delete">
            <input type="hidden" name="id" value="${item.id}">
            <button type="submit" class="bg-red-500 text-white rounded-sm cursor-pointer button-excluir p-1 ml-1">
                Excluir
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
    case "SP":
      classeSP.appendChild(menuitems);
      break;
    case "CWB":
      classeCWB.appendChild(menuitems);
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

    menutable.forEach((item) => {
      CreateItems(item);
    })
  } catch (error) {
    console.log("Erro ao buscar dados:", error);
  }
}

//NAO FUNCIONA
InputBusca.oninput = () => {
  menucontainer.innerHTML = "";
  ArrayLocals.filter((local) =>
    local.toLowerCase().includes(InputBusca.value.toLowerCase())
  ).forEach((local) => CreateItems(local))
}

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


//ButtonBusca.addEventListener("click", () => {})


;
fetchApitable();
