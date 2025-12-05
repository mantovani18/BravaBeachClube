// Base de dados de professores e horários
const database = {
    futevolei: {
        nome: "Futevôlei",
        emoji: "⚽",
        professores: [
            {
                id: 1,
                nome: "Samuel Isaac",
                avatar: "img/Samukinha.jpeg",
                genero: "masculino",
                descricao: "Professor experiente em futevôlei",
                especialidade: "Especialista em Futevôlei",
                horarios: {
                    "Segunda": ["17:00", "18:00", "19:00"],
                    "Terça": ["09:00", "10:00", "17:30", "19:30"],
                    "Quarta": ["16:00", "17:00", "18:00", "19:00", "20:00"],
                    "Quinta": ["16:30", "17:30", "18:30"],
                    "Sexta": [],
                    "Sábado": [],
                    "Domingo": []
                }
            },
            {
                id: 2,
                nome: "Ademir Carlos José",
                avatar: "img/Coxa.jpeg",
                genero: "masculino",
                descricao: "Profissional dedicado ao futevôlei",
                especialidade: "Especialista em Futevôlei",
                horarios: {
                    "Segunda": ["17:00", "18:00", "19:00"],
                    "Terça": ["09:00", "10:00", "17:30", "19:30"],
                    "Quarta": ["16:00", "17:00", "18:00", "19:00", "20:00"],
                    "Quinta": ["16:30", "17:30", "18:30"],
                    "Sexta": [],
                    "Sábado": [],
                    "Domingo": []
                }
            }
        ]
    },
    volei: {
        nome: "Vôlei de Praia",
        emoji: "🏐",
        professores: [
            {
                id: 4,
                nome: "Ana Carolina Gimenez",
                avatar: "img/AnaCarolina.png",
                genero: "feminino",
                descricao: "Jogadora profissional aposentada",
                especialidade: "Especialista em Vôlei de Praia",
                horarios: {
                    "Segunda": ["10:00"],
                    "Terça": ["10:00", "17:00"],
                    "Quarta": ["10:00"],
                    "Quinta": ["17:00"],
                    "Sexta": ["10:00", "17:00"],
                    "Sábado": ["11:00"],
                    "Domingo": ["15:00"]
                }
            }
        ]
    },
    beachtennis: {
        nome: "Beach Tennis",
        emoji: "🥎",
        professores: [
            {
                id: 7,
                nome: "Maria Pazzotti",
                avatar: "img/MariaPazzotti.png",
                genero: "feminino",
                descricao: "Instrutora de Beach Tennis com experiência de sobra",
                especialidade: "Especialista em Beach Tennis",
                horarios: {
                    "Segunda": ["17:00", "18:00", "19:00"],
                    "Terça": ["09:00", "10:00", "17:30", "19:30"],
                    "Quarta": ["16:00", "17:00", "18:00", "19:00", "20:00"],
                    "Quinta": ["16:30", "17:30", "18:30"],
                    "Sexta": [],
                    "Sábado": [],
                    "Domingo": []
                }
            }
        ]
    }
};

// Estado global do agendamento
let estadoAgendamento = {
    nome: null,
    idade: null,
    telefone: null,
    sexualidade: null,
    esporte: null,
    professor: null,
    horarios: [] // Array para armazenar até 2 horários
};

// Elementos do DOM
const steps = document.querySelectorAll('.step');
const formDadosPessoais = document.getElementById('form-dados-pessoais');
const btnContinuarEsportes = document.getElementById('btn-continuar-esportes');
const esporteCards = document.querySelectorAll('.esporte-card');
const btnVoltarPasso0 = document.getElementById('voltar-passo-0');
const btnVoltarPasso1 = document.getElementById('voltar-passo-1');
const btnVoltarPasso2 = document.getElementById('voltar-passo-2');
const btnConfirmarHorarios = document.getElementById('btn-confirmar-horarios');
const btnNovoAgendamento = document.getElementById('btn-novo-agendamento');
const btnEnviarConfirmacao = document.getElementById('btn-enviar-confirmacao');

