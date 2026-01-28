const adicionar_tarefa = document.getElementById("adicionar_tarefa");
const display_tarefas = document.getElementById("display_tarefas");

function criar_tarefa(nomeTxt, descricaoTxt, statusTxt) {
  const display_tarefas = document.getElementById("display_tarefas");
  const linha = document.createElement("div");

  const inputNome = nomeTxt || document.getElementById("nome_tarefa").value;
  const inputDescricao =
    descricaoTxt || document.getElementById("descricao_tarefa").value;
  const textoStatus = statusTxt || "Incompleto";
  linha.className = "linha_tarefa";

  if (inputNome.trim() === "") {
    alert("Por favor, digite um nome para a tarefa!");
    return;
  }

  const nome = document.createElement("p");
  nome.textContent = inputNome;

  const descricao = document.createElement("p");
  descricao.textContent = inputDescricao;

  const status = document.createElement("button");
  status.textContent = textoStatus;
  status.onclick = () => {
    status.textContent =
      status.textContent === "Incompleto" ? "Completo" : "Incompleto";
    salvar_tarefa();
  };

  linha.appendChild(nome);
  linha.appendChild(descricao);
  linha.appendChild(status);
  display_tarefas.appendChild(linha);

  if (typeof nomeTxt !== "string") {
    document.getElementById("nome_tarefa").value = "";
    document.getElementById("descricao_tarefa").value = "";
    salvar_tarefa();
  }
}

function salvar_tarefa() {
  const listaDeTarefas = [];
  const rows = document.querySelectorAll(".linha_tarefa");

  rows.forEach((row) => {
    const tarefas = {
      nome: row.querySelector("p:nth-child(1)").textContent,
      descricao: row.querySelector("p:nth-child(2)").textContent,
      status: row.querySelector("button").textContent,
    };
    listaDeTarefas.push(tarefas);
  });
  localStorage.setItem("minhas-tarefas", JSON.stringify(listaDeTarefas));
}

function carregar_tarefas() {
  const dados = localStorage.getItem("minhas-tarefas");
  if (!dados) return;

  const tarefas = JSON.parse(dados);

  tarefas.forEach((t) => {
    criar_tarefa(t.nome, t.descricao, t.status);
  });
}

carregar_tarefas();
adicionar_tarefa.addEventListener("click", () => criar_tarefa());