// Event Listener para continuar após preenchimento de dados
btnContinuarEsportes.addEventListener('click', function() {
    const nome = document.getElementById('nome').value.trim();
    const idade = document.getElementById('idade').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const sexualidade = document.querySelector('input[name="sexualidade"]:checked')?.value;

    if (!nome || !idade || !telefone || !sexualidade) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Armazenar dados no estado
    estadoAgendamento.nome = nome;
    estadoAgendamento.idade = idade;
    estadoAgendamento.telefone = telefone;
    estadoAgendamento.sexualidade = sexualidade;

    // Ir para passo 1 (esportes)
    irParaPasso(1);
});

// Event Listeners para seleção de esporte (clique no card)
esporteCards.forEach((card) => {
    card.addEventListener('click', function() {
        const esporte = this.getAttribute('data-esporte');
        selecionarEsporte(esporte);
    });
    card.style.cursor = 'pointer';
});

// Event Listeners para voltar
btnVoltarPasso0.addEventListener('click', voltarPasso0);
btnVoltarPasso1.addEventListener('click', voltarPasso1);
btnVoltarPasso2.addEventListener('click', voltarPasso2);
btnConfirmarHorarios.addEventListener('click', confirmarHorarios);
btnNovoAgendamento.addEventListener('click', novoAgendamento);
btnEnviarConfirmacao.addEventListener('click', enviarMensagemProfessor);

// Funções
function selecionarEsporte(esporte) {
    estadoAgendamento.esporte = esporte;
    
    // Atualizar visual do card selecionado
    document.querySelectorAll('.esporte-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-esporte="${esporte}"]`).classList.add('selected');
    
    // Carregar professores
    carregarProfessores(esporte);
    
    // Ir para passo 2
    irParaPasso(2);
}

function carregarProfessores(esporte) {
    const container = document.getElementById('professores-container');
    const esporteData = database[esporte];
    
    // Atualizar título
    document.getElementById('esporte-selecionado-texto').textContent = 
        `Especialistas em: ${esporteData.nome}`;
    
    // Limpar container
    container.innerHTML = '';
    
    // Adicionar professores
    esporteData.professores.forEach(prof => {
        const card = document.createElement('div');
        card.className = 'professor-card';
        
        // Adicionar classe baseada no gênero
        if (prof.genero === 'masculino') {
            card.classList.add('genero-masculino');
        } else if (prof.genero === 'feminino') {
            card.classList.add('genero-feminino');
        }
        
        // Verificar se é uma imagem (contém /) ou emoji
        let avatarHTML = '';
        if (prof.avatar.includes('/')) {
            // É um caminho de imagem
            avatarHTML = `<img src="${prof.avatar}" alt="${prof.nome}" class="professor-avatar-img">`;
        } else {
            // É um emoji
            avatarHTML = `<div class="professor-avatar">${prof.avatar}</div>`;
        }
        
        card.innerHTML = `
            ${avatarHTML}
            <h3>${prof.nome}</h3>
            <p class="especialidade">${prof.especialidade}</p>
            <p class="descricao">${prof.descricao}</p>
        `;
        
        card.addEventListener('click', () => selecionarProfessor(prof.id, prof.nome, esporte));
        container.appendChild(card);
    });
}

function selecionarProfessor(professorId, professorNome, esporte) {
    estadoAgendamento.professor = { id: professorId, nome: professorNome };
    
    // Atualizar visual
    document.querySelectorAll('.professor-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Carregar horários
    carregarHorarios(esporte, professorId);
    
    // Ir para passo 3
    irParaPasso(3);
}

function carregarHorarios(esporte, professorId) {
    const esporteData = database[esporte];
    const prof = esporteData.professores.find(p => p.id === professorId);
    
    // Atualizar título
    document.getElementById('professor-selecionado-texto').textContent = 
        `Professor: ${prof.nome}`;
    
    const diasContainer = document.getElementById('dias-semana');
    diasContainer.innerHTML = '';
    
    const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    
    dias.forEach(dia => {
        const horarios = prof.horarios[dia] || [];
        
        const diaCard = document.createElement('div');
        diaCard.className = 'dia-card';
        
        let horariosHTML = '';
        horarios.forEach(horario => {
            horariosHTML += `
                <div class="horario-slot" data-dia="${dia}" data-horario="${horario}">
                    ${horario}
                </div>
            `;
        });
        
        if (horarios.length === 0) {
            horariosHTML = '<div class="horario-slot unavailable">Sem disponibilidade</div>';
        }
        
        diaCard.innerHTML = `
            <div class="dia-header">${dia}</div>
            <div class="horarios-list">
                ${horariosHTML}
            </div>
        `;
        
        diasContainer.appendChild(diaCard);
    });
    
    // Event listeners para horários
    document.querySelectorAll('.horario-slot:not(.unavailable)').forEach(slot => {
        slot.addEventListener('click', function() {
            const dia = this.getAttribute('data-dia');
            const horario = this.getAttribute('data-horario');
            selecionarHorario(dia, horario);
        });
    });
}

function selecionarHorario(dia, horario) {
    const slotSelecionado = `${dia} - ${horario}`;
    const index = estadoAgendamento.horarios.findIndex(h => h === slotSelecionado);
    
    // Se já está selecionado, remover
    if (index > -1) {
        estadoAgendamento.horarios.splice(index, 1);
        event.currentTarget.classList.remove('selected');
    } else {
        // Se não atingiu o limite de 2, adicionar
        if (estadoAgendamento.horarios.length < 2) {
            estadoAgendamento.horarios.push(slotSelecionado);
            event.currentTarget.classList.add('selected');
        } else {
            alert('Você já selecionou 2 horários. Desmarque um para selecionar outro.');
            return;
        }
    }
}

function mostrarConfirmacao() {
    const esporteData = database[estadoAgendamento.esporte];
    const professor = estadoAgendamento.professor;
    const horarios = estadoAgendamento.horarios;
    
    // Preencher confirmação
    document.getElementById('conf-esporte').textContent = esporteData.nome;
    document.getElementById('conf-professor').textContent = professor.nome;
    
    // Formatar horários selecionados
    let horariosFormatados = '';
    horarios.forEach((h, index) => {
        const [dia, horario] = h.split(' - ');
        const proximoDia = obterProximoDia(dia);
        horariosFormatados += `<div class="horario-confirmacao"><strong>${proximoDia}</strong> às ${horario}</div>`;
    });
    
    document.getElementById('conf-data').innerHTML = horariosFormatados;
    
    irParaPasso(4);
}

function obterProximoDia(dia) {
    const hoje = new Date();
    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const nomesDias = {
        "Domingo": 0, "Segunda": 1, "Terça": 2, "Quarta": 3, 
        "Quinta": 4, "Sexta": 5, "Sábado": 6
    };
    
    const diaAtual = hoje.getDay();
    const diaDesejado = nomesDias[dia];
    let diasAdelante = diaDesejado - diaAtual;
    
    if (diasAdelante <= 0) {
        diasAdelante += 7;
    }
    
    const data = new Date(hoje);
    data.setDate(data.getDate() + diasAdelante);
    
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return data.toLocaleDateString('pt-BR', opcoes);
}

function irParaPasso(numero) {
    // Esconder todos os passos
    steps.forEach(step => {
        step.classList.add('hidden');
    });
    
    // Mostrar passo específico
    document.getElementById(`step-${numero}`).classList.remove('hidden');
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function confirmarHorarios() {
    if (estadoAgendamento.horarios.length === 0) {
        alert('Por favor, selecione pelo menos um horário!');
        return;
    }
    
    mostrarConfirmacao();
    irParaPasso(4);
}

function voltarPasso0() {
    estadoAgendamento.esporte = null;
    document.querySelectorAll('.esporte-card').forEach(card => {
        card.classList.remove('selected');
    });
    irParaPasso(0);
}

function voltarPasso1() {
    estadoAgendamento.professor = null;
    document.querySelectorAll('.professor-card').forEach(card => {
        card.classList.remove('selected');
    });
    irParaPasso(0);
}

function voltarPasso2() {
    estadoAgendamento.horarios = [];
    document.querySelectorAll('.horario-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    irParaPasso(2);
}

function novoAgendamento() {
    // Limpar estado
    estadoAgendamento = {
        nome: null,
        idade: null,
        telefone: null,
        sexualidade: null,
        esporte: null,
        professor: null,
        horarios: []
    };
    
    // Limpar formulário
    document.getElementById('form-dados-pessoais').reset();
    
    // Limpar seleções visuais
    document.querySelectorAll('.esporte-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    irParaPasso(0);
}

function enviarMensagemProfessor() {
    const professor = estadoAgendamento.professor.nome;
    const esporteData = database[estadoAgendamento.esporte];
    
    console.log('Professor selecionado:', professor);
    console.log('Nome completo do professor:', estadoAgendamento.professor.nome);
    // Formatar horários
    let horariosTexto = '';
    estadoAgendamento.horarios.forEach(h => {
        const [dia, horario] = h.split(' - ');
        const proximoDia = obterProximoDia(dia);
        horariosTexto += `\n  - ${proximoDia} às ${horario}`;
    });
    
    // Montar mensagem formatada para WhatsApp
    const mensagemWhatsApp = `*AGENDAMENTO DE AULA - BRAVA BEACH CLUB*

*DADOS DO ALUNO:*
Nome: ${estadoAgendamento.nome}
Idade: ${estadoAgendamento.idade}
Gênero: ${estadoAgendamento.sexualidade}
Telefone: ${estadoAgendamento.telefone}

*AULA:*
Professor: ${professor}
Esporte: ${esporteData.nome}
Horários:${horariosTexto}

---
Brava Beach Club
Telefone: (21) 9999-9999
Email: contato@bravabeachclub.com`;
    
    // Determinar o número do WhatsApp baseado no professor
    let numeroWhatsApp;
    if (estadoAgendamento.professor.nome === 'Samuel Isaac') {
        numeroWhatsApp = '554399663926'; // +55 43 9966-3926
    } else if (estadoAgendamento.professor.nome === 'Maria Pazzotti') {
        numeroWhatsApp = '554399700998'; // +55 43 9970-0998
    } else {
        numeroWhatsApp = '5543996212570'; // Número padrão da Brava
    }
    
    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
    
    // URL do WhatsApp Web
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Feedback visual
    alert(`✅ Abrindo WhatsApp para confirmar o agendamento!\n\nSeu agendamento será enviado para o número ${numeroWhatsApp.slice(-10)}.`);
    
    // Voltar para passo 0 após envio
    setTimeout(() => {
        novoAgendamento();
    }, 1000);
}

// Função antiga (mantida para compatibilidade)
function downloadConfirmacao() {
    const esporteData = database[estadoAgendamento.esporte];
    const texto = `
COMPROVANTE DE AGENDAMENTO
==========================

Esporte: ${esporteData.nome}
Professor: ${estadoAgendamento.professor.nome}

Local: Praia de Brava
Telefone: (21) 9999-9999

Obrigado por escolher Brava Beach Club!
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
    element.setAttribute('download', 'comprovante_agendamento.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Inicializar - Mostrar passo 1
document.addEventListener('DOMContentLoaded', () => {
    irParaPasso(0);
    console.log('✅ Sistema de agendamento carregado com sucesso!');
});
